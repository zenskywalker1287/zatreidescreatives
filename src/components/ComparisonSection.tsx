import { useRef } from "react";
import { useInView } from "../hooks/useInView";

const ComparisonSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.2);

  const leakPoints = [
    "High CPA",
    "One visit",
    "Bounce",
    "Gone",
    "Repeat spend",
    "Zero retention",
  ];

  const enginePoints = [
    "Capture",
    "Nurture",
    "Trust",
    "Convert",
    "Retain",
    "Scale the 99%",
  ];

  return (
    <section id="comparison" className="section-border" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <span className="meta-label text-primary">[02] PROCESS</span>
        <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-pure-white mt-4 mb-16">
          STOP BURNING CASH<br />ON THE LEAK.
        </h2>

        <div className="grid md:grid-cols-2 gap-0">
          {/* THE LEAK */}
          <div className={`border border-foreground/10 p-8 md:p-12 red-tint transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-primary font-mono text-xs uppercase tracking-[0.3em]">[ THE LEAK ]</span>
              <div className="flex-1 h-px bg-primary/30" />
            </div>
            <div className="space-y-4">
              {leakPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-primary/60">{String(i + 1).padStart(2, '0')}</span>
                  <div className="h-px flex-1 bg-primary/20" />
                  <span className="font-mono text-sm text-primary/80">{point}</span>
                  <span className="text-primary text-xs">→</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-primary/20">
              <span className="font-mono text-xs text-primary/50">RESULT: $0 RETAINED VALUE</span>
            </div>
          </div>

          {/* THE ENGINE */}
          <div className={`border border-foreground/10 p-8 md:p-12 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-foreground font-mono text-xs uppercase tracking-[0.3em]">[ THE ENGINE ]</span>
              <div className="flex-1 h-px bg-foreground/20" />
            </div>
            <div className="space-y-4">
              {enginePoints.map((point, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                  <div className={`h-px flex-1 bg-foreground/10 ${inView ? 'animate-line-draw' : ''}`} style={{ animationDelay: `${i * 0.15}s` }} />
                  <span className="font-mono text-sm text-foreground">{point}</span>
                  <span className="text-foreground/40 text-xs">→</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-foreground/10">
              <span className="font-mono text-xs text-foreground/60">RESULT: 99% REVENUE RECOVERED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
