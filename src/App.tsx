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

// // Core Pages
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
// import Cart from "./pages/Cart.tsx"; // Added Cart Import

// // Legal & Policy Pages
// import ShippingPolicy from "./pages/ShippingPolicy.tsx";
// import ReturnPolicy from "./pages/ReturnPolicy.tsx";
// import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
// import TermsConditions from "./pages/TermsConditions.tsx";

// const queryClient = new QueryClient();

// const GlobalTitleHandler = () => {
//   const location = useLocation();

//   useEffect(() => {
//     let baseTitle = "IMPRINTO CO. | Premium Prints";
//     const path = location.pathname.toLowerCase();

//     // ==================== BASE TITLES (Visible when tab is active) ====================
//     if (path === "/") baseTitle = "IMPRINTO CO. | Culture & Prints";
//     else if (path === "/shop") baseTitle = "The Collection | Shop";
//     else if (path === "/cart")
//       baseTitle = "Your Haul | Cart"; // Added Cart Title
//     else if (path === "/explore") baseTitle = "Explore the Culture | IMPRINTO";
//     else if (path === "/contact") baseTitle = "Get in Touch | Contact";
//     else if (path === "/multi-collections" || path === "/collage-kits")
//       baseTitle = "Multi-Spec Sets | IMPRINTO";
//     else if (path === "/retro-studio" || path === "/retro")
//       baseTitle = "Retro Hub | Studio";
//     else if (path === "/custom-prints" || path === "/custom-studio")
//       baseTitle = "Custom Config | Studio";
//     else if (path === "/stickers") baseTitle = "Vinyl Protocol | Stickers";
//     else if (path === "/bulk-posters") baseTitle = "B2B Protocol | Bulk";
//     else if (path === "/faqs") baseTitle = "Help Center | FAQs";
//     else if (path === "/reviews") baseTitle = "Community Feedback | Reviews";
//     else if (path === "/auth" || path === "/login" || path === "/register")
//       baseTitle = "Identify Yourself | Auth";
//     else if (path === "/about") baseTitle = "Our Mission | Ethos";
//     else if (path === "/checkout") baseTitle = "Secure Checkout | IMPRINTO";
//     else if (path === "/profile") baseTitle = "Member Profile | Core";
//     else if (path === "/track-order") baseTitle = "Logistics Hub | Tracking";
//     else if (path === "/admin") baseTitle = "Command Center | Admin";
//     // Legal Pages
//     else if (path === "/shipping-policy")
//       baseTitle = "Shipping Policy | IMPRINTO";
//     else if (path === "/return-policy") baseTitle = "Return Policy | IMPRINTO";
//     else if (path === "/privacy-policy")
//       baseTitle = "Privacy Policy | IMPRINTO";
//     else if (path === "/terms-conditions")
//       baseTitle = "Terms & Conditions | IMPRINTO";
//     else if (path.includes("/product/"))
//       baseTitle = "Product Detail | IMPRINTO";

//     // ==================== TAB SWITCH MESSAGES (when user leaves the tab) ====================
//     let tabMessage = "IMPRINTO CO. 👀";

//     if (path === "/checkout") {
//       tabMessage = "Your order is almost ready 🖼️";
//     } else if (path === "/cart") {
//       tabMessage = "Don't leave your haul behind! 🛒"; // Added Cart Exit Message
//     } else if (path === "/shop") {
//       tabMessage = "Great prints waiting for you... 👀";
//     } else if (path.includes("/product/")) {
//       tabMessage = "This piece looks perfect on your wall ❤️";
//     } else if (path === "/custom-prints" || path === "/custom-studio") {
//       tabMessage = "Your custom idea is still waiting 🎨";
//     } else if (path === "/multi-collections") {
//       tabMessage = "Multi posters hit different together 🔥";
//     } else if (path === "/retro-studio" || path === "/retro") {
//       tabMessage = "Retro vibes calling you back 🕹️";
//     } else if (path === "/stickers") {
//       tabMessage = "Sticker addiction loading... 😎";
//     } else if (path === "/reviews") {
//       tabMessage = "Real stories from fellow collectors 📖";
//     } else if (path === "/faqs" || path === "/about") {
//       tabMessage = "Got questions? We've got answers 👀";
//     } else if (path === "/contact") {
//       tabMessage = "We're here whenever you're ready ✉️";
//     }

//     const handleVisibilityChange = () => {
//       document.title = document.hidden ? tabMessage : baseTitle;
//     };

//     document.title = baseTitle;
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, [location]);

//   return null;
// };

// const LayoutHandler = () => {
//   const location = useLocation();
//   const isAdminPage = location.pathname === "/admin";

//   return (
//     <>
//       <GlobalTitleHandler />
//       {!isAdminPage && <Navbar />}
//       <CartDrawer />
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/cart" element={<Cart />} /> {/* Added Cart Route */}
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
//         <Route path="/admin" element={<Admin />} />
//         {/* Legal & Policy Routes */}
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

// Pages Imports (As you have them)
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

// 1. FIX: Scroll to Top on Page Change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const GlobalTitleHandler = () => {
  const location = useLocation();

  useEffect(() => {
    let baseTitle = "IMPRINTO CO. | Premium Prints";
    const path = location.pathname.toLowerCase();

    // Tab Titles Logic
    if (path === "/") baseTitle = "IMPRINTO CO. | Culture & Prints";
    else if (path === "/shop") baseTitle = "The Collection | Shop";
    else if (path === "/cart") baseTitle = "Your Cart";
    else if (path === "/explore") baseTitle = "Explore the Culture | IMPRINTO";
    else if (path === "/contact") baseTitle = "Get in Touch | Contact";
    else if (path === "/multi-collections")
      baseTitle = "Multi-Spec Sets | IMPRINTO";
    else if (path === "/retro-studio") baseTitle = "Retro Hub | Studio";
    else if (path === "/custom-studio") baseTitle = "Custom Config | Studio";
    else if (path === "/stickers") baseTitle = "Vinyl Stickers";
    else if (path === "/faqs") baseTitle = "Help Center | FAQs";
    else if (path === "/reviews") baseTitle = "Community Feedback | Reviews";
    else if (path.includes("/product/"))
      baseTitle = "Product Detail | IMPRINTO";
    else if (path === "/admin") baseTitle = "Command Center | Admin";
    else if (path === "/shipping-policy")
      baseTitle = "Shipping Policy | IMPRINTO";
    else if (path === "/return-policy") baseTitle = "Return Policy | IMPRINTO";
    else if (path === "/privacy-policy")
      baseTitle = "Privacy Policy | IMPRINTO";
    else if (path === "/terms-conditions")
      baseTitle = "Terms & Conditions | IMPRINTO";

    // Tab Switch Messages
    let tabMessage = "IMPRINTO CO. 👀";
    if (path === "/checkout") tabMessage = "Your order is almost ready 🖼️";
    else if (path === "/cart") tabMessage = "Don't leave your cart behind! 🛒";
    else if (path === "/shop")
      tabMessage = "Great prints waiting for you... 👀";
    else if (path.includes("/product/"))
      tabMessage = "This piece looks perfect on your wall ❤️";

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
  const isAdminPage = location.pathname.startsWith("/admin"); // Catch all admin sub-routes

  return (
    <>
      <ScrollToTop />
      <GlobalTitleHandler />
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
        <Route path="/admin/*" element={<Admin />} />{" "}
        {/* Admin sub-routing support */}
        {/* Policy Routes (Matched with Footer Links) */}
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
