import { Link } from "react-router-dom";
import { Image, Smartphone, Camera, LayoutGrid } from "lucide-react";

const creativeCards = [
  {
    icon: Image,
    title: "STATIC ADS",
    description: "Scroll-stopping concepts built around\nyour USPs and personas. Engineered\nto arrest attention and force the click.",
    tags: "[META · TIKTOK · PINTEREST]",
  },
  {
    icon: Smartphone,
    title: "SHORT FORM\n& HOOKS",
    description: "Hooks so specific they feel like\ninside jokes. Ready-to-deploy concepts\nfor TikTok, Reels, and Shorts.",
    tags: "[TIKTOK · REELS · SHORTS · CAMPAIGNS]",
  },
  {
    icon: Camera,
    title: "UGC\nSCRIPTING",
    description: "Word-for-word scripts and shot-by-shot\nbriefs. Your creators know exactly\nwhat to say and why it converts.",
    tags: "[SCRIPTS · SHOOT BRIEFS · DIRECTION]",
  },
  {
    icon: LayoutGrid,
    title: "100+ CONTENT\nANGLES",
    description: "Never run out of ideas.\nMyth Busters · FAQ · Day in the Life ·\nBefore vs. After · Hot Take · + 94 more.",
    tags: "[CONTENT · NARRATIVE · FORMATS]",
    cta: true,
  },
];

interface Phase03Props {
  isActive: boolean;
}

const Phase03FrontEnd = ({ isActive }: Phase03Props) => {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex flex-col overflow-hidden snap-start">
      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-10">
        {/* Headline */}
        <h2
          className={`font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-pure-white text-center mb-4 transition-all duration-700 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          STOP THE SCROLL.
          <br />
          START THE SALE.
        </h2>

        <p
          className={`font-serif-thin italic text-sm md:text-base text-foreground/60 text-center mb-6 transition-all duration-700 delay-200 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Your ads are the first impression.
          <br />
          We make sure they're not just pretty —
          <br />
          they're engineered to convert.
        </p>

        {/* Divider */}
        <div className={`w-24 h-[1px] bg-foreground/20 mb-8 transition-all duration-700 delay-300 ${isActive ? "scale-x-100" : "scale-x-0"}`} />

        {/* 4 Cards */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
          {creativeCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="group border border-foreground/15 rounded-lg bg-[hsl(0,0%,4%)] p-7 flex flex-col items-center text-center transition-all duration-200 hover:border-primary hover:-translate-y-1 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.15)]"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? undefined : "translateY(20px)",
                  transition: `all 0.5s ease ${400 + i * 100}ms`,
                }}
              >
                <Icon
                  size={32}
                  strokeWidth={1.2}
                  className="text-pure-white mb-4 transition-colors group-hover:text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                />
                <h3 className="font-display text-lg md:text-xl text-pure-white whitespace-pre-line mb-3 leading-tight">{card.title}</h3>

                <div className="w-full h-[1px] bg-foreground/10 mb-3" />

                <p className="font-mono text-[9px] md:text-[10px] text-cream leading-relaxed whitespace-pre-line mb-3">
                  {card.description}
                </p>

                <span className="font-mono text-[8px] tracking-wider text-primary/60 group-hover:text-primary transition-colors">
                  {card.tags}
                </span>

                {card.cta && (
                  <Link
                    to="/front-end"
                    className="mt-4 font-mono text-[9px] tracking-wider border border-foreground/20 px-3 py-1.5 text-foreground/50 hover:bg-primary hover:text-pure-white hover:border-primary transition-all"
                  >
                    [ SEE THE WHOLE LIST → ]
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-foreground/15 px-6 md:px-10 py-3 flex justify-between items-center flex-shrink-0">
        <span className="meta-label text-muted-foreground/50">
          [PHASE 03 COMPLETE — FRONT END ARMED AND READY]
        </span>
        <a href="#campaign" className="meta-label text-primary hover:text-pure-white transition-colors">
          [ THE WORK → ]
        </a>
      </div>
    </div>
  );
};

export default Phase03FrontEnd;
