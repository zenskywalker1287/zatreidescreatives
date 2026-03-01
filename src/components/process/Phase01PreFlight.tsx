import { useState } from "react";
import { Search, Users, CalendarDays, Palette, BookOpen, ArrowRight } from "lucide-react";

/* ───── DATA ───── */

const deliverables = [
  {
    icon: Search,
    title: "100+ USPS",
    oneLiner: "[MAPPED TO 8 LIFE FORCES ALL HUMANS DESIRE]",
  },
  {
    icon: Users,
    title: "3+ PSYCHOLOGICAL PERSONAS",
    oneLiner: "[REAL FEARS. REAL LANGUAGE. REAL PEOPLE.]",
  },
  {
    icon: CalendarDays,
    title: "30-60 DAY CAMPAIGN CALENDAR",
    oneLiner: "[EVERY TOUCHPOINT. MAPPED. SEQUENCED. READY.]",
  },
  {
    icon: Palette,
    title: "BRAND MOODBOARD",
    oneLiner: "[THE EMOTIONAL BLUEPRINT BEFORE THE FIRST ASSET.]",
  },
  {
    icon: BookOpen,
    title: "BRAND BIBLE",
    oneLiner: "[THE DOS. THE DON'TS. THE LINE YOU NEVER CROSS.]",
  },
];

const lf8Grid = [
  { label: "SURVIVAL", usp: "Works while you sleep.\nSells while you don't." },
  { label: "PLEASURE", usp: "The joy of waking up to skin\nthat already did the work." },
  { label: "FREEDOM", usp: "The 30-second routine that gives\nyou your mornings back." },
  { label: "DESIRE", usp: "The 'I woke up like this' glow.\nYou didn't. But they'll never know." },
  { label: "COMFORT", usp: "Set it. Forget it.\nLook incredible anyway." },
  { label: "SUPERIORITY", usp: "The unfair advantage hiding\nin your own reviews." },
  { label: "PROTECTION", usp: "No more guesswork.\nNo more bathroom graveyard." },
  { label: "APPROVAL", usp: "Your skin is glowing.\nWhat's your secret?" },
];

const personas = [
  { thought: "Will this actually work\nor is this expensive hype?", trigger: "SKEPTICISM" },
  { thought: "I've tried everything.\nNothing works for my skin.", trigger: "EXHAUSTION" },
  { thought: "I don't have time for\na 10-step routine anymore.", trigger: "TIME FAMINE" },
];

const calendarLegend = [
  { color: "bg-primary", label: "INOCULATION" },
  { color: "bg-amber-500", label: "OBJECTION" },
  { color: "bg-pure-white", label: "IDENTITY" },
  { color: "bg-blue-500", label: "CAMPAIGN" },
];

const calendarDays = Array.from({ length: 30 }, (_, i) => {
  const types = ["primary", "amber", "white", "blue"];
  return { day: i + 1, type: types[Math.floor(Math.random() * 4)] };
});

const moodboardCells = [
  { label: "COLOR PALETTE", word: "SHARP." },
  { label: "TEXTURE & GRAIN", word: "TACTILE." },
  { label: "TYPOGRAPHY", word: "DELIBERATE." },
  { label: "PHOTOGRAPHY", word: "QUIET." },
  { label: "BRAND EMOTION", word: "EARNED." },
  { label: "REFERENCES", word: "INEVITABLE." },
];

const brandBibleRows = [
  {
    doText: "Write like a trusted friend\nwho knows the science.",
    dontText: "Sound like a billboard\nthat paid for the space.",
  },
  {
    doText: "Lead with the benefit.\nEvery single time.",
    dontText: "Bury it in paragraph three.",
  },
  {
    doText: "One idea per email.\nOwn it completely.",
    dontText: "Seven ideas. Zero impact.\nFull inbox.",
  },
  {
    doText: "Make them feel seen\nbefore you sell.",
    dontText: "Make them feel like\na transaction.",
  },
  {
    doText: "Staccato when you need force.\nFlow when you need to pull.",
    dontText: "Same pace for 500 words.\nEmpty room by line three.",
  },
];

/* ───── COMPACT VISUALS (for bottom preview) ───── */

const MiniVisual01 = () => (
  <div className="grid grid-cols-4 gap-[1px]">
    {lf8Grid.map((cell) => (
      <div key={cell.label} className="border border-foreground/10 bg-background px-2 py-2 hover:border-primary transition-colors group">
        <span className="font-display text-[9px] md:text-[10px] text-pure-white">{cell.label}</span>
      </div>
    ))}
  </div>
);

const MiniVisual02 = () => (
  <div className="flex gap-6 justify-center">
    {personas.map((p) => (
      <div key={p.trigger} className="flex flex-col items-center text-center max-w-[120px]">
        <div className="w-8 h-8 rounded-full border border-foreground/30 mb-2" />
        <span className="font-display text-[9px] text-primary">[{p.trigger}]</span>
      </div>
    ))}
  </div>
);

const MiniVisual03 = () => (
  <div className="grid grid-cols-10 gap-[1px]">
    {calendarDays.slice(0, 20).map((d, i) => {
      const dotColor =
        d.type === "primary" ? "bg-primary" :
        d.type === "amber" ? "bg-amber-500" :
        d.type === "white" ? "bg-pure-white" : "bg-blue-500";
      return (
        <div key={i} className="border border-foreground/10 p-1 text-center">
          <div className={`w-1 h-1 rounded-full ${dotColor} mx-auto`} />
        </div>
      );
    })}
  </div>
);

const MiniVisual04 = () => (
  <div className="grid grid-cols-3 gap-[1px]">
    {moodboardCells.map((cell) => (
      <div key={cell.label} className="border border-foreground/10 bg-background px-2 py-2 hover:border-primary transition-colors">
        <span className="meta-label text-foreground/40 text-[7px]">{cell.label}</span>
      </div>
    ))}
  </div>
);

const MiniVisual05 = () => (
  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
    <span className="font-display text-[9px] text-primary">DO ↓</span>
    <span className="font-display text-[9px] text-primary text-right">DON'T ↓</span>
    {brandBibleRows.slice(0, 3).map((row, i) => (
      <div key={i} className="contents">
        <p className="font-serif text-[8px] italic text-foreground/50 border-b border-foreground/5 py-1">{row.doText.split("\n")[0]}</p>
        <p className="font-serif text-[8px] italic text-foreground/50 border-b border-foreground/5 py-1 text-right">{row.dontText.split("\n")[0]}</p>
      </div>
    ))}
  </div>
);

const miniVisuals = [MiniVisual01, MiniVisual02, MiniVisual03, MiniVisual04, MiniVisual05];

/* ───── MAIN ───── */

interface Phase01Props {
  isActive: boolean;
}

const Phase01PreFlight = ({ isActive }: Phase01Props) => {
  const [activeCard, setActiveCard] = useState(0);
  const ActiveMiniVisual = miniVisuals[activeCard];

  return (
    <div className="w-screen h-screen flex-shrink-0 flex flex-col overflow-hidden snap-start">
      {/* Main content — single column: cards left-aligned, visual below */}
      <div className="flex-1 flex flex-col overflow-hidden px-6 md:px-10 pt-14 md:pt-16">
        {/* Headline */}
        <h2
          className={`font-display text-[clamp(1.6rem,3.5vw,3rem)] leading-[0.95] text-pure-white mb-2 transition-all duration-700 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          WE BUILD THE BRAIN
          <br />
          BEFORE WE WRITE
          <br />
          A SINGLE WORD.
        </h2>
        <p
          className={`font-serif text-xs md:text-sm italic text-foreground/60 mb-4 transition-all duration-700 delay-200 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Most creatives open a doc and start typing. We open your reviews.
        </p>

        {/* Deliverable cards — left column */}
        <div className="flex flex-col gap-1.5 mb-4 max-w-[600px]">
          {deliverables.map((d, i) => {
            const isSelected = activeCard === i;
            const Icon = d.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveCard(i)}
                className={`flex items-center gap-3 border px-3 py-2.5 text-left transition-all duration-300 ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
                    : "border-foreground/10 bg-card hover:border-foreground/20 hover:bg-card/80"
                }`}
                style={{
                  transitionDelay: isActive ? `${300 + i * 80}ms` : "0ms",
                  opacity: isActive ? undefined : 0,
                  transform: isActive ? undefined : "translateX(-20px)",
                }}
              >
                <div className={`w-8 h-8 flex items-center justify-center rounded-sm transition-colors ${
                  isSelected ? "bg-primary/20" : "bg-foreground/5"
                }`}>
                  <Icon
                    size={15}
                    className={`flex-shrink-0 transition-colors ${isSelected ? "text-primary" : "text-foreground/40"}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`font-display text-xs md:text-sm block ${isSelected ? "text-pure-white" : "text-foreground/50"}`}>
                    {d.title}
                  </span>
                  <span className="font-mono text-[7px] md:text-[8px] tracking-wider text-muted-foreground block mt-0.5">
                    {d.oneLiner}
                  </span>
                </div>
                <ArrowRight size={12} className={`flex-shrink-0 transition-colors ${isSelected ? "text-primary" : "text-foreground/15"}`} />
              </button>
            );
          })}
        </div>

        {/* Mini visual preview — bottom area */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="meta-label text-muted-foreground/50">
              [DELIVERABLE {String(activeCard + 1).padStart(2, "0")} OF 05]
            </span>
            <button className="meta-label text-primary hover:text-pure-white transition-colors">
              [ SEE EXAMPLE → ]
            </button>
          </div>
          <div className="flex-1 border border-foreground/10 bg-card/50 rounded-sm p-4 overflow-hidden">
            <ActiveMiniVisual />
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-primary/30 px-6 md:px-10 py-3 flex justify-between items-center flex-shrink-0">
        <span className="meta-label text-muted-foreground/50">
          [PHASE 01 COMPLETE — 5 DELIVERABLES — ZERO GUESSWORK]
        </span>
        <span className="meta-label text-primary animate-pulse">
          PHASE 02: THE BACKEND →
        </span>
      </div>
    </div>
  );
};

export default Phase01PreFlight;
