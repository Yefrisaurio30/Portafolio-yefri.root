import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap-setup";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const PHRASE = "SELECTED WORK — PROYECTOS DESTACADOS — ";

/**
 * Cinta marquee editorial: avanza en loop y su velocidad/dirección
 * reacciona a la velocidad del scroll del usuario.
 */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 18,
      ease: "none",
      repeat: -1,
    });

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const v = self.getVelocity();
        const target = v === 0 ? 1 : gsap.utils.clamp(-3, 3, v / 350);
        gsap.to(tween, {
          timeScale: target,
          duration: 0.4,
          overwrite: true,
        });
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, [reduced]);

  return (
    <div
      className="overflow-hidden border-y border-black/10 bg-accent py-3 text-white"
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex w-max whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="mx-4 font-display text-xl font-semibold tracking-tight uppercase sm:text-2xl"
              >
                {PHRASE}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
