import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap-setup";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Parallax sutil de una capa reactivo al movimiento del mouse.
 * `depth` en px; negativo invierte la dirección.
 */
export function useMouseParallax<T extends HTMLElement>(depth = 20) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

    const onMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      xTo(nx * depth);
      yTo(ny * depth);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.killTweensOf(el);
    };
  }, [depth, reduced]);

  return ref;
}
