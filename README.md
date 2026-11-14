# Yefri — Portafolio Personal

Portafolio SPA con coreografía de scroll cinematográfica en 3 actos, construido según `../especificacion_maestra_portafolio_yefri.md`.

## Stack

- **React 19 + TypeScript + Vite 8**
- **Tailwind CSS 4** (plugin `@tailwindcss/vite`)
- **GSAP 3 + ScrollTrigger** (pin, scrub, CSS 3D transforms)
- **lucide-react** para iconografía

## Estructura

```text
src/
├── components/
│   ├── layout/      # Navbar (adaptativo por acto), Footer, Preloader
│   ├── ui/          # Button, ProjectModal, SectionHeading, icons
│   └── motion/      # ScrollProgress
├── sections/        # Hero, ImmersiveShowcase (tambor 3D), About,
│                    # TechStack, Experience, Contact (parallax)
├── data/            # profile, projects, technologies, social-links
├── hooks/           # useReducedMotion, useMouseParallax, useTunnelEntrance
├── lib/             # gsap-setup (registro de ScrollTrigger)
├── types/           # portfolio.ts
└── styles/          # globals.css (tema Tailwind v4)
```

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm run lint       # oxlint
npm run build      # typecheck + build de producción en dist/
npm run preview    # servir dist/ localmente
```

## Coreografía de scroll (3 actos)

1. **Acto I — Hero (oscuro):** preloader → hero con retícula de perspectiva; el scroll hace zoom/morph y revela la galería.
2. **Acto II — Selected Work (claro):** sección *pinned* con tambor cilíndrico 3D (`perspective: 1200px`, `preserve-3d`); el scroll rota `rotateY` y trae cada proyecto al frente (con atenuado de paneles laterales). Clic → vista expandida con stack, rol y enlaces.
3. **Acto III — Enfoque/Contacto (oscuro inmersivo):** túnel de profundidad Z (`translateZ` + escala con scrub) conecta Sobre mí → Tecnologías → Experiencia → Contacto, con parallax reactivo al mouse en la escena final.

Todo respeta `prefers-reduced-motion: reduce` (fallback estático accesible sin pins ni 3D).

## Datos centralizados (`src/data/`)

- `profile.ts` — datos personales. **Pendientes:** `email`, `linkedin`, `whatsapp`.
- `projects.ts` — proyectos de la especificación + repos públicos verificados de `github.com/Yefrisaurio30`.
- `technologies.ts` — categorías del stack (editable).
- `social-links.ts` — redes confirmadas (GitHub). Agregar aquí nuevas redes.

## Despliegue en Vercel

1. Subir el proyecto a GitHub:

   ```bash
   git init
   git add .
   git commit -m "feat: portafolio inicial"
   git branch -M main
   git remote add origin https://github.com/Yefrisaurio30/yefri-portfolio.git
   git push -u origin main
   ```

2. En [vercel.com](https://vercel.com): *Add New → Project* → importar el repo.
3. Vercel detecta Vite automáticamente (build: `npm run build`, output: `dist`). Deploy.
4. El sitio queda en `https://<nombre>.vercel.app`.

### Subdominio gratuito (opcional, sin cambios DNS automáticos)

- **is-a.dev** — PR en [github.com/is-a-dev/register](https://github.com/is-a-dev/register) solicitando `yefri.is-a.dev` con CNAME a tu dominio de Vercel (agregar el dominio en Vercel → *Settings → Domains*).
- Alternativas: `js.org`, `open-domains` (ver especificación, sección 9).
