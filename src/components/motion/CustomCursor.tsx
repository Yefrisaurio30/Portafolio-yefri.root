import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap-setup";
import { sceneState } from "../../lib/scene-state";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Punto de cursor decorativo (solo punteros finos / escritorio).
 * Sigue al mouse con easing y se expande sobre elementos interactivos.
 * No reemplaza el cursor nativo.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const dot = ref.current;
    if (!dot || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3" });
    let visible = false;

    const onMove = (event: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.set(dot, { x: event.clientX, y: event.clientY });
        gsap.to(dot, { opacity: 1, duration: 0.3 });
      }
      xTo(event.clientX);
      yTo(event.clientY);
      // Alimenta la deriva de las escenas WebGL
      sceneState.mouseX = event.clientX / window.innerWidth - 0.5;
      sceneState.mouseY = event.clientY / window.innerHeight - 0.5;
    };

    const onOver = (event: MouseEvent) => {
      const interactive = (event.target as HTMLElement).closest(
        "a, button, [role='button']"
      );
      gsap.to(dot, { scale: interactive ? 2.4 : 1, duration: 0.25 });
    };

    const onLeave = () => gsap.to(dot, { opacity: 0, duration: 0.3 });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(dot);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[110] hidden opacity-0 md:block"
    >
      <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bright" />
    </div>
  );
}
