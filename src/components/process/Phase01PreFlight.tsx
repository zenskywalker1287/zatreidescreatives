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

/* ───── VISUALS ───── */

const Visual01 = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-[1px] bg-foreground/10">
        {lf8Grid.map((cell, i) => (
          <div
            key={cell.label}
            className="bg-background border border-foreground/10 p-4 md:p-6 cursor-pointer transition-all duration-300 hover:border-primary group relative min-h-[80px] md:min-h-[100px]"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="font-display text-sm md:text-base text-pure-white">{cell.label}</span>
            {hovered === i && (
              <p className="font-serif text-[11px] md:text-xs italic text-foreground/70 mt-2 whitespace-pre-line animate-fade-in">
                {cell.usp}
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="meta-label text-center mt-4">[100+ ANGLES. ALL ROOTED IN HUMAN DESIRE.]</p>
    </div>
  );
};

const Visual02 = () => (
  <div className="h-full flex flex-col justify-center items-center">
    <div className="flex gap-8 md:gap-12 mb-8">
      {personas.map((p) => (
        <div key={p.trigger} className="flex flex-col items-center text-center max-w-[160px]">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-foreground/30 mb-4" />
          <p className="font-serif text-[10px] md:text-xs italic text-foreground/60 whitespace-pre-line mb-3 min-h-[40px]">
            "{p.thought}"
          </p>
          <span className="font-display text-sm text-primary">[{p.trigger}]</span>
        </div>
      ))}
    </div>
    <p className="meta-label">[WE WRITE TO THE FEAR. NOT THE DEMOGRAPHIC.]</p>
  </div>
);

const Visual03 = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="grid grid-cols-10 gap-[1px]">
        {calendarDays.map((d, i) => {
          const dotColor =
            d.type === "primary" ? "bg-primary" :
            d.type === "amber" ? "bg-amber-500" :
            d.type === "white" ? "bg-pure-white" : "bg-blue-500";
          return (
            <div
              key={i}
              className="border border-foreground/10 p-1 md:p-2 text-center cursor-pointer hover:border-primary transition-colors relative group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="font-mono text-[7px] md:text-[8px] text-muted-foreground">D{String(d.day).padStart(2, "0")}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${dotColor} mx-auto mt-1`} />
              {hovered === i && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card border border-foreground/20 p-2 text-[8px] font-mono text-foreground whitespace-nowrap z-10">
                  DAY {d.day} · [{d.type.toUpperCase()}]
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-4 justify-center">
        {calendarLegend.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${l.color}`} />
            <span className="font-mono text-[8px] text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Visual04 = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="grid grid-cols-3 gap-[1px]">
        {moodboardCells.map((cell, i) => (
          <div
            key={cell.label}
            className="border border-foreground/10 bg-background p-4 md:p-6 cursor-pointer hover:border-primary transition-all duration-300 min-h-[100px] md:min-h-[120px] flex flex-col justify-center"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === i ? (
              <span className="font-display text-2xl md:text-4xl text-pure-white animate-fade-in">{cell.word}</span>
            ) : (
              <span className="meta-label text-foreground/60">{cell.label}</span>
            )}
          </div>
        ))}
      </div>
      <p className="meta-label text-center mt-4">[VIBES AREN'T RANDOM. WE MAP THEM FIRST.]</p>
    </div>
  );
};

const Visual05 = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredSide, setHoveredSide] = useState<"do" | "dont" | null>(null);
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-0">
        <div className="font-display text-sm text-primary border-b border-foreground/10 pb-2 mb-2">DO ↓</div>
        <div className="font-display text-sm text-primary border-b border-foreground/10 pb-2 mb-2 text-right">DON'T ↓</div>
        {brandBibleRows.map((row, i) => (
          <>
            <div
              key={`do-${i}`}
              className={`border-b border-foreground/5 py-3 pr-4 cursor-pointer transition-all duration-300 relative ${
                hoveredRow === i && hoveredSide === "do" ? "bg-foreground/5" : ""
              }`}
              onMouseEnter={() => { setHoveredRow(i); setHoveredSide("do"); }}
              onMouseLeave={() => { setHoveredRow(null); setHoveredSide(null); }}
            >
              <p className="font-serif text-[11px] md:text-xs italic text-foreground/70 whitespace-pre-line">{row.doText}</p>
              {hoveredRow === i && hoveredSide === "do" && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-cream text-xs">[✓]</span>
              )}
            </div>
            <div
              key={`dont-${i}`}
              className={`border-b border-foreground/5 py-3 pl-4 cursor-pointer transition-all duration-300 relative ${
                hoveredRow === i && hoveredSide === "dont" ? "bg-primary/5" : ""
              }`}
              onMouseEnter={() => { setHoveredRow(i); setHoveredSide("dont"); }}
              onMouseLeave={() => { setHoveredRow(null); setHoveredSide(null); }}
            >
              <p className="font-serif text-[11px] md:text-xs italic text-foreground/70 whitespace-pre-line">{row.dontText}</p>
              {hoveredRow === i && hoveredSide === "dont" && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-primary text-xs">[✗]</span>
              )}
            </div>
          </>
        ))}
      </div>
      <p className="meta-label text-center mt-4 whitespace-pre-line">
        {"[YOUR BRAND'S CONSTITUTION.\nWRITTEN ONCE. REFERENCED FOREVER.]"}
      </p>
    </div>
  );
};

const visuals = [Visual01, Visual02, Visual03, Visual04, Visual05];

/* ───── MAIN ───── */

interface Phase01Props {
  isActive: boolean;
}

const Phase01PreFlight = ({ isActive }: Phase01Props) => {
  const [activeCard, setActiveCard] = useState(0);
  const ActiveVisual = visuals[activeCard];

  return (
    <div className="w-screen h-screen flex-shrink-0 flex flex-col overflow-hidden snap-start">
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT — Cards */}
        <div className="w-full lg:w-[40%] h-1/2 lg:h-full flex flex-col px-6 md:px-10 py-6 md:py-10 overflow-y-auto">
          <h2
            className={`font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-[0.95] text-pure-white mb-3 transition-all duration-700 ${
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
            className={`font-serif text-sm md:text-base italic text-foreground/60 mb-6 transition-all duration-700 delay-200 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Most creatives open a doc and start typing.
            <br />
            We open your reviews.
          </p>

          <div className="flex flex-col gap-2 flex-1">
            {deliverables.map((d, i) => {
              const isSelected = activeCard === i;
              const Icon = d.icon;
              return (
                <button
                  key={i}
                  onClick={() => setActiveCard(i)}
                  className={`flex items-center gap-4 border px-4 py-3 md:py-4 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-foreground/10 bg-background opacity-40 hover:opacity-70 hover:border-foreground/20"
                  }`}
                  style={{
                    transitionDelay: isActive ? `${300 + i * 100}ms` : "0ms",
                    opacity: isActive ? undefined : 0,
                    transform: isActive ? undefined : "translateX(-20px)",
                  }}
                >
                  <Icon
                    size={18}
                    className={`flex-shrink-0 transition-colors ${isSelected ? "text-primary" : "text-foreground/40"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <span className={`font-display text-sm md:text-base block ${isSelected ? "text-pure-white" : "text-foreground/60"}`}>
                      {d.title}
                    </span>
                    <span className="font-mono text-[8px] md:text-[9px] tracking-wider text-muted-foreground block mt-0.5">
                      {d.oneLiner}
                    </span>
                  </div>
                  <ArrowRight size={14} className={`flex-shrink-0 ${isSelected ? "text-primary" : "text-foreground/20"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Dynamic visual */}
        <div className="w-full lg:w-[60%] h-1/2 lg:h-full border-t lg:border-t-0 lg:border-l border-foreground/10 px-6 md:px-10 py-6 md:py-10 overflow-y-auto relative">
          <div className="absolute top-4 right-6 md:top-6 md:right-10 meta-label text-muted-foreground/50">
            [DELIVERABLE {String(activeCard + 1).padStart(2, "0")} OF 05]
          </div>
          <div className="h-full">
            <ActiveVisual />
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
