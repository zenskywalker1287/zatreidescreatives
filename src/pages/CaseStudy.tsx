import { useParams, Link, Navigate } from "react-router-dom";
import { getCaseStudyBySlug, getAdjacentStudies } from "@/data/caseStudyData";
import type { Deliverable } from "@/data/caseStudyData";

const DeliverableIcon = ({ item }: { item: Deliverable }) => {
  const Icon = item.icon;
  return (
    <div className="flex flex-col items-center gap-2 group cursor-default">
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
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!study) return <Navigate to="/" replace />;

  const { prev, next } = getAdjacentStudies(study.slug);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="film-grain" />

      {/* Header */}
      <div className="border-b border-foreground/10 px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
        <Link to="/" className="meta-label text-primary hover:text-foreground transition-colors">
          ← BACK TO COMMAND
        </Link>
        <span className="meta-label text-muted-foreground">CASE STUDY / {study.name}</span>
      </div>

      {/* Hero */}
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <span className="meta-label text-primary block mb-6">[{study.niche}]</span>
        <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] text-pure-white mb-4">
          {study.headline}
        </h1>
        <p className="font-serif-thin text-xl md:text-2xl text-muted-foreground italic mb-4 max-w-2xl">
          {study.subheadline}
        </p>
        <p className="font-mono text-sm text-foreground/60 max-w-xl leading-relaxed mb-8">
          {study.context}
        </p>

        {/* Icon badges row */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {study.deliverables.map((d, i) => (
            <DeliverableIcon key={i} item={d} />
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-foreground/15" />
      </div>

      {/* Sections */}
      <div className="px-6 md:px-12 lg:px-20 pb-20 space-y-16">
        {study.sections.map((section, i) => (
          <div key={i}>
            <span className="meta-label text-primary block mb-4">[{String(i + 1).padStart(2, "0")}] {section.title}</span>
            <p className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl">
              {section.body}
            </p>
          </div>
        ))}

        {/* Stat callout */}
        <div className="border border-primary/30 p-8 md:p-12 text-center">
          <span className="meta-label text-primary block mb-4">KEY RESULT</span>
          <p className="font-display text-[clamp(2rem,5vw,4rem)] text-pure-white leading-none">
            {study.stat}
          </p>
        </div>
      </div>

      {/* Prev / Next navigation */}
      <div className="border-t border-foreground/10 px-6 md:px-12 lg:px-20 py-12 flex justify-between items-center">
        <Link
          to={`/case-studies/${prev.slug}`}
          className="group flex items-center gap-3 transition-colors"
        >
          <span className="font-mono text-sm text-foreground/40 group-hover:text-primary transition-colors">←</span>
          <div>
            <span className="meta-label text-muted-foreground/50 block">PREVIOUS</span>
            <span className="font-display text-lg md:text-xl text-foreground/70 group-hover:text-foreground transition-colors">
              {prev.name}
            </span>
          </div>
        </Link>
        <Link
          to={`/case-studies/${next.slug}`}
          className="group flex items-center gap-3 text-right transition-colors"
        >
          <div>
            <span className="meta-label text-muted-foreground/50 block">NEXT</span>
            <span className="font-display text-lg md:text-xl text-foreground/70 group-hover:text-foreground transition-colors">
              {next.name}
            </span>
          </div>
          <span className="font-mono text-sm text-foreground/40 group-hover:text-primary transition-colors">→</span>
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

export default CaseStudy;
