import type { TechGroup } from "../types/portfolio";

/**
 * Stack confirmado en la especificación (sección 5.6) +
 * lenguajes detectados en los repositorios públicos de Yefrisaurio30.
 * Sin barras de porcentaje: solo categorías y elementos.
 */
export const techGroups: TechGroup[] = [
  {
    category: "Lenguajes",
    items: ["JavaScript", "TypeScript", "Dart", "Python"],
  },
  {
    category: "Frontend",
    items: ["React", "HTML5", "CSS3", "Tailwind CSS", "Flutter"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Django"],
  },
  {
    category: "Bases de datos",
    items: ["PostgreSQL", "Supabase"],
  },
  {
    category: "Herramientas",
    items: ["Git", "GitHub", "Docker", "VS Code"],
  },
];
