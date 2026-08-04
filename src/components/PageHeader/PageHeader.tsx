import { SectionBadge } from "../SectionBadge/SectionBadge";
import "./PageHeader.css";

interface Props { badge: string; titleStart: string; titleAccent: string; titleEnd?: string; align?: "left" | "center"; }

export function PageHeader({ badge, titleStart, titleAccent, titleEnd = "", align = "center" }: Props) {
  return (
    <header className={`page-header page-header--${align}`}>
      <SectionBadge label={badge} align={align} />
      <h1 className="page-header-title">
        {titleStart} <span className="accent">{titleAccent}</span> {titleEnd}
      </h1>
    </header>
  );
}
