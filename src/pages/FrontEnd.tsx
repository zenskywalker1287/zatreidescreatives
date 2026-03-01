import { Link } from "react-router-dom";
import Nav from "../components/Nav";

const categories = [
  { label: "EDUCATION", angles: ["How-To Tutorial", "Myth Buster", "FAQ Teardown", "Did You Know?", "Science Breakdown", "Common Mistakes", "Expert Opinion", "Step-by-Step Guide", "Deep Dive", "Beginner's Guide", "Pro Tips", "Hack Reveal", "Ingredient Spotlight", "Tool Breakdown", "Cheat Sheet", "Framework Reveal", "The Anatomy Of…"] },
  { label: "SOCIAL PROOF", angles: ["Testimonial Highlight", "Before vs. After", "Transformation Timeline", "Customer Spotlight", "UGC Compilation", "Review Reaction", "Case Study Mini", "Results Dashboard", "Side-by-Side Comparison", "Stack Against Competitors", "Social Screenshot", "Influencer Co-Sign", "Community Feature", "Milestone Celebration", "Award Showcase"] },
  { label: "ENTERTAINMENT", angles: ["Hot Take", "The Confession", "Enemy of the State", "Unpopular Opinion", "Day in the Life", "Parody / Satire", "Trend Hijack", "Meme Format", "POV Sketch", "Story Time", "Dramatic Reading", "This vs. That", "Rapid Fire Q&A", "Would You Rather", "Plot Twist", "Timeline Challenge"] },
  { label: "CONVERSION", angles: ["Limited Time Offer", "Flash Sale", "Bundle Deal", "Free Shipping Push", "Abandoned Cart Nudge", "Low Stock Alert", "Price Anchor", "Value Stack", "Risk Reversal", "Guarantee Spotlight", "Payment Plan Pitch", "First-Time Buyer", "Loyalty Reward", "Exit Intent", "Countdown Timer", "VIP Early Access"] },
  { label: "BRAND STORY", angles: ["Founder Story", "Origin Myth", "Behind the Scenes", "Why We Started", "The Mission", "Values Manifesto", "Team Spotlight", "Process Reveal", "Supply Chain Story", "Customer Letter", "Year in Review", "Pivot Moment", "Failure to Success", "Brand Evolution", "Vision Statement", "Culture Peek"] },
  { label: "OBJECTION", angles: ["Price Justification", "Quality Proof", "Ingredient Defense", "Competitor Comparison", "Results Timeline", "Shipping Speed", "Return Policy", "Ingredient Sourcing", "Clinical Proof", "Expert Endorsement", "Longevity Argument", "Cost Per Use", "Hidden Cost Reveal", "Switching Cost", "Status Quo Challenge", "Fear Address"] },
];

const FrontEnd = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="film-grain" />
      <Nav />

      <main className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <div className="mb-4">
          <Link to="/" className="meta-label text-primary hover:text-pure-white transition-colors">
            ← BACK TO HOME
          </Link>
        </div>

        <span className="meta-label text-primary block mb-6">[FRONT END STRATEGY]</span>
        <h1 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-pure-white mb-4">
          100+ CONTENT ANGLES.
          <br />
          ZERO CREATIVE BLOCK.
        </h1>
        <p className="font-serif italic text-foreground/60 text-sm md:text-base mb-12 max-w-[600px]">
          Every format explained. Every angle mapped.
          Ready to brief any creator or copywriter instantly.
        </p>

        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.label}>
              <h2 className="font-display text-xl md:text-2xl text-primary mb-4">[{cat.label}]</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {cat.angles.map((angle) => (
                  <div
                    key={angle}
                    className="border border-foreground/10 bg-card px-3 py-3 font-mono text-[10px] md:text-[11px] text-foreground/60 hover:border-primary hover:text-primary transition-all duration-300 cursor-default"
                  >
                    {angle}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/#contact"
            className="btn-brutal inline-block text-sm px-10 py-4 border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300"
          >
            [ LET'S BUILD YOURS → ]
          </a>
        </div>
      </main>
    </div>
  );
};

export default FrontEnd;
