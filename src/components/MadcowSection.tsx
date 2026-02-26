import { useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

const lf8Items = [
  { desire: "Protection of Loved Ones", output: "Your dog's safety is non-negotiable", active: true },
  { desire: "Social Status / Approval", output: "The most aggressive-looking gear at the park", active: true },
  { desire: "Quality & Craftsmanship", output: "Over-engineered for dogs that break everything else", active: true },
  { desire: "Freedom / Independence", output: "No leash anxiety. Total control, total trust.", active: false },
  { desire: "Comfort & Survival", output: "Built for the real world, not the showroom", active: true },
  { desire: "Superiority / Winning", output: "Your dog looks like the alpha. So do you.", active: false },
];

const personas = [
  {
    id: "tactical",
    name: "THE TACTICAL GUARDIAN",
    quote: "Is it strong enough for my 120lb protection dog?",
    trigger: "Safety / Strength",
    code: "Direct. No-nonsense. Military precision. Commands respect.",
    hooks: ["Rated for 120lb+ working dogs", "Mil-spec hardware, zero compromise", "Your dog's life depends on this collar"],
  },
  {
    id: "warrior",
    name: "THE WEEKEND WARRIOR",
    quote: "Will it survive mud, mountains, and rivers?",
    trigger: "Durability / Efficiency",
    code: "Adventure-forward. Challenge-tested. Earned, not bought.",
    hooks: ["Waterproof. Mud-proof. Dog-proof.", "From trail to town — one collar does it all", "Built for dogs that actually live outside"],
  },
  {
    id: "snob",
    name: "THE GEAR SNOB",
    quote: "Does it look like every other cheap Amazon collar?",
    trigger: "Status / Exclusivity",
    code: "Elevated taste. Anti-generic. Curated identity.",
    hooks: ["Not available at PetSmart. Ever.", "The collar people ask about at the dog park", "Designed for owners with actual taste"],
  },
];

const nonNegotiables = [
  "We mine reviews. We never guess.",
  "100+ USPs extracted per brand — minimum.",
  "Zero gaps between ad and email messaging.",
  "30+ touchpoints as a baseline, not a bonus.",
  "Every word maps to a biological desire.",
];

const MadcowSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);
  const [activePersona, setActivePersona] = useState(0);

  return (
    <section id="personas" className="section-border" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <span className="meta-label text-primary">[04] BLUEPRINT</span>
        <h2 className="font-display text-[clamp(2rem,6vw,6rem)] leading-[0.95] text-pure-white mt-4 mb-2">
          THE ARCHITECTURE<br />OF PERSUASION
        </h2>
        <p className="meta-label mb-16">[CASE STUDY: MADCOW COLLARS — DOG COLLAR BRAND]</p>

        {/* PART A — LF8 Extraction */}
        <div className="mb-20">
          <h3 className="font-serif-thin text-xl md:text-2xl text-foreground italic mb-8">
            Life Force 8 — Biological Desire Mapping
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lf8Items.map((item, i) => (
              <div
                key={i}
                className={`brutal-card transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${item.active ? "border-foreground/20" : "border-foreground/5 opacity-40"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-3 h-3 mt-1 border ${item.active ? "bg-primary border-primary" : "border-foreground/20"}`} />
                  <div>
                    <span className="meta-label block mb-2">{item.desire}</span>
                    <p className="font-mono text-xs text-foreground">{item.output}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART B — Personas */}
        <div className="mb-20">
          <h3 className="font-serif-thin text-xl md:text-2xl text-foreground italic mb-8">
            The 3 Buyer Personas
          </h3>

          {/* Persona tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {personas.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActivePersona(i)}
                className={`font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 border transition-all duration-300 ${
                  activePersona === i
                    ? "border-primary text-primary bg-primary/5"
                    : "border-foreground/15 text-muted-foreground hover:border-foreground/30"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Persona content */}
          <div className="brutal-card border-foreground/15">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <span className="meta-label text-primary block mb-4">VERBATIM CUSTOMER QUOTE</span>
                <blockquote className="font-serif-thin text-xl md:text-2xl text-foreground italic mb-6">
                  "{personas[activePersona].quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <span className="meta-label">TRIGGER:</span>
                  <span className="font-mono text-xs text-primary">{personas[activePersona].trigger}</span>
                </div>
              </div>
              <div>
                <span className="meta-label text-primary block mb-4">LINGUISTIC CODE</span>
                <p className="font-mono text-sm text-foreground mb-6">{personas[activePersona].code}</p>
                <span className="meta-label block mb-3">OUTPUT HOOKS</span>
                <div className="space-y-2">
                  {personas[activePersona].hooks.map((hook, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-primary text-xs">→</span>
                      <span className="font-mono text-xs text-foreground/80">{hook}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PART C — Non-Negotiables */}
        <div>
          <h3 className="font-serif-thin text-xl md:text-2xl text-foreground italic mb-8">
            Non-Negotiables
          </h3>
          <div className="space-y-3">
            {nonNegotiables.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 py-3 border-b border-foreground/5 transition-all duration-500 ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="font-mono text-xs text-primary">[{String(i + 1).padStart(2, '0')}]</span>
                <span className="font-mono text-sm md:text-base text-foreground font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MadcowSection;
