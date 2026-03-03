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
{ id: 10, label: "EMAIL CREATIVE 10", persona: "TACTICAL GUARDIAN", trigger: "SAFETY", usp: "STRENGTH", image: "/images/email-04.png" }];


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

  const isMobile = containerWidth < 640;
  const CARD_WIDTH = isMobile ? Math.round(containerWidth * 0.58) : 240;
  const CARD_WIDTH_CENTER = isMobile ? CARD_WIDTH : 300;
  const CARD_GAP = isMobile ? 10 : 24;
  const TOTAL_WIDTH = emailCards.length * (CARD_WIDTH + CARD_GAP);

  useEffect(() => {
    let rafId: number;
    const handleMouse = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => {window.removeEventListener("mousemove", handleMouse);cancelAnimationFrame(rafId);};
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

  // Center on a specific card (middle of the array)
  useEffect(() => {
    if (containerWidth > 0) {
      const centerCardIndex = Math.floor(emailCards.length / 2);
      const cardCenterPos = centerCardIndex * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
      setScrollX(-(cardCenterPos - containerWidth / 2));
    }
  }, [containerWidth, CARD_WIDTH, CARD_GAP]);

  // Wrap scroll position for infinite looping
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
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden">

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, transparent 0%, hsl(var(--background)) 70%)`,
          opacity: 0.5
        }} />


      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />


      {/* TOP HALF — Headline */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-4 min-h-[60vh] sm:min-h-[50vh]">
      <div className="max-w-[1400px] w-full flex flex-col items-start text-left">

          {/* Label */}
          <span className="meta-label text-primary mb-6 opacity-0 animate-fade-up">[ZEN RICHARDS]</span>

          <h1 className="leading-[0.9] tracking-tight mb-8 animate-fade-up relative">
            {/* Deep background glow */}
            <div className="absolute -inset-20 blur-[180px] opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary)), transparent 60%)' }} />

            {/* Secondary ambient glow */}
            <div className="absolute -inset-10 blur-[100px] opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 30% 50%, hsl(var(--primary) / 0.6), transparent 50%), radial-gradient(circle at 70% 50%, hsl(var(--foreground) / 0.1), transparent 50%)' }} />

            {/* Far ghost echo */}
            <span className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none select-none" aria-hidden="true" style={{ transform: 'scale(1.04)' }}>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[18px] opacity-[0.08]">CREATIVE STRATEGIST</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[18px] opacity-[0.08]">FOR 6, 7 & 8-FIGURE</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[18px] opacity-[0.08]">DTC BRANDS.</span>
            </span>

            {/* Near ghost echo */}
            <span className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none select-none" aria-hidden="true" style={{ transform: 'scale(1.015)' }}>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[8px] opacity-[0.15]">CREATIVE STRATEGIST</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[8px] opacity-[0.15]">FOR 6, 7 & 8-FIGURE</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block blur-[8px] opacity-[0.15]">DTC BRANDS.</span>
            </span>

            {/* Stroke/outline echo */}
            <span className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none select-none" aria-hidden="true">
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-transparent block" style={{ WebkitTextStroke: '1px hsl(var(--foreground) / 0.15)' }}>CREATIVE STRATEGIST</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-transparent block" style={{ WebkitTextStroke: '1px hsl(var(--foreground) / 0.15)' }}>FOR 6, 7 & 8-FIGURE</span>
              <span className="font-display text-[clamp(2.5rem,8vw,7.5rem)] text-transparent block" style={{ WebkitTextStroke: '1px hsl(var(--foreground) / 0.15)' }}>DTC BRANDS.</span>
            </span>

            {/* Main text */}
            <span className="relative z-10 font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block" style={{ textShadow: '0 0 40px hsl(var(--primary) / 0.3), 0 0 80px hsl(var(--primary) / 0.1)' }}>
              CREATIVE STRATEGIST
            </span>
            <span className="relative z-10 font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block" style={{ textShadow: '0 0 40px hsl(var(--primary) / 0.3), 0 0 80px hsl(var(--primary) / 0.1)' }}>
              FOR 6, 7 & 8-FIGURE
            </span>
            <span className="relative z-10 font-display text-[clamp(2.5rem,8vw,7.5rem)] text-pure-white block" style={{ textShadow: '0 0 40px hsl(var(--primary) / 0.3), 0 0 80px hsl(var(--primary) / 0.1)' }}>
              DTC BRANDS.
            </span>
          </h1>

          {/* Subheadline */}
          <div className="font-serif-thin italic text-foreground text-base md:text-lg max-w-xl mb-10 opacity-0 animate-fade-up leading-relaxed" style={{ animationDelay: "0.3s" }}>
            <p className="mb-4">You know the agencies that spend three weeks on a moodboard and never move the needle?</p>
            <p className="mb-4">Not here.</p>
            <p className="mb-4">
              $2M+ in revenue generated.<br />
              1,200+ creatives shipped.<br />
              Worked inside 8-figure agencies.
            </p>
            <p>This is how we demystify 'the creative' and actually drive conversions.</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <a
              href="#portfolio"
              className="px-8 py-3 text-xs uppercase tracking-[0.3em] font-mono bg-pure-white text-background transition-all duration-300 hover:bg-background hover:text-pure-white border border-transparent hover:border-foreground/60 inline-block text-center"
            >
              [ SEE THE PORTFOLIO → ]
            </a>
            <a
              href="/creative-world"
              className="px-8 py-3 text-xs uppercase tracking-[0.3em] font-mono text-pure-white border border-foreground/60 transition-all duration-300 hover:bg-primary hover:border-primary hover:text-pure-white inline-block text-center"
            >
              [ SEE OUR LATEST CREATIVE WORLD → ]
            </a>
          </div>
        </div>
      </div>

      {/* Content Pillars Strip */}
      <div className="relative z-10 border-t border-b border-foreground/10 py-5 px-6 md:px-12 lg:px-20 opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <span className="meta-label text-primary whitespace-nowrap">[WHAT WE DO]</span>
          <div className="flex flex-wrap justify-center gap-4">
            {["EMAIL & RETENTION", "AD CREATIVE", "SHORT FORM & HOOKS", "SCRIPTING & BRIEFS"].map((pill) => (
              <span
                key={pill}
                className="border border-foreground/20 rounded-full px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-all duration-200 hover:border-primary hover:text-pure-white cursor-default"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'hsl(10 100% 56% / 0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM HALF — Card Strip */}
      <div
        ref={stripRef}
        className="relative z-10 cursor-grab active:cursor-grabbing select-none overflow-hidden opacity-0 animate-fade-up pb-12 my-[4px] py-[111px]"
        style={{ animationDelay: "0.8s" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}>

        <div
          className="flex items-end"
          style={{
            transform: `translateX(${scrollX}px)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            gap: `${CARD_GAP}px`
          }}>

          {emailCards.map((card, i) => {
            const cardCenter = i * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
            const viewCenter = -scrollX + centerOffset;
            let dist = (cardCenter - viewCenter) / (CARD_WIDTH + CARD_GAP);
            // Wrap distance for circular effect
            const totalCards = emailCards.length;
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
                  transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), width 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                  zIndex: isHovered ? 50 : isCenter ? 10 : 1,
                  transformOrigin: 'bottom center'
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}>

                {/* Red glow for center card */}
                {isCenter && !isHovered &&
                <div className="absolute -inset-4 rounded-2xl opacity-30 pointer-events-none blur-2xl"
                style={{ background: 'hsl(var(--primary) / 0.4)' }} />

                }

                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    backgroundColor: '#0a0a0a',
                    borderRadius: isMobile ? '20px' : '16px',
                    border: '1px solid hsl(var(--foreground) / 0.2)',
                    aspectRatio: isMobile ? '9 / 16' : undefined
                  }}>

                  <img
                    src={card.image}
                    alt={card.label}
                    className="w-full block"
                    style={{
                      height: isMobile ? '100%' : 'auto',
                      objectFit: isMobile ? 'cover' : undefined,
                      objectPosition: 'top center',
                      maxHeight: isMobile ? undefined : '500px'
                    }}
                    loading="lazy"
                    draggable={false} />


                  {/* Dark overlay for non-center cards */}
                  {!isCenter && !isHovered &&
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" style={{ borderRadius: '16px' }} />
                  }

                  {/* Hover metadata overlay */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'}`
                    }
                    style={{ backgroundColor: 'rgba(10,10,10,0.9)', borderRadius: '16px' }}>

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
              </div>);

          })}
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-8 pt-4 flex flex-col md:flex-row gap-4 md:gap-8 opacity-0 animate-fade-up" style={{ animationDelay: "1s" }}>
        <span className="meta-label">[EST. CREATIVE BACKEND SYSTEMS]</span>
        <span className="meta-label">[SPECIALITY: EMAIL · ADS · STRATEGY]</span>
      </div>
    </section>);

};

export default HeroSection;