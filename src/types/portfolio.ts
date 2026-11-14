export type ProjectStatus = "produccion" | "prototipo" | "en-desarrollo";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  statusLabel: string;
  role: string;
  demoUrl?: string;
  repoUrl?: string;
  image: string;
  /** Tinte de ambiente del proyecto en la galería 3D */
  tint: string;
}

export interface TechGroup {
  category: string;
  items: string[];
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}
