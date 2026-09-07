function Header({ activePage, onNavigate }) {
  return (
    <header className="app-header">
      {/* Navigation */}
      <div className="nav-bar">
        <button
          className="nav-brand"
          onClick={() => onNavigate("generate")}
          aria-label="Go to LabGenie AI home"
        >
          <span className="nav-brand-mark">✦</span>

          <span>
            <span className="brand-lab">Lab</span>
            <span className="brand-genie">Genie</span>
            <span className="nav-brand-ai"> AI</span>
          </span>
        </button>

        <nav className="main-nav" aria-label="Main navigation">
          <button
            className={`nav-link ${
              activePage === "generate" ? "active" : ""
            }`}
            onClick={() => onNavigate("generate")}
          >
            <span>✦</span>
            Generate
          </button>

          <button
            className={`nav-link ${
              activePage === "tutor" ? "active" : ""
            }`}
            onClick={() => onNavigate("tutor")}
          >
            <span>🤖</span>
            AI Tutor
          </button>

          <button
            className={`nav-link ${
              activePage === "virtual-lab" ? "active" : ""
            }`}
            onClick={() => onNavigate("virtual-lab")}
          >
            <span>🧪</span>
            Virtual Lab
          </button>
        </nav>
      </div>

      {/* Hero only belongs to Generate workspace */}
      {activePage === "generate" && (
        <div className="header-hero">
          <div className="header-badge">
            <span>⚗</span>
            IBM SkillsBuild · AICTE Internship
          </div>

          <h1>
            Your AI Lab
            <br />
            <span className="brand-lab">Companion</span>
          </h1>

          <p className="header-tagline">
            Generate. Experiment. Learn.
          </p>

          <p className="header-sub">
            Create structured lab manuals, explore interactive experiments,
            and learn with AI — powered by{" "}
            <strong className="header-granite">IBM Granite</strong>{" "}
            and{" "}
            <strong className="header-rag">RAG</strong>.
          </p>

          <div className="hero-actions">
            <button
              className="hero-action primary"
              onClick={() => onNavigate("generate")}
            >
              ✦ Generate a Lab Manual
            </button>

            <button
              className="hero-action secondary"
              onClick={() => onNavigate("virtual-lab")}
            >
              🧪 Explore Virtual Lab
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;