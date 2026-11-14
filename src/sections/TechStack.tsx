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
              className="tech-group border-t border-bone/10 pt-5"
            >
              <h3 className="mb-4 font-mono text-xs tracking-[0.25em] text-accent-bright uppercase">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-bone/15 px-3 py-1.5 font-mono text-xs text-bone/75"
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
