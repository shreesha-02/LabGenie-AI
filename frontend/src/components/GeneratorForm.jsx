import { useState } from "react";

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

function GeneratorForm({ onGenerate, loading, error }) {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");

  function handleSubmit(e) {
    e.preventDefault();
    if (!subject.trim() || !topic.trim()) return;

    onGenerate({
      subject: subject.trim(),
      topic: topic.trim(),
      difficulty,
    });
  }

  const canSubmit = subject.trim() && topic.trim() && !loading;

  return (
    <section className="generator-section">
      <div className="workspace-label">
        <span className="workspace-dot" />
        LAB MANUAL GENERATOR
      </div>

      <div className="generator-card">
        <div className="generator-heading">
          <div>
            <p className="eyebrow">CREATE YOUR EXPERIMENT</p>
            <h2>What do you want to learn?</h2>
            <p className="generator-description">
              Enter your subject and experiment topic. LabGenie will generate
              a structured laboratory manual tailored to your difficulty level.
            </p>
          </div>

          <div className="generator-icon">
            ✦
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="subject">
                <span className="label-icon">📚</span>
                Subject
              </label>

              <input
                id="subject"
                type="text"
                placeholder="e.g. Data Structures"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={loading}
                required
              />

              <span className="input-hint">
                Enter your course or subject name
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">
                <span className="label-icon">◈</span>
                Difficulty Level
              </label>

              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                disabled={loading}
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <span className="input-hint">
                Choose the complexity of your manual
              </span>
            </div>

            <div className="form-group full-width">
              <label htmlFor="topic">
                <span className="label-icon">🧪</span>
                Experiment / Topic
              </label>

              <input
                id="topic"
                type="text"
                placeholder="e.g. Bubble Sort Algorithm"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={loading}
                required
              />

              <span className="input-hint">
                Be specific for more focused results
              </span>
            </div>
          </div>

          <div className="generator-footer">
            <div className="generator-tech">
              <span>✦</span>
              IBM Granite
              <span className="tech-separator">·</span>
              RAG-enhanced
            </div>

            <button
              type="submit"
              className="btn-generate"
              disabled={!canSubmit}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Generating your manual...
                </>
              ) : (
                <>
                  <span>⚡</span>
                  Generate Lab Manual
                  <span className="button-arrow">→</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="error-msg" role="alert">
              ⚠ {error}
            </div>
          )}
        </form>
      </div>

      <div className="generator-features">
        <div className="feature-item">
          <span className="feature-icon blue">✦</span>
          <div>
            <strong>AI Generated</strong>
            <span>Powered by IBM Granite</span>
          </div>
        </div>

        <div className="feature-item">
          <span className="feature-icon purple">⌕</span>
          <div>
            <strong>RAG Enhanced</strong>
            <span>Uses curated lab knowledge</span>
          </div>
        </div>

        <div className="feature-item">
          <span className="feature-icon teal">✓</span>
          <div>
            <strong>Ready to Learn</strong>
            <span>Manual, viva &amp; rubric included</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GeneratorForm;