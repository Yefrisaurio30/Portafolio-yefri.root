import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "../lib/gsap-setup";
import { sceneState } from "../lib/scene-state";
import { useReducedMotion } from "../hooks/useReducedMotion";
import Button from "../components/ui/Button";
import { profile } from "../data/profile";

interface HeroProps {
  ready: boolean;
}

export default function Hero({ ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Coreografía de salida por scroll (zoom & morph hacia la galería)
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=90%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Sincroniza la escena WebGL con el progreso existente
            onUpdate: (self) => {
              sceneState.hero = self.progress;
            },
          },
        })
        .to(".hero-grid", { scale: 1.4, opacity: 0, ease: "none" }, 0)
        .to(
          ".hero-content",
          { scale: 0.82, y: -40, opacity: 0, ease: "none" },
          0
        )
        .to(".hero-meta", { opacity: 0, ease: "none" }, 0);
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  // Entrada cinematográfica tras el preloader
  useEffect(() => {
    if (reduced || !ready) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.1 })
        .from(".hero-line", {
          yPercent: 120,
          duration: 1.1,
          stagger: 0.14,
          ease: "power4.out",
        })
        .from(
          ".hero-fade",
          { y: 34, opacity: 0, duration: 0.9, stagger: 0.09, ease: "power3.out" },
          "-=0.55"
        );
      // Indicador de scroll flotando
      gsap.to(".hero-scroll-hint", {
        y: 8,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, ready]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative h-screen overflow-hidden text-bone"
      aria-label="Presentación"
    >
      <div className="hero-grid grid-stage" aria-hidden="true" />

      <div className="hero-content relative z-10 flex h-full max-w-6xl flex-col items-start justify-center gap-7 px-6 sm:px-10 lg:px-16">
        <p className="hero-fade font-mono text-xs tracking-[0.35em] text-muted uppercase">
          {profile.displayName} — Portafolio personal
        </p>

        <h1 className="font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.95] font-bold tracking-tight">
          <span className="block overflow-hidden">
            <span className="hero-line block">SOFTWARE</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line text-outline text-shimmer block">
              DEVELOPER
              <span
                className="blink ml-[0.08em] inline-block h-[0.72em] w-[0.06em] translate-y-[0.06em] bg-accent-bright align-baseline"
                aria-hidden="true"
              />
            </span>
          </span>
        </h1>

        <p className="hero-fade max-w-xl text-lg text-bone/85 sm:text-xl">
          Construyo experiencias digitales y soluciones de software.
        </p>

        <p className="hero-fade max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Soy Yefri, desarrollador de software enfocado en crear productos
          digitales funcionales, soluciones tecnológicas y experiencias web
          bien diseñadas.
        </p>

        <div className="hero-fade mt-2 flex flex-wrap items-center gap-4">
          <Button href="#proyectos" variant="primary">
            Explorar proyectos
          </Button>
          <Button href="#contacto" variant="ghost">
            Contactarme
          </Button>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="lift arrow-bounce inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-muted hover:text-accent"
          >
            @{profile.githubUsername}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="hero-meta absolute right-0 bottom-8 left-0 z-10 flex items-center justify-between px-6 font-mono text-[11px] tracking-[0.25em] text-bone/40 uppercase sm:px-10 lg:px-16">
        <span>{profile.location}</span>
        <span className="hero-scroll-hint inline-block">Desliza ↓</span>
      </div>
    </section>
  );
}
