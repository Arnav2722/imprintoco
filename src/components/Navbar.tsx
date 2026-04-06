// import { Link } from "react-router-dom";
// import { ShoppingBag, User, Menu, X } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
// import { useState } from "react";

// const Navbar = () => {
//   const { totalItems, setIsCartOpen } = useCart();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const navItems = [
//     { label: "STICKERS", path: "/shop?cat=stickers" },
//     { label: "POSTERS", path: "/shop?cat=posters" },
//     { label: "COMBO PACKS", path: "/shop?cat=combo" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl">
//       <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
//         <Link to="/" className="font-display text-xl font-bold tracking-widest text-foreground">
//           Imprinto Co.
//         </Link>

//         <div className="hidden md:flex items-center gap-8">
//           {navItems.map((item) => (
//             <Link
//               key={item.label}
//               to={item.path}
//               className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         <div className="flex items-center gap-4">
//           <Link to="/about" className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150 hidden md:block">
//             ABOUT
//           </Link>
//           <Link to="/auth" className="text-foreground hover:text-primary transition-colors duration-150 hidden md:block">
//             <User size={20} />
//           </Link>
//           <button onClick={() => setIsCartOpen(true)} className="relative text-foreground hover:text-primary transition-colors duration-150">
//             <ShoppingBag size={20} />
//             {totalItems > 0 && (
//               <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
//                 {totalItems}
//               </span>
//             )}
//           </button>
//           <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
//             {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>
//       </div>

//       {mobileOpen && (
//         <div className="md:hidden bg-surface-container px-6 py-4 flex flex-col gap-3">
//           {navItems.map((item) => (
//             <Link
//               key={item.label}
//               to={item.path}
//               onClick={() => setMobileOpen(false)}
//               className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150"
//             >
//               {item.label}
//             </Link>
//           ))}
//           <Link to="/about" onClick={() => setMobileOpen(false)} className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150">
//             ABOUT
//           </Link>
//           <Link to="/auth" onClick={() => setMobileOpen(false)} className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150">
//             LOGIN / SIGN UP
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "HOME", path: "/" },
    { label: "SHOP", path: "/shop" },
    { label: "CUSTOM PRINTS", path: "/custom-prints" },
    { label: "EXPLORE", path: "/explore" },
    { label: "ABOUT", path: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/5 h-16"
          : "bg-transparent h-20"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="relative z-[120] flex items-center group">
          <img
            src="/logo2.png"
            alt="Imprinto Logo"
            className={`transition-all duration-500 object-contain ${
              scrolled ? "h-8" : "h-9 md:h-12"
            }`}
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="relative font-display text-[13px] font-bold tracking-[0.15em] text-white/70 hover:text-white transition-all py-2 group italic uppercase"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#primary]" />
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            to="/auth"
            className="hidden md:flex items-center gap-2 text-white/70 hover:text-primary transition-colors font-display text-[11px] font-bold tracking-widest uppercase"
          >
            <User size={18} strokeWidth={2.5} />
            <span className="hidden xl:block">Account</span>
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="group relative flex items-center p-2 text-white hover:text-primary transition-all z-[120]"
          >
            <ShoppingBag size={22} strokeWidth={2.5} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-black text-[10px] font-black flex items-center justify-center rounded-full ring-2 ring-black">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 z-[120] hover:bg-white/5 rounded-full transition-colors"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - iPhone 8 Critical Fix */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-black z-[110] flex flex-col justify-start px-8 pt-24 lg:hidden"
          >
            {/* Nav Items Container */}
            <div className="flex flex-col gap-4">
              {navItems.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.label}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-[28px] font-black italic tracking-tighter text-white hover:text-primary transition-all uppercase leading-none"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-4 pt-6 border-t border-white/10">
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-base font-bold italic text-primary uppercase tracking-widest"
                >
                  Login / Join Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
