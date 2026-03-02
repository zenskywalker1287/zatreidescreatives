import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "../hooks/useInView";

const testimonials = [
  {
    id: 1,
    initial: "A",
    name: "Angus",
    role: "CEO · MKTG EMAILS",
    isSlack: true,
    quote:
      "Working with Zen was a great experience — his work was always consistently high quality and on time. He made my life very easy and filled a really vital hole in our team. Zen would be a great asset to any team needing an experienced copywriter.",
    footer: "Sent via Slack DM",
  },
  {
    id: 2,
    initial: "W",
    name: "Will",
    role: "FOUNDER · XYKO",
    quote: "Add Will's quote here when you have it.",
    footerRight: "XYKO",
  },
  {
    id: 3,
    initial: "M",
    name: "Murphy",
    role: "FOUNDER · MADCOW COLLARS",
    quote: "Add Murphy's quote here when you have it.",
  },
  {
    id: 4,
    initial: "S",
    name: "Sean",
    role: "FOUNDER · HEALTHMATE SAUNA",
    quote: "Add Sean's quote here when you have it.",
  },
  {
    id: 5,
    initial: "▶",
    name: "ADSUMO DIGITAL",
    role: "CEO · AGENCY PARTNER",
    isVideo: true,
    quote: "",
  },
];

const SocialProofCarousel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const getCardStyle = (i: number) => {
    const total = testimonials.length;
    let offset = i - activeIndex;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;
    const absOffset = Math.abs(offset);

    const translateX = offset * 300;
    const scale = absOffset === 0 ? 1 : Math.max(0.7, 1 - absOffset * 0.12);
    const zIndex = 10 - absOffset;
    const rotateY = offset * -6;
    const opacity = absOffset > 2 ? 0 : 1;

    return {
      transform: `translateX(${translateX}px) perspective(1200px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      opacity,
      transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
    };
  };

  return (
    <section
      ref={ref}
      className={`section-border py-20 md:py-32 overflow-hidden transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="text-center mb-16 px-6">
        <span className="meta-label text-primary">[STRAIGHT FROM THE SOURCE]</span>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-pure-white mt-4 mb-3">
          DON'T TAKE OUR WORD FOR IT.
        </h2>
        <p className="font-serif-thin italic text-foreground/70 text-lg max-w-xl mx-auto">
          Here's what the people we worked with had to say.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center h-[480px] md:h-[560px] mb-8">
        {testimonials.map((t, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={t.id}
              className="absolute w-[300px] md:w-[380px] cursor-pointer"
              style={getCardStyle(i)}
              onClick={() => setActiveIndex(i)}
            >
              <div
                className={`relative w-full rounded-2xl p-8 flex flex-col justify-between bg-[#0a0a0a] transition-all duration-300 ${
                  isActive ? "h-[420px] md:h-[500px]" : "h-[380px] md:h-[460px]"
                }`}
                style={{
                  boxShadow: isActive
                    ? "0 0 0 1.5px #FF2400, 0 0 20px rgba(255,36,0,0.15), 0 0 40px rgba(120,0,255,0.1)"
                    : "0 0 0 1px rgba(255,255,255,0.1)",
                }}
              >
                {/* Dark overlay for non-active */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/40 rounded-2xl z-10 pointer-events-none" />
                )}

                {t.isVideo ? (
                  /* Video card */
                  <div className="flex flex-col items-center justify-center flex-1 gap-4 relative z-20">
                    <span className="meta-label text-primary">[VIDEO TESTIMONIAL]</span>
                    <div className="w-16 h-16 rounded-full border-2 border-foreground/30 flex items-center justify-center hover:border-primary transition-colors">
                      <span className="text-2xl text-foreground ml-1">▶</span>
                    </div>
                    <h3 className="font-display text-2xl text-pure-white">{t.name}</h3>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/50 uppercase">{t.role}</span>
                  </div>
                ) : (
                  /* Quote card */
                  <div className="flex flex-col h-full relative z-20">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      {t.isSlack && (
                        <span className="absolute top-0 right-0 text-foreground/30 text-sm font-mono">#slack</span>
                      )}
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-display text-lg shrink-0">
                        {t.initial}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-pure-white text-sm font-bold">{t.name}</span>
                          {t.isSlack && <span className="w-2 h-2 rounded-full bg-green-500" />}
                        </div>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/50 uppercase">{t.role}</span>
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="font-serif-thin italic text-foreground/80 text-sm leading-relaxed flex-1">
                      "{t.quote}"
                    </p>

                    {/* Footer */}
                    <div className="mt-4 flex justify-between items-end">
                      {t.footer && (
                        <span className="font-mono text-[9px] tracking-[0.15em] text-foreground/30 uppercase">{t.footer}</span>
                      )}
                      {t.footerRight && (
                        <span className="font-mono text-[9px] tracking-[0.15em] text-foreground/30 uppercase ml-auto">{t.footerRight}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? "bg-primary w-6" : "bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default SocialProofCarousel;
