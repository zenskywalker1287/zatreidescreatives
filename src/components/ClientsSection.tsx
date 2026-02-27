import { useState, useCallback, useRef } from "react";

const brands = [
  {
    name: "GRUNT STYLE",
    niche: "MEN'S PERFORMANCE",
    stat: "$340K GENERATED",
    slug: "/portfolio#grunt-style",
  },
  {
    name: "MADCOW COLLARS",
    niche: "PET ACCESSORIES",
    stat: "40% REVENUE FROM EMAIL",
    slug: "/portfolio#madcow",
  },
  {
    name: "FLATPACK",
    niche: "HOME & LIFESTYLE",
    stat: "$100K IN ONE MONTH",
    slug: "/portfolio#flatpack",
  },
  {
    name: "BRAND 04",
    niche: "COMING SOON",
    stat: "—",
    slug: "#",
  },
  {
    name: "BRAND 05",
    niche: "COMING SOON",
    stat: "—",
    slug: "#",
  },
];

const ClientsSection = () => {
  const [active, setActive] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
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
        className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        style={{ height: "clamp(420px, 60vh, 640px)", perspective: "1200px" }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {brands.map((brand, i) => {
          const offset = i - active;
          const isActive = offset === 0;
          const absOffset = Math.abs(offset);

          // Positioning
          const translateX = offset * (typeof window !== "undefined" && window.innerWidth < 640 ? 140 : 220);
          const translateZ = isActive ? 60 : -(absOffset * 80);
          const rotateY = offset * -12;
          const scale = isActive ? 1 : 0.78 - absOffset * 0.04;
          const cardWidth = isActive ? (typeof window !== "undefined" && window.innerWidth < 640 ? 260 : 340) : (typeof window !== "undefined" && window.innerWidth < 640 ? 140 : 200);
          const zIndex = 10 - absOffset;
          const brightness = isActive ? 1 : 0.4 - absOffset * 0.08;

          return (
            <div
              key={i}
              className="absolute transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width: cardWidth,
                height: "100%",
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                filter: `brightness(${Math.max(0.15, brightness)})`,
                cursor: isActive ? "default" : "pointer",
              }}
              onClick={() => !isActive && setActive(i)}
            >
              {/* Red glow behind active */}
              {isActive && (
                <div
                  className="absolute -inset-8 blur-[80px] opacity-30 pointer-events-none rounded-sm"
                  style={{ background: "hsl(var(--primary))" }}
                />
              )}

              {/* Card */}
              <div className="relative w-full h-full border border-foreground/15 overflow-hidden bg-secondary">
                {/* Placeholder hero image area */}
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-background/80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-foreground/[0.06] text-[100px] leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background via-background/90 to-transparent">
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
                    className={`mt-3 inline-block border border-primary/40 px-3 py-1 transition-all duration-500 ${
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
                    <a
                      href={brand.slug}
                      className="btn-brutal inline-block text-[10px] py-2 px-4"
                    >
                      [ VIEW CASE STUDY → ]
                    </a>
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
