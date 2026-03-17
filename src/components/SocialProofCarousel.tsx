import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "../hooks/useInView";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    id: 1,
    initial: "A",
    name: "Angus",
    role: "CEO · MKTG EMAILS",
    isSlack: true,
    avatar: "/images/Angus_PFP.JPG",
    quote:
      "Working with Zen was a great experience — his work was always consistently high quality and on time. He made my life very easy and filled a really vital hole in our team. Zen would be a great asset to any team needing an experienced copywriter.",
    footer: "Sent via Slack DM",
  },
  {
    id: 2,
    initial: "W",
    name: "Will",
    role: "FOUNDER · XYKO · FASHION & LIFESTYLE",
    avatar: "/images/Will_PFP.jpg",
    quote: "Zen came in and overhauled our entire email strategy — even helped dial in the brand aesthetic across the board. We were hitting 60% email revenue pretty much right away.",
    footerRight: "XYKO",
  },
  {
    id: 3,
    initial: "S",
    name: "Stephen Murphy",
    role: "FOUNDER · MADCOW COLLARS · PET ACCESSORIES",
    quote: "Brought Zen in for Black Friday and he absolutely delivered. 40% of our total revenue came from email. We smashed our Black Friday record and brought him back a year later to do it all over again.",
  },
  {
    id: 4,
    initial: "S",
    name: "Sean",
    role: "FOUNDER · HEALTHMATE SAUNA",
    quote: "The welcome flow Zen built was out of the park. We've been in the infrared sauna space since the beginning — we're the pioneers. Everyone I showed it to had nothing bad to say. Everyone loved it.",
  },
  {
    id: 5,
    initial: "▶",
    name: "ADSUMO DIGITAL",
    role: "CEO · AGENCY PARTNER",
    isVideo: true,
    videoSrc: "/images/ADSUMO_DIGITAL_VIDEO_TESTIMONIAL.MOV",
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

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const translateX = offset * (isMobile ? 200 : 300);
    const scale = absOffset === 0 ? 1 : Math.max(0.7, 1 - absOffset * 0.12);
    const zIndex = 10 - absOffset;
    const rotateY = offset * -6;
    const opacity = absOffset > 2 ? 0 : 1;

    return {
      transform: `translateX(${translateX}px) perspective(1200px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      opacity,
      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    };
  };

  return (
    <section
      ref={ref}
      className={`section-border py-20 md:py-32 overflow-hidden transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="text-center mb-16 px-6">
        <ScrollReveal variant="fade-up">
          <span className="meta-label text-primary">STRAIGHT FROM THE SOURCE</span>
        </ScrollReveal>
        <ScrollReveal variant="blur" delay={100}>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-pure-white mt-4 mb-3">
            DON'T TAKE OUR WORD FOR IT.
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={200}>
          <p className="font-serif-thin italic text-blood-orange text-lg max-w-xl mx-auto">
            Here's what the people we worked with had to say.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal variant="scale" delay={300} threshold={0.05}>
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
                      ? "0 0 0 1.5px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.15)"
                      : "0 0 0 1px rgba(255,255,255,0.1)",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40 rounded-2xl z-10 pointer-events-none" />
                  )}

                  {t.isVideo ? (
                    <div className="flex flex-col items-center justify-center flex-1 gap-4 relative z-20 overflow-hidden rounded-2xl">
                      <video
                        src={t.videoSrc}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay={isActive}
                        ref={(el) => {
                          if (el) {
                            if (isActive) el.play().catch(() => {});
                            else el.pause();
                          }
                        }}
                      />
                      <div className="relative z-10 flex flex-col items-center gap-4 bg-black/50 p-6 rounded-xl">
                        <h3 className="font-display text-2xl text-pure-white">{t.name}</h3>
                        <span className="font-body text-[10px] tracking-[0.2em] text-foreground/50 uppercase">{t.role}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full relative z-20">
                      <div className="flex items-center gap-3 mb-6">
                        {t.isSlack && (
                          <span className="absolute top-0 right-0 text-foreground/30 text-sm font-body">#slack</span>
                        )}
                        {t.avatar ? (
                          <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-display text-lg shrink-0">
                            {t.initial}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-pure-white text-sm font-bold">{t.name}</span>
                            {t.isSlack && <span className="w-2 h-2 rounded-full bg-primary" />}
                          </div>
                          <span className="font-body text-[10px] tracking-[0.2em] text-foreground/50 uppercase">{t.role}</span>
                        </div>
                      </div>

                      <p className="font-serif-thin italic text-foreground/80 text-sm leading-relaxed flex-1">
                        "{t.quote}"
                      </p>

                      <div className="mt-4 flex justify-between items-end">
                        {t.footer && (
                          <span className="font-body text-[9px] tracking-[0.15em] text-foreground/30 uppercase">{t.footer}</span>
                        )}
                        {t.footerRight && (
                          <span className="font-body text-[9px] tracking-[0.15em] text-foreground/30 uppercase ml-auto">{t.footerRight}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      <div className="flex items-center justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? "bg-primary w-6" : "bg-foreground/20 hover:bg-foreground/40"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          />
        ))}
      </div>
    </section>
  );
};

export default SocialProofCarousel;
