import { GitBranch, CalendarClock, MessageSquare, Target } from "lucide-react";

const cards = [
  {
    icon: GitBranch,
    title: "10 EMAIL FLOWS",
    tag: "[PRE & POST PURCHASE — FULLY BUILT]",
    desc: "Abandoned carts. Winbacks. Welcome sequences. Post-purchase upsells. Every stage of the customer journey — written, designed and deployed. Your team does nothing.",
  },
  {
    icon: CalendarClock,
    title: "3 CAMPAIGNS\nPER WEEK",
    tag: "[ALWAYS RELEVANT. NEVER GUESSED.]",
    desc: "Fresh angles hitting your list every week. Built from your USPs. Written to your personas. Never templated. Never repetitive.",
  },
  {
    icon: MessageSquare,
    title: "SMS\nSEQUENCES",
    tag: "[THE CHANNEL YOUR COMPETITORS SLEEP ON.]",
    desc: "Short. Punchy. Timed right. The channel most brands completely ignore — and leave serious money in.",
  },
  {
    icon: Target,
    title: "SEGMENTATION\nSTRATEGY",
    tag: "[NO MORE BATCH AND BLAST.]",
    desc: "The right message to the right person at the right time. Built into every send.",
  },
];

const emailImages = [
  "/images/email-01.png",
  "/images/email-02.png",
  "/images/email-03.png",
  "/images/email-04.png",
  "/images/email-05.png",
  "/images/email-06.png",
];

interface Phase02Props {
  isActive: boolean;
}

const Phase02Backend = ({ isActive }: Phase02Props) => {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex flex-col overflow-hidden snap-start relative">
      {/* Background scrolling collage */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="grid grid-cols-3 gap-2 p-2 animate-scroll-up opacity-[0.12]">
          {[...emailImages, ...emailImages, ...emailImages, ...emailImages].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-full object-cover"
              style={{ height: "200px" }}
              loading="lazy"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-background/[0.88]" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-10 max-w-[800px] mx-auto text-center">
        <h2
          className={`font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-pure-white mb-4 transition-all duration-700 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          THE 99% WHO DON'T BUY TODAY ARE STILL WORTH A FORTUNE.
        </h2>

        <p
          className={`font-serif-thin italic text-sm md:text-base text-foreground/60 mb-8 transition-all duration-700 delay-200 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          They found your brand. They looked. They left. Most brands let them walk forever. We built the system that follows them home — and keeps them coming back.
        </p>

        <div className={`w-full h-[1px] bg-foreground/15 mb-8 transition-all duration-700 delay-300 ${isActive ? "scale-x-100" : "scale-x-0"}`} />

        {/* Four cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className={`bg-card border border-foreground/15 rounded-xl p-5 text-center transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_25px_hsl(var(--primary)/0.1)] ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: isActive ? `${400 + i * 150}ms` : "0ms" }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-lg md:text-xl text-pure-white whitespace-pre-line mb-2">
                  {card.title}
                </h3>
                <span className="meta-label text-primary block mb-3">{card.tag}</span>
                <p className="font-mono text-[10px] md:text-[11px] text-foreground/50 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <a
          href="/portfolio"
          className="inline-block font-display text-sm md:text-base bg-pure-white text-background px-8 py-3 transition-all duration-300 hover:bg-background hover:text-pure-white hover:border-primary border border-transparent hover:border mb-3"
        >
          [ SEE THE EMAIL PORTFOLIO → ]
        </a>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 border-t border-primary/30 px-6 md:px-10 py-3 flex justify-between items-center flex-shrink-0">
        <span className="meta-label text-muted-foreground/50 whitespace-pre-line">
          {"[PHASE 02 COMPLETE —\nRETENTION SYSTEM LIVE.\nRUNNING 24/7. ZERO INPUT FROM YOU.]"}
        </span>
        <span className="meta-label text-primary animate-pulse">
          PHASE 03: CREATIVE DIRECTION →
        </span>
      </div>
    </div>
  );
};

export default Phase02Backend;
