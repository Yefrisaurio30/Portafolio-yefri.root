/**
 * Estado compartido entre GSAP ScrollTrigger (fuera del Canvas) y los
 * useFrame de React Three Fiber (dentro del Canvas), sin causar
 * re-renders de React. Un solo punto de sincronización.
 */
export const sceneState = {
  /** Progreso del pin del Hero (0 → 1) */
  hero: 0,
  /** Progreso de la entrada de Contacto (0 → 1) */
  contact: 0,
  /** Posición del cursor normalizada a -0.5 … 0.5 */
  mouseX: 0,
  mouseY: 0,
};
