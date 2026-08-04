import { ArrowRight } from "lucide-react";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import "./Button.css";

type Variant = "primary" | "ghost" | "outline";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: boolean;
  children: ReactNode;
}

export function Button({ variant = "primary", icon = true, children, className = "", ...rest }: Props) {
  return (
    <button className={`btn btn--${variant} ${className}`} {...rest}>
      <span className="btn-label">{children}</span>
      {icon && (
        <span className="btn-icon">
          <ArrowRight size={16} strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
}
