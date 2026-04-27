import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface CarouselCard {
  id: number;
  image: string;
}

interface CarouselStripProps {
  cards: CarouselCard[];
  direction: "left" | "right";
  autoScroll?: boolean;
  className?: string;
  desktopCardWidth?: number;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const CarouselStrip = ({ cards, direction, autoScroll = true, className = "", desktopCardWidth = 220 }: CarouselStripProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const autoScrollRef = useRef<number>(0);
  const pauseUntilRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [metrics, setMetrics] = useState({ containerWidth: 0, cardWidth: desktopCardWidth, gap: 24 });
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const { containerWidth, cardWidth, gap } = metrics;
  const isMobile = containerWidth < 640;
  const step = cardWidth + gap;
  const totalWidth = cards.length * step;
  const autoSpeed = direction === "left" ? -32 : 32;
  const displayCards = useMemo(
    () => [0, 1, 2].flatMap((repeat) => cards.map((card) => ({ ...card, repeat, key: `${repeat}-${card.id}` }))),
    [cards]
  );

  const normalize = useCallback(
    (value: number) => {
      if (!totalWidth) return value;
      let next = value;
      while (next <= -totalWidth * 2) next += totalWidth;
      while (next >= 0) next -= totalWidth;
      return next;
    },
    [totalWidth]
  );

  const applyLayout = useCallback(
    (value = positionRef.current) => {
      const x = normalize(value);
      positionRef.current = x;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      if (!containerWidth || !step) return;

      const viewportCenter = containerWidth / 2;
      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        const cardCenter = x + index * step + cardWidth / 2;
        const dist = (cardCenter - viewportCenter) / step;
        const absDist = Math.abs(dist);
        const clampedDist = clamp(dist, -4, 4);
        const rotation = isMobile ? clampedDist * 0.7 : clampedDist * 3.2;
        const lift = isMobile ? 0 : Math.max(0, 24 - absDist * 12);
        const scale = isMobile ? 1 : 1 + Math.max(0, 1 - absDist * 0.35) * 0.06;
        const isHovered = hoveredCard === index;
        const isCenter = absDist < 0.6;

        el.style.opacity = isMobile ? `${Math.max(0.45, 1 - absDist * 0.18)}` : "1";
        el.style.zIndex = isHovered ? "50" : isCenter ? "10" : "1";
        el.style.transform = `rotate(${isHovered && !isMobile ? 0 : rotation}deg) translate3d(0, ${isHovered && !isMobile ? -34 : -lift}px, 0) scale(${isHovered && !isMobile ? 1.1 : scale})`;
      });
    },
    [cardWidth, containerWidth, hoveredCard, isMobile, normalize, step]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const width = el.offsetWidth;
      setMetrics({
        containerWidth: width,
        cardWidth: width < 640 ? Math.max(176, Math.round(width * 0.58)) : desktopCardWidth,
        gap: width < 640 ? 10 : 24,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [desktopCardWidth]);

  useEffect(() => {
    if (!containerWidth || !totalWidth) return;
    const middleStart = -totalWidth;
    const centerCardIndex = Math.floor(cards.length / 2);
    positionRef.current = middleStart + containerWidth / 2 - (centerCardIndex * step + cardWidth / 2);
    applyLayout(positionRef.current);
  }, [applyLayout, cardWidth, cards.length, containerWidth, step, totalWidth]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHasEntered(entry.isIntersecting),
      { rootMargin: "220px 0px", threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    applyLayout();
  }, [applyLayout, hoveredCard]);

  useEffect(() => {
    if (!autoScroll || !hasEntered || !totalWidth) return;
    let previous = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(48, now - previous) / 1000;
      previous = now;
      if (!isDraggingRef.current && now > pauseUntilRef.current) {
        applyLayout(positionRef.current + autoSpeed * delta);
      }
      autoScrollRef.current = requestAnimationFrame(tick);
    };
    autoScrollRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoScrollRef.current);
  }, [applyLayout, autoScroll, autoSpeed, hasEntered, totalWidth]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    pauseUntilRef.current = performance.now() + 1600;
    cancelAnimationFrame(rafRef.current);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const now = performance.now();
      const dx = e.clientX - lastXRef.current;
      const dt = Math.max(1, now - lastTimeRef.current);
      velocityRef.current = dx / dt;
      lastXRef.current = e.clientX;
      lastTimeRef.current = now;
      applyLayout(positionRef.current + dx);
    },
    [applyLayout]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    let velocity = velocityRef.current * 16;
    const decay = () => {
      if (Math.abs(velocity) < 0.12) {
        pauseUntilRef.current = performance.now() + 900;
        return;
      }
      velocity *= 0.92;
      applyLayout(positionRef.current + velocity);
      rafRef.current = requestAnimationFrame(decay);
    };
    rafRef.current = requestAnimationFrame(decay);
  }, [applyLayout]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      pauseUntilRef.current = performance.now() + 1400;
      applyLayout(positionRef.current - e.deltaX);
    },
    [applyLayout]
  );

  if (!cards.length) return null;

  return (
    <div
      ref={containerRef}
      className={`relative z-10 cursor-grab active:cursor-grabbing select-none overflow-hidden touch-pan-y py-10 md:py-14 ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handlePointerUp}
      onWheel={handleWheel}
    >
      <div
        ref={trackRef}
        className="flex items-end will-change-transform"
        style={{ gap, transition: isDragging ? "none" : "transform 80ms linear" }}
      >
        {displayCards.map((card, i) => (
          <div
            key={card.key}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="relative flex-shrink-0 will-change-transform"
            style={{
              width: cardWidth,
              opacity: hasEntered ? 1 : 0,
              transform: hasEntered ? undefined : "translate3d(0, 160px, 0) scale(0.8)",
              transition: isDragging
                ? "none"
                : "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease",
              transformOrigin: "bottom center",
            }}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className="relative w-full overflow-hidden bg-card border border-foreground/20"
              style={{ aspectRatio: "9 / 16" }}
            >
              <img
                src={card.image}
                alt={`Email creative ${card.id}`}
                className="block h-full w-full object-cover object-top"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <div className="absolute inset-0 bg-background/25 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselStrip;
