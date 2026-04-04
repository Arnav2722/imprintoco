import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import TrendingSection from "@/components/TrendingSection";
import PromoSection from "@/components/PromoSection";
import ArchivesSection from "@/components/ArchivesSection";
import LifestyleSection from "@/components/LifestyleSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ShippingCTA from "@/components/ShippingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Marquee />
      <TrendingSection />
      <PromoSection />
      <ArchivesSection />
      <LifestyleSection />
      <TestimonialsSection />
      <ShippingCTA />
      <Footer />
    </div>
  );
};

export default Index;
