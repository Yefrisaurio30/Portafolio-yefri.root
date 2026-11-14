import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import Preloader from "./components/layout/Preloader";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollProgress from "./components/motion/ScrollProgress";
import Marquee from "./components/motion/Marquee";
import CustomCursor from "./components/motion/CustomCursor";
import Hero from "./sections/Hero";
import ImmersiveShowcase from "./sections/ImmersiveShowcase";
import About from "./sections/About";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import { ScrollTrigger } from "./lib/gsap-setup";
import type { SceneMode } from "./components/motion/Scene3D";

// El módulo WebGL (three.js) se code-splittea en un chunk aparte y
// se carga en segundo plano sin bloquear el render inicial.
const Scene3D = lazy(() => import("./components/motion/Scene3D"));

type Act = "dark" | "light";

/** Tema del navbar según el acto escénico en viewport. */
const ACT_SECTIONS: { id: string; act: Act }[] = [
  { id: "inicio", act: "dark" },
  { id: "proyectos", act: "light" },
  { id: "sobre-mi", act: "dark" },
  { id: "tecnologias", act: "dark" },
  { id: "experiencia", act: "dark" },
  { id: "contacto", act: "dark" },
];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [act, setAct] = useState<Act>("dark");
  const [sceneMode, setSceneMode] = useState<SceneMode>("off");

  const handleLoaded = useCallback(() => setLoaded(true), []);

  // Bloquea el scroll durante el preloader
  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  // Indicador de acto activo + recálculo de triggers tras el preloader
  useEffect(() => {
    if (!loaded) return;

    const triggers = ACT_SECTIONS.map(({ id, act: sectionAct }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            setAct(sectionAct);
            // El módulo 3D solo actúa en el vuelo de retícula de Contacto
            setSceneMode(id === "contacto" ? "contact" : "off");
          }
        },
      })
    );

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      window.clearTimeout(timer);
    };
  }, [loaded]);

  return (
    <>
      <Suspense fallback={null}>
        <Scene3D mode={sceneMode} />
      </Suspense>
      {!loaded && <Preloader onDone={handleLoaded} />}
      <ScrollProgress />
      <CustomCursor />
      <Navbar ready={loaded} act={act} />
      <main>
        <Hero ready={loaded} />
        <Marquee />
        <ImmersiveShowcase />
        <About />
        <TechStack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
