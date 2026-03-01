import { useState } from "react";
import { Link } from "react-router-dom";

const creativeCards = [
  {
    number: "01",
    format: "[FORMAT: STATIC AD]",
    title: "STOP THE SCROLL.",
    tilt: -3,
    objective: "High-impact concepts that arrest attention and force the click.",
    rooted: "Your USPs. Your personas. Your customer's exact fear.",
    deliverable: "Scroll-stopping static concepts built for Meta, TikTok, and beyond. Ready to hand to your designer.",
    tags: "[AD CREATIVE · STATIC · META · TIKTOK]",
    accent: "from-primary/20 to-transparent",
  },
  {
    number: "02",
    format: "[FORMAT: SHORT FORM · REELS · TIKTOK]",
    title: "BUILT FOR VIRALITY.",
    tilt: 2,
    objective: "Hooks so specific they feel like inside jokes. Concepts built to stop, engage, and convert.",
    rooted: "Trending formats. Timeless psychology. Your brand's real angles.",
    deliverable: "Ready-to-deploy concepts for TikTok, Reels, and Shorts. Designed for immediate engagement.",
    tags: "[SHORT FORM · HOOKS · CAMPAIGNS · REELS]",
    accent: "from-amber-500/15 to-transparent",
  },
  {
    number: "03",
    format: "[FORMAT: UGC DIRECTION]",
    title: "YOUR CREATORS.\nOUR BRAIN.",
    tilt: -1.5,
    objective: "Scripts and shoot briefs that tell your creators exactly what to say, how to say it, and why it will convert.",
    rooted: "Customer psychology. Persona-specific triggers. Angles your competitors aren't using.",
    deliverable: "Word-for-word scripts. Shot-by-shot briefs. Zero guesswork for your talent.",
    tags: "[UGC · SCRIPTING · SHOOT DIRECTION]",
    accent: "from-blue-500/15 to-transparent",
  },
  {
    number: "04",
    format: "[FORMAT: 100+ ANGLES & STRUCTURES]",
    title: "NEVER RUN OUT\nOF IDEAS.",
    tilt: 3,
    objective: "100+ content formatting ideas and narrative structures so your brand never repeats itself.",
    sampleAngles: "· Myth Busters\n· FAQ\n· Day in the Life\n· Before vs. After\n· Founder Story\n· Hot Take\n· The Confession\n· Enemy of the State\n· + 92 more",
    deliverable: "The full angle library. Every format explained. Ready to brief any creator or copywriter instantly.",
    tags: "[CONTENT · NARRATIVE · ANGLES · FORMATS]",
    cta: true,
    accent: "from-primary/20 to-transparent",
  },
];

interface Phase03Props {
  isActive: boolean;
}

const Phase03FrontEnd = ({ isActive }: Phase03Props) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="w-screen h-screen flex-shrink-0 flex flex-col overflow-hidden snap-start">
      {/* Top content */}
      <div className="flex-shrink-0 text-center px-6 md:px-10 pt-14 md:pt-18 pb-4">
        <h2
          className={`font-display text-[clamp(1.8rem,4.5vw,4rem)] leading-[0.95] text-pure-white mb-3 transition-all duration-700 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          STOP THE SCROLL.
          <br />
          START THE SALE.
        </h2>
        <p
          className={`font-serif italic text-xs md:text-sm text-foreground/60 mb-4 transition-all duration-700 delay-200 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Your ads are the first impression. We make sure they're engineered to convert.
        </p>
        <div className={`w-20 h-[1px] bg-foreground/15 mx-auto transition-all duration-700 delay-300 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
      </div>

      {/* Cards row — contained with proper overflow */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-10 pb-14 overflow-hidden">
        <div className="flex gap-3 md:gap-5 max-w-full">
          {creativeCards.map((card, i) => {
            const isHovered = hoveredCard === i;
            return (
              <div
                key={i}
                className={`relative flex-shrink-0 w-[220px] md:w-[260px] border rounded transition-all duration-500 cursor-pointer overflow-hidden ${
                  isHovered ? "border-primary/60" : "border-foreground/15"
                } ${hoveredCard !== null && !isHovered ? "opacity-50 scale-[0.97]" : "opacity-100"}`}
                style={{
                  transform: `rotate(${isHovered ? 0 : card.tilt}deg) translateY(${isHovered ? -8 : 0}px)`,
                  boxShadow: isHovered ? "0 0 40px hsl(var(--primary) / 0.25), 0 8px 30px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)",
                  transitionDelay: isActive ? `${500 + i * 150}ms` : "0ms",
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient accent background */}
                <div className={`absolute inset-0 bg-gradient-to-b ${card.accent} pointer-events-none`} />
                
                {/* Card bg */}
                <div className="absolute inset-0 bg-card" style={{ zIndex: -1 }} />

                {/* Red top strip */}
                <div className="h-1 bg-primary w-full relative z-10">
                  <span className="absolute top-1 left-2 font-mono text-[6px] text-pure-white/70 tracking-wider">
                    CREATIVE BRIEF — ZEN
                  </span>
                </div>

                <div className="relative z-10 p-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display text-2xl text-primary">{card.number}</span>
                    <span className="meta-label text-muted-foreground/40 text-[7px]">{card.format}</span>
                  </div>
                  <h3 className="font-display text-base md:text-lg text-pure-white whitespace-pre-line mb-3 leading-tight">{card.title}</h3>

                  <div className="w-full h-[1px] bg-foreground/10 mb-3" />

                  <div className="space-y-2.5 text-[9px] md:text-[10px] font-mono leading-relaxed">
                    <div>
                      <span className="text-primary block mb-0.5 font-bold">OBJECTIVE:</span>
                      <p className="text-foreground/50">{card.objective}</p>
                    </div>
                    {card.rooted && (
                      <div>
                        <span className="text-primary block mb-0.5 font-bold">ROOTED IN:</span>
                        <p className="text-foreground/50">{card.rooted}</p>
                      </div>
                    )}
                    {card.sampleAngles && (
                      <div>
                        <span className="text-primary block mb-0.5 font-bold">SAMPLE ANGLES:</span>
                        <p className="text-foreground/50 whitespace-pre-line">{card.sampleAngles}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-primary block mb-0.5 font-bold">DELIVERABLE:</span>
                      <p className="text-foreground/50">{card.deliverable}</p>
                    </div>
                  </div>

                  {card.cta && (
                    <Link
                      to="/front-end"
                      className="inline-block mt-3 font-display text-[10px] bg-pure-white text-background px-3 py-1.5 hover:bg-background hover:text-pure-white hover:border-primary border border-transparent hover:border transition-all"
                    >
                      [ SEE THE WHOLE LIST → ]
                    </Link>
                  )}

                  <div className="mt-3 pt-2 border-t border-foreground/5">
                    <span className="meta-label text-muted-foreground/30 text-[7px]">{card.tags}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-primary/30 px-6 md:px-10 py-3 flex justify-between items-center flex-shrink-0">
        <span className="meta-label text-muted-foreground/50">
          [PHASE 03 COMPLETE — FRONT END ARMED AND READY]
        </span>
        <a href="#contact" className="meta-label text-primary hover:text-pure-white transition-colors">
          [ LET'S BUILD YOURS → ]
        </a>
      </div>
    </div>
  );
};

export default Phase03FrontEnd;
