import { useRef } from "react";
import { useInView } from "../hooks/useInView";

const FeaturedAlongside = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);

  return (
    <section
      ref={ref}
      className={`border-t border-b border-foreground/10 py-16 md:py-20 bg-background transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-[900px] mx-auto text-center px-6">
        <span className="meta-label text-primary mb-8 block">[AS SEEN ALONGSIDE]</span>

        <h3 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-pure-white leading-[0.95] mb-6">
          FEATURED ON<br />REALLY GOOD EMAILS.
        </h3>

        <span className="meta-label text-foreground/50 mb-6 block leading-relaxed">
          [ALONGSIDE NIKE · CHIPOTLE · GYMSHARK<br />
          AND 10,000+ OF THE BEST EMAILS ON THE INTERNET]
        </span>

        <p className="font-serif-thin italic text-foreground/60 text-base md:text-lg mb-6 leading-relaxed max-w-lg mx-auto">
          It's the industry's most respected email curation platform.
          Your work only gets on there if it's actually good.
        </p>

        <span className="meta-label text-muted-foreground/40">[REALLYGOODEMAILS.COM · CURATED · NOT PAID]</span>
      </div>
    </section>
  );
};

export default FeaturedAlongside;
