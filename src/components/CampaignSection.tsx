import { useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { Radio, Workflow, FolderOpen } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const columns = [
  {
    lane: "LANE 01 — FRONT END",
    icon: Radio,
    title: "FRONT END.",
    oneLiner: "Stops the scroll.\nFills the funnel.\nStays on their FYP.",
    deliverables: [
      "Static Ads",
      "Short Form Content",
      "Campaign Creatives",
      "TikTok · Reels · Shorts",
      "UGC Direction & Scripts",
      "Limited Series Concepts",
    ],
    bottomLine: "FIRST IMPRESSION.\nENGINEERED.",
  },
  {
    lane: "LANE 02 — BACKEND",
    icon: Workflow,
    title: "BACKEND.",
    oneLiner:
      "Captures the 99% who don't buy.\nNurtures. Retargets. Closes.\nRunning 24/7 without you.",
    deliverables: [
      "Email Flows — 10 Pre & Post Purchase",
      "SMS Sequences",
      "Weekly Campaigns",
      "Abandoned Cart Recovery",
      "Winback Sequences",
      "Welcome Flows",
      "Best Emails → Ad Creatives",
    ],
    bottomLine: "THE INVISIBLE MACHINE.\nALWAYS ON.",
  },
  {
    lane: "LANE 03 — IN-HOUSE",
    icon: FolderOpen,
    title: "IN-HOUSE.",
    oneLiner:
      "Everything your team needs\nto never guess again.\nBuilt on your brand. Forever.",
    deliverables: [
      "Brand Guidelines",
      "Campaign Calendars",
      "Hooks Library",
      "AI Built On Your Brand",
      "SOPs",
      "Content Briefs",
      "Prompt Libraries",
      "Moodboards",
    ],
    bottomLine: "YOUR BRAND.\nON AUTOPILOT.",
  },
];

const connectors = [
  { label: "DRIVES TRAFFIC INTO →" },
  { label: "POWERS THE TEAM WITH →" },
];

const CampaignSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.08);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  return (
    <section className="section-border" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal variant="fade-up">
            <span className="meta-label text-primary block mb-6">
              THE SYSTEM — HOW IT ALL CONNECTS
            </span>
          </ScrollReveal>

          <ScrollReveal variant="blur" delay={100}>
            <h2 className="font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.95] text-pure-white">
              ONE BRAND. THREE LANES. ZERO GAPS.
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="font-serif-thin text-[clamp(1rem,2vw,1.4rem)] text-blood-orange italic mt-6 leading-relaxed">
              Every deliverable connects. Every format feeds the next. Nothing exists in isolation.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={300}>
            <div className="w-full h-px bg-foreground/15 my-8" />
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={400}>
            <p className="font-display text-[clamp(1.1rem,2.5vw,2rem)] leading-[1.1] text-primary">
              THE FRONT END FILLS IT.
              <br />
              THE BACKEND KEEPS IT.
              <br />
              THE IN-HOUSE RUNS IT.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={500}>
            <div className="w-full h-px bg-foreground/15 mt-8" />
          </ScrollReveal>
        </div>

        <div className="relative flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-0 max-w-6xl mx-auto">
          {columns.map((col, i) => {
            const Icon = col.icon;
            const isHovered = hoveredCol === i;
            const isDimmed = hoveredCol !== null && hoveredCol !== i;

            return (
              <div key={i} className="flex items-stretch">
                <ScrollReveal
                  variant="fade-up"
                  delay={600 + i * 150}
                  threshold={0.05}
                  className="flex-1"
                >
                  <div
                    onMouseEnter={() => setHoveredCol(i)}
                    onMouseLeave={() => setHoveredCol(null)}
                    className={`relative flex flex-col rounded-lg overflow-hidden transition-all duration-500 cursor-default h-full ${
                      isDimmed ? "opacity-60" : "opacity-100"
                    }`}
                    style={{
                      background: "#0a0a0a",
                      border: `1px solid ${
                        isHovered
                          ? "hsl(var(--primary))"
                          : "hsl(var(--foreground) / 0.15)"
                      }`,
                      minWidth: 0,
                      width: "100%",
                      maxWidth: "380px",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div
                      className={`h-7 flex items-center px-4 transition-all duration-300 ${
                        isHovered ? "bg-primary" : "bg-primary/80"
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-[0.25em] font-body text-primary-foreground font-medium">
                        {col.lane}
                      </span>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="flex justify-center mb-5">
                        <Icon
                          size={28}
                          className={`transition-colors duration-300 ${
                            isHovered ? "text-primary" : "text-foreground/60"
                          }`}
                        />
                      </div>

                      <h3 className="font-display text-2xl md:text-3xl text-pure-white text-center mb-4">
                        {col.title}
                      </h3>

                      <p className="font-serif-thin text-foreground italic text-sm md:text-base text-center leading-relaxed mb-6 whitespace-pre-line">
                        {col.oneLiner}
                      </p>

                      <div className="w-full h-px bg-foreground/10 mb-6" />

                      <ul className="space-y-2.5 mb-6 flex-1">
                        {col.deliverables.map((item, j) => (
                          <li
                            key={j}
                            className={`font-body text-xs text-foreground/80 flex items-start gap-2 transition-all duration-300 ${
                              isHovered
                                ? "translate-x-0 opacity-100"
                                : "translate-x-0 opacity-80"
                            }`}
                            style={{
                              transitionDelay: isHovered ? `${j * 50}ms` : "0ms",
                              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                          >
                            <span className="text-primary shrink-0">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="w-full h-px bg-foreground/10 mb-6" />

                      <p
                        className={`font-display text-lg md:text-xl text-pure-white text-center whitespace-pre-line leading-tight transition-transform duration-300 ${
                          isHovered ? "scale-105" : "scale-100"
                        }`}
                        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                      >
                        {col.bottomLine}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {i < 2 && (
                  <div className="hidden lg:flex flex-col items-center justify-center w-16 shrink-0">
                    <span className="meta-label text-muted-foreground/60 text-center text-[8px] leading-tight mb-2 whitespace-nowrap">
                      {connectors[i].label}
                    </span>
                    <div className="relative w-10 h-[2px] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-primary"
                        style={{
                          animation: "pulse-arrow 2s ease-in-out infinite",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex lg:hidden flex-col items-center gap-6 my-6" />

        <ScrollReveal variant="fade-up" delay={800} threshold={0.05}>
          <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <span className="meta-label text-muted-foreground/60 shrink-0">
              3 LANES · 1 SYSTEM · ZERO GUESSWORK
            </span>

            <p className="font-display text-xl md:text-2xl lg:text-3xl text-pure-white text-center leading-[1.05]">
              SAME ANGLES.
              <br />
              EVERY CHANNEL.
              <br />
              NOTHING WASTED.
            </p>

            <a
              href="#process"
              className="btn-brutal whitespace-nowrap hover:bg-primary hover:text-primary-foreground"
            >
              SEE HOW IT ALL WORKS →
            </a>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes pulse-arrow {
          0%, 100% { opacity: 0.3; transform: scaleX(0.6); transform-origin: left; }
          50% { opacity: 1; transform: scaleX(1); transform-origin: left; }
        }
      `}</style>
    </section>
  );
};

export default CampaignSection;
