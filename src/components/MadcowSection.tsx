import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "../hooks/useInView";

interface Persona {
  name: string;
  trigger: string;
  icon: string;
  tint: string;
  quote: string;
  code: string;
  desire: string;
  fear: string;
  objection: string;
}

interface Brand {
  label: string;
  personas: [Persona, Persona, Persona];
}

const brands: Brand[] = [
  {
    label: "MADCOW COLLARS",
    personas: [
      {
        name: "THE TACTICAL GUARDIAN",
        trigger: "SAFETY & STRENGTH",
        icon: "🛡",
        tint: "120, 20%, 10%",
        quote: "Is this strong enough to hold my 120lb protection dog?",
        code: "OVER-ENGINEERED FOR THE DOGS THAT BREAK EVERYTHING ELSE.",
        desire: "PROTECTION OF THEIR DOG",
        fear: "EQUIPMENT FAILING WHEN IT MATTERS",
        objection: "IS IT ACTUALLY STRONGER THAN WHAT I HAVE?",
      },
      {
        name: "THE WEEKEND WARRIOR",
        trigger: "DURABILITY & PERFORMANCE",
        icon: "⛰",
        tint: "30, 25%, 10%",
        quote: "Will this survive mud, rivers, and a dog that never stops moving?",
        code: "BUILT FOR THE TERRAIN YOUR DOG ACTUALLY RUNS.",
        desire: "PERFORMANCE IN THE FIELD",
        fear: "GEAR THAT QUITS BEFORE THEY DO",
        objection: "WILL IT ACTUALLY HOLD UP OUTDOORS?",
      },
      {
        name: "THE GEAR SNOB",
        trigger: "STATUS & EXCLUSIVITY",
        icon: "♛",
        tint: "0, 0%, 14%",
        quote: "Does this look like every other cheap collar on Amazon?",
        code: "THE COLLAR OTHER COLLAR BRANDS DON'T WANT YOU TO KNOW EXISTS.",
        desire: "STANDING OUT FROM GENERIC GEAR",
        fear: "LOOKING BASIC",
        objection: "IS THIS ACTUALLY DIFFERENT OR JUST PRICED HIGHER?",
      },
    ],
  },
  {
    label: "GRUNT STYLE",
    personas: [
      {
        name: "THE PROUD VETERAN",
        trigger: "IDENTITY & BELONGING",
        icon: "⬡",
        tint: "120, 20%, 10%",
        quote: "This brand actually gets what we went through.",
        code: "MADE BY VETERANS. WORN BY THE ONES WHO GET IT.",
        desire: "FEELING UNDERSTOOD AND REPRESENTED",
        fear: "BRANDS THAT EXPLOIT MILITARY CULTURE",
        objection: "IS THIS BRAND ACTUALLY LEGIT OR JUST CASHING IN?",
      },
      {
        name: "THE EVERYDAY PATRIOT",
        trigger: "VALUES & PRIDE",
        icon: "⚑",
        tint: "30, 25%, 10%",
        quote: "I want something that represents what I actually believe in.",
        code: "THIS ISN'T MERCH. THIS IS A STATEMENT.",
        desire: "EXPRESSING CORE VALUES PUBLICLY",
        fear: "BEING SEEN AS JUST FOLLOWING A TREND",
        objection: "DOES THIS BRAND ACTUALLY STAND FOR SOMETHING?",
      },
      {
        name: "THE GIFT BUYER",
        trigger: "SOCIAL APPROVAL & LOVE",
        icon: "♥",
        tint: "0, 0%, 14%",
        quote: "I want to get him something that means something.",
        code: "GIVE HIM SOMETHING THAT ACTUALLY MEANS SOMETHING.",
        desire: "GIVING A MEANINGFUL GIFT",
        fear: "GETTING SOMETHING GENERIC OR FORGETTABLE",
        objection: "WILL HE ACTUALLY WEAR THIS?",
      },
    ],
  },
  {
    label: "FLATPACK",
    personas: [
      {
        name: "THE SPACE OPTIMIZER",
        trigger: "CONTROL & EFFICIENCY",
        icon: "▦",
        tint: "120, 20%, 10%",
        quote: "I need this to actually work in a small space — not just look good.",
        code: "EVERY INCH OF YOUR SPACE — FINALLY WORKING FOR YOU.",
        desire: "MAXIMUM FUNCTION IN MINIMUM SPACE",
        fear: "BUYING SOMETHING THAT DOESN'T FIT OR WORK",
        objection: "IS THIS ACTUALLY SPACE-SAVING OR JUST MARKETED THAT WAY?",
      },
      {
        name: "THE FIRST-TIME BUYER",
        trigger: "CONFIDENCE & SIMPLICITY",
        icon: "⚿",
        tint: "30, 25%, 10%",
        quote: "I don't want to feel stupid putting this together.",
        code: "BUILT SO SIMPLY EVEN THE INSTRUCTIONS ARE OPTIONAL.",
        desire: "FEELING CAPABLE AND CONFIDENT",
        fear: "COMPLICATED ASSEMBLY OR LOOKING STUPID",
        objection: "IS THIS ACTUALLY EASY OR IS THAT JUST MARKETING?",
      },
      {
        name: "THE UPGRADER",
        trigger: "STATUS & TASTE",
        icon: "↑",
        tint: "0, 0%, 14%",
        quote: "I'm done buying things that look cheap in my home.",
        code: "YOUR HOME SHOULD LOOK AS GOOD AS YOU LIVE.",
        desire: "A HOME THAT REFLECTS WHO THEY'RE BECOMING",
        fear: "THINGS THAT LOOK CHEAP UP CLOSE",
        objection: "DOES THIS ACTUALLY LOOK AS GOOD IN PERSON?",
      },
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
    }, 20);
    return () => clearInterval(iv);
  }, [text, started]);
  return <>{displayed}<span className="animate-pulse text-primary">▊</span></>;
};

const MadcowSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, 0.05);

  const [brandIdx, setBrandIdx] = useState(0);
  const [activePersona, setActivePersona] = useState<number | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  const brand = brands[brandIdx];
  const p = activePersona !== null ? brand.personas[activePersona] : null;

  useEffect(() => {
    setActivePersona(null);
    setShowPanel(false);
  }, [brandIdx]);

  useEffect(() => {
    if (activePersona !== null) {
      const t = setTimeout(() => setShowPanel(true), 350);
      return () => clearTimeout(t);
    }
    setShowPanel(false);
  }, [activePersona]);

  return (
    <section
      id="personas"
      ref={sectionRef}
      className="section-border relative overflow-hidden transition-all duration-700"
      style={{
        background: p
          ? `radial-gradient(ellipse at 30% 60%, hsl(${p.tint}) 0%, hsl(0,0%,0%) 70%)`
          : undefined,
      }}
    >
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <div className="text-center mb-16">
          <span className="meta-label text-primary block mb-6">BLUEPRINT</span>
          <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-pure-white">
            MOST BRANDS TALK TO EVERYONE.
          </h2>
          <p className="font-serif-thin text-[clamp(1.2rem,3vw,2.4rem)] text-blood-orange italic mt-2">
            Which means they talk to no one.
          </p>
          <p className="meta-label mt-6 mb-8">
            WE WRITE TO ONE PERSON AT A TIME — HERE'S WHAT THAT LOOKS LIKE
          </p>
          <p className="text-foreground text-sm md:text-base leading-relaxed max-w-[600px] mx-auto font-body text-cream">
            Before we write a single word, we build a psychological profile of
            every type of person buying your product. Their fears. Their language.
            Their objections. Their desires. Then every email, ad, and piece of
            content is written directly to them — not your average customer.
            There is no average customer.
          </p>
          <div className="w-full h-px bg-foreground/15 mt-12" />
        </div>

        <div className="text-center mb-16">
          <p className="meta-label mb-6">
            SELECT AN EXAMPLE BRAND — SEE HOW THE PERSONAS CHANGE
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            {brands.map((b, i) => (
              <button
                key={b.label}
                onClick={() => setBrandIdx(i)}
                className={`px-6 py-3 font-display text-lg md:text-xl tracking-wide border transition-all duration-300 ${
                  brandIdx === i
                    ? "bg-pure-white text-background border-pure-white"
                    : "bg-transparent text-foreground border-foreground/30 hover:border-primary hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)]"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`transition-all duration-500 ${
            activePersona !== null ? "grid md:grid-cols-[300px_1fr] gap-8" : ""
          }`}
        >
          <div
            className={`flex ${
              activePersona !== null ? "flex-col" : "flex-col md:flex-row"
            } gap-4`}
          >
            {brand.personas.map((persona, i) => {
              const isActive = activePersona === i;
              const isOther = activePersona !== null && !isActive;
              return (
                <div
                  key={`${brandIdx}-${i}`}
                  onClick={() => setActivePersona(isActive ? null : i)}
                  className={`border cursor-pointer transition-all duration-500 group relative overflow-hidden ${
                    isActive
                      ? "border-primary/50 flex-shrink-0"
                      : isOther
                        ? "border-foreground/10 opacity-40 hover:opacity-60"
                        : "border-foreground/20 hover:border-foreground/40"
                  } ${activePersona === null ? "flex-1" : ""} ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: `${i * 120}ms`,
                    transform:
                      activePersona === null && inView
                        ? `perspective(800px) rotateY(${(i - 1) * 3}deg)`
                        : undefined,
                  }}
                >
                  <div
                    className={`${
                      activePersona === null
                        ? "h-40 md:h-56"
                        : isActive
                          ? "h-20"
                          : "h-14"
                    } bg-foreground/5 transition-all duration-500 flex items-center justify-center`}
                  >
                    <span
                      className={`${
                        isActive
                          ? "text-2xl"
                          : activePersona === null
                            ? "text-4xl"
                            : "text-lg"
                      } transition-all duration-500 opacity-60`}
                    >
                      {persona.icon}
                    </span>
                  </div>
                  <div
                    className={`${isOther ? "p-3" : "p-5"} transition-all duration-300`}
                  >
                    <h3
                      className={`font-display ${
                        isOther ? "text-sm" : "text-lg md:text-xl"
                      } text-pure-white leading-tight transition-all duration-300`}
                    >
                      {persona.name}
                    </h3>
                    <span className="meta-label text-primary mt-2 block text-[9px]">
                      TRIGGER: {persona.trigger}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {p && (
            <div
              className={`transition-all duration-500 ${
                showPanel
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="mb-8">
                <span className="meta-label text-primary block mb-4">
                  VERBATIM CUSTOMER QUOTE
                </span>
                <blockquote className="font-serif-thin text-2xl md:text-3xl lg:text-4xl text-foreground italic leading-snug">
                  "{p.quote}"
                </blockquote>
              </div>

              <div className="mb-8">
                <span className="meta-label text-primary block mb-4">
                  LINGUISTIC CODE — HOW THE COPY CHANGES FOR THIS PERSON
                </span>
                <p className="font-display text-xl md:text-2xl lg:text-3xl text-pure-white leading-tight">
                  <TypewriterLine text={p.code} started={showPanel} />
                </p>
              </div>

              <div className="border border-foreground/10 p-5">
                <span className="meta-label block mb-4">PSYCHOLOGICAL LEVERS</span>
                <div className="space-y-2 font-body text-xs">
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                    <span className="text-muted-foreground whitespace-nowrap">PRIMARY DESIRE:</span>
                    <span className="text-primary">{p.desire}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                    <span className="text-muted-foreground whitespace-nowrap">PRIMARY FEAR:</span>
                    <span className="text-foreground/70">{p.fear}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                    <span className="text-muted-foreground whitespace-nowrap">OBJECTION:</span>
                    <span className="text-foreground/70">{p.objection}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-2">
              <span className="meta-label text-muted-foreground/60 block">
                THIS IS HOW WE APPROACH EVERY BRAND WE WORK WITH
              </span>
              <span className="meta-label text-muted-foreground/60 block">
                3 PERSONAS MINIMUM · 100+ USPS PER PERSONA · ZERO GENERIC COPY
              </span>
            </div>
            <p className="font-serif-thin text-foreground italic text-base md:text-lg leading-relaxed max-w-sm text-right">
              "When you write to everyone, you move no one.
              <br />
              When you write to one person, you move thousands."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MadcowSection;
