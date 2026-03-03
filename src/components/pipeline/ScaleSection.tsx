const ScaleSection = () => {
  return (
    <div className="mt-16 border border-primary/30 bg-[#0a0a0a] p-8 md:p-10">
      <span className="meta-label text-primary block mb-4">[IF IT'S A WINNING ANGLE]</span>

      <h3 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-pure-white mb-6">
        SCALE IT WITH 100+ CREATIVE VARIATIONS.
      </h3>

      <p className="font-serif-thin text-lg md:text-xl text-foreground/80 italic max-w-2xl mb-10">
        "One angle that converts doesn't retire after one ad. We take your best performing concepts and engineer 100+ variations — different formats, different hooks, different platforms. Same winning psychology. Infinite creative optionality."
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
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
