import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import CollectionsSection from "@/components/CollectionsSection"; // ✅ Naya Bento Grid
import TrendingRow from "@/components/TrendingRow"; // ✅ Naya Slider Section
import PromoSection from "@/components/PromoSection";
import ArchivesSection from "@/components/ArchivesSection";
import LifestyleSection from "@/components/LifestyleSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ShippingCTA from "@/components/ShippingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Navbar yahan se hata bhi sakte ho agar App.tsx mein common rakhi hai */}
      <Navbar />

      {/* 1. Impactful Entry */}
      <HeroSection />

      {/* 2. Brand Trust/Keywords */}
      <Marquee />

      {/* 3. Browse by Vibe (Posterized Style) */}
      <CollectionsSection />

      {/* 4. Direct Sales Hook */}
      <TrendingRow />

      {/* 5. Special Deals/Highlights */}
      <PromoSection />

      {/* 6. Deep Catalog */}
      <ArchivesSection />

      {/* 7. Real World Use-case */}
      <LifestyleSection />

      {/* 8. Social Proof */}
      <TestimonialsSection />

      {/* 9. Final Push */}
      <ShippingCTA />

      {/* 10. Info & Links */}
      <Footer />
    </div>
  );
};

export default Index;
