import { useEffect, type RefObject } from "react";
import { gsap } from "../lib/gsap-setup";
import { useReducedMotion } from "./useReducedMotion";

interface RevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  stagger?: number;
  start?: string;
  duration?: number;
}

/**
 * Revelado por scroll de los descendientes que coincidan con `selector`.
 * Al avanzar entra en escena con stagger; al retroceder sale exactamente
 * al revés (toggleActions: play none none reverse).
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  selector: string,
  options: RevealOptions = {}
) {
  const {
    y = 40,
    x = 0,
    scale = 1,
    stagger = 0.08,
    start = "top 85%",
    duration = 0.8,
  } = options;
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      const targets = root.querySelectorAll(selector);
      if (!targets.length) return;
      gsap.from(targets, {
        y,
        x,
        scale,
        opacity: 0,
        stagger,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [ref, reduced, selector, y, x, scale, stagger, start, duration]);
}
