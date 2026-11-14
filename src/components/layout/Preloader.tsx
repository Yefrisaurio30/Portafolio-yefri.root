import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap-setup";

interface PreloaderProps {
  onDone: () => void;
}

export default function Preloader({ onDone }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const proxy = { p: 0 };

    const tl = gsap.timeline({ onComplete: onDone });

    tl.to(proxy, {
      p: 100,
      duration: reduced ? 0.3 : 1.2,
      ease: "power2.inOut",
      onUpdate: () => setPct(Math.round(proxy.p)),
    }).to(el, {
      yPercent: -100,
      duration: reduced ? 0.2 : 0.8,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void text-bone"
      aria-hidden="true"
    >
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted">
        Yefri <span className="text-accent">//</span> Software Developer
      </p>
      <p className="mt-6 font-display text-6xl font-semibold tabular-nums">
        {pct}
        <span className="text-2xl text-muted">%</span>
      </p>
      <div className="mt-6 h-px w-48 bg-bone/15">
        <div
          className="h-px bg-accent-bright transition-[width] duration-100 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
