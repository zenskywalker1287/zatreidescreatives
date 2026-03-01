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
      <div className="flex-shrink-0 text-center px-6 md:px-10 pt-16 md:pt-20 pb-6">
        <h2
          className={`font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-pure-white mb-4 transition-all duration-700 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          STOP THE SCROLL.
          <br />
          START THE SALE.
        </h2>
        <p
          className={`font-serif italic text-sm md:text-base text-foreground/60 mb-6 transition-all duration-700 delay-200 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Your ads are the first impression.
          <br />
          We make sure they're not just pretty —
          <br />
          they're engineered to convert.
        </p>
        <div className={`w-24 h-[1px] bg-foreground/15 mx-auto transition-all duration-700 delay-300 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
      </div>

      {/* Cards row */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-8 pb-16 overflow-x-auto">
        <div className="flex gap-4 md:gap-6">
          {creativeCards.map((card, i) => {
            const isHovered = hoveredCard === i;
            return (
              <div
                key={i}
                className={`relative flex-shrink-0 w-[260px] md:w-[280px] bg-card border border-foreground/10 rounded transition-all duration-500 cursor-pointer ${
                  hoveredCard !== null && !isHovered ? "opacity-60" : "opacity-100"
                }`}
                style={{
                  transform: `rotate(${isHovered ? 0 : card.tilt}deg) translateY(${isHovered ? -8 : 0}px)`,
                  boxShadow: isHovered ? "0 0 30px hsl(var(--primary) / 0.2)" : "none",
                  transitionDelay: isActive ? `${500 + i * 150}ms` : "0ms",
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Red top strip */}
                <div className="h-1 bg-primary w-full relative">
                  <span className="absolute top-1 left-2 font-mono text-[7px] text-pure-white tracking-wider">
                    CREATIVE BRIEF — ZEN
                  </span>
                </div>

                <div className="p-5">
                  <span className="font-display text-2xl text-primary">{card.number}</span>
                  <span className="meta-label text-muted-foreground/50 block mt-1 mb-2">{card.format}</span>
                  <h3 className="font-display text-lg md:text-xl text-pure-white whitespace-pre-line mb-4">{card.title}</h3>

                  <div className="w-full h-[1px] bg-foreground/10 mb-3" />

                  <div className="space-y-3 text-[10px] md:text-[11px] font-mono leading-relaxed">
                    <div>
                      <span className="text-primary block mb-1">OBJECTIVE:</span>
                      <p className="text-foreground/50">{card.objective}</p>
                    </div>
                    {card.rooted && (
                      <div>
                        <span className="text-primary block mb-1">ROOTED IN:</span>
                        <p className="text-foreground/50">{card.rooted}</p>
                      </div>
                    )}
                    {card.sampleAngles && (
                      <div>
                        <span className="text-primary block mb-1">SAMPLE ANGLES:</span>
                        <p className="text-foreground/50 whitespace-pre-line">{card.sampleAngles}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-primary block mb-1">DELIVERABLE:</span>
                      <p className="text-foreground/50">{card.deliverable}</p>
                    </div>
                  </div>

                  {card.cta && (
                    <Link
                      to="/front-end"
                      className="inline-block mt-4 font-display text-xs bg-pure-white text-background px-4 py-2 hover:bg-background hover:text-pure-white hover:border-primary border border-transparent hover:border transition-all"
                    >
                      [ SEE THE WHOLE LIST → ]
                    </Link>
                  )}

                  <div className="mt-4 pt-3 border-t border-foreground/5">
                    <span className="meta-label text-muted-foreground/30">{card.tags}</span>
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
