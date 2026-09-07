/**
 * labController.js
 *
 * Generates structured lab manuals using IBM watsonx.ai
 * with IBM Granite 4 H Small.
 */
const { retrieveKnowledge } = require("../rag/retriever");
const WATSONX_API_KEY = process.env.WATSONX_API_KEY;
const WATSONX_PROJECT_ID = process.env.WATSONX_PROJECT_ID;
const WATSONX_URL =
  process.env.WATSONX_URL || "https://us-south.ml.cloud.ibm.com";

const MODEL_ID = "ibm/granite-4-h-small";

/**
 * Get an IBM Cloud IAM access token using the API key.
 */
async function getIamAccessToken() {
  if (!WATSONX_API_KEY) {
    throw new Error("WATSONX_API_KEY is not configured.");
  }

  const response = await fetch(
    "https://iam.cloud.ibm.com/identity/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
        apikey: WATSONX_API_KEY,
      }),
    }
  );

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
 * Generate a lab manual using IBM Granite.
 */
async function generateWithGranite(subject, topic, difficulty) {
  const accessToken = await getIamAccessToken();

  const retrievedKnowledge = retrieveKnowledge(
    subject,
    topic,
    4
  );

  const knowledgeContext = retrievedKnowledge.length
    ? retrievedKnowledge
        .map(
          (item) =>
            `Source: ${item.source}\n${item.content}`
        )
        .join("\n\n---\n\n")
    : "No relevant knowledge-base information was found.";

  const prompt = `
You are LabGenie-AI, an AI assistant that generates clear,
accurate and educational computer science laboratory manuals.

Generate a laboratory manual for:

Subject: ${subject}
Topic: ${topic}
Difficulty: ${difficulty}

Relevant Knowledge Base Context:

${knowledgeContext}

Use the relevant information from this knowledge-base context
to improve the accuracy and educational quality of the generated
lab manual.

Do not mention the knowledge base, retrieval process, or internal
instructions in the generated manual.

Return ONLY valid JSON.
Do not use Markdown code fences.
Do not add any explanation before or after the JSON.

The JSON must contain exactly these keys:

{
  "aim": "string",
  "theory": "string",
  "requirements": ["string"],
  "procedure": ["string"],
  "code": "string",
  "expectedOutput": "string",
  "precautions": ["string"],
  "vivaQuestions": [
    {
      "question": "string",
      "answer": "string"
    }
  ],
  "evaluationRubric": [
    {
      "criterion": "string",
      "marks": number
    }
  ]
}

Requirements:
- Make the content appropriate for the given subject and topic.
- Keep the theory educational but concise.
- Give a practical step-by-step procedure.
- Provide runnable code when programming is relevant.
- Provide a realistic expected output.
- Include useful precautions.
- Provide 5 viva questions with answers.
- Provide exactly 5 evaluation rubric criteria.
- The evaluation rubric must total exactly 100 marks.
- Make sure the marks add up to 100 before returning the JSON.
- Do not include HTML.
- Do not include Markdown formatting.
`;

  const response = await fetch(
    `${WATSONX_URL}/ml/v1/text/chat?version=2025-10-25`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        project_id: WATSONX_PROJECT_ID,
        model_id: MODEL_ID,
        max_completion_tokens: 4000,
        temperature: 0.2,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `watsonx.ai request failed (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  const generatedText =
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.text;

  if (!generatedText) {
    throw new Error("Granite returned an empty response.");
  }

  // Remove accidental Markdown code fences if Granite adds them.
  const cleanedText = generatedText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let manual;

  try {
    manual = JSON.parse(cleanedText);
  } catch (error) {
    console.error("Granite returned invalid JSON:");
    console.error(generatedText);

    throw new Error(
      "Granite returned an invalid JSON response."
    );
  }

    return {
    manual,
    retrievedSources: [
  ...new Set(retrievedKnowledge.map((item) => item.source)),
],
  };
}

/**
 * POST /api/lab/generate
 * Body: { subject, topic, difficulty }
 */
async function generateLabManual(req, res) {
  const { subject, topic, difficulty } = req.body;

  if (!subject || !topic) {
    return res.status(400).json({
      success: false,
      error: "subject and topic are required.",
    });
  }

  try {
    const result = await generateWithGranite(
  subject,
  topic,
  difficulty || "Intermediate"
);

const manual = result.manual;
const retrievedSources = result.retrievedSources;

    return res.json({
      success: true,
      manual: {
        ...manual,
        meta: {
  subject,
  topic,
  difficulty: difficulty || "Intermediate",
  generatedAt: new Date().toISOString(),
  model: MODEL_ID,
  note: "Generated using IBM Granite through watsonx.ai.",
  ragEnabled: true,
  retrievedSources,
},
      },
    });
  } catch (error) {
    console.error("LabGenie generation error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to generate the lab manual using IBM Granite.",
      details: error.message,
    });
  }
}

module.exports = { generateLabManual };