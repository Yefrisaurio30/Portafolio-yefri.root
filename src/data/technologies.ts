import type { TechGroup } from "../types/portfolio";

/**
 * Stack confirmado en la especificación (sección 5.6) +
 * lenguajes detectados en los repositorios públicos de Yefrisaurio30.
 * Sin barras de porcentaje: solo categorías y elementos.
 */
export const techGroups: TechGroup[] = [
  {
    category: "Lenguajes",
    items: ["JavaScript", "TypeScript", "Dart", "Python", "Java"],
  },
  {
    category: "Frontend",
    items: ["React", "HTML5", "CSS3", "Tailwind CSS", "Flutter"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Django", "Next.JS"],
  },
  {
    category: "Bases de datos",
    items: ["PostgreSQL", "Supabase" , "MongoDB"],
  },
  {
    category: "Herramientas",
    items: ["Git", "GitHub", "Docker", "VS Code"],
  },
];
