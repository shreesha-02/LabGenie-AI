import { useState } from "react";

const SUGGESTIONS = [
  "Explain this topic in simple terms.",
  "Why is this algorithm useful?",
  "What are the important precautions?",
  "What is the time complexity of this algorithm?",
  "Give me a real-world use case for this topic.",
];

async function askAssistant({ subject, topic, question }) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

  const response = await fetch(`${API_BASE}/assistant/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, topic, question }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to get an answer from the AI assistant."
    );
  }

  return data;
}

function AiLabAssistant({ subject, topic }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = question.trim().length > 0 && !loading;
  const hasContext = subject || topic;

  async function handleAsk(e) {
    e.preventDefault();

    if (!canSubmit) return;

    setError("");
    setAnswer(null);
    setLoading(true);

    try {
      const result = await askAssistant({
        subject,
        topic,
        question: question.trim(),
      });

      setAnswer(result);
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSuggestion(text) {
    setQuestion(text);
    setAnswer(null);
    setError("");
  }

  return (
    <section className="tutor-workspace">
      {/* Workspace heading */}
      <div className="tutor-heading">
        <div>
          <div className="workspace-label tutor-label">
            <span className="workspace-dot tutor-dot" />
            AI LEARNING WORKSPACE
          </div>

          <h2>Learn with AI</h2>

          <p>
            Ask questions, clarify concepts, and explore your experiment
            with an AI tutor powered by IBM Granite and RAG.
          </p>
        </div>

        <div className="tutor-heading-icon">✦</div>
      </div>

      {/* Current context */}
      <div className="tutor-context">
        <div className="context-icon">🧪</div>

        <div>
          <span className="context-label">CURRENT LAB CONTEXT</span>

          {hasContext ? (
            <strong>
              {[subject, topic].filter(Boolean).join("  ·  ")}
            </strong>
          ) : (
            <strong>No experiment selected</strong>
          )}
        </div>

        <div className="context-ai">
          <span>✦</span>
          Granite + RAG
        </div>
      </div>

      {/* Main tutor panel */}
      <div className="tutor-panel">
        <div className="tutor-panel-top">
          <div className="tutor-brand">
            <div className="tutor-avatar">✦</div>

            <div>
              <strong>LabGenie AI Tutor</strong>
              <span>Ask anything about your lab topic</span>
            </div>
          </div>

          <div className="tutor-online">
            <span />
            AI READY
          </div>
        </div>

        <div className="tutor-panel-body">
          {/* Suggestions */}
          <div className="suggestion-section">
            <div className="suggestion-heading">
              <span>TRY ASKING</span>
              <small>Quick questions</small>
            </div>

            <div className="suggestion-grid">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className={`suggestion-card ${
                    question === suggestion ? "selected" : ""
                  }`}
                  onClick={() => handleSuggestion(suggestion)}
                >
                  <span className="suggestion-icon">→</span>
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question input */}
          <form onSubmit={handleAsk} className="tutor-form">
            <label htmlFor="tutor-question">
              Your question
            </label>

            <div className="tutor-input-area">
              <textarea
                id="tutor-question"
                placeholder="Ask something about your experiment..."
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  setError("");
                  setAnswer(null);
                }}
                rows={4}
                disabled={loading}
              />

              <button
                type="submit"
                className="tutor-ask-button"
                disabled={!canSubmit}
              >
                {loading ? (
                  <>
                    <span className="tutor-spinner" />
                    Thinking...
                  </>
                ) : (
                  <>
                    Ask Granite
                    <span>→</span>
                  </>
                )}
              </button>
            </div>

            <div className="tutor-input-footer">
              <span>
                ✦ Answers are generated using IBM Granite
              </span>

              <span>
                {question.length} characters
              </span>
            </div>
          </form>

          {/* Error */}
          {error && (
            <div className="tutor-error">
              <span>⚠</span>
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Answer */}
      {answer && (
        <div className="tutor-answer">
          <div className="answer-topbar">
            <div className="answer-title">
              <div className="answer-avatar">✦</div>

              <div>
                <strong>Granite's Answer</strong>
                <span>AI-generated learning response</span>
              </div>
            </div>

            <div className="answer-badge">
              ✓ ANSWERED
            </div>
          </div>

          {answer.retrievedSources &&
            answer.retrievedSources.length > 0 && (
              <div className="answer-sources">
                <span>⌕</span>

                <div>
                  <strong>RAG knowledge used</strong>
                  <span>
                    {answer.retrievedSources.join(", ")}
                  </span>
                </div>
              </div>
            )}

          <div className="answer-body">
            <p>{answer.answer}</p>
          </div>
        </div>
      )}

      {/* Feature strip */}
      <div className="tutor-features">
        <div>
          <span className="tutor-feature-icon blue">✦</span>
          <div>
            <strong>IBM Granite</strong>
            <small>Powered by watsonx.ai</small>
          </div>
        </div>

        <div>
          <span className="tutor-feature-icon purple">⌕</span>
          <div>
            <strong>RAG Knowledge</strong>
            <small>Grounded in curated lab content</small>
          </div>
        </div>

        <div>
          <span className="tutor-feature-icon teal">✓</span>
          <div>
            <strong>Learning Focused</strong>
            <small>Clear answers for students</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiLabAssistant;