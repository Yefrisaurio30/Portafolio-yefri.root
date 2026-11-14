import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "ghost-dark";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-bone text-void hover:bg-white",
  dark: "bg-graphite text-paper hover:bg-black",
  ghost: "border border-bone/30 text-bone hover:border-bone",
  "ghost-dark": "border border-graphite/30 text-graphite hover:border-graphite",
};

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  ariaLabel,
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${VARIANTS[variant]} ${className}`;

  if (href) {
    const externalProps = external
      ? { target: "_blank" as const, rel: "noreferrer noopener" }
      : {};
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        {...externalProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
