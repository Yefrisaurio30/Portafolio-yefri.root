import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Evita recálculos erróneos por cambios de barra de URL en móvil
ScrollTrigger.config({ ignoreMobileResize: true });

gsap.defaults({ ease: "power2.out" });

export { gsap, ScrollTrigger };
