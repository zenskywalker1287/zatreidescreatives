import { useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

const emailHeroes = [
  { id: 1, persona: "TACTICAL", usp: "DURABILITY", trigger: "FEAR OF LOSS", image: "/images/email-01.png" },
  { id: 2, persona: "GEAR SNOB", usp: "EXCLUSIVITY", trigger: "STATUS SIGNALING", image: "/images/email-02.png" },
  { id: 3, persona: "WEEKEND WARRIOR", usp: "VERSATILITY", trigger: "ADVENTURE IDENTITY", image: "/images/email-03.png" },
  { id: 4, persona: "TACTICAL", usp: "PROTECTION", trigger: "PARENTAL INSTINCT", image: "/images/email-04.png" },
  { id: 5, persona: "GEAR SNOB", usp: "CRAFTSMANSHIP", trigger: "SUPERIORITY", image: "/images/email-05.png" },
  { id: 6, persona: "WEEKEND WARRIOR", usp: "WATERPROOF", trigger: "FREEDOM", image: "/images/email-06.png" },
  { id: 7, persona: "TACTICAL", usp: "MIL-SPEC", trigger: "AUTHORITY", image: "/images/email-01.png" },
  { id: 8, persona: "GEAR SNOB", usp: "DESIGN", trigger: "SOCIAL PROOF", image: "/images/email-02.png" },
  { id: 9, persona: "WEEKEND WARRIOR", usp: "ALL-TERRAIN", trigger: "BELONGING", image: "/images/email-03.png" },
  { id: 10, persona: "TACTICAL", usp: "STRENGTH", trigger: "SAFETY", image: "/images/email-04.png" },
];

const PortfolioStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="portfolio" className="section-border" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 pt-20 md:pt-32 pb-8">
        <span className="meta-label text-primary">[07] PORTFOLIO</span>
        <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-pure-white mt-4 mb-2">
          THE HEROES.
        </h2>
        <p className="meta-label mb-12">[TOP-FOLD EMAIL DESIGNS — SWIPE TO EXPLORE]</p>
      </div>

      {/* Draggable strip */}
      <div className="horizontal-scroll px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
        {emailHeroes.map((hero, i) => (
          <div
            key={hero.id}
            className={`flex-shrink-0 w-[300px] md:w-[400px] h-[620px] md:h-[820px] border border-foreground/15 rounded-xl relative overflow-hidden cursor-pointer group transition-all duration-500 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
            onMouseEnter={() => setHoveredCard(hero.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Email hero image */}
            <div className="absolute inset-0">
              <img src={hero.image} alt={`Email Hero ${hero.id}`} className="w-full h-full object-contain object-top bg-background p-3" loading="lazy" />
            </div>

            {/* Hover overlay */}
            <div className={`absolute inset-0 bg-background/90 transition-all duration-300 flex flex-col justify-end p-6 ${
              hoveredCard === hero.id ? "opacity-100" : "opacity-0"
            }`}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="meta-label text-primary">PERSONA:</span>
                  <span className="font-mono text-xs text-foreground">{hero.persona}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="meta-label text-primary">MAIN USP:</span>
                  <span className="font-mono text-xs text-foreground">{hero.usp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="meta-label text-primary">PSYCHOLOGICAL TRIGGER:</span>
                  <span className="font-mono text-xs text-foreground">{hero.trigger}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* End CTA */}
        <a
          href="/portfolio"
          className="flex-shrink-0 w-[300px] h-[620px] md:h-[820px] border border-foreground/15 rounded-xl flex items-center justify-center group hover:border-primary/40 transition-all duration-300"
        >
          <span className="btn-brutal">[ VIEW FULL 30-DAY LOGIC ]</span>
        </a>
      </div>
    </section>
  );
};

export default PortfolioStrip;
