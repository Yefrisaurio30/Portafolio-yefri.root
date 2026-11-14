import type { SocialLink } from "../types/portfolio";

/**
 * Enlaces sociales confirmados. Los campos PENDIENTE (correo, LinkedIn,
 * WhatsApp) se agregan aquí cuando estén configurados; la UI oculta
 * elegantemente lo que no esté definido.
 */
export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/Yefrisaurio30",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/yefrisaurio_/"
  },
  {
    id: "linkedln",
    label: "Linkedln",
    url: "www.linkedin.com/in/yefri-santiago-infante-galeano-21ba91338"
  },
];

export const hasEmail = (email: string) =>
  Boolean(email) && !email.startsWith("PENDIENTE");
