import { useEffect, useRef, useState, useCallback } from "react";

const topCards = [
  { id: 1, image: "/images/email-01.png" },
  { id: 2, image: "/images/email-02.png" },
  { id: 3, image: "/images/email-03.png" },
  { id: 4, image: "/images/email-04.png" },
  { id: 5, image: "/images/email-05.png" },
  { id: 6, image: "/images/email-06.png" },
  { id: 7, image: "/images/email-01.png" },
  { id: 8, image: "/images/email-02.png" },
  { id: 9, image: "/images/email-03.png" },
  { id: 10, image: "/images/email-04.png" },
];

const bottomCards = [
  { id: 101, image: "/images/slice1.png" },
  { id: 102, image: "/images/slice2.png" },
  { id: 103, image: "/images/slice3.png" },
  { id: 104, image: "/images/slice4.png" },
  { id: 105, image: "/images/slice5.png" },
  { id: 106, image: "/images/slice6.png" },
  { id: 107, image: "/images/slice7.png" },
  { id: 108, image: "/images/slice8.png" },
  { id: 109, image: "/images/slice9.png" },
  { id: 110, image: "/images/slice10.png" },
  { id: 111, image: "/images/slice11.png" },
  { id: 112, image: "/images/slice12.png" },
  { id: 113, image: "/images/slice13.png" },
  { id: 114, image: "/images/slice14.png" },
  { id: 115, image: "/images/slice15.png" },
  { id: 116, image: "/images/slice16.png" },
  { id: 117, image: "/images/slice17.png" },
  { id: 118, image: "/images/slice18.png" },
  { id: 119, image: "/images/slice19.png" },
  { id: 120, image: "/images/slice20.png" },
  { id: 121, image: "/images/slice41.png" },
  { id: 122, image: "/images/slice42.png" },
  { id: 123, image: "/images/slice43.png" },
  { id: 124, image: "/images/slice44.png" },
  { id: 125, image: "/images/slice45.png" },
];

interface CarouselStripProps {
  cards: typeof topCards;
  direction: "left" | "right";
}

const CarouselStrip = ({ cards, direction }: CarouselStripProps) => {
  const stripRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const autoScrollRef = useRef<number>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const isMobile = containerWidth < 640;
  const CARD_WIDTH = isMobile ? Math.round(containerWidth * 0.58) : 240;
  const CARD_GAP = isMobile ? 10 : 24;
  const TOTAL_WIDTH = cards.length * (CARD_WIDTH + CARD_GAP);
  const AUTO_SPEED = direction === "left" ? -0.5 : 0.5;

  useEffect(() => {
    if (stripRef.current) {
      setContainerWidth(stripRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (stripRef.current) setContainerWidth(stripRef.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (containerWidth > 0) {
      const centerCardIndex = Math.floor(cards.length / 2);
      const cardCenterPos = centerCardIndex * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
      setScrollX(-(cardCenterPos - containerWidth / 2));
    }
  }, [containerWidth, CARD_WIDTH, CARD_GAP, cards.length]);

  const wrapScroll = useCallback((x: number) => {
    const min = -(TOTAL_WIDTH - containerWidth / 2);
    const max = containerWidth / 2;
    const range = max - min;
    if (range <= 0) return x;
    let wrapped = x;
    while (wrapped < min) wrapped += range;
    while (wrapped > max) wrapped -= range;
    return wrapped;
  }, [TOTAL_WIDTH, containerWidth]);

  // Auto-scroll
  useEffect(() => {
    if (isDragging) return;
    const tick = () => {
      setScrollX((prev) => wrapScroll(prev + AUTO_SPEED));
      autoScrollRef.current = requestAnimationFrame(tick);
    };
    autoScrollRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoScrollRef.current);
  }, [isDragging, wrapScroll, AUTO_SPEED]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollStart(scrollX);
    lastXRef.current = e.clientX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [scrollX]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    const dx = e.clientX - lastXRef.current;
    if (dt > 0) velocityRef.current = dx / dt;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
    setScrollX(wrapScroll(scrollStart + (e.clientX - startX)));
  }, [isDragging, scrollStart, startX, wrapScroll]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    let v = velocityRef.current * 15;
    const decay = () => {
      if (Math.abs(v) < 0.5) return;
      v *= 0.95;
      setScrollX((prev) => wrapScroll(prev + v));
      rafRef.current = requestAnimationFrame(decay);
    };
    rafRef.current = requestAnimationFrame(decay);
  }, [wrapScroll]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScrollX((prev) => wrapScroll(prev - e.deltaY * 1.5));
  }, [wrapScroll]);

  const centerOffset = containerWidth / 2;

  return (
    <div
      ref={stripRef}
      className="relative z-10 cursor-grab active:cursor-grabbing select-none overflow-hidden py-8"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
    >
      <div
        className="flex items-end"
        style={{
          transform: `translateX(${scrollX}px)`,
          transition: isDragging ? "none" : "transform 0.1s ease-out",
          gap: `${CARD_GAP}px`,
        }}
      >
        {cards.map((card, i) => {
          const cardCenter = i * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
          const viewCenter = -scrollX + centerOffset;
          let dist = (cardCenter - viewCenter) / (CARD_WIDTH + CARD_GAP);
          const totalCards = cards.length;
          if (dist > totalCards / 2) dist -= totalCards;
          if (dist < -totalCards / 2) dist += totalCards;
          const clampedDist = Math.max(-4, Math.min(4, dist));
          const absDist = Math.abs(clampedDist);
          const rotation = isMobile ? clampedDist * 1 : clampedDist * 4;
          const lift = isMobile ? 0 : Math.max(0, 30 - absDist * 15);
          const scale = isMobile ? 1 : 1 + Math.max(0, 1 - absDist * 0.3) * 0.08;
          const isCenter = Math.abs(dist) < 0.6;
          const isHovered = hoveredCard === card.id;
          const cardOpacity = isMobile ? Math.max(0.4, 1 - absDist * 0.2) : 1;

          return (
            <div
              key={card.id}
              className="flex-shrink-0 relative"
              style={{
                width: CARD_WIDTH,
                opacity: cardOpacity,
                transform: `rotate(${isHovered && !isMobile ? 0 : rotation}deg) translateY(${isHovered && !isMobile ? -40 : -lift}px) scale(${isHovered && !isMobile ? 1.12 : scale})`,
                transition: isDragging
                  ? "none"
                  : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
                zIndex: isHovered ? 50 : isCenter ? 10 : 1,
                transformOrigin: "bottom center",
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {isCenter && !isHovered && (
                <div
                  className="absolute -inset-4 rounded-2xl opacity-30 pointer-events-none blur-2xl"
                  style={{ background: "hsl(var(--primary) / 0.4)" }}
                />
              )}

              <div
                className="relative w-full overflow-hidden"
                style={{
                  backgroundColor: "#0a0a0a",
                  borderRadius: isMobile ? "20px" : "16px",
                  border: "1px solid hsl(var(--foreground) / 0.2)",
                  aspectRatio: isMobile ? "9 / 16" : undefined,
                }}
              >
                <img
                  src={card.image}
                  alt={`Email creative ${card.id}`}
                  className="w-full block"
                  style={{
                    height: isMobile ? "100%" : "auto",
                    objectFit: isMobile ? "cover" : undefined,
                    objectPosition: "top center",
                    maxHeight: isMobile ? undefined : "500px",
                  }}
                  loading="lazy"
                  draggable={false}
                />

                {!isCenter && !isHovered && (
                  <div
                    className="absolute inset-0 bg-black/40 pointer-events-none"
                    style={{ borderRadius: "16px" }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    let rafId: number;
    const handleMouse = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => { window.removeEventListener("mousemove", handleMouse); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <section id="hero" className="relative flex flex-col overflow-hidden">
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, transparent 0%, hsl(var(--background)) 70%)`,
          opacity: 0.5,
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* TOP CAROUSEL — scrolls LEFT */}
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <CarouselStrip cards={topCards} direction="left" />
      </div>

      {/* HEADLINE */}
      <div className="relative z-10 flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 py-8">
        <div className="max-w-[1400px] w-full flex flex-col items-center text-center">
          <span className="meta-label text-primary mb-6 opacity-0 animate-fade-up">[ZEN RICHARDS]</span>

          <h1 className="leading-[0.9] tracking-tight mb-6 animate-fade-up relative">
            <div className="absolute -inset-20 blur-[180px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary)), transparent 60%)" }} />
            <div className="absolute -inset-10 blur-[100px] opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 50%, hsl(var(--primary) / 0.6), transparent 50%), radial-gradient(circle at 70% 50%, hsl(var(--foreground) / 0.1), transparent 50%)" }} />

            <span className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none" aria-hidden="true" style={{ transform: "scale(1.04)" }}>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[18px] opacity-[0.08]">CREATIVE STRATEGIST</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[18px] opacity-[0.08]">FOR 6, 7 & 8-FIGURE</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[18px] opacity-[0.08]">DTC BRANDS.</span>
            </span>

            <span className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none" aria-hidden="true" style={{ transform: "scale(1.015)" }}>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[8px] opacity-[0.15]">CREATIVE STRATEGIST</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[8px] opacity-[0.15]">FOR 6, 7 & 8-FIGURE</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[8px] opacity-[0.15]">DTC BRANDS.</span>
            </span>

            <span className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none" aria-hidden="true">
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-transparent block" style={{ WebkitTextStroke: "1px hsl(var(--foreground) / 0.15)" }}>CREATIVE STRATEGIST</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-transparent block" style={{ WebkitTextStroke: "1px hsl(var(--foreground) / 0.15)" }}>FOR 6, 7 & 8-FIGURE</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-transparent block" style={{ WebkitTextStroke: "1px hsl(var(--foreground) / 0.15)" }}>DTC BRANDS.</span>
            </span>

            <span className="relative z-10 font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block" style={{ textShadow: "0 0 40px hsl(var(--primary) / 0.3), 0 0 80px hsl(var(--primary) / 0.1)" }}>CREATIVE STRATEGIST</span>
            <span className="relative z-10 font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block" style={{ textShadow: "0 0 40px hsl(var(--primary) / 0.3), 0 0 80px hsl(var(--primary) / 0.1)" }}>FOR 6, 7 & 8-FIGURE</span>
            <span className="relative z-10 font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block" style={{ textShadow: "0 0 40px hsl(var(--primary) / 0.3), 0 0 80px hsl(var(--primary) / 0.1)" }}>DTC BRANDS.</span>
          </h1>

          <div className="font-serif-thin italic text-foreground text-sm md:text-base max-w-xl mb-6 opacity-0 animate-fade-up leading-relaxed" style={{ animationDelay: "0.3s" }}>
            <p className="mb-2">$2M+ in revenue generated. 1,200+ creatives shipped. Worked inside 8-figure agencies.</p>
            <p>This is how we demystify 'the creative' and actually drive conversions.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-5 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <a href="#portfolio" className="px-8 py-3 text-xs uppercase tracking-[0.3em] font-mono bg-pure-white text-background transition-all duration-300 hover:bg-background hover:text-pure-white border border-transparent hover:border-foreground/60 inline-block text-center">[ SEE THE PORTFOLIO → ]</a>
            <a href="/creative-world" className="px-8 py-3 text-xs uppercase tracking-[0.3em] font-mono text-pure-white border border-foreground/60 transition-all duration-300 hover:bg-primary hover:border-primary hover:text-pure-white inline-block text-center">[ SEE OUR LATEST CREATIVE WORLD → ]</a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 opacity-0 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <span className="meta-label text-primary mr-1">[WHAT WE DO]</span>
            {["EMAIL & RETENTION", "AD CREATIVE", "SHORT FORM & HOOKS", "SCRIPTING & BRIEFS"].map((pill) => (
              <span
                key={pill}
                className="border border-foreground/20 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground transition-all duration-200 hover:border-primary hover:text-pure-white cursor-default"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "hsl(10 100% 56% / 0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CAROUSEL — scrolls RIGHT */}
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.8s" }}>
        <CarouselStrip cards={bottomCards} direction="right" />
      </div>

      {/* Bottom metadata */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-8 pt-4 flex flex-col md:flex-row gap-4 md:gap-8 opacity-0 animate-fade-up" style={{ animationDelay: "1s" }}>
        <span className="meta-label">[EST. CREATIVE BACKEND SYSTEMS]</span>
        <span className="meta-label">[SPECIALITY: EMAIL · ADS · STRATEGY]</span>
      </div>
    </section>
  );
};

export default HeroSection;
