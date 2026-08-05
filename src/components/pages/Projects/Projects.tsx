import { useState, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, PenTool, Clock } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import banner1 from "@/assets/pro_banner1.png";
import banner2 from "@/assets/pro_banner2.png";
import banner3 from "@/assets/pro_banner3.png";
import banner4 from "@/assets/pro_banner4.png";
import banner5 from "@/assets/pro_banner5.png";
import "./Projects.css";

export const projects = [
  { id: "neobase",            name: "NeoBase",            subtitle: "Investment Platform", role: "UX/UI Designer", duration: "6 Months", tags: ["FinTech", "Dashboard", "Responsive"], color: "#7A40DE", image: banner1 },
  { id: "100-days-lifestyle", name: "Mythrey", subtitle: "Wellness Challenge",  role: "UX/UI Designer", duration: "1 Months", tags: ["Lifestyle", "Mobile", "iOS"],         color: "#22C55E", image: banner2 },
  { id: "techneat",           name: "TechNeat",           subtitle: "SaaS Dashboard",      role: "UX/UI Designer", duration: "3 Months", tags: ["SaaS", "Web", "Dashboard"],           color: "#f59e0b", image: banner3 },
  { id: "eventro",            name: "Eventro",            subtitle: "Event Management",    role: "UX/UI Designer", duration: "4 Months", tags: ["Events", "Mobile", "Web"],            color: "#ef4444", image: banner4 },
  { id: "novaride",           name: "NovaRide",           subtitle: "Ride Sharing",        role: "UX/UI Designer", duration: "4 Months", tags: ["Mobile", "Maps", "Realtime"],         color: "#165B9A", image: banner5 },
];

const ANIM_DURATION = 820; // ms — lock duration matches CSS

export function Projects() {
  const [active, setActive] = useState(0);
  const [prev2, setPrev2] = useState<number | null>(null); // previously active index
  const animating = useRef(false);

  // Drag / swipe
  const dragStart = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    if (animating.current) return;
    animating.current = true;
    setPrev2(active);
    setActive(next);
    setTimeout(() => {
      animating.current = false;
      setPrev2(null);
    }, ANIM_DURATION);
  }, [active]);

  const goNext = useCallback(() => go((active + 1) % projects.length), [go, active]);
  const goPrev = useCallback(() => go((active - 1 + projects.length) % projects.length), [go, active]);

  const onPointerDown = (e: React.PointerEvent) => { dragStart.current = e.clientX; };
  const onPointerUp   = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > 48) delta < 0 ? goNext() : goPrev();
  };

  const p = projects[active];

  return (
    <div className="page-section projects-page">
      <div className="skills-head">
        <PageHeader badge="My Projects" titleStart="My" titleAccent="Projects" align="left" />
      </div>

      <div
        className="projects-carousel"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <button className="carousel-arrow" onClick={goPrev} aria-label="Previous">
          <ChevronLeft size={22} />
        </button>

        <div className="projects-track">
          {projects.map((project, idx) => {
            const isActive  = idx === active;
            const wasActive = idx === prev2;

            let stateClass = "project-card--inactive";
            if (isActive)  stateClass = "project-card--active";
            if (wasActive) stateClass = "project-card--leaving";

            return (
              <article
                key={project.id}
                className={`project-card ${stateClass}`}
                style={{ "--card-color": project.color } as React.CSSProperties}
                onClick={() => !isActive && go(idx)}
                aria-label={project.name}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-card-image"
                  draggable={false}
                />
              </article>
            );
          })}
        </div>

        <button className="carousel-arrow" onClick={goNext} aria-label="Next">
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
