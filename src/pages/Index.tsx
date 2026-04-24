import Nav from "../components/Nav";
import HeroSection from "../components/HeroSection";
import NumbersSection from "../components/NumbersSection";
import LogoTicker from "../components/LogoTicker";
import SocialProofCarousel from "../components/SocialProofCarousel";
import FeaturedAlongside from "../components/FeaturedAlongside";
import SecondNumbersWall from "../components/SecondNumbersWall";
import ProofOfWork from "../components/ProofOfWork";
import ClientsSection from "../components/ClientsSection";
import ProcessSection from "../components/ProcessSection";
import PipelineSection from "../components/PipelineSection";
import CampaignSection from "../components/CampaignSection";

import StatsSection from "../components/StatsSection";
import PortfolioStrip from "../components/PortfolioStrip";
import ContactSection from "../components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative" style={{ background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 2%) 50%, hsl(0 0% 3%) 100%)" }}>
      {/* Film grain overlay */}
      <div className="film-grain" />

      <Nav />
      <HeroSection />
      <NumbersSection />
      <LogoTicker />
      <SocialProofCarousel />
      <FeaturedAlongside />
      <SecondNumbersWall />
      <ProofOfWork />
      <ClientsSection />
      <ProcessSection />
      <PipelineSection />
      <CampaignSection />
      
      <StatsSection />
      <PortfolioStrip />
      <ContactSection />

      {/* Footer */}
      <footer className="border-t border-foreground/5 px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="meta-label text-primary">ZATREIDES</span>
        <span className="meta-label text-muted-foreground/40">
          © 2026 — CREATIVE BACKEND SYSTEMS
        </span>
      </footer>
    </div>
  );
};

export default Index;
