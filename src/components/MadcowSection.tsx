import { useRef, useState, useEffect } from "react";
import { useInView } from "../hooks/useInView";

const personas = [
  {
    id: "tactical",
    name: "THE TACTICAL GUARDIAN",
    trigger: "SAFETY",
    tint: "0, 40%, 15%",
    quote: "Is this strong enough for my 120lb protection dog?",
    code: "Over-engineered for the dogs that break everything else.",
    primary: "FEAR OF FAILURE",
    secondary: "SOCIAL PROOF",
    hooks: [
      "Rated for 120lb+ working dogs",
      "Mil-spec hardware, zero compromise",
      "Your dog's life depends on this collar",
    ],
  },
  {
    id: "warrior",
    name: "THE WEEKEND WARRIOR",
    trigger: "DURABILITY",
    tint: "30, 30%, 12%",
    quote: "Will this survive mud, rivers, and mountains?",
    code: "Built for the terrain your dog actually runs.",
    primary: "DURABILITY",
    secondary: "PERFORMANCE",
    hooks: [
      "Waterproof. Mud-proof. Dog-proof.",
      "From trail to town — one collar does it all",
      "Built for dogs that actually live outside",
    ],
  },
  {
    id: "snob",
    name: "THE GEAR SNOB",
    trigger: "STATUS",
    tint: "0, 0%, 16%",
    quote: "Does this look like every other cheap collar on Amazon?",
    code: "The collar other collar brands don't want you to know exists.",
    primary: "STATUS",
    secondary: "EXCLUSIVITY",
    hooks: [
      "Not available at PetSmart. Ever.",
      "The collar people ask about at the dog park",
      "Designed for owners with actual taste",
    ],
  },
];

const TypewriterLine = ({ text, started }: { text: string; started: boolean }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!started) { setDisplayed(""); return; }
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, 25);
    return () => clearInterval(iv);
  }, [text, started]);
  return <>{displayed}<span className="animate-pulse">|</span></>;
};

const MadcowSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);
  const [active, setActive] = useState<number | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (active !== null) {
      const t = setTimeout(() => setShowPanel(true), 400);
      return () => clearTimeout(t);
    }
    setShowPanel(false);
  }, [active]);

  const p = active !== null ? personas[active] : null;

  return (
    <section
      id="personas"
      className="section-border relative overflow-hidden transition-all duration-700"
      ref={ref}
      style={{
        background: p ? `radial-gradient(ellipse at 30% 50%, hsl(${p.tint}) 0%, hsl(0,0%,0%) 70%)` : undefined,
      }}
    >
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <span className="meta-label text-primary">[04] BLUEPRINT</span>
        <h2 className="font-display text-[clamp(2rem,6vw,6rem)] leading-[0.95] text-pure-white mt-4 mb-2">
          THE PSYCHOLOGICAL<br />ARCHITECT.
        </h2>
        <p className="meta-label mb-16">[SELECT A PERSONA — ENTER THEIR MINDSET]</p>

        {/* Persona Cards + Detail Panel */}
        <div className={`transition-all duration-500 ${active !== null ? "grid md:grid-cols-[280px_1fr] gap-8" : ""}`}>
          {/* Cards Column */}
          <div className={`flex ${active !== null ? "flex-col" : "flex-col md:flex-row"} gap-4`}>
            {personas.map((persona, i) => {
              const isActive = active === i;
              const isOther = active !== null && !isActive;
              return (
                <div
                  key={persona.id}
                  onClick={() => setActive(isActive ? null : i)}
                  className={`border cursor-pointer transition-all duration-500 group relative overflow-hidden ${
                    isActive
                      ? "border-primary/50 flex-shrink-0"
                      : isOther
                        ? "border-foreground/10 opacity-40 hover:opacity-60"
                        : "border-foreground/20 hover:border-foreground/40"
                  } ${active === null ? "flex-1" : ""} ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: `${i * 150}ms`,
                    transform: active === null && inView ? `perspective(800px) rotateY(${(i - 1) * 3}deg)` : undefined,
                  }}
                >
                  {/* Portrait placeholder */}
                  <div className={`${active === null ? "h-48 md:h-64" : isActive ? "h-24" : "h-16"} bg-foreground/5 transition-all duration-500 flex items-center justify-center`}>
                    <div className={`${isActive ? "w-12 h-12" : active === null ? "w-20 h-20" : "w-8 h-8"} rounded-full border border-foreground/20 bg-foreground/5 transition-all duration-500`} />
                  </div>
                  {/* Info */}
                  <div className={`${isOther ? "p-3" : "p-5"} transition-all duration-300`}>
                    <h3 className={`font-display ${isOther ? "text-sm" : "text-lg md:text-xl"} text-pure-white leading-tight transition-all duration-300`}>
                      {persona.name}
                    </h3>
                    <span className="meta-label text-primary mt-2 block text-[9px]">
                      [TRIGGER: {persona.trigger}]
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail Panel */}
          {p && (
            <div className={`transition-all duration-500 ${showPanel ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              {/* Quote */}
              <div className="mb-8">
                <span className="meta-label text-primary block mb-4">VERBATIM CUSTOMER QUOTE</span>
                <blockquote className="font-serif-thin text-2xl md:text-3xl lg:text-4xl text-foreground italic leading-snug">
                  "{p.quote}"
                </blockquote>
              </div>

              {/* Linguistic Code */}
              <div className="mb-8">
                <span className="meta-label text-primary block mb-4">LINGUISTIC CODE</span>
                <p className="font-mono text-sm md:text-base text-foreground">
                  <TypewriterLine text={p.code} started={showPanel} />
                </p>
              </div>

              {/* Output Hooks */}
              <div className="mb-8">
                <span className="meta-label block mb-3">OUTPUT HOOKS</span>
                <div className="space-y-2">
                  {p.hooks.map((hook, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-primary text-xs">→</span>
                      <span className="font-mono text-xs text-foreground/80">{hook}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Psychological Levers */}
              <div className="border border-foreground/10 p-5">
                <span className="meta-label block mb-4">PSYCHOLOGICAL LEVERS</span>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex gap-3">
                    <span className="text-muted-foreground">PRIMARY:</span>
                    <span className="text-primary">[{p.primary}]</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-muted-foreground">SECONDARY:</span>
                    <span className="text-foreground/70">[{p.secondary}]</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom label */}
        <div className="mt-16 pt-8 border-t border-foreground/5">
          <span className="meta-label text-muted-foreground/60">
            [CASE STUDY: MADCOW COLLARS — 40% OF TOTAL REVENUE FROM EMAIL]
          </span>
        </div>
      </div>
    </section>
  );
};

export default MadcowSection;
