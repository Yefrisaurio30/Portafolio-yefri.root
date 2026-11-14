import { useEffect } from "react";
import { gsap } from "../lib/gsap-setup";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Entrada tipo "plano en profundidad" (túnel Z): el contenido escala
 * hacia adelante desde translateZ negativo, sincronizado con el scroll.
 */
export function useTunnelEntrance(
  ref: React.RefObject<HTMLElement | null>,
  selector?: string
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      const targets = selector
        ? root.querySelectorAll(selector)
        : [root];
      gsap.fromTo(
        targets,
        { scale: 0.85, opacity: 0, z: -220, transformPerspective: 1000 },
        {
          scale: 1,
          opacity: 1,
          z: 0,
          transformPerspective: 1000,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 90%",
            end: "top 30%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [ref, reduced, selector]);
}
