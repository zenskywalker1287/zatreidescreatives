import { useState, useRef } from "react";
import { useInView } from "../hooks/useInView";

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
          <span className="meta-label text-primary">CONTACT</span>
          <h2
            className={`font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-pure-white mt-4 mb-2 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            YOU'VE SEEN<br />THE ENGINE.
          </h2>
          <p className="font-serif-thin text-xl md:text-2xl text-foreground italic mb-12">
            Now let's build yours.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="meta-label block mb-2">NAME</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-foreground/20 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
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
                />
              </div>
              <button type="submit" className="btn-brutal">
                SUBMIT INQUIRY
              </button>
            </form>
          ) : (
            <div className="brutal-card border-primary/30">
              <span className="text-primary font-body text-sm">TRANSMISSION RECEIVED.</span>
              <p className="font-body text-xs text-muted-foreground mt-2">
                We'll review your inquiry and respond within 48 hours.
              </p>
            </div>
          )}

          <p className="meta-label mt-12 text-muted-foreground/50">
            NOT ACCEPTING EVERYONE — HIGH-STATUS INTEREST ONLY
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
