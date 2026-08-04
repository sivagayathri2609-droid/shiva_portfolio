import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { animateNumber, animateWidth, onEnterViewport } from "@/hooks/use-animations";
import "./SkillBar.css";

interface Props {
  icon: LucideIcon;
  label: string;
  value: number;
  delay?: number; // stagger delay in ms
}

export function SkillBar({ icon: Icon, label, value, delay = 0 }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;

    fill.style.width = "0%";

    const cleanup = onEnterViewport(root, () => {
      setVisible(true);
      const DURATION = 1100;
      const c1 = animateNumber(value, DURATION, setDisplayValue, delay);
      const c2 = animateWidth(fill, value, DURATION, delay);
      return () => { c1(); c2(); };
    });

    return cleanup;
  }, [value, delay]);

  return (
    <div ref={rootRef} className={`skill-bar ${visible ? "skill-bar--visible" : ""}`}>
      <span className="skill-bar-icon"><Icon size={18} /></span>
      <span className="skill-bar-label">{label}</span>
      <div className="skill-bar-track">
        <div ref={fillRef} className="skill-bar-fill" />
      </div>
      <span className="skill-bar-value">{displayValue}%</span>
    </div>
  );
}
