import { useEffect, useRef, useState, useCallback } from "react";

export interface CarouselCard {
  id: number;
  image: string;
}

interface CarouselStripProps {
  cards: CarouselCard[];
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

export default CarouselStrip;
