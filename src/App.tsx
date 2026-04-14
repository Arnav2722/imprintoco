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

// // Existing Pages
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

// // ✅ New Pages Import
// import MultiCollections from "./pages/MultiCollections.tsx";
// import RetroStudio from "./pages/RetroStudio.tsx";
// import Stickers from "./pages/Stickers.tsx";
// import BulkPosters from "./pages/BulkPosters.tsx";
// import FAQs from "./pages/FAQs.tsx";

// const queryClient = new QueryClient();

// const GlobalTitleHandler = () => {
//   const location = useLocation();

//   useEffect(() => {
//     let originalTitle = "IMPRINTO CO. | Premium Posters";
//     const path = location.pathname;

//     // ✅ Dynamic Titles for New Pages
//     if (path === "/") originalTitle = "IMPRINTO CO. | Home";
//     else if (path === "/shop") originalTitle = "Shop Collection | IMPRINTO.";
//     else if (path === "/multi-collections")
//       originalTitle = "Epic Splits | IMPRINTO.";
//     else if (path === "/retro-studio")
//       originalTitle = "Retro Prints | IMPRINTO.";
//     else if (path === "/custom-studio")
//       originalTitle = "Custom Masterpiece | IMPRINTO.";
//     else if (path === "/stickers") originalTitle = "Vinyl Slaps | IMPRINTO.";
//     else if (path === "/bulk-posters")
//       originalTitle = "Wholesale supply | IMPRINTO.";
//     else if (path === "/faqs") originalTitle = "Help Center | IMPRINTO.";
//     else if (path === "/auth") originalTitle = "Join the Obsession | IMPRINTO.";
//     else if (path === "/about") originalTitle = "Our Story | IMPRINTO.";
//     else if (path === "/checkout")
//       originalTitle = "Secure Checkout | IMPRINTO.";
//     else if (path === "/admin") originalTitle = "Command Center | Admin";
//     else if (path.includes("/product/")) return;

//     const handleVisibilityChange = () => {
//       document.title = document.hidden ? "Still Thinking? 👀" : originalTitle;
//     };

//     window.addEventListener("visibilitychange", handleVisibilityChange);
//     document.title = originalTitle;

//     return () =>
//       window.removeEventListener("visibilitychange", handleVisibilityChange);
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
//         <Route path="/product/:id" element={<ProductDetail />} />
//         <Route path="/custom-prints" element={<CustomPrints />} />
//         <Route path="/custom-studio" element={<CustomPrints />} />{" "}
//         {/* Alias for Navbar */}
//         <Route path="/explore" element={<Explore />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/admin" element={<Admin />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/profile" element={<Profile />} />
//         {/* ✅ New Routes Connected to Navbar */}
//         <Route path="/multi-collections" element={<MultiCollections />} />
//         <Route path="/retro-studio" element={<RetroStudio />} />
//         <Route path="/stickers" element={<Stickers />} />
//         <Route path="/bulk-posters" element={<BulkPosters />} />
//         <Route path="/faqs" element={<FAQs />} />
//         <Route path="/contact" element={<BulkPosters />} />{" "}
//         {/* Alias for contact link */}
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

// Specialized Protocols
import MultiCollections from "./pages/MultiCollections.tsx";
import RetroStudio from "./pages/RetroStudio.tsx";
import Stickers from "./pages/Stickers.tsx";
import BulkPosters from "./pages/BulkPosters.tsx";
import FAQs from "./pages/FAQs.tsx";
import TrackOrder from "./pages/TrackOrder.tsx";

const queryClient = new QueryClient();

const GlobalTitleHandler = () => {
  const location = useLocation();

  useEffect(() => {
    let originalTitle = "IMPRINTO CO. | The Core";
    const path = location.pathname;

    if (path === "/") originalTitle = "IMPRINTO CO. | Culture & Prints";
    else if (path === "/shop") originalTitle = "The Collection | Shop";
    else if (path === "/multi-collections")
      originalTitle = "Multi-Spec Sets | IMPRINTO.";
    else if (path === "/retro-studio" || path === "/retro")
      originalTitle = "Retro Hub | Studio";
    else if (path === "/custom-studio" || path === "/custom-prints")
      originalTitle = "Custom Config | Studio";
    else if (path === "/stickers") originalTitle = "Vinyl Protocol | Stickers";
    else if (path === "/bulk-posters" || path === "/contact")
      originalTitle = "B2B Protocol | Bulk";
    else if (path === "/faqs") originalTitle = "Help Center | Log";
    else if (path === "/auth") originalTitle = "Identify Yourself | Auth";
    else if (path === "/about") originalTitle = "Our Mission | Ethos";
    else if (path === "/checkout") originalTitle = "Procurement | Secure";
    else if (path === "/admin") originalTitle = "Command Center | Admin";
    else if (path === "/profile") originalTitle = "Member Profile | Core";
    else if (path === "/track-order")
      originalTitle = "Logistics Hub | Tracking";
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
      {/* Navbar is hidden on Admin for a clean Command Center feel */}
      {!isAdminPage && <Navbar />}
      <CartDrawer />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Studio Routes */}
        <Route path="/custom-prints" element={<CustomPrints />} />
        <Route path="/custom-studio" element={<CustomPrints />} />
        <Route path="/retro-studio" element={<RetroStudio />} />
        <Route path="/retro" element={<RetroStudio />} />

        {/* Specialized Collections */}
        <Route path="/multi-collections" element={<MultiCollections />} />
        <Route path="/stickers" element={<Stickers />} />

        {/* Core & Auth */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Logistics & Support */}
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/bulk-posters" element={<BulkPosters />} />
        <Route path="/contact" element={<BulkPosters />} />
        <Route path="/faqs" element={<FAQs />} />

        {/* System Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Error Handling */}
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