import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import Navbar from "@/components/Navbar";

// Core Pages
import Index from "./pages/Index.tsx";
import Shop from "./pages/Shop.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import CustomPrints from "./pages/CustomPrints.tsx";
import Explore from "./pages/Explore.tsx";
import Auth from "./pages/Auth.tsx";
import About from "./pages/About.tsx";
import Admin from "./pages/Admin.tsx";
import Checkout from "./pages/Checkout.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";
import MultiCollections from "./pages/CollageStudio.tsx";
import RetroStudio from "./pages/RetroStudio.tsx";
import Stickers from "./pages/Stickers.tsx";
import BulkPosters from "./pages/BulkPosters.tsx";
import Contact from "./pages/Contact.tsx";
import FAQs from "./pages/FAQs.tsx";
import TrackOrder from "./pages/TrackOrder.tsx";
import ReviewPage from "./pages/ReviewPage.tsx";

// Legal & Policy Pages
import ShippingPolicy from "./pages/ShippingPolicy.tsx";
import ReturnPolicy from "./pages/ReturnPolicy.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";

const queryClient = new QueryClient();

const GlobalTitleHandler = () => {
  const location = useLocation();

  useEffect(() => {
    let originalTitle = "IMPRINTO CO. | The Core";
    const path = location.pathname;

    if (path === "/") originalTitle = "IMPRINTO CO. | Culture & Prints";
    else if (path === "/shop") originalTitle = "The Collection | Shop";
    else if (path === "/explore")
      originalTitle = "Explore the Culture | IMPRINTO Co.";
    else if (path === "/contact") originalTitle = "Get in Touch | Contact";
    else if (path === "/collage-kits")
      originalTitle = "Collage Kits | IMPRINTO Co.";
    else if (path === "/retro-studio" || path === "/retro")
      originalTitle = "Retro Hub | Studio";
    else if (path === "/custom-studio" || path === "/custom-prints")
      originalTitle = "Custom Config | Studio";
    else if (path === "/stickers") originalTitle = "Vinyl Slicks | Stickers";
    else if (path === "/bulk-posters") originalTitle = "B2B Protocol | Bulk";
    else if (path === "/faqs") originalTitle = "Help Center | Log";
    else if (path === "/reviews") originalTitle = "Community Feedback | Log";
    else if (path === "/auth") originalTitle = "Identify Yourself | Auth";
    else if (path === "/about") originalTitle = "Our Mission | Ethos";
    else if (path === "/checkout") originalTitle = "Procurement | Secure";
    else if (path === "/admin") originalTitle = "Command Center | Admin";
    else if (path === "/profile") originalTitle = "Member Profile | Core";
    else if (path === "/track-order")
      originalTitle = "Logistics Hub | Tracking";
    // Legal Titles
    else if (path === "/shipping-policy")
      originalTitle = "Logistics Protocol | Shipping";
    else if (path === "/return-policy")
      originalTitle = "Resolution Protocol | Returns";
    else if (path === "/privacy-policy")
      originalTitle = "Data Integrity | Privacy";
    else if (path === "/terms-conditions")
      originalTitle = "Legal Framework | Terms";
    else if (path.includes("/product/")) return;

    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Still Thinking? 👀" : originalTitle;
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    document.title = originalTitle;

    return () =>
      window.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [location]);

  return null;
};

const LayoutHandler = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  return (
    <>
      <GlobalTitleHandler />
      {!isAdminPage && <Navbar />}
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/custom-prints" element={<CustomPrints />} />
        <Route path="/custom-studio" element={<CustomPrints />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/retro-studio" element={<RetroStudio />} />
        <Route path="/retro" element={<RetroStudio />} />
        <Route path="/multi-collections" element={<MultiCollections />} />
        <Route path="/stickers" element={<Stickers />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/bulk-posters" element={<BulkPosters />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/admin" element={<Admin />} />

        {/* Legal & Policy Routes */}
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LayoutHandler />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
