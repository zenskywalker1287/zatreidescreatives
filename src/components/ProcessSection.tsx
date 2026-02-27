import { useRef, useState, useEffect } from "react";
import { useInView } from "../hooks/useInView";
import { Check } from "lucide-react";

/* ───── DATA ───── */

const niches = [
  { label: "SKINCARE & BEAUTY", key: "skincare" },
  { label: "HEALTH & SUPPLEMENTS", key: "supplements" },
  { label: "FOOD & BEVERAGE", key: "food" },
  { label: "FASHION & APPAREL", key: "fashion" },
  { label: "PET CARE", key: "pet" },
  { label: "HOME & LIFESTYLE", key: "home" },
] as const;

const problems = [
  { label: "WE RELY PURELY ON ADS — NO RETENTION BACKEND", key: "no-retention" },
  { label: "OUR EMAILS ARE GENERIC — SAME COPY FOR EVERYONE", key: "generic-emails" },
  { label: "WE HAVE FLOWS BUT THEY'RE NOT CONVERTING", key: "flows-broken" },
  { label: "WE DON'T KNOW OUR CUSTOMER PSYCHOLOGY DEEPLY ENOUGH", key: "no-psychology" },
  { label: "WE HAVE NO EMAIL SYSTEM AT ALL", key: "no-email" },
  { label: "OUR AD-TO-EMAIL MESSAGING IS COMPLETELY DISCONNECTED", key: "disconnected" },
] as const;

type NicheKey = (typeof niches)[number]["key"];

const personaMap: Record<NicheKey, [string, string, string]> = {
  pet: ["THE TACTICAL GUARDIAN", "THE GEAR SNOB", "THE WEEKEND WARRIOR"],
  supplements: ["THE SKEPTICAL VET", "THE HIGH PERFORMER", "THE RECONNECTING HUSBAND"],
  skincare: ["THE RESEARCHER", "THE LOYALIST", "THE SKEPTIC"],
  fashion: ["THE MINIMALIST", "THE STATUS SEEKER", "THE CONSCIOUS BUYER"],
  food: ["THE HEALTH PURIST", "THE CONVENIENCE SEEKER", "THE GIFTER"],
  home: ["THE UPGRADER", "THE NESTER", "THE PRACTICAL BUYER"],
};

const problemHeadlineMap: Record<string, string> = {
  "no-retention": "RETENTION BUILD",
  "generic-emails": "LINGUISTIC CODE",
  "flows-broken": "CONVERSION AUDIT",
  "no-psychology": "PERSONA SYSTEM",
  "no-email": "BACKEND FROM ZERO",
  disconnected: "CONGRUENCY FIX",
};

const nicheLabel: Record<NicheKey, string> = {
  skincare: "SKINCARE",
  supplements: "SUPPLEMENTS",
  food: "FOOD & BEV",
  fashion: "FASHION",
  pet: "PET CARE",
  home: "HOME",
};

/* ───── COMPONENT ───── */

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, 0.1);

  const [selectedNiche, setSelectedNiche] = useState<NicheKey | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [showStep2, setShowStep2] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Animate step 2 in after niche selection
  useEffect(() => {
    if (selectedNiche) {
      const t = setTimeout(() => setShowStep2(true), 400);
      return () => clearTimeout(t);
    }
    setShowStep2(false);
    setSelectedProblem(null);
    setShowResult(false);
  }, [selectedNiche]);

  // Animate result after problem selection
  useEffect(() => {
    if (selectedProblem) {
      const t = setTimeout(() => setShowResult(true), 500);
      return () => clearTimeout(t);
    }
    setShowResult(false);
  }, [selectedProblem]);

  const personas = selectedNiche ? personaMap[selectedNiche] : null;
  const headline =
    selectedNiche && selectedProblem
      ? `THE ${nicheLabel[selectedNiche]} ${problemHeadlineMap[selectedProblem]}.`
      : "";

  return (
    <section id="process" className="section-border" ref={sectionRef}>
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="meta-label text-primary block mb-6">[03.5] THE PROCESS</span>
          <h2
            className={`font-display text-[clamp(2rem,5.5vw,5rem)] leading-[0.95] text-pure-white transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            WANT TO SEE HOW WE'D
            <br />
            APPROACH YOUR BRAND?
          </h2>
          <p className="meta-label mt-6">[SELECT YOUR ANSWERS — WE'LL SHOW YOU THE SYSTEM]</p>
        </div>

        {/* ── STEP 01 ── */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="meta-label text-primary">[01] SELECT YOUR NICHE</span>
              {selectedNiche && (
                <span className="text-primary">
                  <Check size={14} strokeWidth={3} />
                </span>
              )}
            </div>
            <span className="meta-label text-muted-foreground/50">
              [STEP 01 OF 03]
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-pure-white mb-6">
            What kind of brand are you?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {niches.map((niche) => {
              const isSelected = selectedNiche === niche.key;
              return (
                <button
                  key={niche.key}
                  onClick={() => setSelectedNiche(isSelected ? null : niche.key)}
                  className={`relative border px-6 py-5 text-left font-display text-lg md:text-xl tracking-wide transition-all duration-300 ${
                    isSelected
                      ? "bg-pure-white text-background border-pure-white"
                      : "bg-transparent text-foreground border-foreground/20 hover:border-primary hover:shadow-[0_0_16px_hsl(var(--primary)/0.15)]"
                  }`}
                >
                  <span>{niche.label}</span>
                  {isSelected && (
                    <span className="absolute top-2 right-3 font-mono text-[9px] tracking-[0.2em] text-background/60">
                      [✓ SELECTED]
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Locked-in Step 01 summary */}
        {selectedNiche && (
          <div className="mb-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 flex items-center gap-2">
            <span className="text-primary">[✓]</span>
            NICHE: {niches.find((n) => n.key === selectedNiche)?.label}
          </div>
        )}

        {/* ── STEP 02 ── */}
        <div
          className={`transition-all duration-600 overflow-hidden ${
            showStep2 ? "max-h-[2000px] opacity-100 mb-12" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-8 border-t border-foreground/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="meta-label text-primary">[02] SELECT YOUR BIGGEST GAP</span>
                {selectedProblem && (
                  <span className="text-primary">
                    <Check size={14} strokeWidth={3} />
                  </span>
                )}
              </div>
              <span className="meta-label text-muted-foreground/50">
                [STEP 02 OF 03]
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-pure-white mb-6">
              Where are you bleeding right now?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {problems.map((problem) => {
                const isSelected = selectedProblem === problem.key;
                return (
                  <button
                    key={problem.key}
                    onClick={() => setSelectedProblem(isSelected ? null : problem.key)}
                    className={`relative border px-6 py-5 text-left font-mono text-xs md:text-sm tracking-wide leading-relaxed transition-all duration-300 ${
                      isSelected
                        ? "bg-pure-white text-background border-pure-white"
                        : "bg-transparent text-foreground/80 border-foreground/20 hover:border-primary hover:shadow-[0_0_16px_hsl(var(--primary)/0.15)]"
                    }`}
                  >
                    <span>{problem.label}</span>
                    {isSelected && (
                      <span className="absolute top-2 right-3 font-mono text-[9px] tracking-[0.2em] text-background/60">
                        [✓ SELECTED]
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Locked-in Step 02 summary */}
        {selectedProblem && (
          <div className="mb-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 flex items-center gap-2">
            <span className="text-primary">[✓]</span>
            GAP: {problems.find((p) => p.key === selectedProblem)?.label}
          </div>
        )}

        {/* ── STEP 03 — RESULTS ── */}
        <div
          className={`transition-all duration-700 overflow-hidden ${
            showResult ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-8 border-t border-foreground/10">
            <div className="flex items-center justify-between mb-6">
              <span className="meta-label text-primary">
                [03] HERE'S HOW WE'D BUILD YOUR BACKEND
              </span>
              <span className="meta-label text-muted-foreground/50">
                [STEP 03 OF 03]
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-pure-white mb-10">
              {headline}
            </h3>

            {/* System Breakdown */}
            <div className="border border-foreground/15 p-6 md:p-10 space-y-8">
              {/* Step 01 */}
              <div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-mono text-sm mt-[2px]">→</span>
                  <div>
                    <h4 className="font-display text-lg md:text-xl text-pure-white mb-2">
                      STEP 01: PRE-PURCHASE AUDIT
                    </h4>
                    <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
                      Review mining across Amazon, Reddit, and your own reviews.
                      <br />
                      Extract 100+ USPs specific to{" "}
                      <span className="text-foreground">
                        {selectedNiche ? nicheLabel[selectedNiche].toLowerCase() : "your"}
                      </span>{" "}
                      customer psychology.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 02 */}
              <div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-mono text-sm mt-[2px]">→</span>
                  <div>
                    <h4 className="font-display text-lg md:text-xl text-pure-white mb-2">
                      STEP 02: PERSONA MAPPING
                    </h4>
                    <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed mb-3">
                      Build 3 distinct psychological profiles for your buyer.
                      <br />
                      Every creative is written TO a person, not AT an audience.
                    </p>
                    {personas && (
                      <div className="flex flex-wrap gap-2">
                        {personas.map((p) => (
                          <span
                            key={p}
                            className="font-mono text-[10px] tracking-[0.15em] text-primary border border-primary/30 px-3 py-1"
                          >
                            [{p}]
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 03 */}
              <div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-mono text-sm mt-[2px]">→</span>
                  <div>
                    <h4 className="font-display text-lg md:text-xl text-pure-white mb-2">
                      STEP 03: CREATIVE BUILD
                    </h4>
                    <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
                      30+ email creatives built around your real USPs.
                      <br />
                      Welcome flow · Post-purchase · Winback · Pre-purchase education.
                      <br />
                      Zero templates. Zero AI slop.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 04 */}
              <div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-mono text-sm mt-[2px]">→</span>
                  <div>
                    <h4 className="font-display text-lg md:text-xl text-pure-white mb-2">
                      STEP 04: KLAVIYO DEPLOYMENT
                    </h4>
                    <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
                      Fully built and live in 2 weeks.
                      <br />
                      One-time fee. Yours to keep forever.
                      <br />
                      Zero ongoing work from you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <a
                href="#contact"
                className="btn-brutal inline-block text-sm md:text-base px-10 py-4 border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300"
              >
                [ THIS IS WHAT I NEED — LET'S TALK ]
              </a>
              <p className="font-serif-thin italic text-foreground/60 text-sm md:text-base mt-6">
                "Built in 2 weeks. One-time investment. Runs forever."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
