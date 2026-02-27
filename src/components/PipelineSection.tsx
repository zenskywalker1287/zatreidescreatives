import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "../hooks/useInView";

const usps = [
  {
    text: "ENGINEERED FOR DOGS THAT BREAK EVERYTHING ELSE.",
    formats: {
      "EMAIL SUBJECT": "The collar that outlasted 3 Amazon buys.",
      "AD HOOK": "POV: Your dog just snapped his third collar this year.",
      "UGC SCRIPT": "I stopped buying cheap collars when my dog broke his fourth one—",
      "SMS": "This collar has a lifetime guarantee. Here's why that matters →",
      "ORGANIC CAPTION": "Built for the dogs that break everything else.\nZero nylon. Zero weak points. Zero compromises.",
    },
  },
  {
    text: "THE LAST COLLAR YOU'LL EVER BUY.",
    formats: {
      "EMAIL SUBJECT": "Stop replacing collars every 6 months.",
      "AD HOOK": "What if your dog's collar came with a lifetime guarantee?",
      "UGC SCRIPT": "I've spent $200+ on collars that fell apart—until this one.",
      "SMS": "One collar. For life. No gimmicks. See why →",
      "ORGANIC CAPTION": "The last collar you'll ever buy.\nBacked by a lifetime guarantee.",
    },
  },
  {
    text: "BUILT FOR THE 1% WHO DON'T COMPROMISE ON THEIR DOG'S GEAR.",
    formats: {
      "EMAIL SUBJECT": "Your dog deserves better than PetSmart hardware.",
      "AD HOOK": "Most dog owners settle. You're not most dog owners.",
      "UGC SCRIPT": "I train protection dogs—cheap gear is a liability.",
      "SMS": "Premium hardware. No plastic. No compromises. Shop now →",
      "ORGANIC CAPTION": "For the 1% who treat their dog's gear\nlike their own.",
    },
  },
  {
    text: "ZERO NYLON. ZERO CHEAP HARDWARE. ZERO EXCUSES.",
    formats: {
      "EMAIL SUBJECT": "We don't use nylon. Here's what we use instead.",
      "AD HOOK": "Your dog's collar has a plastic buckle. Let that sink in.",
      "UGC SCRIPT": "I cut open a cheap collar vs. this one—watch what's inside.",
      "SMS": "All metal. All leather. All built to last. See the difference →",
      "ORGANIC CAPTION": "Zero nylon. Zero plastic buckles.\nJust over-engineered quality.",
    },
  },
  {
    text: "OVER-ENGINEERED BY DESIGN — BECAUSE YOUR DOG DOESN'T DO GENTLE.",
    formats: {
      "EMAIL SUBJECT": "Over-engineered on purpose.",
      "AD HOOK": "This collar was built for dogs that destroy everything.",
      "UGC SCRIPT": "My GSD pulled a 200lb sled in this collar. Not a scratch.",
      "SMS": "Built for power dogs. Tested by working K9s. Shop now →",
      "ORGANIC CAPTION": "Over-engineered by design.\nBecause your dog doesn't do gentle.",
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
  return <>{displayed}<span className="animate-pulse">|</span></>;
};

const FormatBadge = ({ label, example }: { label: string; example: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`inline-flex items-center border rounded-full cursor-default transition-all duration-400 ease-out overflow-hidden ${
        hovered
          ? "border-primary/50 bg-primary/5 max-w-[500px] px-4 py-2 gap-3"
          : "border-foreground/20 max-w-[180px] px-3 py-1 gap-0"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={`text-[9px] tracking-[0.2em] font-mono uppercase whitespace-nowrap flex-shrink-0 transition-colors duration-300 ${
        hovered ? "text-primary" : "text-muted-foreground"
      }`}>
        {label}
      </span>
      <span
        className={`font-mono text-[10px] text-foreground/70 whitespace-nowrap transition-all duration-400 ${
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

    // Count up 1-5
    let c = 0;
    const countIv = setInterval(() => {
      c++;
      setExtractCount(c);
      if (c >= 5) {
        clearInterval(countIv);
        setPhase("done");
        // Reveal cards staggered
        let card = 0;
        const cardIv = setInterval(() => {
          card++;
          setVisibleCards(card);
          if (card >= 5) {
            clearInterval(cardIv);
            // Reveal format rows staggered
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
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        {/* Header */}
        <span className="meta-label text-primary">[05] PIPELINE</span>
        <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-pure-white mt-4 mb-2">
          THIS IS HOW WE THINK.
        </h2>
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-16">
          [WATCH A RAW PRODUCT BECOME A RETENTION SYSTEM]
        </p>

        {/* Terminal Input */}
        <div className="max-w-3xl">
          <span className="meta-label text-muted-foreground block mb-2">
            [RAW PRODUCT INPUT — MADCOW COLLARS]
          </span>
          <div className="border border-foreground/20 bg-secondary/30 p-4 md:p-6 font-mono text-sm md:text-base text-foreground/90 relative">
            <span>Heavy-duty dog collar built for working and protection dogs.</span>
            <span className="animate-pulse text-primary ml-1">▊</span>
          </div>

          {/* Button + Counter Row */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={run}
              disabled={phase !== "idle"}
              className="btn-brutal disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {phase === "idle"
                ? "RUN EXTRACTION"
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase transition-all duration-300">
                {phase === "extracting"
                  ? `[EXTRACTING USP ${extractCount} OF 100+...]`
                  : "[SHOWING 5 OF 100+ USPS EXTRACTED]"}
              </span>
            )}
          </div>
        </div>

        {/* USP Cards */}
        <div className={`space-y-4 transition-all duration-500 ${phase === "idle" ? "max-h-0 overflow-hidden opacity-0 mt-0" : "max-h-[5000px] opacity-100 mt-16"}`}>
          {usps.map((usp, i) => {
            const visible = i < visibleCards;
            const formatVisible = i < showFormats;
            return (
              <div
                key={i}
                className={`border border-foreground/15 bg-background p-5 md:p-6 transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {/* Card Header */}
                <div className="flex justify-between items-center mb-4">
                  <span className="meta-label text-muted-foreground">
                    [USP {String(i + 1).padStart(2, "0")}]
                  </span>
                  <span className="meta-label text-primary">[{i + 1} OF 100+]</span>
                </div>

                {/* USP Text */}
                <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-pure-white leading-[1.1]">
                  {visible ? <TypewriterText text={usp.text} started={visible} /> : ""}
                </h3>

                {/* Format Row */}
                <div
                  className={`mt-5 pt-4 border-t border-foreground/10 transition-all duration-500 overflow-hidden ${
                    formatVisible ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(usp.formats).map(([label, example]) => (
                      <FormatBadge key={label} label={label} example={example} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing */}
        <div
          className={`mt-16 transition-all duration-1000 ${
            showClosing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="font-serif-thin text-lg md:text-xl text-foreground/80 italic mb-8">
            "One USP. Five assets. We extract 100+ USPs per brand."
          </p>
          <div className="border border-foreground/10 p-5 md:p-6 font-mono text-[10px] md:text-xs tracking-[0.15em] text-muted-foreground uppercase leading-relaxed">
            [100 USPS × 5 FORMATS = 500+ PIECES OF CONTENT.<br />
            ALL ROOTED IN YOUR BRAND. NONE OF IT TEMPLATED.]
          </div>
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
