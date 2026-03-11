import { Link } from "react-router-dom";
import {
  Mail, RefreshCw, Target, PenTool, Settings,
} from "lucide-react";

const scopeItems = [
  { icon: Mail, label: "EMAIL COPY" },
  { icon: RefreshCw, label: "FLOW SEQUENCES" },
  { icon: Target, label: "CAMPAIGN STRATEGY" },
  { icon: PenTool, label: "SUBJECT LINES" },
  { icon: Settings, label: "RETENTION SYSTEM" },
];

const workImages = [
  "/images/flatpack-01.png",
  "/images/flatpack-02.png",
  "/images/flatpack-03.png",
  "/images/flatpack-04.png",
  "/images/flatpack-05.png",
  "/images/flatpack-06.png",
];

const FlatpackCaseStudy = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="film-grain" />

      {/* Header */}
      <div className="border-b border-foreground/10 px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
        <Link to="/portfolio" className="meta-label text-primary hover:text-foreground transition-colors">
          ← BACK TO WORK
        </Link>
        <span className="meta-label text-muted-foreground">CASE STUDY / FLATPACK</span>
      </div>

      {/* Hero */}
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32 text-center">
        <span className="meta-label text-primary block mb-6">[DTC · FOOD & BEVERAGE]</span>
        <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] text-pure-white mb-4">
          FLATPACK.
        </h1>
        <p className="font-serif-thin text-xl md:text-2xl text-muted-foreground italic mb-8 max-w-2xl mx-auto">
          $100K from email. One month.
        </p>
        <p className="font-mono text-sm text-foreground/60 leading-[2] max-w-[600px] mx-auto whitespace-pre-line">
          {"Most brands treat email like\nan afterthought.\n\nFlatpack let us treat it like\na revenue channel.\n\nThe results speak for themselves."}
        </p>
      </div>

      {/* Scope Icons */}
      <div className="flex flex-wrap justify-center gap-6 px-6 pb-20">
        {scopeItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
              <div
                className="w-12 h-12 flex items-center justify-center border border-foreground/20 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.15)]"
                style={{ background: "#0a0a0a" }}
              >
                <Icon
                  size={24}
                  strokeWidth={1.2}
                  className="text-foreground/70 transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]"
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/50 transition-colors duration-300 group-hover:text-foreground/80 text-center leading-tight max-w-[80px]">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="w-full h-px bg-foreground/15" />
      </div>

      {/* Results Section */}
      <div className="px-6 md:px-12 lg:px-20 py-20 text-center">
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-pure-white mb-12">
          THE NUMBERS.
        </h2>

        <div className="max-w-[800px] mx-auto mb-8">
          <img
            src="/images/klaviyo-02.png"
            alt="Flatpack Klaviyo dashboard"
            className="w-full h-auto block"
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>

        <p
          className="font-mono text-xs md:text-sm tracking-wider mb-2"
          style={{
            color: "#FF2400",
            textShadow: "0 0 8px rgba(255,36,0,0.5)",
          }}
        >
          [A$400K TOTAL · A$112K FROM EMAIL · 554% INCREASE]
        </p>
        <p
          className="font-mono text-[10px] md:text-xs tracking-wider"
          style={{
            color: "#FF2400",
            textShadow: "0 0 8px rgba(255,36,0,0.4)",
            opacity: 0.7,
          }}
        >
          [REAL ACCOUNT · REAL MONTH · NO MOCKUPS]
        </p>
      </div>

      {/* Divider */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="w-full h-px bg-foreground/15" />
      </div>

      {/* Creative Section */}
      <div className="px-6 md:px-12 lg:px-20 py-20">
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-pure-white mb-12 text-center">
          THE WORK.
        </h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-[1200px] mx-auto">
          {workImages.map((img, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <img
                src={img}
                alt={`Flatpack email creative ${i + 1}`}
                className="w-full h-auto block"
                style={{
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-foreground/10 px-6 md:px-12 lg:px-20 py-12 text-center">
        <Link
          to="/portfolio"
          className="inline-block font-mono text-sm tracking-wider text-primary hover:text-foreground transition-colors border border-primary/30 hover:border-foreground/30 px-8 py-4"
        >
          ← BACK TO WORK
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-foreground/5 px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="meta-label text-primary">CMD.CTRL</Link>
        <span className="meta-label text-muted-foreground/40">© 2026 — CREATIVE BACKEND SYSTEMS</span>
      </footer>
    </div>
  );
};

export default FlatpackCaseStudy;
