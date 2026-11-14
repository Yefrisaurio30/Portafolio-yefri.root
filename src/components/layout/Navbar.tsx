import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap, ScrollTrigger } from "../../lib/gsap-setup";
import { profile } from "../../data/profile";

interface NavbarProps {
  ready: boolean;
  act: "dark" | "light";
}

const LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "tecnologias", label: "Tecnologías" },
  { id: "experiencia", label: "Experiencia" },
  { id: "contacto", label: "Contacto" },
];

export default function Navbar({ ready, act }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const headerRef = useRef<HTMLElement>(null);

  // Oculta el navbar al bajar y lo muestra al subir
  useEffect(() => {
    if (!ready) return;
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -120",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 140) {
            gsap.to(header, { yPercent: -110, duration: 0.4, ease: "power3.out" });
          } else {
            gsap.to(header, { yPercent: 0, duration: 0.4, ease: "power3.out" });
          }
        },
      });
    });

    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      LINKS.forEach((link) => {
        ScrollTrigger.create({
          trigger: `#${link.id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(link.id);
          },
        });
      });
    });

    return () => ctx.revert();
  }, [ready]);

  const theme =
    act === "light"
      ? "text-graphite bg-paper/95 border-graphite/10"
      : "text-bone bg-void/90 border-bone/10";

  const linkTheme = act === "light" ? "text-graphite" : "text-bone";

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 right-0 left-0 z-[70] border-b backdrop-blur-sm transition-opacity duration-500 ${theme} ${ready ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <nav
          className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-16"
          aria-label="Navegación principal"
        >
          <a
            href="#inicio"
            className={`font-display text-sm font-semibold tracking-tight ${linkTheme}`}
          >
            YEFRI<span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-accent ${linkTheme} ${active === link.id ? "text-accent" : ""}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-accent ${linkTheme}`}
              >
                GitHub
              </a>
            </li>
          </ul>

          <button
            type="button"
            className={`p-1 md:hidden ${linkTheme}`}
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-void text-bone">
          <div className="flex items-center justify-between border-b border-bone/10 px-6 py-4">
            <span className="font-display text-sm font-semibold">
              YEFRI<span className="text-accent">.</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="p-1"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
            {LINKS.map((link, index) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "true" : undefined}
                  className="group flex items-baseline gap-4 py-3"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-4xl font-semibold tracking-tight transition-colors group-hover:text-accent ${active === link.id ? "text-accent" : ""}`}
                  >
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="px-8 pb-10 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            {profile.location}
          </p>
        </div>
      )}
    </>
  );
}
