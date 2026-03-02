const stats = [
  { value: "926%", label: "EMAIL REVENUE INCREASE — SINGLE BRAND" },
  { value: "554%", label: "EMAIL ATTRIBUTED GROWTH — ONE MONTH" },
  { value: "72%", label: "OPEN RATE — CAMPAIGN AVERAGE" },
  { value: "NZ$126K", label: "EMAIL ATTRIBUTED — ONE MONTH" },
  { value: "A$112K", label: "EMAIL REVENUE — 30 DAYS · A$400K BRAND" },
  { value: "124%", label: "ATTRIBUTED REVENUE INCREASE" },
  { value: "$8,354", label: "SINGLE EMAIL PLACED ORDER REVENUE" },
];

const SecondNumbersWall = () => {
  return (
    <section className="section-border py-6 overflow-hidden">
      <div className="whitespace-nowrap inline-flex animate-ticker-right">
        {[...Array(4)].map((_, rep) => (
          <div key={rep} className="inline-flex items-center">
            {stats.map((stat, i) => (
              <div key={`${rep}-${i}`} className="inline-flex items-center">
                <div className="inline-flex flex-col items-center mx-8 md:mx-12">
                  <span className="font-display text-[clamp(2rem,5vw,4.5rem)] text-pure-white leading-none">
                    {stat.value}
                  </span>
                  <span className="meta-label text-foreground/50 mt-2 text-center">{stat.label}</span>
                </div>
                <span className="text-primary text-2xl">·</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecondNumbersWall;
