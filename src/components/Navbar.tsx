// import { Link, useNavigate } from "react-router-dom";
// import {
//   ShoppingBag,
//   User,
//   Menu,
//   X,
//   ChevronDown,
//   Search,
//   ArrowRight,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { auth, db } from "@/lib/firebase";
// import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

// const Navbar = () => {
//   const { totalItems, setIsCartOpen } = useCart();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [user, setUser] = useState<FirebaseUser | null>(null);
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

//   const navRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (navRef.current && !navRef.current.contains(event.target as Node)) {
//         setActiveDropdown(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       unsubscribe();
//     };
//   }, []);

//   const handleAccountClick = async () => {
//     if (user) {
//       try {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         if (userDoc.exists() && userDoc.data().role === "admin")
//           navigate("/admin");
//         else navigate("/profile");
//       } catch {
//         navigate("/profile");
//       }
//     } else navigate("/auth");
//     setMobileOpen(false);
//   };

//   const megaMenus = {
//     shop: [
//       {
//         title: "All Posters",
//         links: ["New Arrivals", "Best Selling", "Devotional", "Motivational"],
//       },
//       {
//         title: "Cars & Bikes",
//         links: ["Bikes", "Concept Cars", "Solid Cars", "Vector Cars"],
//       },
//       { title: "Sports", links: ["Football", "Cricket", "UFC", "F1"] },
//       {
//         title: "Pop Culture",
//         links: ["Marvel", "DC", "Movies", "TV Series", "Music", "Games"],
//       },
//     ],
//     multi: [
//       {
//         title: "Collage Kit",
//         links: ["50-Piece Collage Kit", "30-Piece Combo Set"],
//       },
//       {
//         title: "Split by Pieces",
//         links: [
//           "2-Piece Split Posters",
//           "3-Piece Split Posters",
//           "5-Panel Split Posters",
//         ],
//       },
//       {
//         title: "Explore ALL",
//         links: [
//           "Marvel",
//           "DC",
//           "Movies",
//           "Car Split Posters",
//           "Bike Split Posters",
//         ],
//       },
//     ],
//     retro: [
//       {
//         title: "Retro Photo Prints",
//         links: [
//           "Aesthetic Retro Photo Prints",
//           "Custom Retro Photo Prints",
//           "Photobooth Strip",
//         ],
//       },
//     ],
//     custom: [
//       {
//         title: "Custom Posters",
//         links: [
//           "Custom Posters",
//           "Customize 3 Piece Split",
//           "Customize Multi Poster",
//         ],
//       },
//     ],
//     help: [
//       {
//         title: "Help Center",
//         links: ["About Us", "Contact Us", "Terms and Conditions", "FAQs"],
//       },
//     ],
//   };

//   const navLinks = [
//     { label: "Shop Posters", id: "shop", path: "/shop" },
//     { label: "Multi Posters", id: "multi", path: "/multi-collections" },
//     { label: "Retro Prints", id: "retro", path: "/retro-studio" },
//     { label: "Custom Posters", id: "custom", path: "/custom-studio" },
//     { label: "Stickers", id: "stickers", path: "/stickers" },
//     { label: "Bulk Posters", id: "bulk", path: "/bulk-posters" },
//     { label: "Reviews", id: "reviews", path: "/about" },
//     { label: "Help Center", id: "help", path: "/faqs" },
//   ];

//   return (
//     <nav
//       ref={navRef}
//       className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
//     >
//       <motion.div
//         animate={{
//           backgroundColor:
//             scrolled || activeDropdown
//               ? theme === "dark"
//                 ? "rgba(0,0,0,0.95)"
//                 : "rgba(255,255,255,0.95)"
//               : "transparent",
//           backdropFilter:
//             scrolled || activeDropdown ? "blur(20px)" : "blur(0px)",
//           borderBottom:
//             scrolled || activeDropdown
//               ? `1px solid ${theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`
//               : "none",
//         }}
//         className="absolute inset-0 pointer-events-none"
//       />

//       <div className="max-w-[1536px] mx-auto h-[75px] md:h-[95px] flex items-center justify-between px-6 md:px-10 relative z-10">
//         <div className="flex-shrink-0">
//           <Link to="/" onClick={() => setActiveDropdown(null)}>
//             <img
//               src="/logo.png"
//               alt="Imprinto"
//               className={`h-7 md:h-9 w-auto ${theme === "light" && "invert"}`}
//             />
//           </Link>
//         </div>

//         <div className="hidden lg:flex items-center gap-x-6 h-full">
//           {navLinks.map((link) => {
//             const isCurrentActive = activeDropdown === link.id;
//             return (
//               <div
//                 key={link.label}
//                 className="h-full flex items-center cursor-pointer"
//                 onClick={() => {
//                   if (["stickers", "bulk", "reviews"].includes(link.id || "")) {
//                     navigate(link.path);
//                     setActiveDropdown(null);
//                   } else {
//                     setActiveDropdown(isCurrentActive ? null : link.id);
//                   }
//                 }}
//               >
//                 <div className="flex items-center gap-1 group">
//                   <span
//                     className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
//                       isCurrentActive
//                         ? "text-primary drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
//                         : theme === "dark"
//                           ? "text-white/40 group-hover:text-white"
//                           : "text-black/40 group-hover:text-black"
//                     }`}
//                   >
//                     {link.label}
//                   </span>
//                   {["shop", "multi", "retro", "custom", "help"].includes(
//                     link.id || "",
//                   ) && (
//                     <ChevronDown
//                       size={10}
//                       className={`transition-transform duration-300 ${isCurrentActive ? "rotate-180 text-primary" : "text-gray-600"}`}
//                     />
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="flex items-center gap-x-5">
//           <button
//             onClick={toggleTheme}
//             className={`relative flex items-center justify-center h-9 w-9 rounded-full transition-colors ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-black/5"}`}
//           >
//             <AnimatePresence mode="wait">
//               {theme === "dark" ? (
//                 <motion.div
//                   key="moon"
//                   initial={{ opacity: 0, rotate: -90 }}
//                   animate={{ opacity: 1, rotate: 0 }}
//                   exit={{ opacity: 0, rotate: 90 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Moon size={18} className="text-white/60" />
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="sun"
//                   initial={{ opacity: 0, rotate: -90 }}
//                   animate={{ opacity: 1, rotate: 0 }}
//                   exit={{ opacity: 0, rotate: 90 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Sun size={18} className="text-black/60" />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </button>

//           <Search
//             size={18}
//             className={`${theme === "dark" ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"} cursor-pointer hidden sm:block transition-colors`}
//           />
//           <button onClick={handleAccountClick} className="hidden sm:block">
//             <User
//               size={18}
//               className={`${theme === "dark" ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"} transition-colors`}
//             />
//           </button>

//           <button
//             onClick={() => setIsCartOpen(true)}
//             className="relative group"
//           >
//             <ShoppingBag
//               size={20}
//               className={`${theme === "dark" ? "text-white" : "text-black"} group-hover:text-primary transition-colors`}
//             />
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-black text-[9px] font-black flex items-center justify-center rounded-full">
//                 {totalItems}
//               </span>
//             )}
//           </button>
//           <Menu
//             className={`lg:hidden cursor-pointer ${theme === "dark" ? "text-white" : "text-black"}`}
//             onClick={() => setMobileOpen(true)}
//           />
//         </div>
//       </div>

//       <AnimatePresence>
//         {activeDropdown &&
//           megaMenus[activeDropdown as keyof typeof megaMenus] && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className={`absolute top-full left-0 w-full py-12 px-8 border-t ${theme === "dark" ? "bg-[#050505] text-white border-white/5" : "bg-white text-black border-black/5"}`}
//             >
//               <div className="max-w-[1400px] mx-auto">
//                 <div
//                   className={`grid gap-10 ${activeDropdown === "multi" ? "grid-cols-3" : activeDropdown === "shop" ? "grid-cols-4" : "grid-cols-1"}`}
//                 >
//                   {megaMenus[activeDropdown as keyof typeof megaMenus].map(
//                     (section) => (
//                       <div key={section.title} className="space-y-6">
//                         <h4
//                           className={`text-[10px] font-black uppercase tracking-widest pb-3 border-b ${theme === "dark" ? "text-white/20 border-white/5" : "text-black/20 border-black/5"}`}
//                         >
//                           {section.title}
//                         </h4>
//                         <ul className="space-y-3">
//                           {section.links.map((link) => (
//                             <li key={link}>
//                               <Link
//                                 to="/shop"
//                                 className={`text-[12px] font-bold transition-all hover:translate-x-1 block ${theme === "dark" ? "text-white/60 hover:text-primary" : "text-black/60 hover:text-primary"}`}
//                                 onClick={() => setActiveDropdown(null)}
//                               >
//                                 {link}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ),
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleAccountClick = async () => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin")
          navigate("/admin");
        else navigate("/profile");
      } catch {
        navigate("/profile");
      }
    } else navigate("/auth");
    setMobileOpen(false);
  };

  const megaMenus = {
    shop: [
      {
        title: "All Posters",
        links: ["New Arrivals", "Best Selling", "Devotional", "Motivational"],
      },
      {
        title: "Cars & Bikes",
        links: ["Bikes", "Concept Cars", "Solid Cars", "Vector Cars"],
      },
      { title: "Sports", links: ["Football", "Cricket", "UFC", "F1"] },
      {
        title: "Pop Culture",
        links: ["Marvel", "DC", "Movies", "TV Series", "Music", "Games"],
      },
    ],
    multi: [
      {
        title: "Collage Kit",
        links: ["50-Piece Collage Kit", "30-Piece Combo Set"],
      },
      {
        title: "Split by Pieces",
        links: [
          "2-Piece Split Posters",
          "3-Piece Split Posters",
          "5-Panel Split Posters",
        ],
      },
      {
        title: "Explore ALL",
        links: [
          "Marvel",
          "DC",
          "Movies",
          "Car Split Posters",
          "Bike Split Posters",
        ],
      },
    ],
    retro: [
      {
        title: "Retro Photo Prints",
        links: [
          "Aesthetic Retro Photo Prints",
          "Custom Retro Photo Prints",
          "Photobooth Strip",
        ],
      },
    ],
    custom: [
      {
        title: "Custom Posters",
        links: [
          "Custom Posters",
          "Customize 3 Piece Split",
          "Customize Multi Poster",
        ],
      },
    ],
    help: [
      {
        title: "Help Center",
        links: ["About Us", "Contact Us", "Terms and Conditions", "FAQs"],
      },
    ],
  };

  const navLinks = [
    { label: "Shop Posters", id: "shop", path: "/shop" },
    { label: "Multi Posters", id: "multi", path: "/multi-collections" },
    { label: "Retro Prints", id: "retro", path: "/retro-studio" },
    { label: "Custom Posters", id: "custom", path: "/custom-studio" },
    { label: "Stickers", id: "stickers", path: "/stickers" },
    { label: "Bulk Posters", id: "bulk", path: "/bulk-posters" },
    { label: "Reviews", id: "reviews", path: "/about" },
    { label: "Help Center", id: "help", path: "/faqs" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
    >
      <motion.div
        animate={{
          backgroundColor:
            scrolled || activeDropdown
              ? "rgba(255,255,255,0.9)"
              : "rgba(255,255,255,0)",
          backdropFilter:
            scrolled || activeDropdown ? "blur(20px)" : "blur(0px)",
          borderBottom:
            scrolled || activeDropdown
              ? "1px solid rgba(0,0,0,0.08)"
              : "1px solid rgba(0,0,0,0)",
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="max-w-[1536px] mx-auto h-[80px] md:h-[100px] flex items-center justify-between px-6 md:px-10 relative z-10">
        <div className="flex-shrink-0">
          <Link to="/" onClick={() => setActiveDropdown(null)}>
            <img
              src="/logo.png"
              alt="Imprinto"
              /* Force the logo to black */
              className="h-8 md:h-10 w-auto brightness-0"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-x-8 h-full">
          {navLinks.map((link) => {
            const isCurrentActive = activeDropdown === link.id;
            return (
              <div
                key={link.label}
                className="h-full flex items-center cursor-pointer group"
                onClick={() => {
                  if (["stickers", "bulk", "reviews"].includes(link.id || "")) {
                    navigate(link.path);
                    setActiveDropdown(null);
                  } else {
                    setActiveDropdown(isCurrentActive ? null : link.id);
                  }
                }}
              >
                <div className="flex items-center gap-1.5 transition-all">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                      isCurrentActive
                        ? "text-primary"
                        : "text-foreground/40 group-hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                  {["shop", "multi", "retro", "custom", "help"].includes(
                    link.id || "",
                  ) && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${
                        isCurrentActive
                          ? "rotate-180 text-primary"
                          : "text-foreground/20"
                      }`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-x-6">
          <Search
            size={20}
            className="text-foreground/40 hover:text-primary cursor-pointer hidden sm:block transition-colors"
          />
          <button onClick={handleAccountClick} className="hidden sm:block">
            <User
              size={20}
              className="text-foreground/40 hover:text-primary transition-colors"
            />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative group flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full transition-all hover:bg-primary hover:text-foreground"
          >
            <ShoppingBag size={18} />
            <span className="text-xs font-black uppercase tracking-widest hidden md:block">
              Cart
            </span>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-black flex items-center justify-center rounded-full shadow-lg"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          <Menu
            className="lg:hidden cursor-pointer text-foreground hover:text-primary"
            onClick={() => setMobileOpen(true)}
          />
        </div>
      </div>

      <AnimatePresence>
        {activeDropdown &&
          megaMenus[activeDropdown as keyof typeof megaMenus] && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full py-16 px-8 border-t border-black/5 bg-white shadow-2xl"
            >
              <div className="max-w-[1400px] mx-auto">
                <div
                  className={`grid gap-12 ${
                    activeDropdown === "multi"
                      ? "grid-cols-3"
                      : activeDropdown === "shop"
                        ? "grid-cols-4"
                        : "grid-cols-1"
                  }`}
                >
                  {megaMenus[activeDropdown as keyof typeof megaMenus].map(
                    (section) => (
                      <div key={section.title} className="space-y-8">
                        <div className="flex items-center gap-3 pb-4 border-b border-black/5">
                          <Sparkles size={12} className="text-primary" />
                          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground/30">
                            {section.title}
                          </h4>
                        </div>
                        <ul className="space-y-4">
                          {section.links.map((link) => (
                            <li key={link}>
                              <Link
                                to="/shop"
                                className="text-[14px] font-bold text-foreground/60 hover:text-primary transition-all hover:translate-x-2 flex items-center gap-2 group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {link}
                                <ArrowRight
                                  size={14}
                                  className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;