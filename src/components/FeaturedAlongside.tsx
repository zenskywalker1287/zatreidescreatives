import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import CarouselStrip from "./CarouselStrip";
import ScrollReveal from "./ScrollReveal";

const emailCards = [
  { id: 1, image: "/images/email-01.png" },
  { id: 2, image: "/images/email-02.png" },
  { id: 3, image: "/images/email-03.png" },
  { id: 4, image: "/images/email-04.png" },
  { id: 5, image: "/images/email-05.png" },
  { id: 6, image: "/images/email-06.png" },
  { id: 7, image: "/images/email-01.png" },
  { id: 8, image: "/images/email-02.png" },
  { id: 9, image: "/images/email-03.png" },
  { id: 10, image: "/images/email-04.png" },
];

const FeaturedAlongside = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);

  return (
    <section
      ref={ref}
      className={`border-t border-b border-foreground/10 py-16 md:py-20 bg-background transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="max-w-[900px] mx-auto text-center px-6">
        <ScrollReveal variant="fade-up">
          <span className="meta-label text-primary mb-8 block">AS SEEN ALONGSIDE</span>
        </ScrollReveal>

        <ScrollReveal variant="blur" delay={100}>
          <h3 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-pure-white leading-[0.95] mb-6">
            FEATURED ON<br />REALLY GOOD EMAILS.
          </h3>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={200}>
          <span className="meta-label text-foreground/50 mb-6 block leading-relaxed">
            ALONGSIDE NIKE · CHIPOTLE · GYMSHARK<br />
            AND 10,000+ OF THE BEST EMAILS ON THE INTERNET
          </span>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={300}>
          <p className="font-serif-thin italic text-foreground/60 text-base md:text-lg mb-6 leading-relaxed max-w-lg mx-auto">
            It's the industry's most respected email curation platform.
            Your work only gets on there if it's actually good.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={400}>
          <span className="meta-label text-muted-foreground/40">REALLYGOODEMAILS.COM · CURATED · NOT PAID</span>
        </ScrollReveal>
      </div>

      <ScrollReveal variant="slide-up-rotate" delay={300} threshold={0.05}>
        <div className="mt-10">
          <CarouselStrip cards={emailCards} direction="left" />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default FeaturedAlongside;
