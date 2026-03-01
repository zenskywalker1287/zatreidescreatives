import { GitBranch, CalendarClock, ArrowRightLeft } from "lucide-react";

const cards = [
  {
    icon: GitBranch,
    stat: "10 FLOWS",
    mono: "[PRE & POST PURCHASE — FULLY BUILT]",
    desc: "Every stage of the customer journey. Abandoned carts, winbacks, upsells — all copy, design and strategy handled. Zero input from your team.",
  },
  {
    icon: CalendarClock,
    stat: "3 CAMPAIGNS\nPER WEEK",
    mono: "[FRESH ANGLES. EVERY SINGLE WEEK.]",
    desc: "New campaigns hitting your list weekly. Built around your USPs, your personas, your brand voice. Always relevant. Never repetitive.",
  },
  {
    icon: ArrowRightLeft,
    stat: "EMAILS →\nAD CREATIVES",
    mono: "[YOUR BEST EMAILS DON'T DIE IN THE INBOX.]",
    desc: "Top performing emails get repurposed into high-impact ad creatives. Same message. Every channel. Nothing wasted.",
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
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-10 max-w-[700px] mx-auto text-center">
        <h2
          className={`font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-pure-white mb-4 transition-all duration-700 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          30+ TOUCHPOINTS.
          <br />
          SELLING 24/7.
          <br />
          ZERO INPUT FROM YOU.
        </h2>

        <p
          className={`font-serif italic text-sm md:text-base text-foreground/60 mb-8 transition-all duration-700 delay-200 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          100+ USPs turned into an automated system
          <br />
          that brands, sells, and retargets —
          <br />
          while you sleep.
        </p>

        <div className={`w-full h-[1px] bg-foreground/15 mb-8 transition-all duration-700 delay-300 ${isActive ? "scale-x-100" : "scale-x-0"}`} />

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className={`bg-card border border-foreground/10 rounded-xl p-5 text-center transition-all duration-500 ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: isActive ? `${400 + i * 150}ms` : "0ms" }}
              >
                <Icon size={20} className="text-primary mx-auto mb-3" />
                <h3 className="font-display text-lg md:text-xl text-pure-white whitespace-pre-line mb-2">
                  {card.stat}
                </h3>
                <span className="meta-label text-primary block mb-3">{card.mono}</span>
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
          [ SEE EMAIL PORTFOLIO NOW → ]
        </a>
        <p className="meta-label text-muted-foreground/50 whitespace-pre-line">
          {"[30+ CREATIVES BUILT PER BRAND —\nEMAIL · SMS · ADS · ALL INCLUDED]"}
        </p>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 border-t border-primary/30 px-6 md:px-10 py-3 flex justify-between items-center flex-shrink-0">
        <span className="meta-label text-muted-foreground/50">
          [PHASE 02 COMPLETE — BACKEND RUNNING 24/7]
        </span>
        <span className="meta-label text-primary animate-pulse">
          PHASE 03: FRONT END →
        </span>
      </div>
    </div>
  );
};

export default Phase02Backend;
