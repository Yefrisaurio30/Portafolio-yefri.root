import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useCanvasAvailable } from "../../hooks/useScene3DSupport";
import ContactScene from "./three/ContactScene";

export type SceneMode = "off" | "contact";

interface Scene3DProps {
  mode: SceneMode;
}

/**
 * Módulo 3D híbrido: un único <Canvas> fijo en segundo plano para el
 * acto atmosférico de Contacto (vuelo de retícula), con pointer-events
 * desactivados y dpr limitado.
 *
 * Fallback (regla 3 de la spec):
 * - Se desmonta en pantallas < 768px o sin WebGL.
 * - Con prefers-reduced-motion se PAUSA (frameloop "demand"): renderiza
 *   un único cuadro estático y compuesto, sin animación.
 * - Sin acto activo, el canvas no se monta (GPU en reposo).
 */
export default function Scene3D({ mode }: Scene3DProps) {
  const available = useCanvasAvailable();
  const reduced = useReducedMotion();
  if (!available) return null;

  const active = mode === "contact";
  const frozen = reduced;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      {active && (
        <Canvas
          dpr={[1, 1.5]}
          frameloop={frozen ? "demand" : "always"}
          onCreated={({ invalidate }) => {
            if (frozen) invalidate();
          }}
          camera={{ position: [0, 2.4, 8], fov: 60 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "low-power",
          }}
        >
          <ContactScene />
        </Canvas>
      )}
    </div>
  );
}
