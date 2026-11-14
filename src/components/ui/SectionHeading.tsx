import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap-setup";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  index,
  label,
  title,
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const toneClasses = tone === "light" ? "text-graphite" : "text-bone";

  // Entrada coreografiada: meta desliza, la regla se dibuja y el título
  // emerge de una máscara; todo se revierte al retroceder el scroll.
  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      };

      gsap.from(".heading-meta", {
        opacity: 0,
        x: -18,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: trigger,
      });

      gsap.from(".heading-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: trigger,
      });

      gsap.from(".heading-title", {
        yPercent: 115,
        duration: 0.95,
        ease: "power4.out",
        scrollTrigger: trigger,
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className={`${toneClasses} ${className}`}>
      <div className="heading-meta mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em]">
        <span
          className={tone === "light" ? "text-accent" : "text-accent-bright"}
        >
          {index}
        </span>
        <span>{label}</span>
        <span className="heading-rule h-px flex-1 origin-left bg-current opacity-20" aria-hidden="true" />
      </div>
      <span className="block overflow-hidden">
        <h2 className="heading-title font-display text-[clamp(2.2rem,5.5vw,4.25rem)] leading-[1.05] font-semibold tracking-tight">
          {title}
        </h2>
      </span>
    </div>
  );
}
