const fs = require("fs");
const path = require("path");

const KNOWLEDGE_BASE_PATH = path.join(
  __dirname,
  "../../../knowledge_base"
);

/**
 * Split knowledge-base documents into sections.
 */
function loadKnowledgeBase() {
  if (!fs.existsSync(KNOWLEDGE_BASE_PATH)) {
    return [];
  }

  const files = fs
    .readdirSync(KNOWLEDGE_BASE_PATH)
    .filter((file) => file.endsWith(".md"));

  const documents = [];

  for (const file of files) {
    const filePath = path.join(KNOWLEDGE_BASE_PATH, file);
    const content = fs.readFileSync(filePath, "utf-8");

    const sections = content
      .split(/\n(?=## )/)
      .map((section) => section.trim())
      .filter(Boolean);

    sections.forEach((section) => {
      const titleMatch = section.match(/^## (.+)/);

      documents.push({
        source: file,
        title: titleMatch ? titleMatch[1].trim() : "General Information",
        content: section,
      });
    });
  }

  return documents;
}

/**
 * Normalize text for comparison.
 */
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Retrieve knowledge relevant to the subject and topic.
 *
 * Ranking:
 * - Exact topic match: strong relevance
 * - Topic word matches: moderate relevance
 * - Subject match: additional relevance
 */
function retrieveKnowledge(subject, topic, maxResults = 4) {
  const documents = loadKnowledgeBase();

  if (!documents.length) {
    return [];
  }

  const normalizedSubject = normalizeText(subject);
  const normalizedTopic = normalizeText(topic);

  const topicWords = normalizedTopic
    .split(" ")
    .filter((word) => word.length > 2);

  const subjectWords = normalizedSubject
    .split(" ")
    .filter((word) => word.length > 2);

  const scoredDocuments = documents.map((document) => {
    const normalizedTitle = normalizeText(document.title);
    const normalizedContent = normalizeText(document.content);

    let score = 0;

    // Strong bonus for an exact topic match in the section title.
    if (
      normalizedTopic &&
      normalizedTitle === normalizedTopic
    ) {
      score += 10;
    }

    // Bonus when the complete topic appears in the section.
    if (
      normalizedTopic &&
      normalizedContent.includes(normalizedTopic)
    ) {
      score += 5;
    }

    // Score individual topic words.
    topicWords.forEach((word) => {
      if (normalizedTitle.includes(word)) {
        score += 3;
      } else if (normalizedContent.includes(word)) {
        score += 1;
      }
    });

    // Score subject words.
    subjectWords.forEach((word) => {
      if (normalizedContent.includes(word)) {
        score += 1;
      }
    });

    return {
      ...document,
      score,
    };
  });

  return scoredDocuments
    .filter((document) => document.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

module.exports = {
  loadKnowledgeBase,
  retrieveKnowledge,
};