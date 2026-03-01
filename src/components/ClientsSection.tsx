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
        style={{ height: "clamp(550px, 75vh, 850px)", perspective: "1200px" }}
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
          const translateX = offset * (isMobile ? 110 : 180);
          const translateZ = isActive ? 60 : -(absOffset * 80);
          const rotateY = offset * -12;
          const scale = isActive ? 1 : 0.78 - absOffset * 0.04;
          const cardWidth = isActive ? (isMobile ? 200 : 280) : (isMobile ? 120 : 170);
          const zIndex = 10 - absOffset;
          const brightness = isActive ? 1 : 0.4 - absOffset * 0.08;

          const imageHeight = isActive ? "135%" : isHovered ? "130%" : "115%";
          const overlayOpacity = isActive ? 0 : isHovered ? 0.2 : 0.45;

          return (
            <div
              key={i}
              className="absolute transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width: cardWidth,
                height: "82%",
                bottom: "5%",
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                filter: `brightness(${Math.max(0.15, brightness)})`,
                cursor: "pointer",
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

              {/* Pop-out image — bleeds ABOVE the card frame */}
              <div
                className="absolute pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  bottom: 0,
                  left: "-5%",
                  right: "-5%",
                  height: imageHeight,
                  zIndex: 2,
                  transform: "skewX(-4deg)",
                }}
              >
                {brand.image ? (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full transition-transform duration-700"
                    style={{
                      objectFit: "contain",
                      objectPosition: "bottom center",
                      transform: isActive ? "scale(1.08)" : "scale(1)",
                      filter: "drop-shadow(0 -8px 24px rgba(0,0,0,0.7))",
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-end justify-center pb-[35%]">
                    <span className="font-display text-foreground/[0.06] text-[50px] md:text-[80px] leading-none select-none">
                      {brand.name}
                    </span>
                  </div>
                )}

                {/* Overlay for inactive */}
                <div
                  className="absolute inset-0 bg-background transition-opacity duration-500"
                  style={{ opacity: overlayOpacity }}
                />
              </div>

              {/* Card frame — bordered skewed rectangle */}
              <div
                className="relative w-full h-full transition-all duration-500"
                style={{
                  borderRadius: "4px",
                  border: `1px solid ${isActive ? "hsl(var(--primary))" : "rgba(255,255,255,0.15)"}`,
                  overflow: "hidden",
                  background: "#0a0a0a",
                  transform: "skewX(-4deg)",
                }}
              >
                {/* Dark gradient inside card for text readability */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, #0a0a0a 25%, transparent 80%)" }}
                />

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 z-10" style={{ transform: "skewX(4deg)" }}>
                  <h3
                    className={`font-display text-pure-white leading-none transition-all duration-500 ${
                      isActive
                        ? "text-[clamp(1.4rem,3.5vw,2.4rem)] translate-y-0 opacity-100"
                        : "text-base translate-y-2 opacity-70"
                    }`}
                  >
                    {brand.name}
                  </h3>
                  <span className="meta-label text-muted-foreground mt-1.5 block text-[9px]">
                    [{brand.niche}]
                  </span>

                  {/* Stat badge */}
                  <div
                    className={`mt-2 inline-block border border-primary/40 px-2 py-0.5 rounded-full transition-all duration-500 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <span className="font-mono text-[9px] text-primary tracking-wider">
                      {brand.stat}
                    </span>
                  </div>

                  {/* CTA */}
                  <div
                    className={`mt-3 transition-all duration-500 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <span className="btn-brutal inline-block text-[9px] py-1.5 px-3">
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
