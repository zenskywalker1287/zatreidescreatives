import { useRef, useState, useEffect, useCallback } from "react";
import Phase01Strategy from "./process/Phase01PreFlight";
import Phase02Retention from "./process/Phase02Backend";
import Phase03Creative from "./process/Phase03FrontEnd";

const phaseLabels = [
  "[PHASE 01 — STRATEGY]",
  "[PHASE 02 — RETENTION]",
  "[PHASE 03 — CREATIVE DIRECTION]",
];

const AUTO_SCROLL_INTERVAL = 8000;
const RESUME_DELAY = 5000;

const ProcessSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>();
  const progressStart = useRef<number>(Date.now());
  const animFrame = useRef<number>();

  const scrollToPhase = useCallback((index: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollTo({
      left: index * window.innerWidth,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleScroll = () => {
      const scrollLeft = track.scrollLeft;
      const vw = window.innerWidth;
      const phase = Math.round(scrollLeft / vw);
      setActivePhase(Math.max(0, Math.min(2, phase)));
    };
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUserInteraction = useCallback(() => {
    setIsPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      setIsPaused(false);
      progressStart.current = Date.now();
      setProgress(0);
    }, RESUME_DELAY);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const events = ["pointerdown", "wheel", "touchstart"] as const;
    events.forEach((e) => track.addEventListener(e, handleUserInteraction, { passive: true }));
    return () => events.forEach((e) => track.removeEventListener(e, handleUserInteraction));
  }, [handleUserInteraction]);

  useEffect(() => {
    if (isPaused) {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      return;
    }
    progressStart.current = Date.now();
    const tick = () => {
      const elapsed = Date.now() - progressStart.current;
      const pct = Math.min(elapsed / AUTO_SCROLL_INTERVAL, 1);
      setProgress(pct);
      if (pct >= 1) {
        setActivePhase((prev) => {
          const next = prev < 2 ? prev + 1 : 0;
          scrollToPhase(next);
          return next;
        });
        progressStart.current = Date.now();
        setProgress(0);
      }
      animFrame.current = requestAnimationFrame(tick);
    };
    animFrame.current = requestAnimationFrame(tick);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isPaused, scrollToPhase]);

  return (
    <section id="process" className="relative overflow-hidden max-w-[100vw]">
      {/* Section intro */}
      <div className="w-full bg-background py-8 md:py-12 text-center px-6">
        <span className="meta-label text-primary mb-6 block">[THE PROCESS]</span>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-pure-white mb-6">
          HOW WE TURN A BRAND INTO A MACHINE.
        </h2>
        <p className="font-serif-thin italic text-sm md:text-base text-foreground/60 max-w-lg mx-auto">
          Three phases. Every time. No shortcuts. No guesswork. This is how optimized creative actually gets built.
        </p>
      </div>

      {/* Phase label — fixed within section */}
      <div className="absolute top-4 left-6 md:top-6 md:left-10 z-20 pointer-events-none" style={{ top: "calc(var(--intro-offset, 0px) + 1rem)" }}>
        <span className="meta-label text-primary transition-all duration-500" key={activePhase}>
          {phaseLabels[activePhase]}
        </span>
      </div>

      {/* Arrow cues */}
      {activePhase < 2 && (
        <button
          onClick={() => { scrollToPhase(activePhase + 1); handleUserInteraction(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 meta-label text-primary/60 hover:text-primary transition-colors animate-pulse"
        >
          PHASE {String(activePhase + 2).padStart(2, "0")} →
        </button>
      )}
      {activePhase > 0 && (
        <button
          onClick={() => { scrollToPhase(activePhase - 1); handleUserInteraction(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 meta-label text-primary/60 hover:text-primary transition-colors"
        >
          ← PHASE {String(activePhase).padStart(2, "0")}
        </button>
      )}

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex w-full h-screen overflow-x-auto overflow-y-hidden"
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Phase01Strategy isActive={activePhase === 0} />
        <Phase02Retention isActive={activePhase === 1} />
        <Phase03Creative isActive={activePhase === 2} />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => { scrollToPhase(i); handleUserInteraction(); }}
            className="font-mono text-xs transition-all duration-300"
          >
            <span className={i === activePhase ? "text-primary" : "text-foreground/30"}>
              [{i === activePhase ? "●" : "○"}]
            </span>
          </button>
        ))}
      </div>

      {/* Auto-scroll progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-20">
        <div
          className="h-full bg-primary transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Bottom strip */}
      <div className="w-full border-t border-foreground/15 border-b border-b-foreground/15 bg-background px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-pure-white leading-[1.1] text-center md:text-left">
          STRATEGY BUILDS IT.
          <br />
          RETENTION KEEPS IT.
          <br />
          CREATIVE SCALES IT.
        </h3>
        <span className="meta-label text-foreground/40">
          [3 PHASES · 1 SYSTEM · ZERO GAPS]
        </span>
      </div>
    </section>
  );
};

export default ProcessSection;
