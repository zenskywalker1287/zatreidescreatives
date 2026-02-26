import { useRef } from "react";
import { useInView } from "../hooks/useInView";

const pipelineSteps = [
  { label: "RAW IDEA", desc: "One core product concept", icon: "◆" },
  { label: "100 USPS EXTRACTED", desc: "Systematic extraction process", icon: "◈" },
  { label: "EMAIL SEQUENCE", desc: "30-day nurture automation", icon: "▣" },
  { label: "AD CREATIVE", desc: "Platform-specific variants", icon: "▤" },
  { label: "PERSONA HOOK", desc: "3 buyer identity triggers", icon: "▥" },
  { label: "CAMPAIGN CALENDAR", desc: "Full deployment roadmap", icon: "▦" },
];

const PipelineSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);

  return (
    <section id="pipeline" className="section-border" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <span className="meta-label text-primary">[03] PIPELINE</span>
        <h2 className="font-display text-[clamp(2rem,6vw,6rem)] leading-[0.95] text-pure-white mt-4 mb-4">
          ONE IDEA. 100 USPS.<br />30+ TOUCHPOINTS.
        </h2>
        <p className="font-serif-thin text-lg md:text-xl text-muted-foreground italic mb-16">
          Watch the machine process a single input into an arsenal.
        </p>

        {/* Horizontal scroll pipeline */}
        <div className="horizontal-scroll">
          {pipelineSteps.map((step, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-[280px] md:w-[320px] brutal-card relative group transition-all duration-500 hover:border-primary/40 ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Connection line */}
              {i < pipelineSteps.length - 1 && (
                <div className="absolute right-0 top-1/2 w-6 h-px bg-foreground/20 translate-x-full hidden md:block" />
              )}
              
              <div className="flex items-center gap-3 mb-6">
                <span className="meta-label text-primary">STEP {String(i + 1).padStart(2, '0')}</span>
              </div>
              <span className="text-2xl mb-4 block opacity-20">{step.icon}</span>
              <h3 className="font-display text-2xl text-pure-white mb-2">{step.label}</h3>
              <p className="font-mono text-xs text-muted-foreground">{step.desc}</p>
              
              {/* Arrow indicator */}
              {i === 1 && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <span className="text-primary text-xs font-mono">↓ SPLITS INTO</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
