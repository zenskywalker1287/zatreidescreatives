import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import ScrollReveal from "./ScrollReveal";

const cards = [
  { id: 1, span: "col-span-2", image: "/images/klaviyo-01.png", label: "NZ$489K TOTAL · NZ$126K FROM EMAIL · 83% UP" },
  { id: 2, span: "", image: "/images/klaviyo-02.png", label: "A$400K TOTAL · A$112K EMAIL · 554% INCREASE" },
  { id: 3, span: "", image: "/images/klaviyo-03.png", label: "$76K TOTAL · $25K FROM EMAIL · 124% UP" },
  { id: 4, span: "", image: "/images/klaviyo-04.png", label: "$42K TOTAL · $13K EMAIL · 926% INCREASE" },
  { id: 5, span: "col-span-2", image: "/images/klaviyo-05.png", label: "50–72% OPEN RATES · CONSISTENT ACROSS CAMPAIGNS" },
  { id: 6, span: "", image: "/images/klaviyo-06.png", label: "54–62% OPEN RATES · MULTIPLE BRANDS" },
  { id: 7, span: "", image: "/images/klaviyo-07.png", label: "70%+ OPEN RATES · FASHION BRAND · MULTIPLE CAMPAIGNS" },
  { id: 8, span: "col-span-2", image: "/images/klaviyo-08.png", label: "DIRECT SLACK FEEDBACK · CEO · MKTG EMAILS · UNSOLICITED" },
  { id: 9, span: "", image: "/images/klaviyo-09.png", label: "NZ$ PER EMAIL REVENUE · BLACK FRIDAY CAMPAIGNS" },
  { id: 10, span: "", image: "/images/klaviyo-10.png", label: "48–55% OPEN RATES · A$ CAMPAIGNS · CONSISTENT" },
  { id: 11, span: "", image: "/images/klaviyo-11.png", label: "54–62% OPEN RATES · A$8,354 SINGLE EMAIL · FLOWS" },
];

const ProofOfWork = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);

  return (
    <section
      ref={ref}
      className={`section-border py-20 md:py-32 px-6 md:px-12 lg:px-20 transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="text-center mb-16">
        <ScrollReveal variant="fade-up">
          <span className="meta-label text-primary">PROOF OF WORK — REAL KLAVIYO DATA</span>
        </ScrollReveal>
        <ScrollReveal variant="blur" delay={100}>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-pure-white mt-4 mb-3">
            THE NUMBERS DON'T LIE.
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={200}>
          <p className="font-serif-thin italic text-foreground/70 text-lg max-w-xl mx-auto mb-8">
            Real dashboards. Real brands. Real results.
          </p>
        </ScrollReveal>
        <ScrollReveal variant="scale" delay={300}>
          <div className="w-full h-[1px] bg-foreground/10 max-w-4xl mx-auto" />
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-16">
        {cards.map((card, idx) => (
          <ScrollReveal
            key={card.id}
            variant="fade-up"
            delay={idx * 80}
            threshold={0.05}
            className={card.span}
          >
            <div
              className="group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
              }}
            >
              <img
                src={card.image}
                alt={card.label}
                className="w-full h-auto block"
                loading="lazy"
              />

              <div
                className="absolute bottom-0 left-0 right-0 p-4 pt-16"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4) 60%, transparent)",
                }}
              >
                <span
                  className="font-body text-[9px] tracking-[0.15em] uppercase leading-tight font-bold"
                  style={{
                    color: "hsl(var(--primary))",
                    textShadow: "0 0 8px hsl(var(--primary) / 0.6), 0 0 20px hsl(var(--primary) / 0.3)",
                  }}
                >
                  {card.label}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal variant="fade-up" delay={400}>
        <div className="w-full h-[1px] bg-foreground/10 max-w-4xl mx-auto mb-6" />
        <div className="text-center space-y-1">
          <p className="meta-label text-foreground/40">ALL DATA FROM REAL KLAVIYO ACCOUNTS</p>
          <p className="meta-label text-foreground/30">BRAND NAMES OMITTED TO PROTECT CLIENT PRIVACY</p>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ProofOfWork;
