import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap-setup";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[80] h-[2px] w-full origin-left scale-x-0 bg-accent"
      aria-hidden="true"
    />
  );
}
