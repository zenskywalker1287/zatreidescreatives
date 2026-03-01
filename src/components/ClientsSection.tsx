import { useState, useCallback, useRef } from "react";

const brands = [
  {
    name: "XYKO",
    niche: "FASHION & LIFESTYLE",
    stat: "FULL BRAND OVERHAUL",
    slug: "/case-studies/xyko",
    image: "/images/brand-xyko.png",
  },
  {
    name: "MADCOW",
    niche: "PET ACCESSORIES",
    stat: "40% REVENUE FROM EMAIL",
    slug: "/case-studies/madcow",
    image: "/images/brand-madcow.png",
  },
  {
    name: "FLATPACK",
    niche: "HOME & LIFESTYLE",
    stat: "$100K IN ONE MONTH",
    slug: "/case-studies/flatpack",
    image: "/images/brand-flatpack.png",
  },
  {
    name: "4AM SKIN",
    niche: "SKINCARE & BEAUTY",
    stat: "FULL BRAND SYSTEM",
    slug: "/case-studies/4am-skin",
    image: "/images/brand-4amskin.png",
  },
  {
    name: "MKTG",
    niche: "8-FIGURE KLAVIYO AGENCY",
    stat: "$1M GENERATED · 12+ BRANDS",
    slug: "/case-studies/mktg",
    image: null,
  },
  {
    name: "ADSUMO DIGITAL",
    niche: "AGENCY — MULTIPLE BRANDS",
    stat: "HIGH 6-FIGURE CAMPAIGNS",
    slug: "/case-studies/adsumo",
    image: null,
  },
];

const ClientsSection = () => {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const dragStartX = useRef(0);
  const dragStartActive = useRef(0);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      dragStartX.current = e.clientX;
      dragStartActive.current = active;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [active]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      const dx = e.clientX - dragStartX.current;
      if (Math.abs(dx) > 60) {
        const dir = dx < 0 ? 1 : -1;
        setActive((prev) => Math.max(0, Math.min(brands.length - 1, prev + dir)));
      }
    },
    [isDragging]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((p) => Math.min(brands.length - 1, p + 1));
      if (e.key === "ArrowLeft") setActive((p) => Math.max(0, p - 1));
    },
    []
  );

  return (
    <section
      id="clients"
      className="section-border bg-background py-20 md:py-32 overflow-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <span className="meta-label text-primary">[03] THE BRANDS</span>
        <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-pure-white mt-4">
          THE BRANDS.
        </h2>
        <span className="meta-label text-muted-foreground mt-2 block">
          [CLICK TO ENTER THE CASE STUDY]
        </span>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="relative w-full flex items-end justify-center cursor-grab active:cursor-grabbing select-none"
        style={{ height: "clamp(480px, 65vh, 700px)", perspective: "1200px" }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {brands.map((brand, i) => {
          const offset = i - active;
          const isActive = offset === 0;
          const isHovered = hoveredCard === i;
          const absOffset = Math.abs(offset);

          const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
          const translateX = offset * (isMobile ? 140 : 220);
          const translateZ = isActive ? 60 : -(absOffset * 80);
          const rotateY = offset * -12;
          const scale = isActive ? 1 : 0.78 - absOffset * 0.04;
          const cardWidth = isActive ? (isMobile ? 260 : 340) : (isMobile ? 140 : 200);
          const zIndex = 10 - absOffset;
          const brightness = isActive ? 1 : 0.4 - absOffset * 0.08;

          // Pop-out image heights
          const imageHeight = isActive ? "150%" : isHovered ? "150%" : "130%";
          const overlayOpacity = isActive ? 0 : isHovered ? 0.2 : 0.45;

          return (
            <div
              key={i}
              className="absolute transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width: cardWidth,
                height: "75%",
                bottom: "8%",
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                filter: `brightness(${Math.max(0.15, brightness)})`,
                cursor: isActive ? "pointer" : "pointer",
                overflow: "visible",
              }}
              onClick={() => {
                if (isActive) {
                  window.location.href = brand.slug;
                } else {
                  setActive(i);
                }
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Red glow behind active */}
              {isActive && (
                <div
                  className="absolute -inset-8 blur-[80px] opacity-30 pointer-events-none"
                  style={{ background: "hsl(var(--primary))" }}
                />
              )}

              {/* Card container with visible overflow for pop-out */}
              <div
                className="relative w-full h-full transition-all duration-500"
                style={{
                  borderRadius: "16px",
                  border: `1px solid ${isActive ? "hsl(var(--primary))" : "rgba(255,255,255,0.15)"}`,
                  overflow: "hidden",
                  background: "#0a0a0a",
                }}
              >
                {/* Pop-out image wrapper — bleeds above card */}
                <div
                  className="absolute left-0 right-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    bottom: 0,
                    height: imageHeight,
                    overflow: "visible",
                    zIndex: 1,
                  }}
                >
                  {brand.image ? (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full transition-transform duration-700"
                      style={{
                        objectFit: "cover",
                        objectPosition: "top center",
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                      }}
                      loading="lazy"
                    />
                  ) : (
                    /* Dark editorial placeholder for MKTG / ADSUMO */
                    <div className="w-full h-full bg-gradient-to-b from-foreground/5 to-background flex items-center justify-center">
                      <span className="font-display text-foreground/[0.08] text-[80px] md:text-[120px] leading-none select-none">
                        {brand.name}
                      </span>
                    </div>
                  )}

                  {/* Dark overlay for inactive cards */}
                  <div
                    className="absolute inset-0 bg-background transition-opacity duration-500 pointer-events-none"
                    style={{ opacity: overlayOpacity }}
                  />

                  {/* Bottom gradient for readability */}
                  <div
                    className="absolute bottom-0 left-0 right-0 pointer-events-none"
                    style={{
                      height: "60%",
                      background: "linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)",
                    }}
                  />
                </div>

                {/* Bottom content — always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                  <h3
                    className={`font-display text-pure-white leading-none transition-all duration-500 ${
                      isActive
                        ? "text-[clamp(1.8rem,4vw,3rem)] translate-y-0 opacity-100"
                        : "text-lg translate-y-2 opacity-70"
                    }`}
                  >
                    {brand.name}
                  </h3>
                  <span className="meta-label text-muted-foreground mt-2 block">
                    [{brand.niche}]
                  </span>

                  {/* Stat badge */}
                  <div
                    className={`mt-3 inline-block border border-primary/40 px-3 py-1 rounded-full transition-all duration-500 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-primary tracking-wider">
                      {brand.stat}
                    </span>
                  </div>

                  {/* CTA — active only */}
                  <div
                    className={`mt-4 transition-all duration-500 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <span className="btn-brutal inline-block text-[10px] py-2 px-4">
                      [ VIEW CASE STUDY → ]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {brands.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 transition-all duration-300 ${
              i === active
                ? "bg-primary scale-125"
                : "bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;
