import { useState, useRef } from "react";
import { useInView } from "../hooks/useInView";

const ComparisonSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.2);
  const [isFullBackend, setIsFullBackend] = useState(false);
  const [hasToggled, setHasToggled] = useState(false);

  const handleToggle = () => {
    setIsFullBackend((prev) => !prev);
    if (!hasToggled) setHasToggled(true);
  };

  const adsStats = [
    { label: "CPA", value: "RISING ↑" },
    { label: "REPEAT PURCHASE RATE", value: "2%" },
    { label: "RETENTION BACKEND", value: "NONE" },
    { label: "REVENUE FROM EMAIL", value: "$0" },
    { label: "99% OF VISITORS", value: "GONE FOREVER" },
  ];

  const backendStats = [
    { label: "CPA", value: "OFFSET BY RETENTION ↓" },
    { label: "REPEAT PURCHASE RATE", value: "30-40%" },
    { label: "EMAIL REVENUE", value: "UP TO 40% OF TOTAL" },
    { label: "99% OF VISITORS", value: "NOW IN YOUR SYSTEM" },
    { label: "BACKEND", value: "RUNNING 24/7. ZERO EFFORT." },
  ];

  const stats = isFullBackend ? backendStats : adsStats;

  return (
    <section
      id="comparison"
      className="section-border relative overflow-hidden"
      ref={ref}
    >
      {/* Red tint overlay for ADS ONLY */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
          opacity: isFullBackend ? 0 : 1,
        }}
      />

      <div className="relative px-6 md:px-12 lg:px-20 py-20 md:py-32 flex flex-col items-center">
        <span className="meta-label text-primary mb-4">[04] THE DIFFERENCE</span>

        {/* Headline */}
        <h2
          className={`font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] text-pure-white text-center mb-2 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          FLIP THE SWITCH.
        </h2>
        <span className="meta-label text-muted-foreground mb-12">
          [SEE WHAT YOUR BRAND IS MISSING]
        </span>

        {/* Toggle Switch */}
        <div
          className={`relative flex items-center gap-0 mb-16 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left label */}
          <span
            className={`font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-500 mr-4 md:mr-6 ${
              !isFullBackend ? "text-primary" : "text-muted-foreground/40"
            }`}
          >
            ADS ONLY
          </span>

          {/* The Switch */}
          <button
            onClick={handleToggle}
            className="relative w-[88px] h-[44px] md:w-[100px] md:h-[48px] border border-foreground/30 rounded-full p-[3px] cursor-pointer transition-all duration-300 hover:border-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
            style={{
              boxShadow: isFullBackend
                ? "0 0 20px hsl(var(--primary) / 0.0)"
                : "0 0 20px hsl(var(--primary) / 0.15), inset 0 0 12px hsl(var(--primary) / 0.05)",
            }}
            aria-label="Toggle between Ads Only and Full Backend"
          >
            <div
              className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                transform: isFullBackend ? "translateX(46px)" : "translateX(0px)",
                background: isFullBackend
                  ? "hsl(var(--foreground))"
                  : "hsl(var(--primary))",
                boxShadow: isFullBackend
                  ? "0 0 12px hsl(var(--foreground) / 0.3)"
                  : "0 0 16px hsl(var(--primary) / 0.5)",
              }}
            />
          </button>

          {/* Right label */}
          <span
            className={`font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-500 ml-4 md:ml-6 ${
              isFullBackend ? "text-foreground" : "text-muted-foreground/40"
            }`}
          >
            FULL BACKEND
          </span>
        </div>

        {/* Funnel + Stats Panel */}
        <div
          className={`w-full max-w-2xl border transition-all duration-700 ${
            isFullBackend ? "border-foreground/15" : "border-primary/20"
          }`}
        >
          {/* Funnel Graphic */}
          <div className="relative h-32 md:h-40 flex items-center justify-center overflow-hidden border-b border-inherit">
            {/* ADS ONLY funnel — leaking */}
            <svg
              className="absolute transition-all duration-700"
              style={{
                opacity: isFullBackend ? 0 : 1,
                transform: isFullBackend ? "scale(0.8)" : "scale(1)",
              }}
              width="200"
              height="120"
              viewBox="0 0 200 120"
            >
              <path
                d="M30 10 L170 10 L130 70 L130 110 L70 110 L70 70 Z"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                opacity="0.6"
              />
              {/* Leak drops */}
              <circle cx="85" cy="105" r="2" fill="hsl(var(--primary))" opacity="0.5">
                <animate attributeName="cy" values="105;130" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="108" r="1.5" fill="hsl(var(--primary))" opacity="0.4">
                <animate attributeName="cy" values="108;135" dur="2s" begin="0.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="115" cy="103" r="2" fill="hsl(var(--primary))" opacity="0.3">
                <animate attributeName="cy" values="103;128" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
              </circle>
              {/* Cracks */}
              <line x1="75" y1="85" x2="65" y2="100" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.4" />
              <line x1="125" y1="80" x2="135" y2="98" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.4" />
            </svg>

            {/* FULL BACKEND funnel — sealed */}
            <svg
              className="absolute transition-all duration-700"
              style={{
                opacity: isFullBackend ? 1 : 0,
                transform: isFullBackend ? "scale(1)" : "scale(0.8)",
              }}
              width="200"
              height="120"
              viewBox="0 0 200 120"
            >
              <defs>
                <linearGradient id="funnelFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.03" />
                </linearGradient>
              </defs>
              <path
                d="M30 10 L170 10 L130 70 L130 110 L70 110 L70 70 Z"
                fill="url(#funnelFill)"
                stroke="hsl(var(--foreground))"
                strokeWidth="1.5"
                opacity="0.6"
              />
              {/* Fill level indicator */}
              <path
                d="M50 40 L150 40 L130 70 L130 110 L70 110 L70 70 Z"
                fill="hsl(var(--foreground))"
                opacity="0.08"
              />
            </svg>
          </div>

          {/* Stats */}
          <div className="p-6 md:p-10 space-y-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-baseline justify-between gap-4 transition-all duration-500"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-muted-foreground/60 shrink-0">
                  {stat.label}
                </span>
                <div className="flex-1 border-b border-dashed border-foreground/10 mx-2 translate-y-[-3px]" />
                <span
                  className={`font-mono text-xs md:text-sm tracking-wider text-right transition-colors duration-500 ${
                    isFullBackend ? "text-foreground" : "text-primary"
                  }`}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote — fades in after first toggle */}
        <p
          className={`font-serif-thin italic text-foreground/60 text-center text-sm md:text-lg mt-16 max-w-lg transition-all duration-1000 ${
            hasToggled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          "Most brands never flip this switch. That's the opportunity."
        </p>
      </div>
    </section>
  );
};

export default ComparisonSection;
