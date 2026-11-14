import type { Project } from "../types/portfolio";

/**
 * Proyectos seleccionados por el propietario (noviembre de 2026).
 * Los enlaces solo se incluyen cuando están confirmados.
 */
export const projects: Project[] = [
  {
    id: "tecnovo",
    name: "Tecnovo",
    tagline: "Software empresarial",
    description:
      "Desarrollo de una solución de software empresarial con funcionalidades de gestión y procesamiento de pagos, incluyendo integración de pasarela de pagos.",
    tech: ["React", "Vite", "TypeScript", "Supabase"],
    status: "produccion",
    statusLabel: "En producción",
    role: "Desarrollo de software",
    demoUrl: "https://tecnovomotos.vercel.app",
    repoUrl: "https://github.com/Yefrisaurio30/SOFTWARE-TECNOVO-EMPRESA",
    image: "/images/projects/tecnovo.svg",
    tint: "#0A84A0",
  },
  {
    id: "vibralink",
    name: "VibraLink",
    tagline: "Plataforma de bienestar juvenil",
    description:
      "Plataforma orientada al bienestar juvenil, con gestión de actividades y reportes. Desarrollada para un hackathon municipal.",
    tech: ["React", "Vite", "TypeScript", "CSS", "LocalStorage"],
    status: "prototipo",
    statusLabel: "Prototipo funcional",
    role: "Desarrollo frontend",
    demoUrl: "https://vibralink.vercel.app",
    repoUrl: "https://github.com/Yefrisaurio30/REPO-HACKATHON-ALCALDIA",
    image: "/images/projects/vibralink.svg",
    tint: "#5E5CE6",
  },
  {
    id: "ecommerce-movil",
    name: "E-commerce Flutter",
    tagline: "Aplicación móvil",
    description:
      "Aplicación móvil de comercio electrónico con arquitectura cliente-servidor: autenticación, catálogo de productos, búsqueda, categorías, detalle de producto y carrito de compras.",
    tech: ["Flutter", "Dart", "Supabase", "API REST"],
    status: "en-desarrollo",
    statusLabel: "En desarrollo",
    role: "Proyecto académico",
    repoUrl: "https://github.com/ArleyDevp/ShopNow",
    image: "/images/projects/ecommerce-movil.svg",
    tint: "#0A84FF",
  },
  {
    id: "plataforma-social",
    name: "Plataforma Social",
    tagline: "Gestión de usuarios y moderación",
    description:
      "Plataforma social con backend Django y Supabase, centrada en la gestión de usuarios y herramientas de moderación de contenido.",
    tech: ["Django", "Supabase", "Python"],
    status: "produccion",
    statusLabel: "En producción",
    role: "Desarrollo backend",
    demoUrl: "https://repositorio-practicas-profesionales.vercel.app",
    repoUrl: "https://github.com/Yefrisaurio30/Repositorio_Practicas_Profesionales",
    image: "/images/projects/plataforma-social.svg",
    tint: "#BF5AF2",
  },
  {
    id: "tutor-perfecto",
    name: "Tutor Perfecto",
    tagline: "Sistema de recomendación de tutores",
    description:
      "Sistema de recomendación que empareja estudiantes con tutores acreditados mediante un motor heurístico de compatibilidad, con solicitud en lenguaje natural y paneles por rol.",
    tech: ["JavaScript", "Supabase", "Algoritmos de recomendación"],
    status: "prototipo",
    statusLabel: "Prototipo",
    role: "Desarrollo de software",
    repoUrl: "https://github.com/Yefrisaurio30/Repositorio-Hackaton",
    image: "/images/projects/tutor-perfecto.svg",
    tint: "#FF9F0A",
  },
];
