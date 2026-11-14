import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import Button from "./Button";
import { GithubIcon } from "./icons";
import { gsap } from "../../lib/gsap-setup";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { Project } from "../../types/portfolio";

const STATUS_TONE: Record<Project["status"], string> = {
  produccion: "border-emerald-700/25 bg-emerald-600/10 text-emerald-800",
  prototipo: "border-amber-700/25 bg-amber-600/10 text-amber-800",
  "en-desarrollo": "border-sky-700/25 bg-sky-600/10 text-sky-800",
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  // Animación de apertura
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".modal-backdrop", { opacity: 0, duration: 0.35 });
      gsap.from(".modal-panel", {
        y: 64,
        scale: 0.96,
        opacity: 0,
        duration: 0.55,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="modal-backdrop absolute inset-0 bg-void/80"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="modal-panel relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto bg-paper text-graphite shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-graphite/10 bg-paper px-6 py-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-graphite/60">
            Proyecto
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalles del proyecto"
            className="p-2 transition-all duration-300 hover:rotate-90 hover:text-accent"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <img
          src={project.image}
          alt={`Vista previa de ${project.name}`}
          width={1200}
          height={750}
          className="block aspect-[16/10] w-full border-b border-graphite/10 object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
        />

        <div className="space-y-6 px-6 py-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3
              id="project-modal-title"
              className="font-display text-3xl font-semibold tracking-tight"
            >
              {project.name}
            </h3>
            <span
              className={`border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${STATUS_TONE[project.status]}`}
            >
              {project.statusLabel}
            </span>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite/50">
            {project.tagline}
          </p>

          <p className="leading-relaxed text-graphite/80">
            {project.description}
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-graphite/50">
                Rol
              </h4>
              <p className="text-sm text-graphite/80">{project.role}</p>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-graphite/50">
                Stack
              </h4>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <li
                    key={item}
                    className="chip border border-graphite/15 px-2.5 py-1 font-mono text-[11px] text-graphite/70 hover:text-graphite"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {(project.demoUrl || project.repoUrl) && (
            <div className="flex flex-wrap gap-3 border-t border-graphite/10 pt-6">
              {project.demoUrl && (
                <Button href={project.demoUrl} variant="dark" external>
                  Ver demo <ExternalLink size={14} aria-hidden="true" />
                </Button>
              )}
              {project.repoUrl && (
                <Button href={project.repoUrl} variant="ghost-dark" external>
                  Repositorio <GithubIcon size={14} />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
