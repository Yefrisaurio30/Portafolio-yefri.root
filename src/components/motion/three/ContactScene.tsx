import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { sceneState } from "../../../lib/scene-state";

/**
 * Acto 3 — Retícula espacial de perspectiva hacia la cual la cámara
 * avanza conforme termina la página (progreso de Contacto), con niebla
 * para fundir la malla en el negro del keynote.
 */
export default function ContactScene() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    const p = sceneState.contact;

    // Avance de la cámara hacia el horizonte + deriva con el cursor
    state.camera.position.z = 8 - p * 5.5;
    state.camera.position.x = sceneState.mouseX * 1.1;
    state.camera.position.y = 2.4 - p * 1.1 + sceneState.mouseY * 0.5;
    state.camera.lookAt(0, -0.5, -12);

    if (group.current) {
      group.current.position.z = -p * 4;
    }
  });

  return (
    <group ref={group}>
      <fog attach="fog" args={["#000000", 7, 26]} />

      {/* Retícula principal */}
      <gridHelper args={[80, 80, "#2997ff", "#1c1c1f"]} position={[0, -2.4, 0]} />

      {/* Retícula superior especular, más tenue */}
      <gridHelper args={[80, 40, "#232326", "#141416"]} position={[0, 4.2, 0]} />
    </group>
  );
}
