import { Link, useRouterState } from "@tanstack/react-router";
import { Home, User, Code2, Briefcase, Star, Mail } from "lucide-react";
import "./Sidebar.css";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About Me", icon: User },
  { to: "/skills", label: "Skills", icon: Code2 },
  { to: "/projects", label: "Projects", icon: Briefcase },
  { to: "/reviews", label: "Reviews", icon: Star },
  { to: "/contact", label: "Contact", icon: Mail },
];

export function Sidebar() {
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">SG</div>
      <nav className="sidebar-nav">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <Link key={to} to={to} className={`sidebar-item${active ? " is-active" : ""}`}>
              <span className="sidebar-icon"><Icon size={18} strokeWidth={2} /></span>
              <span className="sidebar-label">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
