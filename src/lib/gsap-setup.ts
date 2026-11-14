import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Evita recálculos erróneos por cambios de barra de URL en móvil
ScrollTrigger.config({ ignoreMobileResize: true });

gsap.defaults({ ease: "power2.out" });

export { gsap, ScrollTrigger };
