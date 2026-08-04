import "./SectionBadge.css";

interface Props { label: string; align?: "left" | "center"; }

export function SectionBadge({ label, align = "center" }: Props) {
  return (
    <div className={`section-badge section-badge--${align}`}>
      <span className="section-badge-dots">
        <span className="dot dot-white" />
        <span className="dot dot-accent" />
      </span>
      <span className="section-badge-label">{label}</span>
    </div>
  );
}
