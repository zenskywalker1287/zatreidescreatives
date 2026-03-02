import { useState, useCallback, useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getCaseStudyBySlug, getAdjacentStudies } from "@/data/caseStudyData";
import type { Deliverable } from "@/data/caseStudyData";

const DeliverableIcon = ({ item }: { item: Deliverable }) => {
  const Icon = item.icon;
  return (
    <div className="flex flex-col items-center gap-2 group cursor-default">
      <div
        className="w-12 h-12 flex items-center justify-center border border-foreground/20 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.15)]"
        style={{ background: "#0a0a0a" }}
      >
        <Icon
          size={24}
          strokeWidth={1.2}
          className="text-foreground/70 transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]"
        />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/50 transition-colors duration-300 group-hover:text-foreground/80 text-center leading-tight max-w-[80px]">
        {item.label}
      </span>
    </div>
  );
};

const HeroCarousel = ({ images }: { images: string[] }) => {
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
  const CARD_GAP = isMobile ? 10 : 24;
  const TOTAL_WIDTH = images.length * (CARD_WIDTH + CARD_GAP);

  useEffect(() => {
    if (stripRef.current) setContainerWidth(stripRef.current.offsetWidth);
    const handleResize = () => {
      if (stripRef.current) setContainerWidth(stripRef.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (containerWidth > 0) {
      const centerCardIndex = Math.floor(images.length / 2);
      const cardCenterPos = centerCardIndex * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
      setScrollX(-(cardCenterPos - containerWidth / 2));
    }
  }, [containerWidth, CARD_WIDTH, CARD_GAP, images.length]);

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

  if (!images.length) return null;

  const centerOffset = containerWidth / 2;

  return (
    <div
      ref={stripRef}
      className="relative cursor-grab active:cursor-grabbing select-none overflow-hidden py-16"
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
        {images.map((img, i) => {
          const cardCenter = i * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
          const viewCenter = -scrollX + centerOffset;
          let dist = (cardCenter - viewCenter) / (CARD_WIDTH + CARD_GAP);
          const totalCards = images.length;
          if (dist > totalCards / 2) dist -= totalCards;
          if (dist < -totalCards / 2) dist += totalCards;
          const clampedDist = Math.max(-4, Math.min(4, dist));
          const absDist = Math.abs(clampedDist);
          const rotation = isMobile ? clampedDist * 1 : clampedDist * 4;
          const lift = isMobile ? 0 : Math.max(0, 30 - absDist * 15);
          const scale = isMobile ? 1 : 1 + Math.max(0, 1 - absDist * 0.3) * 0.08;
          const isCenter = Math.abs(dist) < 0.6;
          const isHovered = hoveredCard === i;
          const cardOpacity = isMobile ? Math.max(0.4, 1 - absDist * 0.2) : 1;

          return (
            <div
              key={i}
              className="flex-shrink-0 relative"
              style={{
                width: CARD_WIDTH,
                opacity: cardOpacity,
                transform: `rotate(${isHovered && !isMobile ? 0 : rotation}deg) translateY(${isHovered && !isMobile ? -40 : -lift}px) scale(${isHovered && !isMobile ? 1.12 : scale})`,
                transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
                zIndex: isHovered ? 50 : isCenter ? 10 : 1,
                transformOrigin: "bottom center",
              }}
              onMouseEnter={() => setHoveredCard(i)}
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
                  border: `1px solid hsl(var(--foreground) / 0.2)`,
                  aspectRatio: isMobile ? "9 / 16" : undefined,
                }}
              >
                <img
                  src={img}
                  alt={`Email creative ${i + 1}`}
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
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" style={{ borderRadius: "16px" }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!study) return <Navigate to="/" replace />;

  const { prev, next } = getAdjacentStudies(study.slug);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="film-grain" />

      {/* Header */}
      <div className="border-b border-foreground/10 px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
        <Link to="/" className="meta-label text-primary hover:text-foreground transition-colors">
          ← BACK TO COMMAND
        </Link>
        <span className="meta-label text-muted-foreground">CASE STUDY / {study.name}</span>
      </div>

      {/* Hero */}
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32 text-center">
        <span className="meta-label text-primary block mb-6">[{study.niche}]</span>
        <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] text-pure-white mb-4">
          {study.headline}
        </h1>
        <p className="font-serif-thin text-xl md:text-2xl text-muted-foreground italic mb-4 max-w-2xl mx-auto">
          {study.subheadline}
        </p>
        <p className="font-mono text-sm text-foreground/60 max-w-xl leading-relaxed mb-8 mx-auto">
          {study.context}
        </p>

        {/* Icon badges row */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {study.deliverables.map((d, i) => (
            <DeliverableIcon key={i} item={d} />
          ))}
        </div>
      </div>

      {/* Hero Images Carousel */}
      {study.heroImages.length > 0 && (
        <div className="pb-16">
          <HeroCarousel images={study.heroImages} />
        </div>
      )}

      {/* Divider */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="w-full h-px bg-foreground/15" />
      </div>

      {/* Sections */}
      <div className="px-6 md:px-12 lg:px-20 py-20 space-y-16 text-center">
        {study.sections.map((section, i) => (
          <div key={i}>
            <span className="meta-label text-primary block mb-4">[{String(i + 1).padStart(2, "0")}] {section.title}</span>
            <p className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl mx-auto">
              {section.body}
            </p>
          </div>
        ))}

        {/* Stat callout */}
        <div className="border border-primary/30 p-8 md:p-12 text-center">
          <span className="meta-label text-primary block mb-4">KEY RESULT</span>
          <p className="font-display text-[clamp(2rem,5vw,4rem)] text-pure-white leading-none">
            {study.stat}
          </p>
        </div>
      </div>

      {/* Prev / Next navigation */}
      <div className="border-t border-foreground/10 px-6 md:px-12 lg:px-20 py-12 flex justify-between items-center">
        <Link
          to={`/case-studies/${prev.slug}`}
          className="group flex items-center gap-3 transition-colors"
        >
          <span className="font-mono text-sm text-foreground/40 group-hover:text-primary transition-colors">←</span>
          <div>
            <span className="meta-label text-muted-foreground/50 block">PREVIOUS</span>
            <span className="font-display text-lg md:text-xl text-foreground/70 group-hover:text-foreground transition-colors">
              {prev.name}
            </span>
          </div>
        </Link>
        <Link
          to={`/case-studies/${next.slug}`}
          className="group flex items-center gap-3 text-right transition-colors"
        >
          <div>
            <span className="meta-label text-muted-foreground/50 block">NEXT</span>
            <span className="font-display text-lg md:text-xl text-foreground/70 group-hover:text-foreground transition-colors">
              {next.name}
            </span>
          </div>
          <span className="font-mono text-sm text-foreground/40 group-hover:text-primary transition-colors">→</span>
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-foreground/5 px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="meta-label text-primary">CMD.CTRL</Link>
        <span className="meta-label text-muted-foreground/40">© 2026 — CREATIVE BACKEND SYSTEMS</span>
      </footer>
    </div>
  );
};

export default CaseStudy;