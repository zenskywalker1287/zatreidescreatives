import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type PortfolioItem = {
  id: number;
  image: string;
  brand: string;
  tag: string;
  category: "EMAIL" | "ADS" | "SHORT FORM";
};

const items: PortfolioItem[] = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  image: `/images/slice${i + 1}.png`,
  brand: ["MADCOW", "4AMSKIN", "XYKO", "FLATPACK"][i % 4],
  tag: ["WELCOME FLOW", "CAMPAIGN", "ABANDONED CART", "WINBACK", "LAUNCH"][i % 5],
  category: "EMAIL",
}));

const tabs = [
  { id: "ALL", label: "ALL" },
  { id: "EMAIL", label: "EMAIL" },
  { id: "ADS", label: "ADS" },
  { id: "SHORT FORM", label: "SHORT FORM" },
  { id: "CREATIVE_WORLD", label: "✦ LATEST CREATIVE WORLD" },
];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [creativeWorldOpen, setCreativeWorldOpen] = useState(false);

  const filtered =
    activeTab === "ALL"
      ? items
      : activeTab === "EMAIL"
        ? items.filter((i) => i.category === "EMAIL")
        : [];

  const showEmpty = activeTab === "ADS" || activeTab === "SHORT FORM";

  const handleTabClick = (id: string) => {
    if (id === "CREATIVE_WORLD") {
      setCreativeWorldOpen(true);
      return;
    }
    setActiveTab(id);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
        setCreativeWorldOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="film-grain" />

      {/* Header */}
      <div className="pt-20 pb-8 text-center px-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
          [ZEN RICHARDS · PORTFOLIO]
        </span>
        <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.95] text-pure-white mt-4">
          THE WORK.
        </h1>
        <p className="font-serif-thin text-lg md:text-xl text-foreground italic mt-4 max-w-lg mx-auto">
          50+ emails and creatives shipped<br />
          across 6, 7 and 8-figure DTC brands.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 px-6 pb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`font-mono text-[11px] uppercase tracking-[0.15em] rounded-full px-6 py-2.5 border transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "bg-primary border-primary text-pure-white"
                : "border-foreground/30 text-foreground hover:border-foreground/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid or Empty State */}
      <div className="px-4 md:px-8 lg:px-12 pb-20">
        {showEmpty ? (
          <div className="text-center py-32">
            <span className="font-mono text-sm text-foreground">
              MORE CREATIVE COMING SOON.
            </span>
            <div className="mt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary border border-primary/40 px-3 py-1">
                [CHECK BACK]
              </span>
            </div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="mb-3 break-inside-avoid cursor-pointer group overflow-hidden rounded-lg border border-transparent hover:border-foreground/40 transition-all duration-200 hover:scale-[1.02]"
              >
                <img
                  src={item.image}
                  alt={`${item.brand} ${item.tag}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.96)" }}
          onClick={() => setSelectedItem(null)}
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 font-mono text-foreground text-lg hover:text-primary transition-colors z-10"
          >
            [✕]
          </button>
          <div
            className="bg-white rounded-xl overflow-y-auto w-full max-w-[600px] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white border-b border-black/10 px-4 py-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">
                {selectedItem.brand}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF2400]">
                [{selectedItem.tag}]
              </span>
            </div>
            <img
              src={selectedItem.image}
              alt={`${selectedItem.brand} ${selectedItem.tag}`}
              className="w-full h-auto block"
            />
          </div>
        </div>
      )}

      {/* Creative World Modal */}
      <Dialog open={creativeWorldOpen} onOpenChange={setCreativeWorldOpen}>
        <DialogContent className="bg-background border-foreground/10 max-w-xl text-center">
          <DialogHeader>
            <DialogTitle className="font-display text-4xl md:text-5xl text-pure-white">
              CREATIVE WORLD 01 — COMING SOON.
            </DialogTitle>
            <DialogDescription className="font-serif-thin text-lg text-foreground italic mt-4">
              Our first brand universe is in production.<br />
              Check back soon.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Bottom CTA */}
      <div className="border-t border-foreground/20">
        <div className="text-center py-20 px-6">
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] text-pure-white">
            SEEN ENOUGH?
          </h2>
          <p className="font-serif-thin text-lg text-foreground italic mt-4 max-w-md mx-auto">
            Let's talk about what we can<br />
            build for your brand.
          </p>
          <Link
            to="/#contact"
            className="inline-block mt-8 font-mono text-[11px] uppercase tracking-[0.25em] bg-pure-white text-background px-8 py-4 rounded-none transition-all duration-200 hover:bg-background hover:text-foreground border border-foreground/20"
          >
            START THE CONVERSATION →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
