function Footer() {
  return (
    <footer className="app-footer">
      <p>
        <strong>LabGenie AI</strong> &mdash; IBM SkillsBuild / AICTE Internship Project
      </p>
      <p style={{ marginTop: "4px" }}>
        Powered by{" "}
        <strong style={{ color: "var(--blue, #2563EB)" }}>IBM Granite</strong>
        {" "}·{" "}
        <strong style={{ color: "var(--purple, #7C3AED)" }}>watsonx.ai</strong>
        {" "}·{" "}
        <strong style={{ color: "var(--teal, #0D9488)" }}>RAG</strong>
      </p>
    </footer>
  );
}

export default Footer;
