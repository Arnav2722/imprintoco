// import { useEffect } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { CartProvider } from "@/contexts/CartContext";
// import { AuthProvider } from "@/contexts/AuthContext";
// import CartDrawer from "@/components/CartDrawer";
// import Navbar from "@/components/Navbar";

// // Pages Imports
// import Index from "./pages/Index.tsx";
// import Shop from "./pages/Shop.tsx";
// import ProductDetail from "./pages/ProductDetail.tsx";
// import CustomPrints from "./pages/CustomPrints.tsx";
// import Explore from "./pages/Explore.tsx";
// import Auth from "./pages/Auth.tsx";
// import About from "./pages/About.tsx";
// import Admin from "./pages/Admin.tsx";
// import Checkout from "./pages/Checkout.tsx";
// import Profile from "./pages/Profile.tsx";
// import NotFound from "./pages/NotFound.tsx";
// import MultiCollections from "./pages/CollageStudio.tsx";
// import RetroStudio from "./pages/RetroStudio.tsx";
// import Stickers from "./pages/Stickers.tsx";
// import BulkPosters from "./pages/BulkPosters.tsx";
// import Contact from "./pages/Contact.tsx";
// import FAQs from "./pages/FAQs.tsx";
// import TrackOrder from "./pages/TrackOrder.tsx";
// import ReviewPage from "./pages/ReviewPage.tsx";
// import Cart from "./pages/Cart.tsx";
// import ShippingPolicy from "./pages/ShippingPolicy.tsx";
// import ReturnPolicy from "./pages/ReturnPolicy.tsx";
// import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
// import TermsConditions from "./pages/TermsConditions.tsx";

// const queryClient = new QueryClient();

// // 1. Scroll to Top on Page Change
// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// };

// // 2. Tab Title & Visibility Handler
// const GlobalTitleHandler = () => {
//   const location = useLocation();

//   useEffect(() => {
//     let baseTitle = "IMPRINTO CO. | PREMIUM PRINTS";
//     const path = location.pathname.toLowerCase();

//     if (path === "/") baseTitle = "IMPRINTO CO. | CULTURE";
//     else if (path === "/shop") baseTitle = "SHOP | THE ARCHIVE";
//     else if (path === "/cart") baseTitle = "YOUR CART | IMPRINTO";
//     else if (path === "/explore") baseTitle = "EXPLORE THE CORE";
//     else if (path === "/contact") baseTitle = "GET IN TOUCH | CONTACT";
//     else if (path === "/multi-collections") baseTitle = "MULTI-SPEC SETS";
//     else if (path === "/retro-studio") baseTitle = "RETRO HUB | STUDIO";
//     else if (path === "/custom-studio") baseTitle = "CUSTOM CONFIG | STUDIO";
//     else if (path === "/stickers") baseTitle = "VINYL STICKERS";
//     else if (path === "/faqs") baseTitle = "HELP CENTER | FAQS";
//     else if (path === "/reviews") baseTitle = "COMMUNITY FEEDBACK";
//     else if (path.includes("/product/"))
//       baseTitle = "PRODUCT DETAIL | IMPRINTO";
//     else if (path === "/admin") baseTitle = "COMMAND CENTER | ADMIN";
//     else if (path === "/shipping-policy") baseTitle = "SHIPPING POLICY";
//     else if (path === "/return-policy") baseTitle = "RETURN POLICY";
//     else if (path === "/privacy-policy") baseTitle = "PRIVACY POLICY";
//     else if (path === "/terms-conditions") baseTitle = "TERMS & CONDITIONS";

//     let tabMessage = "IMPRINTO CO. 👀";
//     if (path === "/checkout") tabMessage = "ORDER ALMOST READY 🖼️";
//     else if (path === "/cart") tabMessage = "DON'T LEAVE YOUR CART! 🛒";
//     else if (path === "/shop") tabMessage = "PRINTS ARE WAITING... 👀";
//     else if (path.includes("/product/"))
//       tabMessage = "PERFECT FOR YOUR WALL ❤️";

//     const handleVisibilityChange = () => {
//       document.title = document.hidden ? tabMessage : baseTitle;
//     };

//     document.title = baseTitle;
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () =>
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, [location]);

//   return null;
// };

// const LayoutHandler = () => {
//   const location = useLocation();
//   const isAdminPage = location.pathname.startsWith("/admin");

//   return (
//     <>
//       <ScrollToTop />
//       <GlobalTitleHandler />
//       {!isAdminPage && <Navbar />}
//       <CartDrawer />
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/explore" element={<Explore />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//         <Route path="/custom-prints" element={<CustomPrints />} />
//         <Route path="/custom-studio" element={<CustomPrints />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/retro-studio" element={<RetroStudio />} />
//         <Route path="/retro" element={<RetroStudio />} />
//         <Route path="/multi-collections" element={<MultiCollections />} />
//         <Route path="/stickers" element={<Stickers />} />
//         <Route path="/login" element={<Auth />} />
//         <Route path="/register" element={<Auth />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/track-order" element={<TrackOrder />} />
//         <Route path="/bulk-posters" element={<BulkPosters />} />
//         <Route path="/faqs" element={<FAQs />} />
//         <Route path="/reviews" element={<ReviewPage />} />
//         <Route path="/admin/*" element={<Admin />} />
//         <Route path="/shipping-policy" element={<ShippingPolicy />} />
//         <Route path="/return-policy" element={<ReturnPolicy />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/terms-conditions" element={<TermsConditions />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <AuthProvider>
//         <CartProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <LayoutHandler />
//           </BrowserRouter>
//         </CartProvider>
//       </AuthProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

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

// Pages Imports
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
import Cart from "./pages/Cart.tsx";
import ShippingPolicy from "./pages/ShippingPolicy.tsx";
import ReturnPolicy from "./pages/ReturnPolicy.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";

const queryClient = new QueryClient();

// Offer Banner Component
const OfferBanner = () => (
  <div className="bg-primary text-black text-center py-2 text-[10px] font-black uppercase tracking-widest sticky top-0 z-40">
    🔥 Limited Offer: Buy 3 Get 2 Free On All Posters!
  </div>
);

// 1. Scroll to Top on Page Change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 2. Tab Title & Visibility Handler
const GlobalTitleHandler = () => {
  const location = useLocation();

  useEffect(() => {
    let baseTitle = "IMPRINTO CO. | PREMIUM PRINTS";
    const path = location.pathname.toLowerCase();

    if (path === "/") baseTitle = "IMPRINTO CO. | CULTURE";
    else if (path === "/shop") baseTitle = "SHOP | THE ARCHIVE";
    else if (path === "/cart") baseTitle = "YOUR CART | IMPRINTO";
    else if (path === "/explore") baseTitle = "EXPLORE THE CORE";
    else if (path === "/contact") baseTitle = "GET IN TOUCH | CONTACT";
    else if (path === "/multi-collections") baseTitle = "MULTI-SPEC SETS";
    else if (path === "/retro-studio") baseTitle = "RETRO HUB | STUDIO";
    else if (path === "/custom-studio") baseTitle = "CUSTOM CONFIG | STUDIO";
    else if (path === "/stickers") baseTitle = "VINYL STICKERS";
    else if (path === "/faqs") baseTitle = "HELP CENTER | FAQS";
    else if (path === "/reviews") baseTitle = "COMMUNITY FEEDBACK";
    else if (path.includes("/product/"))
      baseTitle = "PRODUCT DETAIL | IMPRINTO";
    else if (path === "/admin") baseTitle = "COMMAND CENTER | ADMIN";
    else if (path === "/shipping-policy") baseTitle = "SHIPPING POLICY";
    else if (path === "/return-policy") baseTitle = "RETURN POLICY";
    else if (path === "/privacy-policy") baseTitle = "PRIVACY POLICY";
    else if (path === "/terms-conditions") baseTitle = "TERMS & CONDITIONS";

    let tabMessage = "IMPRINTO CO. 👀";
    if (path === "/checkout") tabMessage = "ORDER ALMOST READY 🖼️";
    else if (path === "/cart") tabMessage = "DON'T LEAVE YOUR CART! 🛒";
    else if (path === "/shop") tabMessage = "PRINTS ARE WAITING... 👀";
    else if (path.includes("/product/"))
      tabMessage = "PERFECT FOR YOUR WALL ❤️";

    const handleVisibilityChange = () => {
      document.title = document.hidden ? tabMessage : baseTitle;
    };

    document.title = baseTitle;
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [location]);

  return null;
};

const LayoutHandler = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <GlobalTitleHandler />
      {!isAdminPage && <OfferBanner />}
      {!isAdminPage && <Navbar />}
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/custom-prints" element={<CustomPrints />} />
        <Route path="/custom-studio" element={<CustomPrints />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/retro-studio" element={<RetroStudio />} />
        <Route path="/retro" element={<RetroStudio />} />
        <Route path="/multi-collections" element={<MultiCollections />} />
        <Route path="/stickers" element={<Stickers />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/bulk-posters" element={<BulkPosters />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/admin/*" element={<Admin />} />
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