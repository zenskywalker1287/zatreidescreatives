import { useRef } from "react";
import { useInView } from "../hooks/useInView";

const cards = [
  { id: 1, span: "col-span-2", label: "NZ$489K TOTAL · NZ$126K FROM EMAIL · 83% INCREASE" },
  { id: 2, span: "", label: "A$400K TOTAL · A$112K EMAIL · 554% INCREASE" },
  { id: 3, span: "", label: "$76K TOTAL · $25K FROM EMAIL · 124% INCREASE" },
  { id: 4, span: "", label: "$42K TOTAL · $13K EMAIL · 926% INCREASE" },
  { id: 5, span: "col-span-2", label: "50-72% OPEN RATES · CONSISTENT ACROSS CAMPAIGNS" },
  { id: 6, span: "", label: "54-62% OPEN RATES · MULTIPLE BRANDS" },
  { id: 7, span: "", label: "PER EMAIL REVENUE · BRANDS DOING 6-FIGURES" },
  { id: 8, span: "col-span-2", label: "DIRECT FEEDBACK · CEO · MKTG EMAILS" },
];

const ProofOfWork = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);

  return (
    <section
      ref={ref}
      className={`section-border py-20 md:py-32 px-6 md:px-12 lg:px-20 transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center mb-16">
        <span className="meta-label text-primary">[PROOF OF WORK — REAL KLAVIYO DATA]</span>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-pure-white mt-4 mb-3">
          THE NUMBERS DON'T LIE.
        </h2>
        <p className="font-serif-thin italic text-foreground/70 text-lg max-w-xl mx-auto mb-8">
          Real dashboards. Real brands. Real results.
        </p>
        <div className="w-full h-[1px] bg-foreground/10 max-w-4xl mx-auto" />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-16">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${card.span} group relative border border-foreground/15 rounded-lg overflow-hidden bg-[#0a0a0a] hover:border-foreground/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
          >
            {/* Placeholder for screenshot */}
            <div className="aspect-video w-full bg-muted/10 flex items-center justify-center">
              <span className="meta-label text-foreground/20">[SCREENSHOT {String(card.id).padStart(2, "0")}]</span>
            </div>

            {/* Gradient overlay + label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent p-4 pt-8 group-hover:from-[#0a0a0a]/90 transition-all duration-300">
              <span className="font-mono text-[9px] tracking-[0.15em] text-foreground/50 uppercase leading-tight">
                [{card.label}]
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="w-full h-[1px] bg-foreground/10 max-w-4xl mx-auto mb-6" />
      <div className="text-center space-y-1">
        <p className="meta-label text-foreground/40">[ALL DATA FROM REAL KLAVIYO ACCOUNTS]</p>
        <p className="meta-label text-foreground/30">[BRAND NAMES OMITTED TO PROTECT CLIENT PRIVACY]</p>
      </div>
    </section>
  );
};

export default ProofOfWork;
