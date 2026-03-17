import { Link } from "react-router-dom";
import { LayoutGrid, FileText, Users, BookOpen } from "lucide-react";

const creativeCards = [
  { icon: LayoutGrid, title: "CONTENT PILLAR\nSTRATEGY", description: "Four optimized pillars built specifically for your brand. Tested monthly. Refined constantly. Your team always knows exactly what to make and why.", tags: "ORGANIC · PAID · ALWAYS OPTIMIZED" },
  { icon: FileText, title: "CREATIVE\nBRIEFING", description: "Every shoot. Every campaign. Every UGC creator on your roster — briefed with strategy behind it. No more guessing on set. No more off-brand content.", tags: "BRIEFS · DIRECTION · EXECUTION" },
  { icon: Users, title: "TEAM\nINTEGRATION", description: "I work inside your team. Slack. Notion. Whatever you run on. Your editors, your photographers, your media buyers — all aligned to the same creative strategy.", tags: "EMBEDDED · NOT EXTERNAL" },
  { icon: BookOpen, title: "HOOKS & ANGLE\nLIBRARY", description: "A living document your team pulls from daily. 100+ angles organized by format, platform and objective. Your content never runs dry.", tags: "ALWAYS ON. ALWAYS FRESH." },
];

interface Phase03Props { isActive: boolean; }

const Phase03FrontEnd = ({ isActive }: Phase03Props) => {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex flex-col overflow-hidden snap-start">
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-10">
        <h2 className={`font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-pure-white text-center mb-4 transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          THE IN-HOUSE CREATIVE DIRECTOR YOU NEVER HAD.
        </h2>
        <p className={`font-serif-thin italic text-sm md:text-base text-blood-orange text-center mb-6 transition-all duration-700 delay-200 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Not a freelancer you brief once and never hear from. Embedded. Opinionated. Accountable. Running your content strategy, briefing your team, owning your pillars — like a full-time creative director without the full-time price tag.
        </p>
        <div className={`w-24 h-[1px] bg-foreground/20 mb-8 transition-all duration-700 delay-300 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
          {creativeCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="group border border-foreground/15 rounded-lg bg-[hsl(0,0%,4%)] p-7 flex flex-col items-center text-center transition-all duration-200 hover:border-primary hover:-translate-y-1 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.15)]"
                style={{ opacity: isActive ? 1 : 0, transform: isActive ? undefined : "translateY(20px)", transition: `all 0.5s ease ${400 + i * 100}ms` }}>
                <Icon size={32} strokeWidth={1.2} className="text-pure-white mb-4 transition-colors group-hover:text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
                <h3 className="font-display text-lg md:text-xl text-pure-white whitespace-pre-line mb-3 leading-tight">{card.title}</h3>
                <div className="w-full h-[1px] bg-foreground/10 mb-3" />
                <p className="font-body text-[9px] md:text-[10px] text-cream leading-relaxed whitespace-pre-line mb-3">{card.description}</p>
                <span className="font-body text-[8px] tracking-wider text-primary/60 group-hover:text-primary transition-colors">{card.tags}</span>
              </div>
            );
          })}
        </div>
        <Link to="/portfolio" className="mt-6 font-display text-sm md:text-base bg-pure-white text-background px-8 py-3 transition-all duration-300 hover:bg-background hover:text-pure-white hover:border-primary border border-transparent hover:border">
          SEE THE WORK →
        </Link>
      </div>
      <div className="border-t border-foreground/15 px-6 md:px-10 py-3 flex justify-between items-center flex-shrink-0">
        <span className="meta-label text-muted-foreground/50 whitespace-pre-line">{"PHASE 03 COMPLETE —\nYOU NOW HAVE A CREATIVE DIRECTOR.\nWITHOUT THE FULL-TIME SALARY."}</span>
        <a href="#pipeline" className="meta-label text-primary hover:text-pure-white transition-colors">THE WORK →</a>
      </div>
    </div>
  );
};

export default Phase03FrontEnd;
