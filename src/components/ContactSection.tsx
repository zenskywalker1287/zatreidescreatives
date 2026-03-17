import { useState, useRef } from "react";
import { useInView } from "../hooks/useInView";
import ScrollReveal from "./ScrollReveal";
import TypingAnimation from "./TypingAnimation";

const CALENDLY_URL = "https://calendly.com/zen-zatreides/30min";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.2);
  const [form, setForm] = useState({ name: "", brand: "", need: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-border" ref={ref}>
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <div className="max-w-2xl">
          <ScrollReveal variant="fade-right">
            <span className="meta-label text-primary">CONTACT</span>
          </ScrollReveal>
          <ScrollReveal variant="blur" delay={100}>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-pure-white mt-4 mb-2">
              YOU'VE SEEN THE ENGINE.
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={200}>
            <p className="font-serif-thin text-xl md:text-2xl text-blood-orange italic mb-8">
              Now let's build yours.
            </p>
          </ScrollReveal>

          {/* Calendly CTA */}
          <ScrollReveal variant="fade-up" delay={250}>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 font-display text-base uppercase tracking-[0.15em] bg-primary text-primary-foreground mb-10"
              style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 40px hsl(4 80% 48% / 0.5), 0 0 80px hsl(4 80% 48% / 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              BOOK A 30-MIN CALL →
            </a>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={280}>
            <div className="w-full h-px bg-foreground/10 mb-8" />
            <p className="meta-label text-muted-foreground mb-6">OR SEND AN INQUIRY BELOW</p>
          </ScrollReveal>

          {!submitted ? (
            <ScrollReveal variant="fade-up" delay={300}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="meta-label block mb-2">NAME</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  />
                </div>
                <div>
                  <label className="meta-label block mb-2">BRAND</label>
                  <input
                    type="text"
                    required
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  />
                </div>
                <div>
                  <label className="meta-label block mb-2">WHAT YOU NEED</label>
                  <textarea
                    required
                    rows={4}
                    value={form.need}
                    onChange={(e) => setForm({ ...form, need: e.target.value })}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  />
                </div>
                <button type="submit" className="btn-brutal">
                  SUBMIT INQUIRY
                </button>
              </form>
            </ScrollReveal>
          ) : (
            <ScrollReveal variant="scale">
              <div className="brutal-card border-primary/30">
                <span className="text-primary font-body text-sm">TRANSMISSION RECEIVED.</span>
                <p className="font-body text-xs text-muted-foreground mt-2">
                  We'll review your inquiry and respond within 48 hours.
                </p>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal variant="fade-up" delay={500}>
            <p className="meta-label mt-12 text-blood-orange/60">
              NOT ACCEPTING EVERYONE — HIGH-STATUS INTEREST ONLY
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
