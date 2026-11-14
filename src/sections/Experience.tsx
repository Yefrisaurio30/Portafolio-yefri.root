import { useRef } from "react";
import { useTunnelEntrance } from "../hooks/useTunnelEntrance";
import { useReveal } from "../hooks/useReveal";
import SectionHeading from "../components/ui/SectionHeading";

/**
 * Acto 3 — Formación y experiencia.
 * Solo información confirmada: formación en curso, hackathons y proyectos.
 */
const ENTRIES = [
  {
    period: "En curso",
    title: "Estudiante de Desarrollo de Software",
    detail:
      "Formación en desarrollo de software con enfoque en sistemas y redes.",
  },
  {
    period: "2026",
    title: "Hackathon Alcaldía de Villavicencio",
    detail:
      "Participación en equipo con VibraLink, plataforma de bienestar juvenil.",
  },
  {
    period: "2025 — 2026",
    title: "Proyectos académicos y personales",
    detail:
      "Desarrollo de proyectos web, móviles y backend: e-commerce, sistemas fullstack y despliegues en la nube.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  useTunnelEntrance(ref);
  useReveal(ref, ".exp-row", { y: 48, stagger: 0.14, duration: 0.9 });

  return (
    <section
      id="experiencia"
      ref={ref}
      className="relative bg-depth py-28 text-bone"
      aria-label="Formación y experiencia"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
          index="04"
          label="Acto III — Trayectoria"
          title="Formación y experiencia"
          className="mb-16"
        />

        <ul>
          {ENTRIES.map((entry, index) => (
            <li
              key={entry.title}
              className="exp-row row-hover group grid gap-2 border-t border-bone/10 py-7 sm:grid-cols-[140px_1fr_auto] sm:items-baseline sm:gap-8"
            >
              <span className="font-mono text-xs tracking-[0.2em] text-accent-bright uppercase transition-colors duration-300">
                {entry.period}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent-bright">
                  {entry.title}
                </h3>
                <p className="mt-1 text-sm text-bone/70 transition-colors duration-300 group-hover:text-bone/90">{entry.detail}</p>
              </div>
              <span className="hidden font-mono text-xs text-bone/30 transition-colors duration-300 group-hover:text-accent-bright sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
