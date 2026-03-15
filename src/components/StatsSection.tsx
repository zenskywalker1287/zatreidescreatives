import { useRef } from "react";
import { useInView, useCountUp } from "../hooks/useInView";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: 1000000, prefix: "$", suffix: "+", label: "REVENUE GENERATED" },
  { value: 1200, prefix: "", suffix: "+", label: "CREATIVES DELIVERED" },
  { value: 5, prefix: "", suffix: "", label: "FEATURE SCRIPTS WRITTEN" },
  { value: 30, prefix: "", suffix: "+", label: "BRANDS SCALED" },
];

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.3);

  return (
    <section className="section-border-red" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={i}
              variant="fade-up"
              delay={i * 150}
              threshold={0.2}
              className={`p-8 md:p-12 ${i < stats.length - 1 ? "border-b lg:border-b-0 lg:border-r border-primary/20" : ""}`}
            >
              <StatNumber stat={stat} inView={inView} />
              <span className="meta-label block mt-4">{stat.label}</span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatNumber = ({
  stat,
  inView,
}: {
  stat: { value: number; prefix: string; suffix: string };
  inView: boolean;
}) => {
  const count = useCountUp(stat.value, 2500, inView);
  const formatted = stat.value >= 1000000
    ? `${stat.prefix}${(count / 1000000).toFixed(count >= stat.value ? 0 : 1)}M`
    : `${stat.prefix}${count.toLocaleString()}`;

  return (
    <span className="font-display text-[clamp(3rem,8vw,6rem)] text-pure-white leading-none">
      {formatted}{stat.suffix}
    </span>
  );
};

export default StatsSection;
