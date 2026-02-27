import { useEffect, useRef, useState, useCallback } from "react";

const emailCards = [
  { id: 1, label: "EMAIL CREATIVE 01", persona: "TACTICAL GUARDIAN", trigger: "FEAR OF LOSS", usp: "DURABILITY", image: "/images/email-01.png" },
  { id: 2, label: "EMAIL CREATIVE 02", persona: "GEAR SNOB", trigger: "STATUS SIGNALING", usp: "EXCLUSIVITY", image: "/images/email-02.png" },
  { id: 3, label: "EMAIL CREATIVE 03", persona: "WEEKEND WARRIOR", trigger: "ADVENTURE IDENTITY", usp: "VERSATILITY", image: "/images/email-03.png" },
  { id: 4, label: "EMAIL CREATIVE 04", persona: "TACTICAL GUARDIAN", trigger: "PARENTAL INSTINCT", usp: "PROTECTION", image: "/images/email-04.png" },
  { id: 5, label: "EMAIL CREATIVE 05", persona: "GEAR SNOB", trigger: "SUPERIORITY", usp: "CRAFTSMANSHIP", image: "/images/email-05.png" },
  { id: 6, label: "EMAIL CREATIVE 06", persona: "WEEKEND WARRIOR", trigger: "FREEDOM", usp: "WATERPROOF", image: "/images/email-06.png" },
  { id: 7, label: "EMAIL CREATIVE 07", persona: "TACTICAL GUARDIAN", trigger: "AUTHORITY", usp: "MIL-SPEC", image: "/images/email-01.png" },
  { id: 8, label: "EMAIL CREATIVE 08", persona: "GEAR SNOB", trigger: "SOCIAL PROOF", usp: "DESIGN", image: "/images/email-02.png" },
  { id: 9, label: "EMAIL CREATIVE 09", persona: "WEEKEND WARRIOR", trigger: "BELONGING", usp: "ALL-TERRAIN", image: "/images/email-03.png" },
  { id: 10, label: "EMAIL CREATIVE 10", persona: "TACTICAL GUARDIAN", trigger: "SAFETY", usp: "STRENGTH", image: "/images/email-04.png" },
];

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const stripRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const CARD_WIDTH = 220;
  const CARD_GAP = 24;
  const TOTAL_WIDTH = emailCards.length * (CARD_WIDTH + CARD_GAP);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

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

  // Center the strip initially
  useEffect(() => {
    if (containerWidth > 0) {
      setScrollX(-(TOTAL_WIDTH / 2 - containerWidth / 2));
    }
  }, [containerWidth, TOTAL_WIDTH]);

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
    setScrollX(scrollStart + (e.clientX - startX));
  }, [isDragging, scrollStart, startX]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    // Inertia
    let v = velocityRef.current * 15;
    const decay = () => {
      if (Math.abs(v) < 0.5) return;
      v *= 0.95;
      setScrollX(prev => prev + v);
      rafRef.current = requestAnimationFrame(decay);
    };
    rafRef.current = requestAnimationFrame(decay);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScrollX(prev => prev - e.deltaY * 1.5);
  }, []);

  const centerOffset = containerWidth / 2;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, transparent 0%, hsl(var(--background)) 70%)`,
          opacity: 0.5,
        }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* TOP HALF — Headline */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 pt-24 pb-8">
      <div className="max-w-[1400px] w-full flex flex-col items-center text-center">
          <h1 className="leading-[0.85] tracking-tight mb-6 animate-fade-up relative">
            {/* Deep background glow */}
            <div className="absolute -inset-20 blur-[180px] opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary)), transparent 60%)' }}
            />
            {/* Secondary ambient glow */}
            <div className="absolute -inset-10 blur-[100px] opacity-15 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 30% 50%, hsl(var(--primary) / 0.6), transparent 50%), radial-gradient(circle at 70% 50%, hsl(var(--foreground) / 0.1), transparent 50%)' }}
            />

            {/* Far ghost echo — very blurred */}
            <span className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none" aria-hidden="true" style={{ transform: 'scale(1.04)' }}>
              <span className="font-display text-[clamp(3rem,11vw,11rem)] text-pure-white block blur-[18px] opacity-[0.08]">
                I BUILD THE INVISIBLE
              </span>
              <span className="font-display text-[clamp(3rem,11vw,11rem)] text-pure-white block blur-[18px] opacity-[0.08]">
                CLOSERS.
              </span>
            </span>

            {/* Near ghost echo — medium blur */}
            <span className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none" aria-hidden="true" style={{ transform: 'scale(1.015)' }}>
              <span className="font-display text-[clamp(3rem,11vw,11rem)] text-pure-white block blur-[8px] opacity-[0.15]">
                I BUILD THE INVISIBLE
              </span>
              <span className="font-display text-[clamp(3rem,11vw,11rem)] text-pure-white block blur-[8px] opacity-[0.15]">
                CLOSERS.
              </span>
            </span>

            {/* Stroke/outline echo layer */}
            <span className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none" aria-hidden="true">
              <span className="font-display text-[clamp(3rem,11vw,11rem)] text-transparent block" style={{ WebkitTextStroke: '1px hsl(var(--foreground) / 0.15)' }}>
                I BUILD THE INVISIBLE
              </span>
              <span className="font-display text-[clamp(3rem,11vw,11rem)] text-transparent block" style={{ WebkitTextStroke: '1px hsl(var(--foreground) / 0.15)' }}>
                CLOSERS.
              </span>
            </span>

            {/* Main text */}
            <span className="relative z-10 block">
              <span className="font-display text-[clamp(3rem,11vw,11rem)] text-pure-white inline" style={{ textShadow: '0 0 40px hsl(var(--primary) / 0.3), 0 0 80px hsl(var(--primary) / 0.1)' }}>I BUILD THE </span>
              <span className="font-serif-thin italic text-[clamp(2.8rem,10vw,10rem)] text-foreground inline" style={{ lineHeight: '1', textShadow: '0 0 60px hsl(var(--foreground) / 0.2)' }}>
                INVISIBLE
              </span>
            </span>
            <span className="relative z-10 font-display text-[clamp(3rem,11vw,11rem)] text-pure-white block" style={{ textShadow: '0 0 40px hsl(var(--primary) / 0.3), 0 0 80px hsl(var(--primary) / 0.1)' }}>
              CLOSERS.
            </span>
          </h1>
          <p
            className="font-mono text-sm md:text-base text-muted-foreground max-w-2xl mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            The creative backend that owns mental real estate — long after the ad spend stops.
          </p>
          <a
            href="#comparison"
            className="btn-brutal inline-block opacity-0 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            [ ENTER THE ENGINE ]
          </a>
        </div>
      </div>

      {/* BOTTOM HALF — Card Strip */}
      <div
        ref={stripRef}
        className="relative z-10 h-[320px] md:h-[380px] cursor-grab active:cursor-grabbing select-none overflow-hidden opacity-0 animate-fade-up"
        style={{ animationDelay: "0.8s" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <div
          className="absolute top-0 flex items-end h-full"
          style={{
            transform: `translateX(${scrollX}px)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            gap: `${CARD_GAP}px`,
          }}
        >
          {emailCards.map((card, i) => {
            const cardCenter = i * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
            const viewCenter = -scrollX + centerOffset;
            const dist = (cardCenter - viewCenter) / (CARD_WIDTH + CARD_GAP);
            const clampedDist = Math.max(-4, Math.min(4, dist));
            const rotation = clampedDist * 4;
            const lift = Math.max(0, 30 - Math.abs(clampedDist) * 15);
            const scale = 1 + Math.max(0, (1 - Math.abs(clampedDist) * 0.3)) * 0.08;
            const isCenter = Math.abs(dist) < 0.6;
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                className="flex-shrink-0 relative"
                style={{
                  width: CARD_WIDTH,
                  height: 420,
                  transform: `rotate(${isHovered ? 0 : rotation}deg) translateY(${isHovered ? -40 : -lift}px) scale(${isHovered ? 1.12 : scale})`,
                  transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  zIndex: isHovered ? 50 : (isCenter ? 10 : 1),
                  transformOrigin: 'bottom center',
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Red glow for center card */}
                {isCenter && !isHovered && (
                  <div className="absolute -inset-4 rounded-xl opacity-30 pointer-events-none blur-2xl"
                    style={{ background: 'hsl(var(--primary) / 0.4)' }}
                  />
                )}

                <div className="relative w-full h-full border border-foreground/20 bg-secondary overflow-hidden rounded-xl">
                  <img src={card.image} alt={card.label} className="w-full h-full object-cover object-top" loading="lazy" />

                  {/* Hover metadata overlay */}
                  <div className={`absolute inset-0 bg-background/90 flex flex-col justify-end p-4 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="space-y-2">
                      <div>
                        <span className="meta-label text-primary">PERSONA:</span>
                        <span className="font-mono text-[10px] text-foreground ml-1">{card.persona}</span>
                      </div>
                      <div>
                        <span className="meta-label text-primary">TRIGGER:</span>
                        <span className="font-mono text-[10px] text-foreground ml-1">{card.trigger}</span>
                      </div>
                      <div>
                        <span className="meta-label text-primary">USP:</span>
                        <span className="font-mono text-[10px] text-foreground ml-1">{card.usp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
