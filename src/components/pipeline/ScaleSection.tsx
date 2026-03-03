const ScaleSection = () => {
  return (
    <div className="mt-10 border border-primary/30 bg-[#0a0a0a] p-6 md:p-8">
      <span className="meta-label text-primary block mb-3">[IF IT'S A WINNING ANGLE]</span>

      <h3 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-pure-white mb-4">
        SCALE IT WITH 100+ CREATIVE VARIATIONS.
      </h3>

      <p className="font-serif-thin text-base md:text-lg text-foreground/80 italic max-w-2xl mb-6">
        "One angle that converts doesn't retire after one ad. We take your best performing concepts and engineer 100+ variations — different formats, different hooks, different platforms. Same winning psychology. Infinite creative optionality."
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          "100+ VARIATIONS PER ANGLE",
          "EVERY PLATFORM. EVERY FORMAT.",
          "ZERO CREATIVE FATIGUE",
        ].map((pill) => (
          <span
            key={pill}
            className="border border-foreground/20 px-4 py-2 font-mono text-[10px] tracking-[0.15em] text-foreground/70 uppercase"
          >
            [{pill}]
          </span>
        ))}
      </div>

      <button className="btn-brutal">
        SEE HOW IT ALL CONNECTS →
      </button>
    </div>
  );
};

export default ScaleSection;
