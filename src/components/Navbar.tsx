// import { Link, useNavigate, useLocation } from "react-router-dom";
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

// interface NavLinkObj {
//   label: string;
//   path: string;
// }

// interface MegaMenuSection {
//   title: string;
//   links: NavLinkObj[];
// }

// interface NavLink {
//   label: string;
//   id: string;
//   path: string;
// }

// const Navbar = (): JSX.Element => {
//   const { totalItems } = useCart();
//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = useState<boolean>(false);
//   const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
//   const [scrolled, setScrolled] = useState<boolean>(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [user, setUser] = useState<FirebaseUser | null>(null);
//   const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const navRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   // Reset dropdown when URL changes (Fixes the filter-not-changing issue)
//   useEffect(() => {
//     setActiveDropdown(null);
//     setMobileOpen(false);
//   }, [location.pathname, location.search]);

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

//   const handleSearch = (e: React.FormEvent): void => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(
//         `/shop?q=${encodeURIComponent(searchQuery.trim().toLowerCase())}`,
//       );
//       setIsSearchOpen(false);
//       setSearchQuery("");
//     }
//   };

//   const handleAccountClick = async (): Promise<void> => {
//     if (user) {
//       try {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         if (userDoc.exists() && userDoc.data().role === "admin")
//           navigate("/admin");
//         else navigate("/profile");
//       } catch {
//         navigate("/profile");
//       }
//     } else {
//       navigate("/login");
//     }
//   };

//   const megaMenus: Record<string, MegaMenuSection[]> = {
//     shop: [
//       {
//         title: "Standard Archive",
//         links: [
//           { label: "New Arrivals", path: "/shop?sort=newest" },
//           { label: "Best Selling", path: "/shop?is_featured=true" },
//           { label: "Devotional", path: "/shop?sub=devotion" },
//           { label: "Motivational", path: "/shop?sub=motivation" },
//         ],
//       },
//       {
//         title: "Auto-Motive",
//         links: [
//           { label: "Bikes", path: "/shop?sub=bikes" },
//           { label: "Cars", path: "/shop?sub=cars" },
//           { label: "F1 Tracks", path: "/shop?sub=f1" },
//           { label: "MotoGP", path: "/shop?sub=motogp" },
//         ],
//       },
//       {
//         title: "Pop Culture",
//         links: [
//           { label: "Anime Core", path: "/shop?sub=anime" },
//           { label: "Marvel / DC", path: "/shop?sub=superhero" },
//           { label: "Movies & TV", path: "/shop?sub=movies" },
//           { label: "Music Drops", path: "/shop?sub=music" },
//         ],
//       },
//       {
//         title: "Athletics",
//         links: [
//           { label: "Football", path: "/shop?sub=football" },
//           { label: "Cricket", path: "/shop?sub=cricket" },
//           { label: "UFC / Combat", path: "/shop?sub=ufc" },
//         ],
//       },
//     ],
//     multi: [
//       {
//         title: "Collage Protocols",
//         links: [
//           { label: "50-Piece Vault", path: "/multi-collections" }, // Corrected path
//           { label: "30-Piece Bundle", path: "/multi-collections" }, // Corrected path
//         ],
//       },
//       {
//         title: "Modular Displays",
//         links: [
//           { label: "2-Piece Splits", path: "/multi-collections" },
//           { label: "3-Piece Splits", path: "/multi-collections" },
//           { label: "5-Panel Layouts", path: "/multi-collections" },
//         ],
//       },
//     ],
//     help: [
//       {
//         title: "Logistics",
//         links: [
//           { label: "Track Order", path: "/track-order" },
//           { label: "Contact Us", path: "/contact" },
//           { label: "FAQs", path: "/faqs" },
//         ],
//       },
//       {
//         title: "Legal",
//         links: [
//           { label: "Shipping Policy", path: "/shipping-policy" },
//           { label: "Return Policy", path: "/return-policy" },
//           { label: "Privacy Policy", path: "/privacy-policy" },
//         ],
//       },
//     ],
//   };

//   const navLinks: NavLink[] = [
//     { label: "Posters", id: "shop", path: "/shop" },
//     { label: "Collage Kits", id: "multi", path: "/multi-collections" },
//     { label: "Retro", id: "retro", path: "/retro-studio" },
//     { label: "Custom", id: "custom", path: "/custom-studio" },
//     { label: "Stickers", id: "stickers", path: "/shop?cat=stickers" },
//     { label: "Reviews", id: "reviews", path: "/reviews" },
//     { label: "Support", id: "help", path: "/faqs" },
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
//               ? "rgba(255,255,255,0.98)"
//               : "rgba(255,255,255,0)",
//           backdropFilter:
//             scrolled || activeDropdown || isSearchOpen
//               ? "blur(30px)"
//               : "blur(0px)",
//           borderBottom:
//             scrolled || activeDropdown || isSearchOpen
//               ? "2px solid #000"
//               : "2px solid transparent",
//         }}
//         className="absolute inset-0 pointer-events-none"
//       />

//       <div className="max-w-[1536px] mx-auto h-[80px] md:h-[100px] flex items-center justify-between px-6 md:px-10 relative z-10">
//         {/* If not the trial one the we gonna use this */}
//         {/* <Link to="/">
//           <img
//             src="/MainLogo.png"
//             // src="/logo.png"
//             alt="Imprinto"
//             className="h-8 md:h-10 w-auto "
//             // className="h-8 md:h-10 w-auto brightness-0"
//           />
//         </Link> */}

//         {/* This is the trial one, if it looks good then we go with this */}
//         <Link to="/">
//           <img
//             src="/MainLogo.png"
//             alt="Imprinto"
//             className="h-12 md:h-16 w-auto transition-transform duration-300 rotate-[-3deg] ml-10"
//           />
//         </Link>

//         <div className="hidden lg:flex items-center gap-x-8 h-full">
//           {navLinks.map((link) => {
//             const isCurrentActive = activeDropdown === link.id;
//             const hasMega = !!megaMenus[link.id];
//             return (
//               <div
//                 key={link.label}
//                 className="h-full flex items-center cursor-pointer group"
//                 onClick={() => {
//                   if (!hasMega) navigate(link.path);
//                   else setActiveDropdown(isCurrentActive ? null : link.id);
//                 }}
//               >
//                 <div className="flex items-center gap-1.5 transition-all">
//                   <span
//                     className={`text-[10px] font-black uppercase tracking-[0.2em] ${isCurrentActive ? "text-primary" : "text-foreground/40 group-hover:text-foreground"}`}
//                   >
//                     {link.label}
//                   </span>
//                   {hasMega && (
//                     <ChevronDown
//                       size={12}
//                       className={`transition-transform duration-300 ${isCurrentActive ? "rotate-180 text-primary" : "text-foreground/20"}`}
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
//             className="text-foreground/40 hover:text-primary cursor-pointer hidden sm:block"
//           />
//           <button onClick={handleAccountClick} className="hidden sm:block">
//             <User size={20} className="text-foreground/40 hover:text-primary" />
//           </button>

//           <button
//             onClick={() => navigate("/cart")}
//             className="relative group flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-none shadow-[5px_5px_0px_0px_#00D4FF] hover:bg-primary hover:text-foreground transition-all"
//           >
//             <ShoppingBag size={18} strokeWidth={3} />
//             <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">
//               Cart
//             </span>
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-foreground text-[10px] font-black flex items-center justify-center border-2 border-foreground">
//                 {totalItems}
//               </span>
//             )}
//           </button>

//           <Menu
//             className="lg:hidden cursor-pointer"
//             onClick={() => setMobileOpen(true)}
//           />
//         </div>
//       </div>

//       <AnimatePresence>
//         {activeDropdown && megaMenus[activeDropdown] && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute top-full left-0 w-full py-20 px-8 border-t-2 border-foreground bg-white shadow-2xl hidden lg:block"
//           >
//             <div className="max-w-[1400px] mx-auto grid grid-cols-4 gap-12">
//               {megaMenus[activeDropdown].map((section) => (
//                 <div key={section.title} className="space-y-8">
//                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 border-b border-foreground/5 pb-4">
//                     {section.title}
//                   </h4>
//                   <ul className="space-y-4">
//                     {section.links.map((link) => (
//                       <li key={link.label}>
//                         <Link
//                           to={link.path}
//                           className="text-[12px] font-black text-foreground uppercase tracking-tight hover:text-primary flex items-center justify-between group"
//                         >
//                           {link.label}
//                           <ArrowRight
//                             size={14}
//                             className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-primary"
//                           />
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {isSearchOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[2000] bg-white/98 backdrop-blur-xl flex items-center justify-center p-6"
//           >
//             <button
//               onClick={() => setIsSearchOpen(false)}
//               className="absolute top-10 right-10 w-14 h-14 bg-foreground text-background flex items-center justify-center shadow-[4px_4px_0px_0px_#00D4FF]"
//             >
//               <X size={32} strokeWidth={3} />
//             </button>
//             <form
//               onSubmit={handleSearch}
//               className="w-full max-w-5xl text-center"
//             >
//               <input
//                 autoFocus
//                 type="text"
//                 placeholder="EXECUTE SEARCH..."
//                 className="w-full bg-transparent border-b-8 border-foreground py-8 text-4xl md:text-9xl font-black uppercase tracking-tighter outline-none text-center italic"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
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
//             className="fixed inset-0 z-[3000] bg-white flex flex-col p-8 lg:hidden"
//           >
//             <div className="flex justify-between items-center mb-16">
//               {mobileSubMenu ? (
//                 <button
//                   onClick={() => setMobileSubMenu(null)}
//                   className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary"
//                 >
//                   <ChevronLeft size={16} strokeWidth={3} /> Back
//                 </button>
//               ) : (
//                 <img src="/logo.png" alt="Logo" className="h-8 brightness-0" />
//               )}
//               <X size={28} onClick={() => setMobileOpen(false)} />
//             </div>

//             <div className="flex flex-col h-full overflow-y-auto">
//               {!mobileSubMenu ? (
//                 <div className="flex flex-col gap-y-6">
//                   {navLinks.map((link) => (
//                     <button
//                       key={link.label}
//                       onClick={() => {
//                         if (megaMenus[link.id]) setMobileSubMenu(link.id);
//                         else navigate(link.path);
//                       }}
//                       className="text-4xl font-black uppercase tracking-tighter text-left border-b-2 border-foreground/5 pb-4 italic"
//                     >
//                       {link.label}
//                     </button>
//                   ))}
//                   <button
//                     onClick={handleAccountClick}
//                     className="mt-10 py-6 bg-foreground text-background font-black uppercase text-xs shadow-[5px_5px_0px_0px_#00D4FF]"
//                   >
//                     {user ? "PROFILE" : "LOGIN"}
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex flex-col gap-y-12">
//                   {megaMenus[mobileSubMenu].map((section) => (
//                     <div key={section.title} className="space-y-6">
//                       <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30">
//                         {section.title}
//                       </h4>
//                       <div className="flex flex-col gap-y-4 pl-4">
//                         {section.links.map((link) => (
//                           <Link
//                             key={link.label}
//                             to={link.path}
//                             className="text-2xl font-black uppercase tracking-tight italic flex justify-between"
//                           >
//                             {link.label}{" "}
//                             <ArrowRight size={20} className="text-primary" />
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface NavLinkObj {
  label: string;
  path: string;
}

interface MegaMenuSection {
  title: string;
  links: NavLinkObj[];
}

interface NavLink {
  label: string;
  id: string;
  path: string;
}

const Navbar = (): JSX.Element => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

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

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/shop?q=${encodeURIComponent(searchQuery.trim().toLowerCase())}`,
      );
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleAccountClick = async (): Promise<void> => {
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
      navigate("/login");
    }
  };

  const megaMenus: Record<string, MegaMenuSection[]> = {
    shop: [
      {
        title: "Standard Archive",
        links: [
          { label: "New Arrivals", path: "/shop?sort=newest" },
          { label: "Best Selling", path: "/shop?is_featured=true" },
          { label: "Devotional", path: "/shop?sub=devotion" },
          { label: "Motivational", path: "/shop?sub=motivation" },
        ],
      },
      {
        title: "Auto-Motive",
        links: [
          { label: "Bikes", path: "/shop?sub=bikes" },
          { label: "Cars", path: "/shop?sub=cars" },
          { label: "F1 Tracks", path: "/shop?sub=f1" },
          { label: "MotoGP", path: "/shop?sub=motogp" },
        ],
      },
      {
        title: "Pop Culture",
        links: [
          { label: "Anime Core", path: "/shop?sub=anime" },
          { label: "Marvel / DC", path: "/shop?sub=superhero" },
          { label: "Movies & TV", path: "/shop?sub=movies" },
          { label: "Music Drops", path: "/shop?sub=music" },
        ],
      },
      {
        title: "Athletics",
        links: [
          { label: "Football", path: "/shop?sub=football" },
          { label: "Cricket", path: "/shop?sub=cricket" },
          { label: "UFC / Combat", path: "/shop?sub=ufc" },
        ],
      },
    ],
    multi: [
      {
        title: "Collage Protocols",
        links: [
          { label: "50-Piece Vault", path: "/multi-collections" },
          { label: "30-Piece Bundle", path: "/multi-collections" },
        ],
      },
      {
        title: "Modular Displays",
        links: [
          { label: "2-Piece Splits", path: "/multi-collections" },
          { label: "3-Piece Splits", path: "/multi-collections" },
          { label: "5-Panel Layouts", path: "/multi-collections" },
        ],
      },
    ],
    help: [
      {
        title: "Logistics",
        links: [
          { label: "Track Order", path: "/track-order" },
          { label: "Contact Us", path: "/contact" },
          { label: "FAQs", path: "/faqs" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Shipping Policy", path: "/shipping-policy" },
          { label: "Return Policy", path: "/return-policy" },
          { label: "Privacy Policy", path: "/privacy-policy" },
        ],
      },
    ],
  };

  const navLinks: NavLink[] = [
    { label: "Posters", id: "shop", path: "/shop" },
    { label: "Collage Kits", id: "multi", path: "/multi-collections" },
    { label: "Retro", id: "retro", path: "/retro-studio" },
    { label: "Custom", id: "custom", path: "/custom-studio" },
    { label: "Stickers", id: "stickers", path: "/shop?cat=stickers" },
    { label: "Reviews", id: "reviews", path: "/reviews" },
    { label: "Support", id: "help", path: "/faqs" },
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
              ? "rgba(255,255,255,0.98)"
              : "rgba(255,255,255,0)",
          backdropFilter:
            scrolled || activeDropdown || isSearchOpen
              ? "blur(30px)"
              : "blur(0px)",
          borderBottom:
            scrolled || activeDropdown || isSearchOpen
              ? "2px solid #000"
              : "2px solid transparent",
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="max-w-[1536px] mx-auto h-[80px] md:h-[100px] flex items-center justify-between px-6 md:px-10 relative z-10">
        {/* New Polished Logo Implementation */}
        <Link to="/" className="group flex items-center">
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{
                scale: scrolled ? 0.9 : 1,
              }}
              className="relative z-20 overflow-hidden"
            >
              <img
                src="/MainLogo.png"
                alt="Imprinto"
                className="h-10 md:h-14 w-auto object-contain transition-transform duration-500"
              />
            </motion.div>
            {/* Logo Glow/Backdrop Effect */}
            <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-x-8 h-full">
          {navLinks.map((link) => {
            const isCurrentActive = activeDropdown === link.id;
            const hasMega = !!megaMenus[link.id];
            return (
              <div
                key={link.label}
                className="h-full flex items-center cursor-pointer group"
                onClick={() => {
                  if (!hasMega) navigate(link.path);
                  else setActiveDropdown(isCurrentActive ? null : link.id);
                }}
              >
                <div className="flex items-center gap-1.5 transition-all">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.2em] ${isCurrentActive ? "text-primary" : "text-foreground/40 group-hover:text-foreground"}`}
                  >
                    {link.label}
                  </span>
                  {hasMega && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${isCurrentActive ? "rotate-180 text-primary" : "text-foreground/20"}`}
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
            className="text-foreground/40 hover:text-primary cursor-pointer hidden sm:block"
          />
          <button onClick={handleAccountClick} className="hidden sm:block">
            <User size={20} className="text-foreground/40 hover:text-primary" />
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="relative group flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-none shadow-[5px_5px_0px_0px_#00D4FF] hover:bg-primary hover:text-foreground transition-all"
          >
            <ShoppingBag size={18} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">
              Cart
            </span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-foreground text-[10px] font-black flex items-center justify-center border-2 border-foreground">
                {totalItems}
              </span>
            )}
          </button>

          <Menu
            className="lg:hidden cursor-pointer"
            onClick={() => setMobileOpen(true)}
          />
        </div>
      </div>

      <AnimatePresence>
        {activeDropdown && megaMenus[activeDropdown] && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full py-20 px-8 border-t-2 border-foreground bg-white shadow-2xl hidden lg:block"
          >
            <div className="max-w-[1400px] mx-auto grid grid-cols-4 gap-12">
              {megaMenus[activeDropdown].map((section) => (
                <div key={section.title} className="space-y-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 border-b border-foreground/5 pb-4">
                    {section.title}
                  </h4>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.path}
                          className="text-[12px] font-black text-foreground uppercase tracking-tight hover:text-primary flex items-center justify-between group"
                        >
                          {link.label}
                          <ArrowRight
                            size={14}
                            className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-primary"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
            className="fixed inset-0 z-[2000] bg-white/98 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 w-14 h-14 bg-foreground text-background flex items-center justify-center shadow-[4px_4px_0px_0px_#00D4FF]"
            >
              <X size={32} strokeWidth={3} />
            </button>
            <form
              onSubmit={handleSearch}
              className="w-full max-w-5xl text-center"
            >
              <input
                autoFocus
                type="text"
                placeholder="EXECUTE SEARCH..."
                className="w-full bg-transparent border-b-8 border-foreground py-8 text-4xl md:text-9xl font-black uppercase tracking-tighter outline-none text-center italic"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            // initial={{ x: "100%" }}
            // animate={{ x: 0 }}
            // exit={{ x: "100%" }}
            className="fixed inset-0 z-[3000] bg-white flex flex-col p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              {mobileSubMenu ? (
                <button
                  onClick={() => setMobileSubMenu(null)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary"
                >
                  <ChevronLeft size={16} strokeWidth={3} /> Back
                </button>
              ) : (
                <div className="flex items-center">
                  <img src="/MainLogo.png" alt="Logo" className="h-10 w-auto" />
                </div>
              )}
              <X size={28} onClick={() => setMobileOpen(false)} />
            </div>

            <div className="flex flex-col h-full overflow-y-auto">
              {!mobileSubMenu ? (
                <div className="flex flex-col gap-y-6">
                  {navLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => {
                        if (megaMenus[link.id]) setMobileSubMenu(link.id);
                        else navigate(link.path);
                      }}
                      className="text-4xl font-black uppercase tracking-tighter text-left border-b-2 border-foreground/5 pb-4 italic"
                    >
                      {link.label}
                    </button>
                  ))}
                  <button
                    onClick={handleAccountClick}
                    className="mt-10 py-6 bg-foreground text-background font-black uppercase text-xs shadow-[5px_5px_0px_0px_#00D4FF]"
                  >
                    {user ? "PROFILE" : "LOGIN"}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-y-12">
                  {megaMenus[mobileSubMenu].map((section) => (
                    <div key={section.title} className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30">
                        {section.title}
                      </h4>
                      <div className="flex flex-col gap-y-4 pl-4">
                        {section.links.map((link) => (
                          <Link
                            key={link.label}
                            to={link.path}
                            className="text-2xl font-black uppercase tracking-tight italic flex justify-between"
                          >
                            {link.label}{" "}
                            <ArrowRight size={20} className="text-primary" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
