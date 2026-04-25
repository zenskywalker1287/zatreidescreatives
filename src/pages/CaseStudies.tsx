import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudyData";
import Nav from "@/components/Nav";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="film-grain" />
      <Nav />

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-12 text-center">
        <span className="meta-label text-primary block mb-4">[ARCHIVE]</span>
        <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] text-pure-white mb-4">
          CASE STUDIES.
        </h1>
        <p className="font-serif-thin text-lg md:text-xl text-muted-foreground italic max-w-xl mx-auto">
          Brands we've built backends for.
        </p>
      </div>

      {/* Divider */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="w-full h-px bg-foreground/15" />
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              to={`/case-studies/${study.slug}`}
              className="group block border border-foreground/15 hover:border-primary/60 transition-all duration-300 p-6 md:p-8 bg-[#0a0a0a] hover:shadow-[0_0_24px_hsl(var(--primary)/0.15)]"
            >
              <span className="meta-label text-primary block mb-4">
                [{study.niche}]
              </span>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.95] text-pure-white mb-3 group-hover:text-primary transition-colors">
                {study.headline}
              </h2>
              <p className="font-serif-thin text-base md:text-lg text-muted-foreground italic mb-6">
                {study.subheadline}
              </p>
              <div className="border-t border-foreground/10 pt-4 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/60">
                  {study.stat}
                </span>
                <span className="font-mono text-sm text-primary group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-foreground/5 px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="meta-label text-primary">ZATREIDES</Link>
        <span className="meta-label text-muted-foreground/40">© 2026 — CREATIVE BACKEND SYSTEMS</span>
      </footer>
    </div>
  );
};

export default CaseStudies;
