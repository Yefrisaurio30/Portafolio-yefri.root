import { useRef } from "react";
import { useTunnelEntrance } from "../hooks/useTunnelEntrance";
import { useReveal } from "../hooks/useReveal";
import SectionHeading from "../components/ui/SectionHeading";
import { techGroups } from "../data/technologies";

/**
 * Acto 3 — Tecnologías. Categorías limpias, sin barras de porcentaje.
 */
export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  useTunnelEntrance(ref);
  useReveal(ref, ".tech-group", { y: 56, stagger: 0.12, duration: 0.9 });
  // Los chips entran uno a uno como fichas de dominó
  useReveal(ref, ".tech-chip", { y: 14, stagger: 0.035, duration: 0.5 });
  // Cada línea superior se dibuja de izquierda a derecha
  useReveal(ref, ".tech-line", { y: 0, scaleX: 0, origin: "left center", stagger: 0.1, duration: 0.7 });

  return (
    <section
      id="tecnologias"
      ref={ref}
      className="relative bg-depth py-28 text-bone"
      aria-label="Tecnologías"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
          index="03"
          label="Acto III — Herramientas"
          title="Tecnologías"
          className="mb-16"
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {techGroups.map((group) => (
            <div
              key={group.category}
              className="tech-group group pt-5"
            >
              <div
                className="tech-line h-px w-full origin-left bg-bone/10 transition-colors duration-500 group-hover:bg-accent-bright/60"
                aria-hidden="true"
              />
              <h3 className="mb-4 mt-5 font-mono text-xs tracking-[0.25em] text-accent-bright uppercase transition-transform duration-300 group-hover:translate-x-1.5">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="tech-chip chip cursor-default border border-bone/15 px-3 py-1.5 font-mono text-xs text-bone/75 hover:text-bone"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
