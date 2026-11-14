import { useEffect, useState } from "react";

/** Detección única de soporte WebGL (nivel de módulo). */
export const WEBGL_OK = (() => {
  try {
    const test = document.createElement("canvas");
    return !!(
      test.getContext("webgl") || test.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
})();

/**
 * true cuando el Canvas WebGL puede montarse: pantalla >= 768px y
 * contexto WebGL disponible. Con prefers-reduced-motion el canvas NO
 * se desmonta: queda pausado en un cuadro estático (ver Scene3D).
 */
export function useCanvasAvailable(): boolean {
  const [small, setSmall] = useState(
    () => window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setSmall(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return WEBGL_OK && !small;
}
