// import { useEffect } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { CartProvider } from "@/contexts/CartContext";
// import CartDrawer from "@/components/CartDrawer";
// import Navbar from "@/components/Navbar";
// import Index from "./pages/Index.tsx";
// import Shop from "./pages/Shop.tsx";
// import ProductDetail from "./pages/ProductDetail.tsx";
// import CustomPrints from "./pages/CustomPrints.tsx"; // ✅ Import already there
// import Auth from "./pages/Auth.tsx";
// import About from "./pages/About.tsx";
// import Admin from "./pages/Admin.tsx";
// import Checkout from "./pages/Checkout.tsx";
// import Profile from "./pages/Profile.tsx";
// import NotFound from "./pages/NotFound.tsx";

// const queryClient = new QueryClient();

// // ✅ Global Logic for Tab Title Switching
// const GlobalTitleHandler = () => {
//   const location = useLocation();

//   useEffect(() => {
//     // Default titles based on routes
//     let originalTitle = "IMPRINTO CO. | Premium Posters";

//     const path = location.pathname;
//     if (path === "/") originalTitle = "IMPRINTO CO. | Home";
//     else if (path === "/shop") originalTitle = "Shop Collection | IMPRINTO.";
//     else if (path === "/custom-prints") originalTitle = "Custom Masterpiece | IMPRINTO."; // ✅ Added Title
//     else if (path === "/auth") originalTitle = "Join the Obsession | IMPRINTO.";
//     else if (path === "/about") originalTitle = "Our Story | IMPRINTO.";
//     else if (path === "/checkout") originalTitle = "Secure Checkout | IMPRINTO.";
//     else if (path.includes("/product/")) return;

//     const handleVisibilityChange = () => {
//       document.title = document.hidden ? "Still Thinking? 👀" : originalTitle;
//     };

//     window.addEventListener("visibilitychange", handleVisibilityChange);
//     document.title = originalTitle;

//     return () => {
//       window.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, [location]);

//   return null;
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <CartProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           {/* ✅ Title handler inside BrowserRouter to access location */}
//           <GlobalTitleHandler />

//           <Navbar />
//           <CartDrawer />

//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/shop" element={<Shop />} />
//             <Route path="/product/:id" element={<ProductDetail />} />
//             <Route path="/custom-prints" element={<CustomPrints />} /> {/* ✅ Route Registered */}
//             <Route path="/auth" element={<Auth />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/admin" element={<Admin />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
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
import CartDrawer from "@/components/CartDrawer";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index.tsx";
import Shop from "./pages/Shop.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import CustomPrints from "./pages/CustomPrints.tsx";
import Auth from "./pages/Auth.tsx";
import About from "./pages/About.tsx";
import Admin from "./pages/Admin.tsx";
import Checkout from "./pages/Checkout.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const GlobalTitleHandler = () => {
  const location = useLocation();

  useEffect(() => {
    let originalTitle = "IMPRINTO CO. | Premium Posters";
    const path = location.pathname;

    if (path === "/") originalTitle = "IMPRINTO CO. | Home";
    else if (path === "/shop") originalTitle = "Shop Collection | IMPRINTO.";
    else if (path === "/custom-prints")
      originalTitle = "Custom Masterpiece | IMPRINTO.";
    else if (path === "/auth") originalTitle = "Join the Obsession | IMPRINTO.";
    else if (path === "/about") originalTitle = "Our Story | IMPRINTO.";
    else if (path === "/checkout")
      originalTitle = "Secure Checkout | IMPRINTO.";
    else if (path === "/admin") originalTitle = "Command Center | Admin";
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

// ✅ Component to conditionally render Navbar
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
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/custom-prints" element={<CustomPrints />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LayoutHandler />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;