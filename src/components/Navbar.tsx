// import { Link, useNavigate } from "react-router-dom";
// import {
//   ShoppingBag,
//   User,
//   Menu,
//   X,
//   ChevronDown,
//   Search,
//   ArrowRight,
//   Sparkles,
//   ChevronLeft,
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
//   const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [user, setUser] = useState<FirebaseUser | null>(null);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const navRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

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

//   useEffect(() => {
//     if (!mobileOpen) setMobileSubMenu(null);
//   }, [mobileOpen]);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
//       setIsSearchOpen(false);
//       setSearchQuery("");
//       setActiveDropdown(null);
//       setMobileOpen(false);
//     }
//   };

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
//         links: [
//           { label: "New Arrivals", path: "/shop?q=New Arrivals" },
//           { label: "Best Selling", path: "/shop?q=Best Selling" },
//           { label: "Devotional", path: "/shop?q=Devotional" },
//           { label: "Motivational", path: "/shop?q=Motivational" },
//         ],
//       },
//       {
//         title: "Cars & Bikes",
//         links: [
//           { label: "Bikes", path: "/shop?sub=bikes" },
//           { label: "Cars", path: "/shop?sub=cars" },
//         ],
//       },
//       {
//         title: "Sports",
//         links: [
//           { label: "Football", path: "/shop?q=Football" },
//           { label: "Cricket", path: "/shop?q=Cricket" },
//           { label: "UFC", path: "/shop?q=UFC" },
//           { label: "F1", path: "/shop?q=F1" },
//         ],
//       },
//       {
//         title: "Pop Culture",
//         links: [
//           { label: "Marvel", path: "/shop?q=Marvel" },
//           { label: "DC", path: "/shop?q=DC" },
//           { label: "Movies", path: "/shop?q=Movies" },
//           { label: "TV Series", path: "/shop?q=TV Series" },
//           { label: "Music", path: "/shop?q=Music" },
//           { label: "Games", path: "/shop?q=Games" },
//         ],
//       },
//     ],
//     multi: [
//       {
//         title: "Collage Kit",
//         links: [
//           { label: "50-Piece Collage Kit", path: "/multi-collections" },
//           { label: "30-Piece Combo Set", path: "/multi-collections" },
//         ],
//       },
//       {
//         title: "Split by Pieces",
//         links: [
//           { label: "2-Piece Split Posters", path: "/multi-collections" },
//           { label: "3-Piece Split Posters", path: "/multi-collections" },
//           { label: "5-Panel Split Posters", path: "/multi-collections" },
//         ],
//       },
//       {
//         title: "Explore ALL",
//         links: [
//           { label: "Marvel", path: "/shop?q=Marvel" },
//           { label: "DC", path: "/shop?q=DC" },
//           { label: "Movies", path: "/shop?q=Movies" },
//           { label: "Car Split Posters", path: "/multi-collections" },
//           { label: "Bike Split Posters", path: "/multi-collections" },
//         ],
//       },
//     ],
//     retro: [
//       {
//         title: "Retro Photo Prints",
//         links: [
//           { label: "Aesthetic Retro Photo Prints", path: "/retro-studio" },
//           { label: "Custom Retro Photo Prints", path: "/retro-studio" },
//           { label: "Photobooth Strip", path: "/retro-studio" },
//         ],
//       },
//     ],
//     custom: [
//       {
//         title: "Custom Posters",
//         links: [
//           { label: "Custom Posters", path: "/custom-studio" },
//           { label: "Customize 3 Piece Split", path: "/custom-studio" },
//           { label: "Customize Multi Poster", path: "/custom-studio" },
//         ],
//       },
//     ],
//     help: [
//       {
//         title: "Help Center",
//         links: [
//           { label: "About Us", path: "/about" },
//           { label: "Contact Us", path: "/contact" },
//           { label: "Track Order", path: "/track-order" },
//           { label: "FAQs", path: "/faqs" },
//         ],
//       },
//       {
//         title: "Legal & Logistics",
//         links: [
//           { label: "Shipping Policy", path: "/shipping-policy" },
//           { label: "Return & Refund", path: "/return-policy" },
//           { label: "Privacy Policy", path: "/privacy-policy" },
//           { label: "Terms & Conditions", path: "/terms-conditions" },
//         ],
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
//     { label: "Reviews", id: "reviews", path: "/reviews" },
//     { label: "Help & Legal", id: "help", path: "/faqs" },
//   ];

//   return (
//     <nav
//       ref={navRef}
//       className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
//     >
//       <motion.div
//         animate={{
//           backgroundColor:
//             scrolled || activeDropdown || isSearchOpen
//               ? "rgba(255,255,255,0.9)"
//               : "rgba(255,255,255,0)",
//           backdropFilter:
//             scrolled || activeDropdown || isSearchOpen
//               ? "blur(20px)"
//               : "blur(0px)",
//           borderBottom:
//             scrolled || activeDropdown || isSearchOpen
//               ? "1px solid rgba(0,0,0,0.08)"
//               : "1px solid rgba(0,0,0,0)",
//         }}
//         className="absolute inset-0 pointer-events-none"
//       />

//       <div className="max-w-[1536px] mx-auto h-[80px] md:h-[100px] flex items-center justify-between px-6 md:px-10 relative z-10">
//         <div className="flex-shrink-0">
//           <Link to="/" onClick={() => setActiveDropdown(null)}>
//             <img
//               src="/logo.png"
//               alt="Imprinto"
//               className="h-8 md:h-10 w-auto brightness-0"
//             />
//           </Link>
//         </div>

//         <div className="hidden lg:flex items-center gap-x-8 h-full">
//           {navLinks.map((link) => {
//             const isCurrentActive = activeDropdown === link.id;
//             return (
//               <div
//                 key={link.label}
//                 className="h-full flex items-center cursor-pointer group"
//                 onClick={() => {
//                   if (["stickers", "bulk", "reviews"].includes(link.id || "")) {
//                     navigate(link.path);
//                     setActiveDropdown(null);
//                   } else {
//                     setActiveDropdown(isCurrentActive ? null : link.id);
//                   }
//                 }}
//               >
//                 <div className="flex items-center gap-1.5 transition-all">
//                   <span
//                     className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
//                       isCurrentActive
//                         ? "text-primary"
//                         : "text-foreground/40 group-hover:text-foreground"
//                     }`}
//                   >
//                     {link.label}
//                   </span>
//                   {["shop", "multi", "retro", "custom", "help"].includes(
//                     link.id || "",
//                   ) && (
//                     <ChevronDown
//                       size={12}
//                       className={`transition-transform duration-300 ${
//                         isCurrentActive
//                           ? "rotate-180 text-primary"
//                           : "text-foreground/20"
//                       }`}
//                     />
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="flex items-center gap-x-6">
//           <Search
//             size={20}
//             onClick={() => setIsSearchOpen(true)}
//             className="text-foreground/40 hover:text-primary cursor-pointer hidden sm:block transition-colors"
//           />
//           <button onClick={handleAccountClick} className="hidden sm:block">
//             <User
//               size={20}
//               className="text-foreground/40 hover:text-primary transition-colors"
//             />
//           </button>

//           <button
//             onClick={() => setIsCartOpen(true)}
//             className="relative group flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full transition-all hover:bg-primary hover:text-foreground"
//           >
//             <ShoppingBag size={18} />
//             <span className="text-xs font-black uppercase tracking-widest hidden md:block">
//               Cart
//             </span>
//             {totalItems > 0 && (
//               <motion.span
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-black flex items-center justify-center rounded-full shadow-lg"
//               >
//                 {totalItems}
//               </motion.span>
//             )}
//           </button>

//           <Menu
//             className="lg:hidden cursor-pointer text-foreground hover:text-primary"
//             onClick={() => setMobileOpen(true)}
//           />
//         </div>
//       </div>

//       <AnimatePresence>
//         {activeDropdown &&
//           megaMenus[activeDropdown as keyof typeof megaMenus] && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="absolute top-full left-0 w-full py-16 px-8 border-t border-black/5 bg-white shadow-2xl hidden lg:block"
//             >
//               <div className="max-w-[1400px] mx-auto">
//                 <div
//                   className={`grid gap-12 ${
//                     activeDropdown === "multi"
//                       ? "grid-cols-3"
//                       : activeDropdown === "shop"
//                         ? "grid-cols-4"
//                         : activeDropdown === "help"
//                           ? "grid-cols-2"
//                           : "grid-cols-1"
//                   }`}
//                 >
//                   {megaMenus[activeDropdown as keyof typeof megaMenus].map(
//                     (section) => (
//                       <div key={section.title} className="space-y-8">
//                         <div className="flex items-center gap-3 pb-4 border-b border-black/5">
//                           <Sparkles size={12} className="text-primary" />
//                           <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground/30">
//                             {section.title}
//                           </h4>
//                         </div>
//                         <ul className="space-y-4">
//                           {section.links.map((linkObj) => (
//                             <li key={linkObj.label}>
//                               <Link
//                                 to={linkObj.path}
//                                 className="text-[14px] font-bold text-foreground/60 hover:text-primary transition-all hover:translate-x-2 flex items-center gap-2 group"
//                                 onClick={() => setActiveDropdown(null)}
//                               >
//                                 {linkObj.label}
//                                 <ArrowRight
//                                   size={14}
//                                   className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
//                                 />
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

//       <AnimatePresence>
//         {isSearchOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[2000] bg-white/95 backdrop-blur-xl flex items-center justify-center p-6"
//           >
//             <button
//               onClick={() => setIsSearchOpen(false)}
//               className="absolute top-10 right-10 p-2 hover:scale-110 transition-transform"
//             >
//               <X size={32} />
//             </button>

//             <form
//               onSubmit={handleSearch}
//               className="w-full max-w-3xl text-center"
//             >
//               <input
//                 autoFocus
//                 type="text"
//                 placeholder="SEARCH THE Collection..."
//                 className="w-full bg-transparent border-b-4 border-foreground py-4 text-3xl md:text-6xl font-black uppercase tracking-tighter outline-none text-center"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
//                 Press Enter to Locate Art
//               </p>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="fixed inset-0 z-[3000] bg-white flex flex-col p-8 lg:hidden"
//           >
//             <div className="flex justify-between items-center mb-10">
//               {mobileSubMenu ? (
//                 <button
//                   onClick={() => setMobileSubMenu(null)}
//                   className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary"
//                 >
//                   <ChevronLeft size={16} /> Back
//                 </button>
//               ) : (
//                 <img src="/logo.png" alt="Logo" className="h-8 brightness-0" />
//               )}
//               <button onClick={() => setMobileOpen(false)} className="p-2">
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="flex flex-col h-full overflow-y-auto pb-10">
//               {!mobileSubMenu ? (
//                 <div className="flex flex-col gap-y-4">
//                   <div className="relative mb-6">
//                     <form onSubmit={handleSearch}>
//                       <input
//                         type="text"
//                         placeholder="SEARCH..."
//                         className="w-full border-b border-black/10 py-3 outline-none font-black uppercase tracking-widest"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                       />
//                     </form>
//                   </div>

//                   {navLinks.map((link) => (
//                     <div
//                       key={link.label}
//                       className="border-b border-black/5 pb-4"
//                     >
//                       <button
//                         onClick={() => {
//                           if (megaMenus[link.id as keyof typeof megaMenus]) {
//                             setMobileSubMenu(link.id);
//                           } else {
//                             navigate(link.path);
//                             setMobileOpen(false);
//                           }
//                         }}
//                         className="w-full text-2xl font-black uppercase tracking-tighter flex justify-between items-center text-left"
//                       >
//                         {link.label}
//                         <ArrowRight size={20} className="text-foreground/20" />
//                       </button>
//                     </div>
//                   ))}

//                   <button
//                     onClick={handleAccountClick}
//                     className="mt-6 flex items-center gap-3 text-lg font-black uppercase tracking-widest"
//                   >
//                     <User size={24} />
//                     {user ? "My Account" : "Login / Register"}
//                   </button>
//                 </div>
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="flex flex-col gap-y-10"
//                 >
//                   <h2 className="text-4xl font-black uppercase tracking-tighter border-b-4 border-primary w-fit pb-1">
//                     {navLinks.find((l) => l.id === mobileSubMenu)?.label}
//                   </h2>

//                   {megaMenus[mobileSubMenu as keyof typeof megaMenus].map(
//                     (section) => (
//                       <div key={section.title} className="space-y-4">
//                         <div className="flex items-center gap-2">
//                           <Sparkles size={12} className="text-primary" />
//                           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30">
//                             {section.title}
//                           </h4>
//                         </div>
//                         <div className="flex flex-col gap-y-4 pl-4">
//                           {section.links.map((linkObj) => (
//                             <Link
//                               key={linkObj.label}
//                               to={linkObj.path}
//                               onClick={() => setMobileOpen(false)}
//                               className="text-xl font-bold uppercase tracking-tight text-foreground/70 flex items-center justify-between"
//                             >
//                               {linkObj.label}
//                               <ArrowRight size={16} className="text-primary" />
//                             </Link>
//                           ))}
//                         </div>
//                       </div>
//                     ),
//                   )}
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>
//         )}
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
  ChevronLeft,
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
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    if (!mobileOpen) setMobileSubMenu(null);
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setActiveDropdown(null);
      setMobileOpen(false);
    }
  };

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
    } else {
      // Changed from /auth to /login
      navigate("/login");
    }
    setMobileOpen(false);
  };

  const megaMenus = {
    shop: [
      {
        title: "All Posters",
        links: [
          { label: "New Arrivals", path: "/shop?q=New Arrivals" },
          { label: "Best Selling", path: "/shop?q=Best Selling" },
          { label: "Devotional", path: "/shop?q=Devotional" },
          { label: "Motivational", path: "/shop?q=Motivational" },
        ],
      },
      {
        title: "Cars & Bikes",
        links: [
          { label: "Bikes", path: "/shop?sub=bikes" },
          { label: "Cars", path: "/shop?sub=cars" },
        ],
      },
      {
        title: "Sports",
        links: [
          { label: "Football", path: "/shop?q=Football" },
          { label: "Cricket", path: "/shop?q=Cricket" },
          { label: "UFC", path: "/shop?q=UFC" },
          { label: "F1", path: "/shop?q=F1" },
        ],
      },
      {
        title: "Pop Culture",
        links: [
          { label: "Marvel", path: "/shop?q=Marvel" },
          { label: "DC", path: "/shop?q=DC" },
          { label: "Movies", path: "/shop?q=Movies" },
          { label: "TV Series", path: "/shop?q=TV Series" },
          { label: "Music", path: "/shop?q=Music" },
          { label: "Games", path: "/shop?q=Games" },
        ],
      },
    ],
    multi: [
      {
        title: "Collage Kit",
        links: [
          { label: "50-Piece Collage Kit", path: "/multi-collections" },
          { label: "30-Piece Combo Set", path: "/multi-collections" },
        ],
      },
      {
        title: "Split by Pieces",
        links: [
          { label: "2-Piece Split Posters", path: "/multi-collections" },
          { label: "3-Piece Split Posters", path: "/multi-collections" },
          { label: "5-Panel Split Posters", path: "/multi-collections" },
        ],
      },
      {
        title: "Explore ALL",
        links: [
          { label: "Marvel", path: "/shop?q=Marvel" },
          { label: "DC", path: "/shop?q=DC" },
          { label: "Movies", path: "/shop?q=Movies" },
          { label: "Car Split Posters", path: "/multi-collections" },
          { label: "Bike Split Posters", path: "/multi-collections" },
        ],
      },
    ],
    retro: [
      {
        title: "Retro Photo Prints",
        links: [
          { label: "Aesthetic Retro Photo Prints", path: "/retro-studio" },
          { label: "Custom Retro Photo Prints", path: "/retro-studio" },
          { label: "Photobooth Strip", path: "/retro-studio" },
        ],
      },
    ],
    custom: [
      {
        title: "Custom Posters",
        links: [
          { label: "Custom Posters", path: "/custom-studio" },
          { label: "Customize 3 Piece Split", path: "/custom-studio" },
          { label: "Customize Multi Poster", path: "/custom-studio" },
        ],
      },
    ],
    help: [
      {
        title: "Help Center",
        links: [
          { label: "About Us", path: "/about" },
          { label: "Contact Us", path: "/contact" },
          { label: "Track Order", path: "/track-order" },
          { label: "FAQs", path: "/faqs" },
        ],
      },
      {
        title: "Legal & Logistics",
        links: [
          { label: "Shipping Policy", path: "/shipping-policy" },
          { label: "Return & Refund", path: "/return-policy" },
          { label: "Privacy Policy", path: "/privacy-policy" },
          { label: "Terms & Conditions", path: "/terms-conditions" },
        ],
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
    { label: "Reviews", id: "reviews", path: "/reviews" },
    { label: "Help & Legal", id: "help", path: "/faqs" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
    >
      <motion.div
        animate={{
          backgroundColor:
            scrolled || activeDropdown || isSearchOpen
              ? "rgba(255,255,255,0.9)"
              : "rgba(255,255,255,0)",
          backdropFilter:
            scrolled || activeDropdown || isSearchOpen
              ? "blur(20px)"
              : "blur(0px)",
          borderBottom:
            scrolled || activeDropdown || isSearchOpen
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
            onClick={() => setIsSearchOpen(true)}
            className="text-foreground/40 hover:text-primary cursor-pointer hidden sm:block transition-colors"
          />
          <button onClick={handleAccountClick} className="hidden sm:block">
            <User
              size={20}
              className="text-foreground/40 hover:text-primary transition-colors"
            />
          </button>

          <button
            // onClick={() => setIsCartOpen(true)}
            onClick={() => navigate("/cart")}
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
              className="absolute top-full left-0 w-full py-16 px-8 border-t border-black/5 bg-white shadow-2xl hidden lg:block"
            >
              <div className="max-w-[1400px] mx-auto">
                <div
                  className={`grid gap-12 ${
                    activeDropdown === "multi"
                      ? "grid-cols-3"
                      : activeDropdown === "shop"
                        ? "grid-cols-4"
                        : activeDropdown === "help"
                          ? "grid-cols-2"
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
                          {section.links.map((linkObj) => (
                            <li key={linkObj.label}>
                              <Link
                                to={linkObj.path}
                                className="text-[14px] font-bold text-foreground/60 hover:text-primary transition-all hover:translate-x-2 flex items-center gap-2 group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {linkObj.label}
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

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-white/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 p-2 hover:scale-110 transition-transform"
            >
              <X size={32} />
            </button>

            <form
              onSubmit={handleSearch}
              className="w-full max-w-3xl text-center"
            >
              <input
                autoFocus
                type="text"
                placeholder="SEARCH THE Collection..."
                className="w-full bg-transparent border-b-4 border-foreground py-4 text-3xl md:text-6xl font-black uppercase tracking-tighter outline-none text-center"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                Press Enter to Locate Art
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[3000] bg-white flex flex-col p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-10">
              {mobileSubMenu ? (
                <button
                  onClick={() => setMobileSubMenu(null)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary"
                >
                  <ChevronLeft size={16} /> Back
                </button>
              ) : (
                <img src="/logo.png" alt="Logo" className="h-8 brightness-0" />
              )}
              <button onClick={() => setMobileOpen(false)} className="p-2">
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col h-full overflow-y-auto pb-10">
              {!mobileSubMenu ? (
                <div className="flex flex-col gap-y-4">
                  <div className="relative mb-6">
                    <form onSubmit={handleSearch}>
                      <input
                        type="text"
                        placeholder="SEARCH..."
                        className="w-full border-b border-black/10 py-3 outline-none font-black uppercase tracking-widest"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </form>
                  </div>

                  {navLinks.map((link) => (
                    <div
                      key={link.label}
                      className="border-b border-black/5 pb-4"
                    >
                      <button
                        onClick={() => {
                          if (megaMenus[link.id as keyof typeof megaMenus]) {
                            setMobileSubMenu(link.id);
                          } else {
                            navigate(link.path);
                            setMobileOpen(false);
                          }
                        }}
                        className="w-full text-2xl font-black uppercase tracking-tighter flex justify-between items-center text-left"
                      >
                        {link.label}
                        <ArrowRight size={20} className="text-foreground/20" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={handleAccountClick}
                    className="mt-6 flex items-center gap-3 text-lg font-black uppercase tracking-widest"
                  >
                    <User size={24} />
                    {user ? "My Account" : "Login / Register"}
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-y-10"
                >
                  <h2 className="text-4xl font-black uppercase tracking-tighter border-b-4 border-primary w-fit pb-1">
                    {navLinks.find((l) => l.id === mobileSubMenu)?.label}
                  </h2>

                  {megaMenus[mobileSubMenu as keyof typeof megaMenus].map(
                    (section) => (
                      <div key={section.title} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Sparkles size={12} className="text-primary" />
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30">
                            {section.title}
                          </h4>
                        </div>
                        <div className="flex flex-col gap-y-4 pl-4">
                          {section.links.map((linkObj) => (
                            <Link
                              key={linkObj.label}
                              to={linkObj.path}
                              onClick={() => setMobileOpen(false)}
                              className="text-xl font-bold uppercase tracking-tight text-foreground/70 flex items-center justify-between"
                            >
                              {linkObj.label}
                              <ArrowRight size={16} className="text-primary" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;