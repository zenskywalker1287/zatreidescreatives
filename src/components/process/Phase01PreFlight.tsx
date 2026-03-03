import { useState } from "react";
import { Search, Users, CalendarDays, Palette, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const deliverables = [
  {
    icon: Search,
    title: "100+ USPS",
    oneLiner: "[MAPPED TO REAL BUYER PSYCHOLOGY]",
    example: "Extracted from your real customer language. Every angle your brand has. Nothing assumed.",
  },
  {
    icon: Users,
    title: "3+ PERSONAS",
    oneLiner: "[WHO THEY ARE. WHY THEY BUY.]",
    example: "Built from real fears. Real language. Real objections. Not demographics — psychology.",
  },
  {
    icon: CalendarDays,
    title: "30-60 DAY CALENDAR",
    oneLiner: "[ZERO GUESSWORK. EVERY SEND.]",
    example: "Every touchpoint mapped before we write a single subject line. Sequenced with intent.",
  },
  {
    icon: Palette,
    title: "BRAND MOODBOARD",
    oneLiner: "[VIBES ARE NOT RANDOM.]",
    example: "The emotional world your brand lives in. Locked before a single creative is made.",
  },
  {
    icon: BookOpen,
    title: "BRAND BIBLE",
    oneLiner: "[THE DOS. THE DON'TS. THE LINE.]",
    example: "Your voice. Your rules. The line you never cross. Written once. Referenced forever.",
  },
];

interface Phase01Props {
  isActive: boolean;
}

const Phase01PreFlight = ({ isActive }: Phase01Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCard, setModalCard] = useState(0);

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
          WE BUILD THE
          <br />
          BRAIN FIRST.
        </h2>

        <p
          className={`font-serif-thin italic text-sm md:text-base text-foreground/60 text-center mb-6 transition-all duration-700 delay-200 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Most creatives open a doc and start typing.
          <br />
          We open your reviews, your Reddit threads,
          <br />
          your competitor ads.
          <br />
          By the time we write a single word —
          <br />
          we already know what makes
          <br />
          your customer buy at 2am.
        </p>

        {/* Divider */}
        <div className={`w-24 h-[1px] bg-foreground/20 mb-8 transition-all duration-700 delay-300 ${isActive ? "scale-x-100" : "scale-x-0"}`} />

        {/* 5 Cards */}
        <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl">
          {deliverables.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={i}
                className="group border border-foreground/15 rounded-lg bg-[hsl(0,0%,4%)] p-6 flex flex-col items-center text-center transition-all duration-200 hover:border-primary hover:-translate-y-1 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.15)] cursor-pointer"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? undefined : "translateY(20px)",
                  transition: `all 0.5s ease ${400 + i * 100}ms`,
                }}
                onClick={() => { setModalCard(i); setModalOpen(true); }}
              >
                <Icon
                  size={28}
                  strokeWidth={1.2}
                  className="text-pure-white mb-4 transition-colors group-hover:text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                />
                <h3 className="font-display text-lg md:text-xl text-pure-white mb-2">{d.title}</h3>
                <span className="font-mono text-[8px] md:text-[9px] tracking-wider text-muted-foreground mb-4">
                  {d.oneLiner}
                </span>
                <span className="font-mono text-[9px] tracking-wider text-foreground/30 group-hover:text-primary transition-colors">
                  [ SEE EXAMPLE → ]
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-foreground/15 px-6 md:px-10 py-3 flex justify-between items-center flex-shrink-0">
        <span className="meta-label text-muted-foreground/50 whitespace-pre-line">
          {"[PHASE 01 COMPLETE — ZERO GUESSWORK.\nSTRATEGY LOCKED. READY TO BUILD.]"}
        </span>
        <span className="meta-label text-primary animate-pulse">
          PHASE 02 →
        </span>
      </div>

      {/* Example Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-[hsl(0,0%,4%)] border-foreground/15 max-w-lg p-8">
          <DialogTitle className="font-display text-2xl text-pure-white flex items-center gap-3">
            {(() => { const Icon = deliverables[modalCard].icon; return <Icon size={24} strokeWidth={1.2} className="text-primary" />; })()}
            {deliverables[modalCard].title}
          </DialogTitle>
          <div className="w-full h-[1px] bg-foreground/10 my-2" />
          <p className="font-mono text-xs text-foreground/60 leading-relaxed">
            {deliverables[modalCard].example}
          </p>
          <span className="meta-label text-muted-foreground/30 mt-4">
            {deliverables[modalCard].oneLiner}
          </span>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Phase01PreFlight;
