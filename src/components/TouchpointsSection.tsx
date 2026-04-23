import { useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

const phases = [
  {
    range: "1–5",
    label: "INOCULATION",
    principle: "Psychological Inoculation Theory",
    desc: "Protect against cheap alternatives. Build authority before competitors even enter the conversation.",
    detail: "Pre-emptive defense. The prospect becomes resistant to competing messages because you got there first.",
  },
  {
    range: "6–15",
    label: "OBJECTION CRUSHER",
    principle: "Cognitive Dissonance Reduction",
    desc: "Handle shame, doubt, confusion, price resistance — before they even articulate it.",
    detail: "Remove every barrier between desire and action. Each touchpoint kills a specific objection.",
  },
  {
    range: "16–30",
    label: "IDENTITY BRIDGE",
    principle: "Social Identity Theory",
    desc: "Make them part of the tribe. Belonging > buying.",
    detail: "The product becomes a symbol. Purchasing becomes an act of self-expression, not consumption.",
  },
];

const TouchpointsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.15);
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section className="section-border" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <span className="meta-label text-primary">SCIENCE</span>
        <h2 className="font-display text-[clamp(2rem,5vw,5rem)] leading-[0.95] text-pure-white mt-4 mb-4">
          WHY 30 TOUCHPOINTS <span className="block md:inline">IS THE MINIMUM IN 2026.</span>
        </h2>
        <p className="font-serif-thin text-lg text-muted-foreground italic mb-16">
          A psychology textbook designed by a film director.
        </p>

        <div className="relative">
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-foreground/10">
            <div
              className="h-full bg-primary transition-all duration-700"
              style={{ width: `${((activePhase + 1) / phases.length) * 100}%` }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {phases.map((phase, i) => (
              <button
                key={i}
                onClick={() => setActivePhase(i)}
                className={`text-left p-6 border transition-all duration-500 ${
                  activePhase === i
                    ? "border-primary/40 bg-primary/5"
                    : "border-foreground/10 hover:border-foreground/20"
                } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`font-body text-2xl font-bold ${activePhase === i ? "text-primary" : "text-foreground/30"}`}>
                    {phase.range}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-pure-white mb-2">{phase.label}</h3>
                <span className="meta-label text-primary/60 block mb-3">{phase.principle}</span>
                <p className="font-body text-xs text-muted-foreground">{phase.desc}</p>
              </button>
            ))}
          </div>

          <div className="brutal-card border-primary/20 bg-primary/[0.02]">
            <span className="meta-label text-primary block mb-3">TOUCHPOINTS {phases[activePhase].range}</span>
            <h3 className="font-display text-3xl text-pure-white mb-2">{phases[activePhase].label}</h3>
            <p className="font-body text-sm text-foreground/80 max-w-2xl">{phases[activePhase].detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TouchpointsSection;
