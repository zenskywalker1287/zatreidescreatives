interface Brief {
  hookFormat: string;
  hookLine: string;
  talent: string;
  shot: string;
  direction: string;
  cta: string;
}

const CreatorBriefCard = ({ brief }: { brief: Brief }) => {
  return (
    <div className="border border-foreground/10 bg-secondary/20 p-3 md:p-4">
      <span className="meta-label text-primary block mb-2">CREATOR BRIEF</span>

      <span className="font-body text-[9px] tracking-[0.2em] text-primary uppercase block mb-1">
        {brief.hookFormat}
      </span>

      <p className="font-serif-thin text-sm md:text-base text-foreground/90 italic mb-3 leading-relaxed">
        "{brief.hookLine}"
      </p>

      <div className="space-y-1 font-body text-[10px] tracking-[0.1em] text-muted-foreground uppercase leading-relaxed">
        <p><span className="text-foreground/50">Talent:</span> {brief.talent}</p>
        <p><span className="text-foreground/50">Shot:</span> {brief.shot}</p>
        <p><span className="text-foreground/50">Direction:</span> {brief.direction}</p>
        <p><span className="text-foreground/50">CTA:</span> {brief.cta}</p>
      </div>
    </div>
  );
};

export default CreatorBriefCard;
