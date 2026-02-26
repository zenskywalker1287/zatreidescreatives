import { useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

const days = [
  { day: 1, type: "INOCULATION EMAIL", purpose: "Prime against competitors. Establish authority from line one." },
  { day: 2, type: "WELCOME HOOK AD", purpose: "Retarget with the strongest USP. Set the tone." },
  { day: 3, type: "OBJECTION CRUSHER AD", purpose: "Pre-empt the #1 reason they won't buy." },
  { day: 4, type: "SOCIAL PROOF EMAIL", purpose: "5-star reviews from their exact persona." },
  { day: 5, type: "STORY SEQUENCE", purpose: "Founder story — why this brand exists." },
  { day: 6, type: "USP STACK EMAIL", purpose: "10 reasons stacked. Rapid-fire belief building." },
  { day: 7, type: "IDENTITY BRIDGE AD", purpose: "You're not buying a product. You're joining a tribe." },
  { day: 8, type: "FEAR OF LOSS EMAIL", purpose: "What happens if they DON'T buy." },
  { day: 9, type: "COMPARISON EMAIL", purpose: "Us vs. them. Controlled contrast." },
  { day: 10, type: "MICRO-COMMITMENT AD", purpose: "Low-barrier action — quiz, guide, free value." },
  { day: 11, type: "TESTIMONIAL STACK", purpose: "Video + written proof from real customers." },
  { day: 12, type: "BEHIND THE SCENES", purpose: "Manufacturing, QC, obsessive detail." },
  { day: 13, type: "URGENCY PRIMER", purpose: "Soft scarcity. Demand > supply narrative." },
  { day: 14, type: "RE-ENGAGEMENT AD", purpose: "Win back the ghosts. New angle, same product." },
  { day: 15, type: "VALUE BOMB EMAIL", purpose: "Pure education. No pitch. Build trust equity." },
  { day: 16, type: "PERSONA SPLIT AD", purpose: "Segment by identity. Serve custom creative." },
  { day: 17, type: "FAQ CRUSHER EMAIL", purpose: "Answer everything. Remove all friction." },
  { day: 18, type: "AUTHORITY PROOF", purpose: "Press, awards, certifications, expert endorsement." },
  { day: 19, type: "COMMUNITY HOOK", purpose: "UGC, fan content, brand community showcase." },
  { day: 20, type: "CONTRAST AD", purpose: "Before/after. Problem → Solution visualization." },
  { day: 21, type: "DEADLINE SEQUENCE", purpose: "The offer has an expiration. Time pressure begins." },
  { day: 22, type: "OBJECTION #2 EMAIL", purpose: "Handle the SECOND biggest barrier to purchase." },
  { day: 23, type: "BUNDLE OFFER AD", purpose: "Increase AOV. Stack value, not discounts." },
  { day: 24, type: "LAST CHANCE EMAIL", purpose: "Final soft push before hard close." },
  { day: 25, type: "EMOTIONAL CLOSE", purpose: "Paint the picture of life WITH the product." },
  { day: 26, type: "HARD CLOSE EMAIL", purpose: "Direct. Unambiguous. This is the moment." },
  { day: 27, type: "CART RECOVERY AD", purpose: "Dynamic retarget. They were THIS close." },
  { day: 28, type: "POST-PURCHASE HOOK", purpose: "Upsell, cross-sell, loyalty loop begins." },
  { day: 29, type: "REFERRAL TRIGGER", purpose: "Turn buyers into recruiters. Viral loop." },
  { day: 30, type: "SYSTEM RESET", purpose: "Loop restarts. New segment enters the engine." },
];

const CampaignSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  return (
    <section className="section-border" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <span className="meta-label text-primary">[05] CAMPAIGN</span>
        <h2 className="font-display text-[clamp(2rem,6vw,6rem)] leading-[0.95] text-pure-white mt-4 mb-4">
          THE 30-DAY<br />ROADMAP.
        </h2>
        <p className="font-serif-thin text-lg text-muted-foreground italic mb-12">
          Every cell is a touchpoint. Every touchpoint has a purpose.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-6 mb-12">
          {["24 UNIQUE HOOKS", "100% AD-TO-EMAIL CONGRUENCY", "ZERO REVENUE LEAKS"].map((stat, i) => (
            <span key={i} className="meta-label text-foreground/60 border border-foreground/10 px-4 py-2">
              {stat}
            </span>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-1">
          {days.map((day) => (
            <div
              key={day.day}
              className={`relative border border-foreground/10 p-2 md:p-3 aspect-square flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 ${
                inView ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${day.day * 30}ms` }}
              onMouseEnter={() => setHoveredDay(day.day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <span className="font-mono text-[10px] text-primary">D{day.day}</span>
              <span className="font-mono text-[8px] md:text-[9px] text-muted-foreground leading-tight hidden md:block">
                {day.type.split(" ").slice(0, 2).join(" ")}
              </span>

              {/* Tooltip */}
              {hoveredDay === day.day && (
                <div className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-card border border-foreground/20 p-4 pointer-events-none">
                  <span className="meta-label text-primary block mb-2">D{day.day}: {day.type}</span>
                  <p className="font-mono text-xs text-foreground/80">{day.purpose}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;
