import { useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { Film, Mail, Camera, Play, LayoutGrid } from "lucide-react";

const panels = [
  {
    title: "AD CREATIVE",
    icon: Film,
    description:
      "The hooks, angles, and psychological triggers that stop the scroll and start the sale.",
  },
  {
    title: "EMAIL CREATIVE",
    icon: Mail,
    description:
      "Sequences built around real customer psychology. Not templates. Not AI. Actual creative.",
  },
  {
    title: "UGC DIRECTION",
    icon: Camera,
    description:
      "Scripts and briefs that tell your creators exactly what angle to hit and why.",
  },
  {
    title: "LIMITED SERIES",
    icon: Play,
    description:
      "Film, docuseries, reels. Your brand's story told in episodes, not ads.",
  },
  {
    title: "CAMPAIGN ARCHITECTURE",
    icon: LayoutGrid,
    description:
      "The 30-day calendar, the touchpoint map, the congruency system that ties it all together.",
  },
];

const CampaignSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);
  const [activePanel, setActivePanel] = useState<number | null>(null);

  return (
    <section className="section-border" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        {/* Header */}
        <span className="meta-label text-primary">[05] THE CREATIVE STACK</span>
        <h2 className="font-display text-[clamp(2rem,6vw,6rem)] leading-[0.95] text-pure-white mt-4 mb-2">
          WE DON'T MAKE CONTENT.
        </h2>
        <p className="font-serif-thin text-[clamp(1.1rem,2.5vw,2rem)] text-foreground italic mb-4">
          We build the intelligence behind it.
        </p>
        <p className="meta-label mb-16">[ONE EXTRACTION PROCESS. EVERY CHANNEL.]</p>

        {/* Panels */}
        <div className="flex flex-col md:flex-row gap-1 min-h-[400px]">
          {panels.map((panel, i) => {
            const isActive = activePanel === i;
            const Icon = panel.icon;
            return (
              <div
                key={i}
                onMouseEnter={() => setActivePanel(i)}
                onMouseLeave={() => setActivePanel(null)}
                className={`relative border cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-500 overflow-hidden ${
                  isActive
                    ? "border-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.15)] md:flex-[3]"
                    : "border-foreground/15 hover:border-foreground/30 md:flex-1"
                } ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  minHeight: isActive ? "280px" : "120px",
                }}
              >
                <div className="p-6 md:p-8 flex flex-col items-center gap-4">
                  <Icon
                    size={isActive ? 32 : 24}
                    className={`transition-all duration-300 ${
                      isActive ? "text-primary" : "text-foreground/50"
                    }`}
                  />
                  <h3
                    className={`font-display tracking-wide transition-all duration-300 ${
                      isActive ? "text-xl md:text-2xl text-pure-white" : "text-sm md:text-base text-foreground/70"
                    }`}
                  >
                    {panel.title}
                  </h3>
                  <p
                    className={`font-mono text-xs md:text-sm text-muted-foreground leading-relaxed max-w-[280px] transition-all duration-400 ${
                      isActive
                        ? "opacity-100 max-h-40 mt-2"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    {panel.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom quote */}
        <div className="mt-16 pt-8 border-t border-foreground/10 text-center">
          <p className="font-serif-thin text-foreground italic text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            "Most agencies pick one channel. We build the system that feeds all of them."
          </p>
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;
