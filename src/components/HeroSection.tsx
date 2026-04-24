import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import CarouselStrip from "./CarouselStrip";
import TypingAnimation from "./TypingAnimation";

const heroCards = [
  { id: 101, image: "/images/slice1.png" },
  { id: 102, image: "/images/slice2.png" },
  { id: 103, image: "/images/slice3.png" },
  { id: 104, image: "/images/slice4.png" },
  { id: 105, image: "/images/slice5.png" },
  { id: 106, image: "/images/slice6.png" },
  { id: 107, image: "/images/slice7.png" },
  { id: 108, image: "/images/slice8.png" },
  { id: 109, image: "/images/slice9.png" },
  { id: 110, image: "/images/slice10.png" },
  { id: 111, image: "/images/slice11.png" },
  { id: 112, image: "/images/slice12.png" },
  { id: 113, image: "/images/slice13.png" },
  { id: 114, image: "/images/slice14.png" },
  { id: 115, image: "/images/slice15.png" },
  { id: 116, image: "/images/slice16.png" },
  { id: 117, image: "/images/slice17.png" },
  { id: 118, image: "/images/slice18.png" },
  { id: 119, image: "/images/slice19.png" },
  { id: 120, image: "/images/slice20.png" },
  { id: 121, image: "/images/slice41.png" },
  { id: 122, image: "/images/slice42.png" },
  { id: 123, image: "/images/slice43.png" },
  { id: 124, image: "/images/slice44.png" },
  { id: 125, image: "/images/slice45.png" },
];

const row1 = Array.from({ length: 14 }, (_, i) => `/images/slice${i + 1}.png`);
const row2 = Array.from({ length: 14 }, (_, i) => `/images/slice${i + 15}.png`);
const row3 = Array.from({ length: 14 }, (_, i) => `/images/slice${i + 29}.png`);

const SCRAMBLE_CHARS = "XØΔΛ█▓░!<>-_\\/[]{}—=+";

const useTextScramble = (text: string, delay = 0) => {
  const [display, setDisplay] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) return text[index];
              if (letter === " ") return " ";
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join("")
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return display || text.replace(/./g, (c) => (c === " " ? " " : "░"));
};

const MarqueeRow = ({
  images,
  direction,
  speed,
}: {
  images: string[];
  direction: "left" | "right";
  speed: number;
}) => {
  const duration = (images.length * 286) / speed;
  return (
    <div className="flex overflow-hidden whitespace-nowrap mb-1.5">
      <div
        className="flex shrink-0"
        style={{
          animation: `marquee-${direction === "right" ? "right" : "left"} ${duration}s linear infinite`,
        }}
      >
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="shrink-0 object-cover"
            style={{
              height: 280,
              width: "auto",
              borderRadius: 8,
              margin: "0 6px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const CALENDLY_URL = "https://calendly.com/zen-zatreides/30min";

const HeroSection = () => {
  const [showContent, setShowContent] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showCTAs, setShowCTAs] = useState(false);
  const [showLine, setShowLine] = useState(false);

  const line1 = useTextScramble("IN-HOUSE CREATIVE STRATEGIST FOR", 200);
  const line2 = useTextScramble("DTC BRANDS.", 400);

  useEffect(() => {
    setShowContent(true);
    const t1 = setTimeout(() => setShowLine(true), 1200);
    const t2 = setTimeout(() => setShowSub(true), 1600);
    const t3 = setTimeout(() => setShowCTAs(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Feather trail
  const feathers = useRef<HTMLDivElement[]>([]);
  const featherPositions = useRef(
    Array.from({ length: 4 }, () => ({ x: 0, y: 0 }))
  );
  const mouseRef = useRef({ x: 0, y: 0 });

  const setFeatherRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) feathers.current[i] = el;
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      featherPositions.current.forEach((pos, i) => {
        const target = i === 0 ? mouseRef.current : featherPositions.current[i - 1];
        pos.x = lerp(pos.x, target.x, 0.08 - i * 0.015);
        pos.y = lerp(pos.y, target.y + i * 5, 0.08 - i * 0.015);

        if (feathers.current[i]) {
          feathers.current[i].style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
          feathers.current[i].style.opacity = `${0.6 - i * 0.12}`;
        }
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="hero" className="relative flex flex-col overflow-hidden min-h-screen">
      {/* Layer 1 — Living wall marquee */}
      <div className="absolute inset-0 overflow-hidden flex flex-col justify-center gap-1.5 opacity-25">
        <MarqueeRow images={row1} direction="right" speed={25} />
        <MarqueeRow images={row2} direction="left" speed={18} />
        <MarqueeRow images={row3} direction="right" speed={22} />
      </div>

      {/* Dark concrete overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.65) 50%, rgba(8,8,8,0.9) 100%)" }} />

      {/* Feather trail */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => setFeatherRef(el, i)}
          className="hidden md:block"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 99997,
            opacity: 0,
          }}
        >
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M4 0C4 0 8 4 8 8C8 10.2 6.2 12 4 12C1.8 12 0 10.2 0 8C0 4 4 0 4 0Z" fill="hsl(10 75% 44%)" />
          </svg>
        </div>
      ))}

      {/* CAROUSEL — shows first on mobile */}
      <div className="relative z-10 md:hidden order-first pt-20">
        <CarouselStrip cards={heroCards} direction="right" />
      </div>

      {/* Layer 2 — Foreground content */}
      <div className="relative z-10 flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 flex-1 py-8 md:py-16">
        <div className="max-w-[1400px] w-full flex flex-col items-center text-center">
          {/* Small label */}
          <span
            className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-blood-orange mb-8 max-w-[90vw] text-center leading-relaxed"
            style={{
              opacity: showContent ? 0.7 : 0,
              transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            EST. 2024 — DTC EMAIL & RETENTION SYSTEMS
          </span>

          {/* Headline with scramble */}
          <h1 className="leading-[0.9] tracking-[-0.02em] mb-2 relative w-full">
            {/* Spray paint glow */}
            <div
              className="absolute -inset-20 blur-[200px] opacity-30 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary)), transparent 50%)" }}
            />

            <span
              className="relative z-10 font-display text-[clamp(28px,7vw,120px)] text-foreground block leading-[1]"
              style={{ textShadow: "0 0 80px hsl(var(--primary) / 0.15)" }}
            >
              {line1}
            </span>
            <span
              className="relative z-10 font-display text-[clamp(64px,14vw,200px)] text-primary block leading-[0.9] mt-1"
              style={{ textShadow: "0 0 40px hsl(var(--primary) / 0.5), 0 0 100px hsl(var(--primary) / 0.3)" }}
            >
              {line2}
            </span>
          </h1>

          {/* Drawn red line */}
          <div
            className="w-24 h-[2px] bg-primary mb-8"
            style={{
              transform: showLine ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Subheadline — blood orange, more readable */}
          <div
            className="font-body text-blood-orange text-base md:text-lg max-w-2xl mb-8 leading-relaxed"
            style={{
              opacity: showSub ? 1 : 0,
              transform: showSub ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <TypingAnimation
              text="$2M+ generated. 1,200+ creatives shipped. Built inside 8-figure agencies — now driving conversions for DTC brands that actually want to scale."
              duration={20}
              delay={1800}
              className="text-blood-orange"
            />
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-6"
            style={{
              opacity: showCTAs ? 1 : 0,
              transform: showCTAs ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-3.5 font-display text-base uppercase tracking-[0.15em] bg-primary text-primary-foreground inline-block text-center"
              style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 40px hsl(4 80% 48% / 0.5), 0 0 80px hsl(4 80% 48% / 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              BOOK A CALL
            </a>
            <Link
              to="/portfolio"
              className="px-10 py-3.5 font-display text-base uppercase tracking-[0.15em] text-primary border border-primary inline-block text-center"
              style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsl(4 80% 48% / 0.1)";
                e.currentTarget.style.boxShadow = "0 0 30px hsl(4 80% 48% / 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              SEE THE WORK
            </Link>
          </div>

          {/* Pills */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            style={{
              opacity: showCTAs ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <span className="meta-label text-blood-orange mr-1">WHAT WE DO</span>
            {["EMAIL & RETENTION", "AD CREATIVE", "SHORT FORM & HOOKS", "SCRIPTING & BRIEFS"].map((pill) => (
              <span
                key={pill}
                className="border-2 border-foreground/15 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground"
                style={{ transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--blood-orange))";
                  e.currentTarget.style.backgroundColor = "hsl(18 90% 52% / 0.1)";
                  e.currentTarget.style.boxShadow = "0 0 20px hsl(18 90% 52% / 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--foreground) / 0.15)";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex flex-col items-center pb-10 gap-2">
        <div className="flex items-center gap-3">
          <div className="relative w-[1px] h-12 bg-primary/20 overflow-hidden">
            <div
              className="absolute w-full h-3 bg-primary rounded-full"
              style={{ animation: "scroll-dot 2s cubic-bezier(0.16, 1, 0.3, 1) infinite" }}
            />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">SCROLL</span>
        </div>
      </div>

      {/* CAROUSEL — desktop only */}
      <div className="relative z-10 hidden md:block">
        <CarouselStrip cards={heroCards} direction="right" />
      </div>

      {/* Bottom metadata */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-8 pt-4 flex flex-col md:flex-row gap-4 md:gap-8">
        <span className="meta-label">EST. CREATIVE BACKEND SYSTEMS</span>
        <span className="meta-label">SPECIALITY: EMAIL · ADS · STRATEGY</span>
      </div>
    </section>
  );
};

export default HeroSection;
