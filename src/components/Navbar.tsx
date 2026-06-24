// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   ShoppingBag,
//   User,
//   Menu,
//   X,
//   ChevronDown,
//   Search,
//   ArrowRight,
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

//   useEffect(() => {
//     if (mobileOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [mobileOpen]);

//   useEffect(() => {
//     setActiveDropdown(null);
//     setMobileOpen(false);
//     setMobileSubMenu(null);
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
//       setMobileOpen(false);
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
//     setMobileOpen(false);
//   };

//   const megaMenus: Record<string, MegaMenuSection[]> = {
//     shop: [
//       {
//         title: "Standard Archive",
//         links: [
//           { label: "New Arrivals", path: "/shop?sort=newest" },
//           { label: "Best Selling", path: "/shop?sort=best_selling" },
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
//         ],
//       },
//     ],
//     multi: [
//       {
//         title: "Collage ",
//         links: [
//           { label: "30-Piece Bundle", path: "/shop?cat=collage&sub=30_piece" },
//           { label: "50-Piece Bundle", path: "/shop?cat=collage&sub=50_piece" },
//         ],
//       },
//       {
//         title: "Modular Displays",
//         links: [
//           { label: "2-Piece Splits", path: "/shop?cat=collage&sub=2_piece" },
//           { label: "3-Piece Splits", path: "/shop?cat=collage&sub=3_piece" },
//           { label: "5-Panel Layouts", path: "/shop?cat=collage&sub=5_panel" },
//         ],
//       },
//     ],
//     help: [
//       {
//         title: "Logistics",
//         links: [
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
//     { label: "Custom", id: "custom", path: "/custom-studio" },
//     { label: "Stickers", id: "stickers", path: "/shop?cat=stickers" },
//     { label: "About", id: "about", path: "/about" },
//     { label: "Bulk", id: "bulk", path: "/bulk-posters" },
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
//               ? "2px solid black"
//               : "2px solid transparent",
//         }}
//         className="absolute inset-0 pointer-events-none"
//       />

//       <div className="max-w-[1536px] mx-auto h-[70px] md:h-[100px] flex items-center justify-between px-6 md:px-10 relative z-10">
//         <Link to="/" className="group flex items-center shrink-0">
//           <motion.div
//             animate={{ scale: scrolled ? 0.9 : 1 }}
//             className="relative z-20 shrink-0"
//           >
//             <img
//               src="/MainLogo2.png"
//               alt="Imprinto"
//               className="h-12 lg:h-16 w-auto object-contain shrink-0 max-w-none mt-4"
//             />
//           </motion.div>
//         </Link>

//         <div className="hidden lg:flex items-center gap-x-4 xl:gap-x-8 h-full">
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
//                     className={`text-sm font-black uppercase tracking-widest whitespace-nowrap ${isCurrentActive ? "text-primary" : "text-foreground/40 group-hover:text-foreground"}`}
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

//         <div className="flex items-center gap-x-4 md:gap-x-6 shrink-0">
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
//             className="relative group flex items-center gap-2 bg-foreground text-background px-4 md:px-6 py-2.5 md:py-3 shadow-[4px_4px_0px_0px_rgb(0,212,255)] hover:bg-primary hover:text-foreground transition-all shrink-0"
//           >
//             <ShoppingBag size={18} strokeWidth={3} />
//             <span className="text-sm font-black uppercase tracking-widest hidden md:block">
//               Cart
//             </span>
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-foreground text-xs font-black flex items-center justify-center border-2 border-foreground">
//                 {totalItems}
//               </span>
//             )}
//           </button>

//           <div
//             className="lg:hidden cursor-pointer p-2 bg-foreground/5"
//             onClick={() => setMobileOpen(true)}
//           >
//             <Menu size={24} />
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {activeDropdown && megaMenus[activeDropdown] && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute top-[70px] md:top-[100px] left-0 w-full bg-white border-b-2 border-black p-10 z-50 shadow-2xl hidden lg:block"
//           >
//             <div className="max-w-[1536px] mx-auto grid grid-cols-4 gap-10">
//               {megaMenus[activeDropdown].map((section) => (
//                 <div key={section.title} className="space-y-6">
//                   <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary border-l-4 border-primary pl-3">
//                     {section.title}
//                   </h4>
//                   <div className="flex flex-col gap-y-3">
//                     {section.links.map((link) => (
//                       <Link
//                         key={link.label}
//                         to={link.path}
//                         className="text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors flex items-center group"
//                       >
//                         <ArrowRight
//                           size={14}
//                           className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary"
//                         />
//                         {link.label}
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "tween", duration: 0.3, ease: "circOut" }}
//             className="fixed inset-0 z-[3000] bg-white flex flex-col lg:hidden"
//           >
//             <div className="flex justify-between items-center px-6 h-[70px] border-b-2 border-foreground">
//               {mobileSubMenu ? (
//                 <button
//                   onClick={() => setMobileSubMenu(null)}
//                   className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary"
//                 >
//                   <ChevronLeft size={16} strokeWidth={3} /> Back
//                 </button>
//               ) : (
//                 <img src="/MainLogo2.png" alt="Logo" className="h-8 w-auto" />
//               )}
//               <X
//                 size={28}
//                 className="cursor-pointer"
//                 onClick={() => setMobileOpen(false)}
//               />
//             </div>

//             <div className="flex-1 overflow-y-auto px-6 py-8">
//               {!mobileSubMenu ? (
//                 <>
//                   <form onSubmit={handleSearch} className="mb-10 relative">
//                     <input
//                       type="text"
//                       placeholder="SEARCH COLLECTIONS..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full bg-foreground/5 border-2 border-foreground p-4 text-xs font-black uppercase outline-none"
//                     />
//                     <Search
//                       size={18}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40"
//                     />
//                   </form>

//                   <div className="flex flex-col gap-y-4">
//                     {navLinks.map((link) => (
//                       <button
//                         key={link.label}
//                         onClick={() => {
//                           if (megaMenus[link.id]) setMobileSubMenu(link.id);
//                           else navigate(link.path);
//                         }}
//                         className="flex justify-between items-center text-xl font-black uppercase tracking-widest text-left border-b-2 border-foreground/5 py-4 hover:text-primary transition-colors"
//                       >
//                         {link.label}
//                         {megaMenus[link.id] && (
//                           <ChevronDown
//                             size={18}
//                             className="-rotate-90 text-foreground/20"
//                           />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex flex-col gap-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
//                   {megaMenus[mobileSubMenu].map((section) => (
//                     <div key={section.title} className="space-y-6">
//                       <h4 className="text-xs font-black uppercase tracking-[0.3em] text-foreground/30 border-l-4 border-primary pl-3">
//                         {section.title}
//                       </h4>
//                       <div className="flex flex-col gap-y-4">
//                         {section.links.map((link) => (
//                           <Link
//                             key={link.label}
//                             to={link.path}
//                             className="text-lg font-black uppercase tracking-widest flex justify-between items-center group"
//                           >
//                             {link.label}
//                             <ArrowRight
//                               size={18}
//                               className="text-primary opacity-0 group-active:opacity-100"
//                             />
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="p-6 border-t-4 border-foreground bg-foreground text-background">
//               <button
//                 onClick={handleAccountClick}
//                 className="w-full flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-[0.2em]"
//               >
//                 <User size={20} strokeWidth={3} />
//                 {user ? "ACCESS TERMINAL (PROFILE)" : "LOGIN / CREATE ACCOUNT"}
//               </button>
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
//             className="fixed inset-0 z-[4000] bg-white flex items-center justify-center p-6"
//           >
//             <div className="max-w-[800px] w-full">
//               <div className="flex justify-between items-center mb-12">
//                 <span className="text-xs font-black uppercase tracking-widest text-primary">
//                   Global Search Protocol
//                 </span>
//                 <X
//                   size={32}
//                   className="cursor-pointer hover:rotate-90 transition-transform"
//                   onClick={() => setIsSearchOpen(false)}
//                 />
//               </div>
//               <form onSubmit={handleSearch} className="relative">
//                 <input
//                   autoFocus
//                   type="text"
//                   placeholder="WHAT ARE YOU LOOKING FOR?"
//                   className="w-full bg-transparent border-b-4 border-foreground py-8 text-2xl md:text-5xl font-black uppercase outline-none placeholder:text-foreground/10"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   className="absolute right-0 top-1/2 -translate-y-1/2 p-4"
//                 >
//                   <ArrowRight size={40} className="text-primary" />
//                 </button>
//               </form>
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
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileSubMenu(null);
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
      setMobileOpen(false);
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
    setMobileOpen(false);
  };

  const megaMenus: Record<string, MegaMenuSection[]> = {
    shop: [
      {
        title: "Standard Archive",
        links: [
          { label: "New Arrivals", path: "/shop?sort=newest" },
          { label: "Best Selling", path: "/shop?sort=best_selling" },
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
        ],
      },
    ],
    multi: [
      {
        title: "Collage ",
        links: [
          { label: "30-Piece Bundle", path: "/shop?cat=collage&sub=30_piece" },
          { label: "50-Piece Bundle", path: "/shop?cat=collage&sub=50_piece" },
        ],
      },
      {
        title: "Modular Displays",
        links: [
          { label: "2-Piece Splits", path: "/shop?cat=collage&sub=2_piece" },
          { label: "3-Piece Splits", path: "/shop?cat=collage&sub=3_piece" },
          { label: "5-Panel Layouts", path: "/shop?cat=collage&sub=5_panel" },
        ],
      },
    ],
    help: [
      {
        title: "Logistics",
        links: [
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
    { label: "Custom", id: "custom", path: "/custom-studio" },
    { label: "Stickers", id: "stickers", path: "/shop?cat=stickers" },
    { label: "About", id: "about", path: "/about" },
    { label: "Bulk", id: "bulk", path: "/bulk-posters" },
    { label: "Reviews", id: "reviews", path: "/reviews" },
    { label: "Support", id: "help", path: "/faqs" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-8 left-0 right-0 z-[1000] transition-all duration-500"
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
              ? "2px solid black"
              : "2px solid transparent",
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="max-w-[1536px] mx-auto h-[70px] md:h-[100px] flex items-center justify-between px-6 md:px-10 relative z-10">
        <Link to="/" className="group flex items-center shrink-0">
          <motion.div
            animate={{ scale: scrolled ? 0.9 : 1 }}
            className="relative z-20 shrink-0"
          >
            <img
              src="/MainLogo2.png"
              alt="Imprinto"
              className="h-12 lg:h-16 w-auto object-contain shrink-0 max-w-none mt-4"
            />
          </motion.div>
        </Link>

        <div className="hidden lg:flex items-center gap-x-4 xl:gap-x-8 h-full">
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
                    className={`text-sm font-black uppercase tracking-widest whitespace-nowrap ${isCurrentActive ? "text-primary" : "text-foreground/40 group-hover:text-foreground"}`}
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

        <div className="flex items-center gap-x-4 md:gap-x-6 shrink-0">
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
            className="relative group flex items-center gap-2 bg-foreground text-background px-4 md:px-6 py-2.5 md:py-3 shadow-[4px_4px_0px_0px_rgb(0,212,255)] hover:bg-primary hover:text-foreground transition-all shrink-0"
          >
            <ShoppingBag size={18} strokeWidth={3} />
            <span className="text-sm font-black uppercase tracking-widest hidden md:block">
              Cart
            </span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-foreground text-xs font-black flex items-center justify-center border-2 border-foreground">
                {totalItems}
              </span>
            )}
          </button>

          <div
            className="lg:hidden cursor-pointer p-2 bg-foreground/5"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeDropdown && megaMenus[activeDropdown] && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[70px] md:top-[100px] left-0 w-full bg-white border-b-2 border-black p-10 z-50 shadow-2xl hidden lg:block"
          >
            <div className="max-w-[1536px] mx-auto grid grid-cols-4 gap-10">
              {megaMenus[activeDropdown].map((section) => (
                <div key={section.title} className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary border-l-4 border-primary pl-3">
                    {section.title}
                  </h4>
                  <div className="flex flex-col gap-y-3">
                    {section.links.map((link) => (
                      <Link
                        key={link.label}
                        to={link.path}
                        className="text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors flex items-center group"
                      >
                        <ArrowRight
                          size={14}
                          className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary"
                        />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "circOut" }}
            className="fixed inset-0 z-[3000] bg-white flex flex-col lg:hidden"
          >
            <div className="flex justify-between items-center px-6 h-[70px] border-b-2 border-foreground">
              {mobileSubMenu ? (
                <button
                  onClick={() => setMobileSubMenu(null)}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary"
                >
                  <ChevronLeft size={16} strokeWidth={3} /> Back
                </button>
              ) : (
                <img src="/MainLogo2.png" alt="Logo" className="h-8 w-auto" />
              )}
              <X
                size={28}
                className="cursor-pointer"
                onClick={() => setMobileOpen(false)}
              />
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              {!mobileSubMenu ? (
                <>
                  <form onSubmit={handleSearch} className="mb-10 relative">
                    <input
                      type="text"
                      placeholder="SEARCH COLLECTIONS..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-foreground/5 border-2 border-foreground p-4 text-xs font-black uppercase outline-none"
                    />
                    <Search
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40"
                    />
                  </form>

                  <div className="flex flex-col gap-y-4">
                    {navLinks.map((link) => (
                      <button
                        key={link.label}
                        onClick={() => {
                          if (megaMenus[link.id]) setMobileSubMenu(link.id);
                          else navigate(link.path);
                        }}
                        className="flex justify-between items-center text-xl font-black uppercase tracking-widest text-left border-b-2 border-foreground/5 py-4 hover:text-primary transition-colors"
                      >
                        {link.label}
                        {megaMenus[link.id] && (
                          <ChevronDown
                            size={18}
                            className="-rotate-90 text-foreground/20"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                  {megaMenus[mobileSubMenu].map((section) => (
                    <div key={section.title} className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-foreground/30 border-l-4 border-primary pl-3">
                        {section.title}
                      </h4>
                      <div className="flex flex-col gap-y-4">
                        {section.links.map((link) => (
                          <Link
                            key={link.label}
                            to={link.path}
                            className="text-lg font-black uppercase tracking-widest flex justify-between items-center group"
                          >
                            {link.label}
                            <ArrowRight
                              size={18}
                              className="text-primary opacity-0 group-active:opacity-100"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t-4 border-foreground bg-foreground text-background">
              <button
                onClick={handleAccountClick}
                className="w-full flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-[0.2em]"
              >
                <User size={20} strokeWidth={3} />
                {user ? "ACCESS TERMINAL (PROFILE)" : "LOGIN / CREATE ACCOUNT"}
              </button>
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
            className="fixed inset-0 z-[4000] bg-white flex items-center justify-center p-6"
          >
            <div className="max-w-[800px] w-full">
              <div className="flex justify-between items-center mb-12">
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                  Global Search Protocol
                </span>
                <X
                  size={32}
                  className="cursor-pointer hover:rotate-90 transition-transform"
                  onClick={() => setIsSearchOpen(false)}
                />
              </div>
              <form onSubmit={handleSearch} className="relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="WHAT ARE YOU LOOKING FOR?"
                  className="w-full bg-transparent border-b-4 border-foreground py-8 text-2xl md:text-5xl font-black uppercase outline-none placeholder:text-foreground/10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-4"
                >
                  <ArrowRight size={40} className="text-primary" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;