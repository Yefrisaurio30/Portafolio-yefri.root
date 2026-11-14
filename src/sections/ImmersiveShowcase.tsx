import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Eye } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { gsap, ScrollTrigger } from "../lib/gsap-setup";
import { projects } from "../data/projects";
import type { Project } from "../types/portfolio";
import ProjectModal from "../components/ui/ProjectModal";

const N = projects.length;
const STEP = 360 / N;

/**
 * Acto 2 — Selected Work.
 * Tambor cilíndrico 3D de proyectos controlado por scroll (pin + scrub),
 * con caption lateral en vivo, número gigante de fondo, barra de progreso
 * y tarjetas con hover: agrandado + tilt 3D + reset instantáneo al salir.
 */
export default function ImmersiveShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const drumRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const capNameRef = useRef<HTMLHeadingElement>(null);
  const capTagRef = useRef<HTMLParagraphElement>(null);
  const capTechRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const washRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(600);
  const [panelW, setPanelW] = useState(520);
  const [selected, setSelected] = useState<Project | null>(null);
  const reduced = useReducedMotion();

  // Radio del cilindro según el ancho de panel: r = (w/2) / tan(π/n)
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const w =
        vw < 640 ? Math.min(vw * 0.82, 320) : Math.min(vw * 0.52, 520);
      const r = Math.round(w / 2 / Math.tan(Math.PI / N)) + 90;
      setPanelW(Math.round(w));
      setRadius(r);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Recalcula los triggers cuando cambia la geometría del tambor
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [radius, panelW]);

  // Coreografía: rotación del tambor + atenuado + caption en vivo + progreso
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const drum = drumRef.current;
    if (!section || !drum) return;

    const panels = panelRefs.current.filter(
      (p): p is HTMLButtonElement => p !== null
    );
    const half = (N / 2) * STEP;
    const total = (N - 1) * STEP;
    let lastIdx = 0;

    const applyFade = (rotation: number) => {
      const progress = -rotation / total;
      panels.forEach((panel, i) => {
        let a = (i * STEP + rotation) % 360;
        if (a > 180) a -= 360;
        if (a < -180) a += 360;
        const d = Math.min(1, Math.abs(a) / half);
        gsap.set(panel, {
          opacity: 1 - d * 0.85,
          filter: `brightness(${1 - d * 0.6})`,
        });
      });

      const idx = Math.min(N - 1, Math.round(progress * (N - 1)));
      const current = projects[idx];
      if (idx !== lastIdx) {
        lastIdx = idx;
        // La mancha de ambiente muta al tinte del proyecto activo
        if (washRef.current) {
          gsap.to(washRef.current, {
            backgroundColor: current.tint,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
      if (counterRef.current) {
        counterRef.current.textContent = String(idx + 1).padStart(2, "0");
      }
      if (watermarkRef.current) {
        watermarkRef.current.textContent = String(idx + 1).padStart(2, "0");
      }
      if (capNameRef.current) capNameRef.current.textContent = current.name;
      if (capTagRef.current) capTagRef.current.textContent = current.tagline;
      if (capTechRef.current) {
        capTechRef.current.textContent = current.tech.join(" · ");
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const ctx = gsap.context(() => {
      gsap.to(drum, {
        rotateY: -total,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${total}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyFade(-total * self.progress),
        },
      });
      applyFade(0);
    }, section);

    return () => ctx.revert();
  }, [reduced, radius, panelW]);

  // Entrada del encabezado de la galería
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".showcase-head", {
        y: 44,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  // Hover: agrandado suave al entrar, reset INSTANTÁNEO al salir
  const handleEnter = (index: number) => {
    if (reduced) return;
    const inner = innerRefs.current[index];
    if (!inner) return;
    gsap.to(inner, { scale: 1.07, duration: 0.4, ease: "power3.out" });
  };

  // Tilt 3D sutil según la posición del cursor dentro de la tarjeta
  const handleMove = (event: ReactMouseEvent<HTMLButtonElement>, index: number) => {
    if (reduced) return;
    const inner = innerRefs.current[index];
    if (!inner) return;
    const rect = inner.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(inner, {
      rotateY: nx * 10,
      rotateX: -ny * 8,
      transformPerspective: 800,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleLeave = (index: number) => {
    if (reduced) return;
    const inner = innerRefs.current[index];
    if (!inner) return;
    // Reset inmediato, sin transición
    gsap.set(inner, { scale: 1, rotateX: 0, rotateY: 0 });
  };

  const panelCard = (project: Project, index: number, listMode: boolean) => (
    <button
      key={project.id}
      ref={(el) => {
        panelRefs.current[index] = el;
      }}
      type="button"
      onClick={() => setSelected(project)}
      onMouseEnter={() => handleEnter(index)}
      onMouseMove={(event) => handleMove(event, index)}
      onMouseLeave={() => handleLeave(index)}
      aria-label={`Abrir detalles de ${project.name}`}
      className={`text-left ${
        listMode ? "block w-full max-w-3xl" : "panel-3d absolute top-1/2 left-1/2"
      }`}
      style={
        listMode
          ? undefined
          : {
              width: panelW,
              transform: `translate(-50%, -50%) rotateY(${index * STEP}deg) translateZ(${radius}px)`,
            }
      }
    >
      <div
        ref={(el) => {
          innerRefs.current[index] = el;
        }}
        className="group relative flex w-full flex-col border border-graphite/10 bg-white shadow-[0_2px_24px_rgba(17,17,17,0.08)] transition-colors duration-300 hover:border-graphite/35"
      >
        {/* Marcas de esquina editoriales */}
        <span className="pointer-events-none absolute top-2 left-2 z-10 h-3 w-3 border-t-2 border-l-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute top-2 right-2 z-10 h-3 w-3 border-t-2 border-r-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-3 w-3 border-b-2 border-l-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute right-2 bottom-2 z-10 h-3 w-3 border-r-2 border-b-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={`Vista previa de ${project.name}`}
            width={1200}
            height={750}
            loading="lazy"
            className="block aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <span className="absolute top-3 left-3 bg-void/85 px-2 py-1 font-mono text-[11px] text-bone">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute top-3 right-3 border border-graphite/15 bg-paper/90 px-2 py-1 font-mono text-[10px] tracking-wider text-graphite/70 uppercase">
            {project.statusLabel}
          </span>
          {/* Overlay de hover */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-void/0 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-void/40 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-bone uppercase">
              <Eye size={15} aria-hidden="true" className="glow-pulse" />
              Ver proyecto
            </span>
          </div>
        </div>

        <div className="border-t border-graphite/10 px-5 py-4">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-graphite">
              {project.name}
            </h3>
            <span className="font-mono text-[10px] tracking-widest text-graphite/50 uppercase">
              {project.role}
            </span>
          </div>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((item) => (
              <li
                key={item}
                className="chip border border-graphite/15 px-2 py-0.5 font-mono text-[10px] text-graphite/70 hover:text-graphite"
              >
                {item}
              </li>
            ))}
            {project.tech.length > 3 && (
              <li className="px-1 font-mono text-[10px] text-graphite/45">
                +{project.tech.length - 3}
              </li>
            )}
          </ul>
        </div>
      </div>
    </button>
  );

  // Fallback accesible sin motion: flujo vertical sin pin ni transformaciones 3D
  if (reduced) {
    return (
      <section
        id="proyectos"
        className="gallery-wall relative py-24 text-graphite"
        aria-label="Proyectos destacados"
      >
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="mb-14 flex items-baseline justify-between">
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold tracking-tight">
              Selected Work
            </h2>
            <span className="font-mono text-xs text-graphite/50">
              {String(N).padStart(2, "0")} proyectos
            </span>
          </div>
          <ul className="flex flex-col gap-14">
            {projects.map((project, index) => (
              <li key={project.id} className="flex justify-center">
                {panelCard(project, index, true)}
              </li>
            ))}
          </ul>
        </div>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </section>
    );
  }

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="gallery-wall relative h-screen overflow-hidden text-graphite"
      aria-label="Proyectos destacados"
    >
      <div className="relative z-10 flex h-full flex-col px-6 pt-20 sm:px-10 lg:px-16">
        <header className="showcase-head flex items-baseline justify-between border-b border-graphite/10 pb-5">
          <div>
            <p className="mb-1 font-mono text-xs tracking-[0.3em] text-accent">
              02 — ACTO II · GALERÍA 3D
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-none font-semibold tracking-tight">
              Selected Work
            </h2>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm text-graphite tabular-nums">
              <span ref={counterRef}>01</span>
              <span className="text-graphite/40">
                {" "}
                / {String(N).padStart(2, "0")}
              </span>
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-graphite/45 uppercase">
              Scroll para girar
            </p>
          </div>
        </header>

        <div className="relative min-h-0 flex-1">
          {/* Mancha de ambiente: cambia de color con el proyecto activo */}
          <div
            ref={washRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 h-[58vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[90px]"
            style={{ backgroundColor: projects[0].tint }}
          />

          {/* Número gigante del proyecto activo */}
          <span
            ref={watermarkRef}
            aria-hidden="true"
            className="text-outline-dark pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[42vh] leading-none font-bold select-none"
          >
            01
          </span>

          {/* Suelo pulido en perspectiva */}
          <div className="gallery-floor" aria-hidden="true" />

          <div className="drum-viewport absolute inset-0">
            <div ref={drumRef} className="drum absolute inset-0">
              {projects.map((project, index) => panelCard(project, index, false))}
            </div>
          </div>

          {/* Caption lateral en vivo del proyecto activo */}
          <div className="pointer-events-none absolute bottom-8 left-0 z-20 hidden max-w-xs sm:block">
            <p
              ref={capTagRef}
              className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase"
            >
              {projects[0].tagline}
            </p>
            <h3
              ref={capNameRef}
              className="mt-1 font-display text-2xl font-semibold text-graphite"
            >
              {projects[0].name}
            </h3>
            <p
              ref={capTechRef}
              className="mt-1.5 font-mono text-[11px] leading-relaxed text-graphite/55"
            >
              {projects[0].tech.join(" · ")}
            </p>
          </div>

          {/* Barra de progreso del tambor */}
          <div className="absolute right-0 bottom-8 left-0 mx-auto h-px w-44 bg-graphite/15">
            <div
              ref={progressRef}
              className="h-px w-full origin-left scale-x-0 bg-accent"
            />
          </div>
        </div>

        <p className="pb-6 text-center font-mono text-[11px] tracking-[0.25em] text-graphite/45 uppercase">
          Desliza para girar — pasa el cursor para ampliar — clic para ver detalles
        </p>
      </div>

      {/* Grano de película sobre toda la escena */}
      <div className="grain-layer z-30" aria-hidden="true" />

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
