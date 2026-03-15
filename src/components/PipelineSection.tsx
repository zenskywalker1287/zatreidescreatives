import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "../hooks/useInView";
import CreatorBriefCard from "./pipeline/CreatorBriefCard";
import ScaleSection from "./pipeline/ScaleSection";
import ScrollReveal from "./ScrollReveal";

const usps = [
  {
    text: "ENGINEERED FOR DOGS THAT BREAK EVERYTHING ELSE.",
    formats: {
      "EMAIL · SUBJECT LINE": "The collar that outlasted 3 Amazon buys.",
      "PAID AD · HOOK": "POV: Your dog just snapped his third collar this year.",
      "UGC · OPENING LINE": "I stopped buying cheap collars when my dog broke his fourth one—",
    },
    brief: {
      hookFormat: "US VS THEM",
      hookLine: "Every other collar on the market is built to be replaced. This one is built to outlast them all.",
      talent: "Dog owner. Working breed preferred.",
      shot: "Close up of snapped cheap collar next to intact Madcow collar.",
      direction: "Frustrated but relieved energy.",
      cta: "Link in bio.",
    },
  },
  {
    text: "THE LAST COLLAR YOU'LL EVER BUY.",
    formats: {
      "EMAIL · SUBJECT LINE": "Stop replacing collars every 6 months.",
      "PAID AD · HOOK": "What if your dog's collar came with a lifetime guarantee?",
      "UGC · OPENING LINE": "I've spent $200+ on collars that fell apart—until this one.",
    },
    brief: {
      hookFormat: "NIGHTMARE SCENARIO",
      hookLine: "Imagine your dog snaps his collar mid-walk. Busy road. No backup. That's not a hypothetical — it happens every single day.",
      talent: "Any dog owner.",
      shot: "Unboxing. Focus on hardware detail.",
      direction: "Calm. Confident. Premium feel.",
      cta: "Swipe up or link in bio.",
    },
  },
  {
    text: "BUILT FOR THE 1% WHO DON'T COMPROMISE ON THEIR DOG'S GEAR.",
    formats: {
      "EMAIL · SUBJECT LINE": "Your dog deserves better than PetSmart hardware.",
      "PAID AD · HOOK": "Most dog owners settle. You're not most dog owners.",
      "UGC · OPENING LINE": "I train protection dogs—cheap gear is a liability.",
    },
    brief: {
      hookFormat: "MYTH BUSTER",
      hookLine: "Myth: A $15 collar does the same job as a premium one. Reality: Ask anyone whose dog has ever broken free.",
      talent: "Serious dog owner. Working breed or protection dog.",
      shot: "Dog in action. Collar close up.",
      direction: "Status. Pride. No nonsense.",
      cta: "Link in bio.",
    },
  },
  {
    text: "ZERO NYLON. ZERO CHEAP HARDWARE. ZERO EXCUSES.",
    formats: {
      "EMAIL · SUBJECT LINE": "We don't use nylon. Here's what we use instead.",
      "PAID AD · HOOK": "Your dog's collar has a plastic buckle. Let that sink in.",
      "UGC · OPENING LINE": "I cut open a cheap collar vs. this one—watch what's inside.",
    },
    brief: {
      hookFormat: "US VS THEM",
      hookLine: "PetSmart sells collars. We engineer them. Plastic buckles vs solid metal hardware. You tell us which one you trust.",
      talent: "Any dog owner.",
      shot: "Side by side comparison. Cheap collar vs Madcow hardware.",
      direction: "Slightly appalled. Then satisfied.",
      cta: "Link in bio.",
    },
  },
  {
    text: "OVER-ENGINEERED BY DESIGN — BECAUSE YOUR DOG DOESN'T DO GENTLE.",
    formats: {
      "EMAIL · SUBJECT LINE": "Over-engineered on purpose.",
      "PAID AD · HOOK": "This collar was built for dogs that destroy everything.",
      "UGC · OPENING LINE": "My GSD pulled a 200lb sled in this collar. Not a scratch.",
    },
    brief: {
      hookFormat: "NIGHTMARE SCENARIO",
      hookLine: "Your 80lb dog hits the end of the leash at full sprint. Cheap collar snaps. He's gone. This is the collar built for that moment.",
      talent: "High energy breed owner.",
      shot: "Dog pulling hard. Collar holding under pressure.",
      direction: "Raw. Unfiltered. No studio lighting needed.",
      cta: "Link in bio.",
    },
  },
];

const TypewriterText = ({ text, started }: { text: string; started: boolean }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!started) { setDisplayed(""); return; }
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, 18);
    return () => clearInterval(iv);
  }, [text, started]);
  return <>{displayed}<span className="animate-pulse text-primary">▊</span></>;
};

const FormatBadge = ({ label, example }: { label: string; example: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`inline-flex items-center border rounded-full cursor-default transition-all duration-400 overflow-hidden ${
        hovered
          ? "border-primary/50 bg-primary/5 max-w-[500px] px-4 py-2 gap-3"
          : "border-foreground/20 max-w-[180px] px-3 py-1 gap-0"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={`text-[9px] tracking-[0.2em] font-body uppercase whitespace-nowrap flex-shrink-0 transition-colors duration-300 ${
        hovered ? "text-primary" : "text-muted-foreground"
      }`}>
        {label}
      </span>
      <span
        className={`font-body text-[10px] text-foreground/70 whitespace-nowrap transition-all duration-400 ${
          hovered ? "opacity-100 max-w-[350px]" : "opacity-0 max-w-0"
        }`}
      >
        — "{example}"
      </span>
    </div>
  );
};

const PipelineSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);

  const [phase, setPhase] = useState<"idle" | "extracting" | "done">("idle");
  const [extractCount, setExtractCount] = useState(0);
  const [visibleCards, setVisibleCards] = useState(0);
  const [showFormats, setShowFormats] = useState(0);
  const [showClosing, setShowClosing] = useState(false);

  const run = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("extracting");
    setExtractCount(0);
    setVisibleCards(0);
    setShowFormats(0);
    setShowClosing(false);

    let c = 0;
    const countIv = setInterval(() => {
      c++;
      setExtractCount(c);
      if (c >= 5) {
        clearInterval(countIv);
        setPhase("done");
        let card = 0;
        const cardIv = setInterval(() => {
          card++;
          setVisibleCards(card);
          if (card >= 5) {
            clearInterval(cardIv);
            let fmt = 0;
            setTimeout(() => {
              const fmtIv = setInterval(() => {
                fmt++;
                setShowFormats(fmt);
                if (fmt >= 5) {
                  clearInterval(fmtIv);
                  setTimeout(() => setShowClosing(true), 600);
                }
              }, 400);
            }, 800);
          }
        }, 300);
      }
    }, 400);
  }, [phase]);

  return (
    <section id="pipeline" className="section-border" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <ScrollReveal variant="fade-right">
          <span className="meta-label text-primary">WATCH US WORK</span>
        </ScrollReveal>
        <ScrollReveal variant="blur" delay={100}>
          <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-pure-white mt-3 mb-4">
            THIS IS HOW WE THINK.
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={200}>
          <p className="font-serif-thin text-base md:text-lg text-foreground/80 italic max-w-2xl mb-10">
            "Most agencies protect their process like it's classified. We'll show you ours right now. Type in a raw product description. Watch us pull 100+ angles, map them to real buyer psychology and turn them into creative that works across every channel. This is what strategy looks like before a single brief gets written."
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={300}>
          <div className="max-w-3xl">
            <span className="meta-label text-primary block mb-2">
              LIVE DEMO — MADCOW COLLARS
            </span>
            <p className="font-body text-[10px] tracking-[0.15em] text-foreground/70 uppercase mb-3">
              Raw product input below. Hit RUN EXTRACTION and watch what happens.
            </p>

            <span className="meta-label text-muted-foreground block mb-2">
              RAW PRODUCT INPUT
            </span>
            <div className="border border-foreground/20 bg-secondary/30 p-4 md:p-6 font-body text-sm md:text-base text-foreground/90 relative">
              <span>Heavy-duty dog collar built for working and protection dogs.</span>
              <span className="animate-pulse text-primary ml-1">▊</span>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={run}
                disabled={phase !== "idle"}
                className="btn-brutal disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {phase === "idle"
                  ? "RUN EXTRACTION →"
                  : phase === "extracting"
                    ? "EXTRACTING..."
                    : "EXTRACTION COMPLETE"}
                {phase === "extracting" && (
                  <span className="inline-flex ml-2 gap-[2px]">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-1 h-1 rounded-full bg-primary inline-block"
                        style={{ animation: `pulse 1s ${d * 0.2}s infinite` }}
                      />
                    ))}
                  </span>
                )}
              </button>

              {(phase === "extracting" || phase === "done") && (
                <span className="font-body text-[10px] tracking-[0.2em] text-primary uppercase transition-all duration-300">
                  {phase === "extracting"
                    ? `EXTRACTING USP ${extractCount} OF 100+...`
                    : "SHOWING 5 OF 100+ USPS EXTRACTED"}
                </span>
              )}
            </div>
          </div>
        </ScrollReveal>

        <div className={`space-y-3 transition-all duration-500 ${phase === "idle" ? "max-h-0 overflow-hidden opacity-0 mt-0" : "max-h-[12000px] opacity-100 mt-10"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {usps.map((usp, i) => {
            const visible = i < visibleCards;
            const formatVisible = i < showFormats;
            return (
              <div
                key={i}
                className={`border border-foreground/15 bg-background p-5 md:p-6 transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
                }`}
                style={{ transitionDelay: `${i * 50}ms`, transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="meta-label text-muted-foreground">
                    USP {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="meta-label text-primary">{i + 1} OF 100+</span>
                </div>

                <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-pure-white leading-[1.1]">
                  {visible ? <TypewriterText text={usp.text} started={visible} /> : ""}
                </h3>

                <div
                  className={`mt-3 pt-3 border-t border-foreground/10 transition-all duration-500 overflow-hidden ${
                    formatVisible ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(usp.formats).map(([label, example]) => (
                      <FormatBadge key={label} label={label} example={example} />
                    ))}
                  </div>
                </div>

                <div
                  className={`mt-3 transition-all duration-500 overflow-hidden ${
                    formatVisible ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <CreatorBriefCard brief={usp.brief} />
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`transition-all duration-1000 ${
            showClosing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <ScaleSection />

          <div className="mt-10 text-center">
            <h3 className="font-display text-[clamp(1.5rem,4vw,3.5rem)] leading-[0.95] text-pure-white mb-4">
              ONE USP. FOUR FORMATS. WE EXTRACT 100+ PER BRAND.
            </h3>
            <p className="font-serif-thin text-base md:text-lg text-foreground/80 italic max-w-2xl mx-auto mb-6">
              "That's 400+ pieces of content. All rooted in your brand's real customer psychology. None of it templated. None of it guessed."
            </p>
            <p className="font-body text-[10px] md:text-xs tracking-[0.15em] text-muted-foreground uppercase">
              THIS IS PHASE 01. BEFORE WE WRITE A SINGLE EMAIL.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
