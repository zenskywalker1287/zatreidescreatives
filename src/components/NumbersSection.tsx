import { useRef, useState, useCallback, useEffect } from "react";
import { useInView } from "../hooks/useInView";
import ScrollReveal from "./ScrollReveal";

/* ── MARQUEE DATA ── */
const tickerItems = [
  "MADCOW COLLARS: EMAIL BECAME 40% OF TOTAL REVENUE",
  "FLATPACK: $100K FROM EMAIL IN A SINGLE MONTH",
  "1,200+ CREATIVES SHIPPED ACROSS DTC BRANDS",
  "$2M+ IN REVENUE GENERATED",
  "926% EMAIL REVENUE INCREASE — ONE BRAND, ONE MONTH",
  "WORKED INSIDE 8-FIGURE KLAVIYO AGENCIES",
  "FEATURED ALONGSIDE NIKE & CHIPOTLE",
  "14 DAYS FROM BRIEF TO LIVE",
];

const panels = [
  { number: "$2M+", label: "REVENUE GENERATED ACROSS DTC BRANDS" },
  { number: "1,200+", label: "CREATIVES SHIPPED" },
  { number: "40%", label: "OF TOTAL REVENUE FROM EMAIL ALONE — MADCOW COLLARS" },
  { number: "14 DAYS", label: "BRIEF TO LIVE. EVERY TIME." },
];

const Marquee = () => (
  <ScrollReveal variant="scale" threshold={0.2}>
    <div className="relative w-full border-y border-primary/40 overflow-hidden py-3" style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.15), inset 0 0 30px hsl(var(--primary) / 0.05)' }}>
      <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="font-body text-xs md:text-sm text-primary tracking-wide mr-0" style={{ textShadow: '0 0 20px hsl(var(--primary) / 0.5)' }}>
            {tickerItems.map((item, j) => (
              <span key={j}>
                {item}
                <span className="text-primary/60 mx-4">→</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  </ScrollReveal>
);

const GiantNumbers = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const scrollXRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const autoScrollRef = useRef<number>(0);
  const isUserInteracting = useRef(false);
  const isDraggingRef = useRef(false);

  const PANEL_WIDTH = typeof window !== "undefined" ? (window.innerWidth < 640 ? window.innerWidth * 0.85 : window.innerWidth * 0.55) : 700;
  const TOTAL_WIDTH = panels.length * PANEL_WIDTH;
  const maxScroll = -(TOTAL_WIDTH - (typeof window !== "undefined" ? window.innerWidth : 1200));

  const clampScroll = useCallback((v: number) => Math.min(0, Math.max(maxScroll, v)), [maxScroll]);

  const applyTransform = useCallback((x: number) => {
    if (stripRef.current) {
      stripRef.current.style.transform = `translateX(${x}px)`;
    }
  }, []);

  useEffect(() => {
    const speed = -0.4;
    const tick = () => {
      if (!isUserInteracting.current) {
        let next = scrollXRef.current + speed;
        if (next < maxScroll) next = 0;
        scrollXRef.current = next;
        applyTransform(next);
      }
      autoScrollRef.current = requestAnimationFrame(tick);
    };
    autoScrollRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoScrollRef.current);
  }, [maxScroll, applyTransform]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isUserInteracting.current = true;
      isDraggingRef.current = true;
      setIsDragging(true);
      startXRef.current = e.clientX;
      scrollStartRef.current = scrollXRef.current;
      lastXRef.current = e.clientX;
      lastTimeRef.current = Date.now();
      velocityRef.current = 0;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      if (showHint) setShowHint(false);
      if (stripRef.current) stripRef.current.style.transition = 'none';
    },
    [showHint]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const now = Date.now();
      const dt = now - lastTimeRef.current;
      const dx = e.clientX - lastXRef.current;
      if (dt > 0) velocityRef.current = dx / dt;
      lastXRef.current = e.clientX;
      lastTimeRef.current = now;
      const newX = clampScroll(scrollStartRef.current + (e.clientX - startXRef.current));
      scrollXRef.current = newX;
      applyTransform(newX);
    },
    [clampScroll, applyTransform]
  );

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
    if (stripRef.current) stripRef.current.style.transition = 'transform 0.15s ease-out';
    let v = velocityRef.current * 15;
    const decay = () => {
      if (Math.abs(v) < 0.5) {
        isUserInteracting.current = false;
        return;
      }
      v *= 0.93;
      scrollXRef.current = clampScroll(scrollXRef.current + v);
      applyTransform(scrollXRef.current);
      rafRef.current = requestAnimationFrame(decay);
    };
    rafRef.current = requestAnimationFrame(decay);
  }, [clampScroll, applyTransform]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      isUserInteracting.current = true;
      scrollXRef.current = clampScroll(scrollXRef.current - e.deltaY * 2);
      applyTransform(scrollXRef.current);
      if (showHint) setShowHint(false);
      setTimeout(() => { isUserInteracting.current = false; }, 2000);
    },
    [clampScroll, showHint, applyTransform]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ height: "clamp(320px, 50vh, 520px)" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
    >
      <div
        ref={stripRef}
        className="absolute top-0 left-0 h-full flex"
        style={{ transition: "transform 0.15s ease-out" }}
      >
        {panels.map((panel, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex flex-col items-center justify-center relative"
            style={{ width: PANEL_WIDTH }}
          >
            <span
              className="font-display text-pure-white leading-none relative z-10"
              style={{ fontSize: "clamp(80px, 18vw, 280px)" }}
            >
              {panel.number}
            </span>

            <span className="meta-label text-foreground/60 mt-4 max-w-md text-center relative z-10 px-4">
              {panel.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        className={`absolute bottom-6 right-6 font-body text-xs text-muted-foreground transition-opacity duration-700 ${
          showHint ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        DRAG →
      </div>
    </div>
  );
};

const NumbersSection = () => {
  const closingRef = useRef<HTMLDivElement>(null);
  const closingInView = useInView(closingRef, 0.5);

  return (
    <section id="comparison" className="section-border bg-background">
      <div className="pt-12 pb-0">
        <ScrollReveal variant="fade-right" className="px-6 md:px-12 lg:px-20 mb-8">
          <span className="meta-label text-primary">THE NUMBERS</span>
        </ScrollReveal>

        <Marquee />

        <ScrollReveal variant="slide-up-rotate" delay={200}>
          <div className="py-8 md:py-12">
            <GiantNumbers />
          </div>
        </ScrollReveal>

        <div
          ref={closingRef}
          className={`border-t border-foreground/15 px-6 md:px-12 lg:px-20 py-12 flex justify-center transition-all duration-1000 ${
            closingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <p className="font-serif-thin italic text-foreground/70 text-lg md:text-2xl text-center max-w-3xl leading-relaxed">
            Every number on this page comes from a real Klaviyo dashboard.<br />
            Real brands. Real months.<br />
            Nothing projected. Nothing padded.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;
