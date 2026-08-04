import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, PenTool, Clock } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import "./Projects.css";

export const projects = [
  { id: "neobase",            name: "NeoBase",            subtitle: "Investment Platform", role: "UX/UI Designer", duration: "3 Months", tags: ["FinTech", "Dashboard", "Responsive"], color: "#7c3aed" },
  { id: "100-days-lifestyle", name: "100 Days Lifestyle", subtitle: "Wellness Challenge",  role: "UX/UI Designer", duration: "2 Months", tags: ["Lifestyle", "Mobile", "iOS"],         color: "#10b981" },
  { id: "techneat",           name: "TechNeat",           subtitle: "SaaS Dashboard",      role: "UX/UI Designer", duration: "3 Months", tags: ["SaaS", "Web", "Dashboard"],           color: "#f59e0b" },
  { id: "eventro",            name: "Eventro",            subtitle: "Event Management",    role: "UX/UI Designer", duration: "4 Months", tags: ["Events", "Mobile", "Web"],            color: "#ef4444" },
  { id: "novaride",           name: "NovaRide",           subtitle: "Ride Sharing",        role: "UX/UI Designer", duration: "4 Months", tags: ["Mobile", "Maps", "Realtime"],         color: "#06b6d4" },
];

export function Projects() {
  const [active, setActive] = useState(0);

  const next = () => setActive((a) => (a + 1) % projects.length);
  const prev = () => setActive((a) => (a - 1 + projects.length) % projects.length);

  const p = projects[active];

  return (
    <div className="page-section projects-page">
      <div className="skills-head">
        <PageHeader badge="My Projects" titleStart="My" titleAccent="Projects" align="left" />
      </div>

      <div className="projects-carousel">
        <button className="carousel-arrow" onClick={prev} aria-label="Previous">
          <ChevronLeft size={22} />
        </button>

        <div className="projects-track">
          {projects.map((project, idx) => {
            const isActive = idx === active;
            return (
              <article
                key={project.id}
                className={`project-card ${isActive ? "project-card--active" : "project-card--inactive"}`}
                style={{ "--card-color": project.color } as React.CSSProperties}
                onClick={() => !isActive && setActive(idx)}
                aria-label={project.name}
              />
            );
          })}
        </div>

        <button className="carousel-arrow" onClick={next} aria-label="Next">
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Meta strip */}
      <div className="projects-meta">
        <div className="pm-block">
          <h3 className="pm-name">{p.name}</h3>
          <p className="pm-sub">{p.subtitle}</p>
        </div>
        <div className="pm-block pm-block--icon">
          <span className="pm-icon"><PenTool size={16} /></span>
          <div><p className="pm-label">Role</p><p className="pm-value">{p.role}</p></div>
        </div>
        <div className="pm-block pm-block--icon">
          <span className="pm-icon"><Clock size={16} /></span>
          <div><p className="pm-label">Duration</p><p className="pm-value">{p.duration}</p></div>
        </div>
        <div className="pm-tags">
          {p.tags.map((t) => <span key={t} className="pm-tag">{t}</span>)}
        </div>
        <Link to="/projects/$id" params={{ id: p.id }}>
          <Button variant="primary">View Case Study</Button>
        </Link>
      </div>
    </div>
  );
}
