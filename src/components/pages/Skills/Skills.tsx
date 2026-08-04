import { useState } from "react";
import { PenTool, Code2, FileCode2, FileType2, Braces, MousePointer2, Layers, Monitor, ClipboardCheck, Users, LayoutGrid, LogIn } from "lucide-react";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { SkillBar } from "@/components/SkillBar/SkillBar";
import "./Skills.css";

const designSkills = [
  { icon: Users, label: "User Research", value: 90 },
  { icon: LayoutGrid, label: "Wireframing", value: 90 },
  { icon: Monitor, label: "UI Design", value: 95 },
  { icon: LogIn, label: "Prototyping", value: 90 },
  { icon: MousePointer2, label: "Interaction Design", value: 85 },
  { icon: Layers, label: "Design Systems", value: 90 },
  { icon: Monitor, label: "Responsive Design", value: 95 },
  { icon: ClipboardCheck, label: "Usability Testing", value: 85 },
];

const devSkills = [
  { icon: FileCode2, label: "HTML", value: 95 },
  { icon: FileType2, label: "CSS", value: 92 },
  { icon: Braces, label: "JavaScript", value: 90 },
  { icon: Code2, label: "React", value: 88 },
  { icon: Code2, label: "Bootstrap", value: 90 },
];

const designTools = [
  { name: "Figma", color: "#F24E1E" },
  { name: "Adobe XD", color: "#FF61F6" },
  { name: "Illustrator", color: "#FF9A00" },
  { name: "Photoshop", color: "#31A8FF" },
];

const devTools = [{ name: "VS Code", color: "#007ACC" }];

// Pad to always match the longest list (8 items) so the grid never reflows
const MAX_SKILLS = Math.max(designSkills.length, devSkills.length);
function padSkills(arr: typeof designSkills) {
  const padded = [...arr];
  while (padded.length < MAX_SKILLS) padded.push({ icon: Monitor, label: `__placeholder_${padded.length}`, value: 0 });
  return padded;
}

const paddedDesign = padSkills(designSkills);
const paddedDev = padSkills(devSkills);

export function Skills() {
  const [tab, setTab] = useState<"design" | "dev">("design");
  const skills = tab === "design" ? paddedDesign : paddedDev;
  const tools = tab === "design" ? designTools : devTools;

  return (
    <div className="page-section skills-page">
      <div className="skills-head">
        <PageHeader badge="My Skills" titleStart="My" titleAccent="Skills" align="left" />
        <div className="skills-tabs">
          <button className={`tab ${tab === "design" ? "is-active" : ""}`} onClick={() => setTab("design")}>
            <PenTool size={16} /> Design
          </button>
          <button className={`tab ${tab === "dev" ? "is-active" : ""}`} onClick={() => setTab("dev")}>
            <Code2 size={16} /> Development
          </button>
        </div>
      </div>

      <section className="skills-section">
        <div className="skills-section-head">
          <span className="skills-section-icon">{tab === "design" ? <PenTool size={16} /> : <Code2 size={16} />}</span>
          <h2 className="skills-section-title accent">{tab === "design" ? "Design Skills" : "Development Skills"}</h2>
          <span className="skills-section-dash" />
        </div>
        <div className="skills-grid" key={tab}>
          {skills.map((s, idx) =>
            s.label.startsWith("__placeholder") ? (
              <div key={s.label} className="skill-bar-placeholder" aria-hidden="true" />
            ) : (
              <SkillBar key={s.label} {...s} delay={idx * 80} />
            )
          )}
        </div>
      </section>

      <section className="skills-section">
        <div className="skills-section-head">
          <span className="skills-section-icon">🛠</span>
          <h2 className="skills-section-title accent">{tab === "design" ? "Design Tools" : "Development Tools"}</h2>
          <span className="skills-section-dash" />
        </div>
        <div className="tools-row" key={`tools-${tab}`}>
          {tools.map((t) => (
            <div key={t.name} className="tool-chip">
              <span className="tool-badge" style={{ background: t.color }}>{t.name[0]}</span>
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
