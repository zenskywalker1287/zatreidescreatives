import { useRef } from "react";
import { useInView } from "../hooks/useInView";

const row1 = "MADCOW COLLARS · XYKO · FLATPACK · 4AM SKIN · GYMSHARK · BUCKED UP · DAILY CRUNCH · BLU ATLAS · GRÜNS · LUMI · TIMEBEAM · ELITE";
const row2 = "ADSUMO DIGITAL · MKTG EMAILS · GRUNT STYLE · PLUNGE · HEALTHMATE · DAILY CRUNCH · SNOBODI · HEY BUD · LEELO ACTIVE · FLEX FITNESS";

const LogoTicker = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);

  return (
    <section
      ref={ref}
      className={`border-t border-b border-foreground/10 py-4 bg-background transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="meta-label text-primary text-center mb-4">BRANDS WE'VE WORKED WITH AND WRITTEN FOR</p>

      <div className="overflow-hidden whitespace-nowrap mb-3">
        <div className="inline-flex animate-ticker-left">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-body text-xs tracking-[0.2em] text-foreground/70 uppercase mx-4">
              {row1} ·{" "}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-ticker-right">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-body text-xs tracking-[0.2em] text-foreground/70 uppercase mx-4">
              {row2} ·{" "}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
