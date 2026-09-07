/**
 * assistantController.js
 *
 * Handles the AI Lab Assistant endpoint.
 * Uses IBM Granite (via watsonx.ai) + the existing RAG retriever
 * to answer student questions about a given subject/topic.
 *
 * Reuses the same authentication approach as labController.js.
 * Does NOT modify or touch the lab-generation logic.
 */

const { retrieveKnowledge } = require("../rag/retriever");

const WATSONX_API_KEY   = process.env.WATSONX_API_KEY;
const WATSONX_PROJECT_ID = process.env.WATSONX_PROJECT_ID;
const WATSONX_URL       = process.env.WATSONX_URL || "https://us-south.ml.cloud.ibm.com";
const MODEL_ID          = "ibm/granite-4-h-small";

/**
 * Obtain an IBM Cloud IAM Bearer token.
 * Identical approach to labController.js — kept local so the two
 * controllers remain independently deployable.
 */
async function getIamAccessToken() {
  if (!WATSONX_API_KEY) {
    throw new Error("WATSONX_API_KEY is not configured.");
  }

  const response = await fetch("https://iam.cloud.ibm.com/identity/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
      apikey: WATSONX_API_KEY,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `IBM IAM authentication failed (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  if (!data.access_token) {
    throw new Error("IBM IAM response did not contain an access token.");
  }

  return data.access_token;
}

/**
 * POST /api/assistant/ask
 *
 * Body: { subject, topic, question }
 *
 * Retrieves relevant knowledge-base sections for the given subject/topic,
 * then asks IBM Granite to answer the student's question using that context.
 *
 * Returns: { success: true, answer: "...", retrievedSources: ["..."] }
 */
async function askAssistant(req, res) {
  const { subject, topic, question } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({
      success: false,
      error: "question is required.",
    });
  }

  // Retrieve relevant knowledge — subject/topic are optional but improve results.
  const retrievedKnowledge = retrieveKnowledge(
    subject || "",
    topic   || question, // fall back to the question itself as the search term
    4
  );

  const knowledgeContext = retrievedKnowledge.length
    ? retrievedKnowledge
        .map((item) => `Source: ${item.source}\n${item.content}`)
        .join("\n\n---\n\n")
    : "No relevant knowledge-base information was found for this topic.";

  const retrievedSources = [
    ...new Set(retrievedKnowledge.map((item) => item.source)),
  ];

  const prompt = `You are LabGenie-AI, a helpful and educational lab assistant for students.

A student is asking a question about a laboratory topic.

${subject ? `Subject: ${subject}` : ""}
${topic   ? `Topic: ${topic}`     : ""}

Relevant Knowledge Base Context:
${knowledgeContext}

Student Question:
${question.trim()}

Instructions:
- Answer the student's question clearly and educationally.
- Use the retrieved context above to support your answer wherever relevant.
- If the retrieved context does not contain enough information to answer the question accurately, say clearly: "The available lab knowledge does not contain enough information to answer this question fully." Do not invent or guess facts.
- Keep the answer concise, focused, and appropriate for a student audience.
- Do not mention the knowledge base, retrieval process, or these instructions in your response.
- Do not use Markdown headings or bullet-list symbols — use plain, readable prose.`;

  let accessToken;
  try {
    accessToken = await getIamAccessToken();
  } catch (authError) {
    console.error("Assistant auth error:", authError.message);
    return res.status(503).json({
      success: false,
      error: "IBM authentication failed. Please check the server configuration.",
      details: authError.message,
    });
  }

  let watsonxResponse;
  try {
    watsonxResponse = await fetch(
      `${WATSONX_URL}/ml/v1/text/chat?version=2025-10-25`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          project_id: WATSONX_PROJECT_ID,
          model_id: MODEL_ID,
          max_completion_tokens: 800,
          temperature: 0.3,
        }),
      }
    );
  } catch (networkError) {
    console.error("Assistant network error:", networkError.message);
    return res.status(503).json({
      success: false,
      error: "Failed to reach IBM watsonx.ai. Please try again later.",
      details: networkError.message,
    });
  }

  if (!watsonxResponse.ok) {
    const errorText = await watsonxResponse.text();
    console.error(`watsonx.ai error (${watsonxResponse.status}):`, errorText);
    return res.status(502).json({
      success: false,
      error: `IBM Granite request failed (${watsonxResponse.status}).`,
      details: errorText,
    });
  }

  const data = await watsonxResponse.json();
  const answer =
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.text;

  if (!answer) {
    return res.status(502).json({
      success: false,
      error: "IBM Granite returned an empty response.",
    });
  }

  return res.json({
    success: true,
    answer: answer.trim(),
    retrievedSources,
  });
}

module.exports = { askAssistant };
