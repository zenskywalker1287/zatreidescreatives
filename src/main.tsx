import { createRoot } from "react-dom/client";
import Lenis from "@studio-freight/lenis";
import App from "./App.tsx";
import "./index.css";

// Lenis smooth scroll
const shouldSmoothScroll = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches;

if (shouldSmoothScroll) {
  const lenis = new Lenis({
    duration: 0.9,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

createRoot(document.getElementById("root")!).render(<App />);
