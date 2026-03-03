import { useRef } from "react";
import { useInView } from "../hooks/useInView";

const brands = ["NIKE", "CHIPOTLE", "GYMSHARK"];

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

        <div className="flex items-center justify-center gap-6 md:gap-12 mb-8">
          {brands.map((brand, i) => (
            <div key={brand} className="flex items-center gap-6 md:gap-12">
              {i > 0 && <div className="w-[1px] h-12 bg-foreground/15" />}
              <h3 className="font-display text-[clamp(2rem,5vw,4rem)] text-pure-white leading-none">
                {brand}
              </h3>
            </div>
          ))}
        </div>

        <span className="meta-label text-foreground/50 mb-3 block">[YOUR CREATIVE SAT NEXT TO THEIRS.]</span>
        <p className="font-serif-thin italic text-foreground/60 text-base mb-3">
          Not a flex. Just context.
        </p>
        <span className="meta-label text-muted-foreground/40">[FEATURED IN THE SAME CAMPAIGN BRIEF — 2024]</span>
      </div>
    </section>
  );
};

export default FeaturedAlongside;
