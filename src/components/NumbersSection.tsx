import { useRef, useState, useCallback, useEffect } from "react";
import { useInView } from "../hooks/useInView";

/* ── MARQUEE DATA ── */
const tickerItems = [
  "MADCOW: 40% OF TOTAL REVENUE DRIVEN BY EMAIL",
  "FLATPACK: $100K GENERATED IN A SINGLE MONTH",
  "FEATURED ALONGSIDE NIKE & CHIPOTLE",
  "MKTG: $1M FOR CLIENTS IN ONE QUARTER",
  "$2M+ IN EMAIL REVENUE ACROSS DTC BRANDS",
  "2 WEEKS FROM ZERO TO FULLY DEPLOYED",
];

const tickerContent = tickerItems
  .map((t) => `${t} `)
  .join(" → ");

/* ── PANELS ── */
const panels = [
  { number: "$2M+", label: "TOTAL EMAIL REVENUE GENERATED ACROSS DTC BRANDS" },
  { number: "$100K", label: "GENERATED FOR A SINGLE BRAND IN ONE MONTH — FLATPACK" },
  { number: "40%", label: "OF TOTAL REVENUE FROM EMAIL ALONE — MADCOW COLLARS" },
  { number: "2 WKS", label: "FROM ZERO TO FULLY DEPLOYED. ONE-TIME FEE. YOURS FOREVER." },
  {
    number: "NIKE.",
    label: "EMAILS FEATURED ALONGSIDE NIKE AND CHIPOTLE",
    subline: "Not a flex. Just context.",
  },
];

/* ── MARQUEE ── */
const Marquee = () => (
  <div className="relative w-full border-y border-foreground/15 overflow-hidden py-3">
    <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite]">
      {[0, 1, 2].map((i) => (
        <span key={i} className="font-mono text-xs md:text-sm text-foreground/80 tracking-wide mr-0">
          {tickerItems.map((item, j) => (
            <span key={j}>
              {item}
              <span className="text-primary mx-4">→</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  </div>
);

/* ── GIANT NUMBERS SCROLL ── */
const GiantNumbers = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  const PANEL_WIDTH = typeof window !== "undefined" ? window.innerWidth * 0.55 : 700;
  const TOTAL_WIDTH = panels.length * PANEL_WIDTH;
  const maxScroll = -(TOTAL_WIDTH - (typeof window !== "undefined" ? window.innerWidth : 1200));

  const clampScroll = (v: number) => Math.min(0, Math.max(maxScroll, v));

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      setStartX(e.clientX);
      setScrollStart(scrollX);
      lastXRef.current = e.clientX;
      lastTimeRef.current = Date.now();
      velocityRef.current = 0;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      if (showHint) setShowHint(false);
    },
    [scrollX, showHint]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const now = Date.now();
      const dt = now - lastTimeRef.current;
      const dx = e.clientX - lastXRef.current;
      if (dt > 0) velocityRef.current = dx / dt;
      lastXRef.current = e.clientX;
      lastTimeRef.current = now;
      setScrollX(clampScroll(scrollStart + (e.clientX - startX)));
    },
    [isDragging, scrollStart, startX, maxScroll]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    let v = velocityRef.current * 15;
    const decay = () => {
      if (Math.abs(v) < 0.5) return;
      v *= 0.93;
      setScrollX((prev) => clampScroll(prev + v));
      rafRef.current = requestAnimationFrame(decay);
    };
    rafRef.current = requestAnimationFrame(decay);
  }, [maxScroll]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      setScrollX((prev) => clampScroll(prev - e.deltaY * 2));
      if (showHint) setShowHint(false);
    },
    [maxScroll, showHint]
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
        className="absolute top-0 left-0 h-full flex"
        style={{
          transform: `translateX(${scrollX}px)`,
          transition: isDragging ? "none" : "transform 0.15s ease-out",
        }}
      >
        {panels.map((panel, i) => {
          // Visibility ratio for glow
          const panelCenter = i * PANEL_WIDTH + PANEL_WIDTH / 2;
          const viewCenter = -scrollX + PANEL_WIDTH / 2;
          const dist = Math.abs(panelCenter - viewCenter) / PANEL_WIDTH;
          const glowOpacity = Math.max(0, 0.25 - dist * 0.2);

          return (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center justify-center relative"
              style={{ width: PANEL_WIDTH }}
            >
              {/* Red glow */}
              <div
                className="absolute inset-0 pointer-events-none blur-[120px] transition-opacity duration-700"
                style={{
                  background: "radial-gradient(ellipse at center, hsl(var(--primary)), transparent 65%)",
                  opacity: glowOpacity,
                }}
              />

              <span
                className="font-display text-pure-white leading-none relative z-10"
                style={{ fontSize: "clamp(140px, 22vw, 280px)" }}
              >
                {panel.number}
              </span>

              <span className="meta-label text-foreground/60 mt-4 max-w-md text-center relative z-10 px-4">
                [{panel.label}]
              </span>

              {panel.subline && (
                <span className="font-serif-thin italic text-foreground/50 text-lg md:text-xl mt-3 relative z-10">
                  {panel.subline}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Scroll hint */}
      <div
        className={`absolute bottom-6 right-6 font-mono text-xs text-muted-foreground transition-opacity duration-700 ${
          showHint ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        [DRAG →]
      </div>
    </div>
  );
};

/* ── MAIN SECTION ── */
const NumbersSection = () => {
  const closingRef = useRef<HTMLDivElement>(null);
  const closingInView = useInView(closingRef, 0.5);

  return (
    <section id="comparison" className="section-border bg-background">
      <div className="pt-12 pb-0">
        <div className="px-6 md:px-12 lg:px-20 mb-8">
          <span className="meta-label text-primary">[02] THE NUMBERS</span>
        </div>

        {/* Layer 1 — Marquee */}
        <Marquee />

        {/* Layer 2 — Giant Numbers */}
        <div className="py-8 md:py-12">
          <GiantNumbers />
        </div>

        {/* Layer 3 — Closing Line */}
        <div
          ref={closingRef}
          className={`border-t border-foreground/15 px-6 md:px-12 lg:px-20 py-12 flex justify-center transition-all duration-1000 ${
            closingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-serif-thin italic text-foreground/70 text-lg md:text-2xl text-center max-w-3xl">
            These aren't projections. These are results from real brands in real months.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;
