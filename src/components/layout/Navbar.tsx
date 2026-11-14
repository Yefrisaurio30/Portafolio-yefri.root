import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
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
  const menuRef = useRef<HTMLDivElement>(null);

  // Entrada animada del menú móvil: fade del overlay + links en cascada
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    if (!menu) return;

    const ctx = gsap.context(() => {
      gsap.from(menu, { opacity: 0, duration: 0.35, ease: "power2.out" });
      gsap.from(".mobile-link", {
        x: -48,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(".mobile-foot", {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.4,
      });
    }, menu);

    return () => ctx.revert();
  }, [open]);

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
            className={`group font-display text-sm font-semibold tracking-tight ${linkTheme}`}
          >
            YEFRI<span className="text-accent blink inline-block">.</span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`link-sweep font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-accent ${linkTheme} ${active === link.id ? "text-accent" : ""}`}
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
                className={`link-sweep font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-accent ${linkTheme}`}
              >
                GitHub
              </a>
            </li>
          </ul>

          <button
            type="button"
            className={`lift p-1 md:hidden ${linkTheme}`}
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </nav>
      </header>

      {open && (
        <div ref={menuRef} className="fixed inset-0 z-[90] flex flex-col bg-void text-bone">
          <div className="flex items-center justify-between border-b border-bone/10 px-6 py-4">
            <span className="font-display text-sm font-semibold">
              YEFRI<span className="text-accent blink inline-block">.</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="p-1 transition-transform duration-300 hover:rotate-90 hover:text-accent"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
            {LINKS.map((link, index) => (
              <li key={link.id} className="mobile-link">
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "true" : undefined}
                  className="group flex translate-x-0 items-baseline gap-4 py-3 transition-transform duration-300 hover:translate-x-2"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-4xl font-semibold tracking-tight transition-colors group-hover:text-accent ${active === link.id ? "text-accent" : ""}`}
                  >
                    {link.label}
                  </span>
                  <ArrowUpRight
                    size={22}
                    aria-hidden="true"
                    className="self-center text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="mobile-foot px-8 pb-10 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            {profile.location}
          </p>
        </div>
      )}
    </>
  );
}
