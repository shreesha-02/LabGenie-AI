/**
 * SectionCard.jsx — supports an optional `accent` prop for per-section colour.
 * accent: "blue" | "purple" | "teal" | "amber" | "green" | "indigo"
 */
function SectionCard({ icon, title, children, accent = "blue" }) {
  return (
    <div className={`section-card accent-${accent}`}>
      <div className="section-header">
        <span className="section-icon">{icon}</span>
        <span className="section-title">{title}</span>
      </div>
      <div className="section-body">{children}</div>
    </div>
  );
}

export default SectionCard;
