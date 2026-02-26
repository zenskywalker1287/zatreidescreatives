import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Vignette that reacts to mouse */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, transparent 0%, hsl(var(--background)) 70%)`,
          opacity: 0.5,
        }}
      />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-[1400px]">
        <h1 className="font-display text-[clamp(3rem,12vw,12rem)] leading-[0.9] tracking-tight text-pure-white mb-6 animate-fade-up">
          I BUILD THE<br />
          INVISIBLE<br />
          CLOSERS.
        </h1>
        <p
          className="font-mono text-sm md:text-base text-muted-foreground max-w-2xl mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          The creative backend that owns mental real estate — long after the ad
          spend stops.
        </p>
        <a
          href="#comparison"
          className="btn-brutal inline-block opacity-0 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          [ ENTER THE ENGINE ]
        </a>
      </div>

      {/* Bottom metadata */}
      <div className="absolute bottom-8 left-6 md:left-12 flex flex-col md:flex-row gap-4 md:gap-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
        <span className="meta-label">[EST. CREATIVE BACKEND SYSTEMS]</span>
        <span className="meta-label">[SPECIALITY: EMAIL · ADS · STRATEGY]</span>
      </div>
    </section>
  );
};

export default HeroSection;
