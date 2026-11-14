import { ArrowUp } from "lucide-react";
import { SocialIcon } from "../ui/icons";
import { gsap } from "../../lib/gsap-setup";
import { profile } from "../../data/profile";
import { socialLinks } from "../../data/social-links";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const year = YEAR;

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      window.scrollTo(0, 0);
      return;
    }
    // ScrollToPlugin: desplazamiento fiable incluso con secciones
    // pineadas por ScrollTrigger (window.scrollTo smooth puede fallar).
    gsap.to(window, {
      scrollTo: 0,
      duration: 1.4,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  };

  return (
    <footer className="border-t border-bone/10 bg-void text-bone">
      <div className="flex flex-col items-start justify-between gap-8 px-6 py-10 sm:flex-row sm:items-center sm:px-10 lg:px-16">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">
            Yefri<span className="text-accent">.</span>
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            {profile.role} — {year}
          </p>
        </div>

        <ul className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="link-sweep lift arrow-bounce inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70 hover:text-accent"
              >
                <SocialIcon id={link.id} size={14} />
                {link.label}
              </a>
            </li>
          ))}
          <li>

          </li>
        </ul>

        <button
          type="button"
          onClick={toTop}
          className="lift arrow-bounce inline-flex items-center gap-2 border border-bone/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70 hover:border-accent hover:text-accent"
        >
          Volver arriba <ArrowUp size={25} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
