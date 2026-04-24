import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

import flyingFlea from "@/assets/portfolio/flying-flea.png";
import timebeam from "@/assets/portfolio/timebeam.png";
import eskiin from "@/assets/portfolio/eskiin.png";
import gruns from "@/assets/portfolio/gruns.png";
import healthmateInitiation from "@/assets/portfolio/healthmate-initiation.png";
import junk from "@/assets/portfolio/junk.png";
import healthmateRitual from "@/assets/portfolio/healthmate-ritual.png";
import healthmateHierarchy from "@/assets/portfolio/healthmate-hierarchy.png";
import healthmateWelcome from "@/assets/portfolio/healthmate-welcome.png";
import refreshWhy from "@/assets/portfolio/refresh-why.png";
import refreshWithout from "@/assets/portfolio/refresh-without.png";
import minikatanaBf from "@/assets/portfolio/minikatana-bf.png";
import sowell from "@/assets/portfolio/sowell.png";
import battlehawk from "@/assets/portfolio/battlehawk.png";
import buckedup from "@/assets/portfolio/buckedup.png";
import petePedro from "@/assets/portfolio/pete-pedro.png";
import saunabox from "@/assets/portfolio/saunabox.png";
import suspicious from "@/assets/portfolio/suspicious.png";
import twistedDough from "@/assets/portfolio/twisted-dough.png";

type PortfolioItem = {
  id: number;
  image: string;
  brand: string;
  tag: string;
};

const items: PortfolioItem[] = [
  { id: 1, image: flyingFlea, brand: "FLYING FLEA", tag: "PRODUCT LAUNCH" },
  { id: 2, image: timebeam, brand: "TIMEBEAM", tag: "PROBLEM/SOLUTION" },
  { id: 3, image: eskiin, brand: "ESKIIN", tag: "EDUCATION" },
  { id: 4, image: gruns, brand: "GRUNS", tag: "US VS THEM" },
  { id: 5, image: healthmateInitiation, brand: "HEALTH MATE", tag: "INITIATION" },
  { id: 6, image: junk, brand: "JUNK BRANDS", tag: "LIFESTYLE" },
  { id: 7, image: healthmateRitual, brand: "HEALTH MATE", tag: "RITUAL" },
  { id: 8, image: healthmateHierarchy, brand: "HEALTH MATE", tag: "HIERARCHY" },
  { id: 9, image: healthmateWelcome, brand: "HEALTH MATE", tag: "WELCOME" },
  { id: 10, image: refreshWhy, brand: "REFRESH", tag: "BRAND STORY" },
  { id: 11, image: refreshWithout, brand: "REFRESH", tag: "US VS THEM" },
  { id: 12, image: minikatanaBf, brand: "MINI KATANA", tag: "BLACK FRIDAY" },
  { id: 13, image: sowell, brand: "SOWELL", tag: "EDUCATION" },
  { id: 14, image: battlehawk, brand: "BATTLEHAWK", tag: "BLACK FRIDAY" },
  { id: 15, image: buckedup, brand: "BUCKED UP", tag: "PRODUCT LAUNCH" },
  { id: 16, image: petePedro, brand: "PETE & PEDRO", tag: "MYTH BUSTING" },
  { id: 17, image: saunabox, brand: "SAUNABOX", tag: "PROBLEM/SOLUTION" },
  { id: 18, image: suspicious, brand: "SUSPICIOUS", tag: "WELCOME" },
  { id: 19, image: twistedDough, brand: "TWISTED DOUGH", tag: "PROMO" },
];

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedItem(null);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="film-grain" />
      <Nav />

      {/* Header */}
      <div className="pt-32 md:pt-40 pb-12 text-center px-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-blood-orange">
          ZATREIDES · PORTFOLIO
        </span>
        <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.95] text-pure-white mt-4">
          THE WORK.
        </h1>
        <p className="font-serif-thin text-base md:text-xl text-foreground italic mt-4 max-w-xl mx-auto">
          Full-length emails shipped for 6, 7 and 8-figure DTC brands.
        </p>
      </div>

      {/* Grid: 1 col mobile, 2 col sm, 3 col lg */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-[1600px] mx-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative block overflow-hidden border border-foreground/10 bg-[#0a0a0a] text-left transition-all duration-300 hover:border-primary/60"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <img
                src={item.image}
                alt={`${item.brand} — ${item.tag}`}
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                loading="lazy"
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.85) 100%)",
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-display text-base md:text-lg tracking-[0.15em] text-pure-white">
                    {item.brand}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood-orange">
                    {item.tag}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: "rgba(0,0,0,0.96)" }}
          onClick={() => setSelectedItem(null)}
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="fixed top-4 right-4 md:top-6 md:right-6 font-mono text-pure-white text-sm hover:text-primary transition-colors z-[110] border border-foreground/30 px-3 py-1.5"
          >
            CLOSE ✕
          </button>
          <div
            className="bg-white overflow-y-auto w-full max-w-[640px] max-h-[92vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white border-b border-black/10 px-4 py-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/70">
                {selectedItem.brand}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF2400]">
                {selectedItem.tag}
              </span>
            </div>
            <img
              src={selectedItem.image}
              alt={`${selectedItem.brand} — ${selectedItem.tag}`}
              className="w-full h-auto block"
            />
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="border-t border-foreground/20">
        <div className="text-center py-20 px-6">
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] text-pure-white">
            SEEN ENOUGH?
          </h2>
          <p className="font-serif-thin text-base md:text-lg text-foreground italic mt-4 max-w-md mx-auto">
            Let's talk about what we can build for your brand.
          </p>
          <Link
            to="/#contact"
            className="inline-block mt-8 font-display text-sm uppercase tracking-[0.2em] bg-primary text-primary-foreground px-10 py-4 transition-all duration-300 hover:opacity-90"
          >
            START THE CONVERSATION →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
