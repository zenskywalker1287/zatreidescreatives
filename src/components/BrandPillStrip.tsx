const brands = [
  "INNERDOSE", "KRUPT SPORTS", "HERO LOUPES", "PRIME TRAIN",
  "BEST BODY", "FLATPACK", "LOVELUGGAGE",
];

const BrandPillStrip = () => {
  return (
    <div className="py-12 text-center">
      <p
        className="font-mono text-xs tracking-wider mb-8"
        style={{
          color: "#FF2400",
          textShadow: "0 0 8px rgba(255,36,0,0.5)",
        }}
      >
        [BRANDS WE WROTE FOR]
      </p>

      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-ticker-left">
          {[...Array(4)].map((_, rep) => (
            <div key={rep} className="flex gap-3 mx-3">
              {brands.map((brand, i) => (
                <span
                  key={i}
                  className="inline-block font-mono text-[11px] tracking-[0.15em] uppercase text-foreground/80 border border-foreground/20 px-5 py-2 whitespace-nowrap"
                  style={{ borderRadius: "999px" }}
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandPillStrip;
