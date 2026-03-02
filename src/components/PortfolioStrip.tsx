import { useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

const emailHeroes = [
  { id: 1, image: "/images/email-01.png" },
  { id: 2, image: "/images/email-02.png" },
  { id: 3, image: "/images/email-03.png" },
  { id: 4, image: "/images/email-04.png" },
  { id: 5, image: "/images/email-05.png" },
  { id: 6, image: "/images/email-06.png" },
  { id: 7, image: "/images/email-01.png" },
];

const PortfolioStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);
  const [activeIndex, setActiveIndex] = useState(3);

  const getCardStyle = (i: number) => {
    const offset = i - activeIndex;
    const absOffset = Math.abs(offset);
    
    const translateX = offset * 220;
    const rotateY = offset * -8;
    const scale = absOffset === 0 ? 1.1 : Math.max(0.75, 1 - absOffset * 0.08);
    const zIndex = 10 - absOffset;
    const opacity = absOffset > 3 ? 0 : Math.max(0.4, 1 - absOffset * 0.2);
    const translateZ = absOffset === 0 ? 60 : -absOffset * 40;

    return {
      transform: `translateX(${translateX}px) perspective(1200px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
      zIndex,
      opacity,
      transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
    };
  };

  return (
    <section id="portfolio" className="section-border overflow-hidden" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 pt-20 md:pt-32 pb-8 text-center">
        <span className="meta-label text-primary">[07] PORTFOLIO</span>
        <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-pure-white mt-4 mb-2">
          THE HEROES.
        </h2>
        <p className="meta-label mb-12">[TOP-FOLD EMAIL DESIGNS — CLICK TO EXPLORE]</p>
      </div>

      {/* Fanned card showcase */}
      <div
        className={`relative flex items-center justify-center h-[500px] md:h-[700px] mb-8 transition-opacity duration-700 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      >
        {emailHeroes.map((hero, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={hero.id}
              className="absolute w-[260px] md:w-[340px] h-[420px] md:h-[600px] cursor-pointer"
              style={getCardStyle(i)}
              onClick={() => setActiveIndex(i)}
            >
              <div
                className={`w-full h-full rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  isActive
                    ? "border-foreground/30 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
                    : "border-foreground/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                }`}
              >
                <img
                  src={hero.image}
                  alt={`Email Design ${hero.id}`}
                  className="w-full h-full object-cover object-top bg-[#0a0a0a]"
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2 pb-6">
        {emailHeroes.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-primary w-6"
                : "bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center pb-20 md:pb-32">
        <a href="/portfolio" className="btn-brutal">
          [ VIEW FULL 30-DAY LOGIC ]
        </a>
      </div>
    </section>
  );
};

export default PortfolioStrip;
