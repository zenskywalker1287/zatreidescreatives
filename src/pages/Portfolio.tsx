import { Link } from "react-router-dom";

const campaigns = [
  {
    brand: "MADCOW COLLARS",
    persona: "THE TACTICAL GUARDIAN",
    goal: "Convert protection-dog owners via fear-of-loss + authority positioning",
    results: "312% ROAS · 47% Email Open Rate · $89K Revenue in 30 Days",
    days: [
      "D1: Inoculation — 'Why cheap collars fail working dogs'",
      "D3: Objection — 'Is $80 too much for your dog's safety?'",
      "D7: Social Proof — 'K9 handlers trust Madcow'",
      "D14: Identity — 'You're not a pet owner. You're a handler.'",
      "D21: Urgency — 'Limited batch. Handmade. When they're gone...'",
      "D30: Hard Close — 'Your dog deserves mil-spec.'",
    ],
  },
  {
    brand: "MADCOW COLLARS",
    persona: "THE GEAR SNOB",
    goal: "Position as premium lifestyle brand — anti-Amazon, anti-generic",
    results: "278% ROAS · 52% Email Open Rate · $67K Revenue in 30 Days",
    days: [
      "D1: Status Signal — 'This isn't PetSmart. This is Madcow.'",
      "D5: Exclusivity — 'Limited drop. No restock date.'",
      "D10: Craft Story — 'Hand-stitched. Over-engineered. On purpose.'",
      "D15: Community — 'The collar people ask about at the park'",
      "D22: Contrast — 'Amazon collar vs. Madcow — the difference is visible'",
      "D28: Loyalty Loop — 'Welcome to the inner circle.'",
    ],
  },
  {
    brand: "MADCOW COLLARS",
    persona: "THE WEEKEND WARRIOR",
    goal: "Convert adventure-lifestyle dog owners via durability + freedom narrative",
    results: "245% ROAS · 44% Email Open Rate · $54K Revenue in 30 Days",
    days: [
      "D1: Adventure Hook — 'Your dog lives outside. Their gear should too.'",
      "D4: Durability Proof — 'Mud. Rivers. Mountains. One collar.'",
      "D8: UGC Feature — 'Real dogs. Real trails. Real Madcow.'",
      "D12: Behind Scenes — 'How we test: 500lbs of pull force'",
      "D20: Bundle — 'Collar + leash + harness. One system.'",
      "D26: Emotional Close — 'Every adventure. Every memory. One collar.'",
    ],
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="film-grain" />

      {/* Header */}
      <div className="border-b border-foreground/10 px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
        <Link to="/" className="meta-label text-primary hover:text-foreground transition-colors">
          ← BACK TO COMMAND
        </Link>
        <span className="meta-label text-muted-foreground">PORTFOLIO / CASE STUDIES</span>
      </div>

      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <h1 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-pure-white mb-4">
          THE FULL<br />30-DAY LOGIC.
        </h1>
        <p className="font-serif-thin text-xl text-muted-foreground italic mb-20">
          Every campaign. Every persona. Every touchpoint — mapped.
        </p>

        <div className="space-y-20">
          {campaigns.map((campaign, ci) => (
            <div key={ci} className="border border-foreground/10">
              {/* Campaign header */}
              <div className="p-8 md:p-12 border-b border-foreground/10">
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="meta-label border border-foreground/15 px-3 py-1">{campaign.brand}</span>
                  <span className="meta-label border border-primary/30 px-3 py-1 text-primary">{campaign.persona}</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-pure-white mb-4">
                  CAMPAIGN {String(ci + 1).padStart(2, '0')}
                </h3>
                <p className="font-mono text-sm text-muted-foreground mb-4">{campaign.goal}</p>
                <div className="border-t border-foreground/10 pt-4 mt-4">
                  <span className="meta-label text-primary block mb-1">RESULTS</span>
                  <span className="font-mono text-sm text-foreground">{campaign.results}</span>
                </div>
              </div>

              {/* Touchpoint timeline */}
              <div className="p-8 md:p-12">
                <span className="meta-label text-primary block mb-6">KEY TOUCHPOINTS</span>
                <div className="space-y-4">
                  {campaign.days.map((day, di) => (
                    <div key={di} className="flex items-start gap-4 py-3 border-b border-foreground/5">
                      <div className="w-2 h-2 mt-1.5 bg-primary/40 flex-shrink-0" />
                      <span className="font-mono text-xs md:text-sm text-foreground/80">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-foreground/5 px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="meta-label text-primary">CMD.CTRL</Link>
        <span className="meta-label text-muted-foreground/40">© 2026 — CREATIVE BACKEND SYSTEMS</span>
      </footer>
    </div>
  );
};

export default Portfolio;
