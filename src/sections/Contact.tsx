import { useEffect, useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { GithubIcon, SocialIcon } from "../components/ui/icons";
import { gsap } from "../lib/gsap-setup";
import { sceneState } from "../lib/scene-state";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMouseParallax } from "../hooks/useMouseParallax";
import { useReveal } from "../hooks/useReveal";
import { profile } from "../data/profile";
import { hasEmail, socialLinks } from "../data/social-links";

/**
 * Acto 3 — Contacto. Escena final inmersiva con parallax reactivo al mouse.
 * Solo se muestran canales confirmados; los PENDIENTE permanecen ocultos.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const layerA = useMouseParallax<HTMLDivElement>(28);
  useReveal(ref, ".contact-reveal", { y: 40, stagger: 0.12, duration: 0.9 });

  useEffect(() => {
    if (reduced) return;
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-inner",
        { scale: 0.85, opacity: 0, z: -220, transformPerspective: 1000 },
        {
          scale: 1,
          opacity: 1,
          z: 0,
          transformPerspective: 1000,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            end: "top 25%",
            scrub: 1,
            invalidateOnRefresh: true,
            // Sincroniza el avance de la cámara WebGL con el scroll
            onUpdate: (self) => {
              sceneState.contact = self.progress;
            },
          },
        }
      );

      // Líneas de acento flotando en loop
      gsap.to(".contact-float-a", {
        x: 40,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".contact-float-b", {
        x: -34,
        y: 18,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const emailAvailable = hasEmail(profile.email);

  return (
    <section
      id="contacto"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden text-bone"
      aria-label="Contacto"
    >
      {/* Capas decorativas con parallax de mouse */}
      <div ref={layerA} className="absolute inset-[-10%]" aria-hidden="true">
        <div
          className="absolute top-[18%] left-[12%] font-mono text-[11px] tracking-[0.3em] text-bone/15 uppercase"
        >
          Z-DEPTH // ACTO 03
        </div>
        <div
          className="absolute right-[14%] bottom-[22%] font-mono text-[11px] tracking-[0.3em] text-bone/15 uppercase"
        >
          OPEN TO WORK
        </div>
        <div className="absolute top-[30%] right-[24%] contact-float-a h-px w-24 bg-accent-bright/40" />
        <div className="absolute bottom-[35%] left-[22%] contact-float-b h-px w-24 bg-accent-bright/40" />
      </div>

      <div className="contact-inner relative z-10 mx-auto max-w-5xl px-6 py-28 sm:px-10 lg:px-16">
        <p className="contact-reveal mb-4 font-mono text-xs tracking-[0.3em] text-accent-bright uppercase">
          05 — Contacto
        </p>
        <h2 className="contact-reveal font-display text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] font-semibold tracking-tight">
          ¿Construimos algo juntos?
        </h2>
        <p className="contact-reveal mt-6 max-w-xl text-bone/75 leading-relaxed">
          Estoy abierto a colaborar en proyectos, prácticas profesionales y
          oportunidades de desarrollo. Escríbeme por los canales disponibles.
        </p>

        <div className="contact-reveal mt-10 flex flex-wrap items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-anim inline-flex items-center gap-3 bg-bone px-6 py-3.5 font-mono text-xs tracking-widest text-void uppercase hover:bg-white"
          >
            <GithubIcon size={16} />
            @{profile.githubUsername}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>

          {socialLinks
            .filter((link) => link.id !== "github")
            .map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-anim inline-flex items-center gap-2 border border-bone/25 px-6 py-3.5 font-mono text-xs tracking-widest text-bone uppercase hover:border-accent-bright hover:text-accent-bright"
              >
                <SocialIcon id={link.id} size={14} />
                {link.label}
              </a>
            ))}

          {emailAvailable && (
            <a
              href={`mailto:${profile.email}`}
              className="btn-anim inline-flex items-center gap-2 border border-bone/25 px-6 py-3.5 font-mono text-xs tracking-widest text-bone uppercase hover:border-accent-bright hover:text-accent-bright"
            >
              Escríbeme
            </a>
          )}
        </div>

        <p className="contact-reveal mt-12 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-muted uppercase">
          <MapPin size={13} aria-hidden="true" className="float-y" />
          {profile.location}
        </p>
      </div>
    </section>
  );
}
