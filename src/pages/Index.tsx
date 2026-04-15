import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import CollectionsSection from "@/components/CollectionsSection";
import TrendingRow from "@/components/TrendingRow";
import PromoSection from "@/components/PromoSection";
// import ArchivesSection from "@/components/ArchivesSection";
import LifestyleSection from "@/components/WhyChooseUse";
import TestimonialsSection from "@/components/TestimonialsSection";
import ShippingCTA from "@/components/ShippingCTA";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const originalTitle = "IMPRINTO CO. | Premium Posters & Stickers";
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Still Thinking? 👀" : originalTitle;
    };
    window.addEventListener("visibilitychange", handleVisibilityChange);
    document.title = originalTitle;
    return () =>
      window.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    /* ✅ Changed hardcoded bg to dynamic theme classes */
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white font-bricolage transition-colors duration-500">
      <Navbar />
      <HeroSection />
      <Marquee />
      <CollectionsSection />
      <TrendingRow />
      <PromoSection />
      {/* <ArchivesSection /> */}
      <LifestyleSection />
      <TestimonialsSection />
      <ShippingCTA />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;