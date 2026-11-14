import { useRef } from "react";
import { useTunnelEntrance } from "../hooks/useTunnelEntrance";
import { useReveal } from "../hooks/useReveal";
import SectionHeading from "../components/ui/SectionHeading";

/**
 * Acto 3 — Sobre mí. Plano inmersivo oscuro que entra en profundidad (túnel Z).
 */
export default function About() {
  const ref = useRef<HTMLElement>(null);
  useTunnelEntrance(ref);
  useReveal(ref, ".about-reveal", { y: 34, stagger: 0.14, duration: 0.9 });

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className="relative bg-depth py-28 text-bone"
      aria-label="Sobre mí"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-16">
        <SectionHeading
          index="02"
          label="Acto III — Enfoque"
          title="Sobre mí"
        />

        <div className="space-y-6 text-bone/80 leading-relaxed">
          <p className="about-reveal text-lg text-bone">
            Soy Yefri, desarrollador de software de Villavicencio, Colombia.
            Actualmente me formo como estudiante de desarrollo de software con
            enfoque en sistemas y redes, y dedico mi tiempo a construir
            proyectos reales que resuelven problemas concretos.
          </p>
          <p className="about-reveal">
            Me enfoco en el desarrollo web frontend y fullstack, aplicaciones
            móviles y la integración de servicios. Disfruto el proceso
            completo: desde modelar la solución hasta pulir el último detalle
            de la interfaz.
          </p>
          <p className="about-reveal">
            Mi filosofía de trabajo: código limpio, arquitectura escalable y
            atención al detalle visual. Creo que el software bien diseñado se
            nota — por dentro y por fuera.
          </p>

          <div className="about-reveal flex flex-wrap gap-x-8 gap-y-3 pt-4 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
            <span>Frontend / Fullstack</span>
            <span>Apps móviles</span>
            <span>Integración de servicios</span>
          </div>
        </div>
      </div>
    </section>
  );
}
