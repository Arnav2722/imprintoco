// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { auth, db } from "@/lib/firebase";
// import {
//   onAuthStateChanged,
//   signOut,
//   User as FirebaseUser,
// } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

// const Navbar = () => {
//   const { totalItems, setIsCartOpen } = useCart();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [user, setUser] = useState<FirebaseUser | null>(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ 200% Zoom and Responsive Fix: Scroll Lock
//   useEffect(() => {
//     if (mobileOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//   }, [mobileOpen]);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
//       setUser(currentUser),
//     );
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       unsubscribe();
//     };
//   }, []);

//   const handleAccountClick = async () => {
//     if (user) {
//       try {
//         const userRef = doc(db, "users", user.uid);
//         const userDoc = await getDoc(userRef);
//         if (userDoc.exists() && userDoc.data().role === "admin")
//           navigate("/admin");
//         else navigate("/profile");
//       } catch {
//         navigate("/profile");
//       }
//     } else navigate("/auth");
//   };

//   const navItems = [
//     { label: "Home", path: "/" },
//     { label: "Shop", path: "/shop" },
//     { label: "Custom", path: "/custom-prints" },
//     { label: "Explore", path: "/explore" },
//     { label: "About", path: "/about" },
//   ];

//   return (
//     // ✅ pointer-events-none ensures the container doesn't block clicks when transparent
//     <nav className="fixed top-0 left-0 right-0 z-[1000] flex justify-center pt-2 md:pt-6 pointer-events-none">
//       <motion.div
//         initial={false}
//         animate={{
//           width: scrolled ? "92%" : "100%", // Slightly wider for better zoom handling
//           backgroundColor: scrolled ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0)",
//           backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
//           border: scrolled
//             ? "1px solid rgba(255, 255, 255, 0.1)"
//             : "1px solid rgba(255, 255, 255, 0)",
//           borderRadius: scrolled ? "20px" : "0px",
//         }}
//         className="max-w-[1400px] h-[60px] md:h-[75px] flex items-center justify-between px-6 md:px-12 pointer-events-auto transition-all duration-500 shadow-2xl"
//       >
//         {/* LOGO */}
//         <div className="flex-1 flex items-center">
//           <Link to="/" className="inline-block relative z-[1001]">
//             <img
//               src="/logo.png"
//               alt="Imprinto"
//               className="h-8 md:h-11 w-auto transition-transform hover:scale-105"
//             />
//           </Link>
//         </div>

//         {/* CENTER LINKS - Desktop Only */}
//         <div className="hidden lg:flex items-center gap-x-10">
//           {navItems.map((item) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.label}
//                 to={item.path}
//                 className="relative group py-2"
//               >
//                 <span
//                   className={`text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${isActive ? "text-primary" : "text-white/50 group-hover:text-white"}`}
//                 >
//                   {item.label}
//                 </span>
//                 {isActive && (
//                   <motion.div
//                     layoutId="nav-dot"
//                     className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#00e5ff]"
//                   />
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* ACTIONS - RIGHT */}
//         <div className="flex-1 flex items-center justify-end gap-x-4 md:gap-x-6">
//           <button
//             onClick={handleAccountClick}
//             className="hidden sm:flex items-center group bg-transparent border-none cursor-pointer"
//           >
//             <User
//               size={18}
//               className="text-white/60 group-hover:text-primary transition-colors"
//             />
//           </button>

//           <button
//             onClick={() => setIsCartOpen(true)}
//             className="relative flex items-center group bg-transparent border-none cursor-pointer"
//           >
//             <ShoppingBag
//               size={20}
//               className="text-white group-hover:text-primary transition-all"
//             />
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-black text-[9px] font-black flex items-center justify-center rounded-full">
//                 {totalItems}
//               </span>
//             )}
//           </button>

//           {/* MOBILE TOGGLE */}
//           <button
//             onClick={() => setMobileOpen(true)}
//             className="lg:hidden text-white bg-transparent border-none cursor-pointer p-1"
//           >
//             <Menu size={26} />
//           </button>
//         </div>
//       </motion.div>

//       {/* ✅ RE-ENGINEERED MOBILE OVERLAY FOR 200% ZOOM */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black z-[2000] flex flex-col pointer-events-auto"
//             style={{ height: "100dvh" }} // Dynamic viewport height for mobile browsers
//           >
//             {/* Header inside Overlay to prevent background clicks */}
//             <div className="flex justify-between items-center px-8 h-[80px] border-b border-white/5">
//               <img src="/logo.png" className="h-8" alt="Logo" />
//               <button
//                 onClick={() => setMobileOpen(false)}
//                 className="text-primary bg-transparent border-none p-2 cursor-pointer"
//               >
//                 <X size={32} strokeWidth={3} />
//               </button>
//             </div>

//             {/* Scrollable Links Area */}
//             <div className="flex-1 overflow-y-auto px-10 py-12 flex flex-col gap-8">
//               {navItems.map((item, i) => (
//                 <motion.div
//                   key={item.label}
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: i * 0.05 }}
//                 >
//                   <Link
//                     to={item.path}
//                     onClick={() => setMobileOpen(false)}
//                     className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white hover:text-primary"
//                   >
//                     {item.label}
//                   </Link>
//                 </motion.div>
//               ))}

//               <div className="mt-auto pt-10 border-t border-white/10 flex flex-col gap-8 pb-10">
//                 <button
//                   onClick={() => {
//                     handleAccountClick();
//                     setMobileOpen(false);
//                   }}
//                   className="text-left text-primary font-black uppercase tracking-[0.3em] text-sm bg-transparent border-none p-0"
//                 >
//                   {user ? "View Dashboard" : "Login / Join Account"}
//                 </button>
//                 {user && (
//                   <button
//                     onClick={() => {
//                       signOut(auth);
//                       setMobileOpen(false);
//                     }}
//                     className="text-left text-white/30 uppercase text-[10px] tracking-widest bg-transparent border-none p-0"
//                   >
//                     Sign Out Protocol
//                   </button>
//                 )}
//               </div>
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
  Sun,
  Moon,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
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
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

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
  };

  // ✅ Paths updated to match your new files
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
          "6-Panel Wall Art Set",
          "7-Piece Poster Layout",
          "9-Piece Epic Poster Split",
        ],
      },
      {
        title: "Explore ALL",
        links: [
          "Marvel",
          "DC",
          "Movies",
          "TV Series",
          "Music",
          "Game Split Posters",
          "Fighter Jet Posters",
          "Car Split Posters",
          "Motivational Split Posters",
          "Spiritual Split Posters",
          "Bike Split Posters",
          "Cricket",
          "Football",
          "F1",
          "Wrestling",
          "Sport Top-Picks",
        ],
      },
    ],
    retro: [
      {
        title: "Retro Photo Prints",
        links: [
          "Aesthetic Retro Photo Prints",
          "Custom Retro Photo Prints",
          "Personalized Pocket Photos (Mini Prints)",
          "Custom Photobooth Strip",
        ],
      },
    ],
    custom: [
      {
        title: "Custom Posters",
        links: [
          "Custom Posters",
          "Customize 3 Piece Split Poster",
          "Customize 4 Piece Split Poster 2X2",
          "Customize Multi Poster",
        ],
      },
    ],
    help: [
      {
        title: "Help Center",
        links: [
          "About Us",
          "Contact Us",
          "Terms and Conditions",
          "Cancellation and Shipping Policy",
          "FAQs",
        ],
      },
    ],
  };

  const navLinks = [
    { label: "Shop Posters", id: "shop", path: "/shop" },
    {
      label: "Multi Posters Collections",
      id: "multi",
      path: "/multi-collections",
    },
    { label: "Retro Photo Prints", id: "retro", path: "/retro-studio" },
    { label: "Custom Posters", id: "custom", path: "/custom-studio" },
    { label: "Stickers", id: null, path: "/stickers" },
    { label: "Bulk Posters", id: null, path: "/bulk-posters" },
    { label: "Reviews", id: null, path: "/about" },
    { label: "Help Center", id: "help", path: "/faqs" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <motion.div
        animate={{
          backgroundColor:
            scrolled || activeDropdown
              ? theme === "dark"
                ? "rgba(0,0,0,0.98)"
                : "rgba(255,255,255,0.98)"
              : "rgba(0,0,0,0)",
          backdropFilter:
            scrolled || activeDropdown ? "blur(30px)" : "blur(0px)",
          borderBottom:
            scrolled || activeDropdown
              ? "1px solid rgba(128,128,128,0.1)"
              : "none",
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="max-w-[1536px] mx-auto h-[75px] md:h-[95px] flex items-center justify-between px-6 md:px-10 relative z-10">
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Imprinto"
              className={`h-7 md:h-9 w-auto transition-all ${theme === "light" && "invert"}`}
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-x-5 h-full">
          {navLinks.map((link) => {
            const isDropdownActive = link.id && activeDropdown === link.id;

            const getTextColor = () => {
              if (isDropdownActive) return "text-primary";
              if (activeDropdown)
                return theme === "dark" ? "text-white/20" : "text-black/20";
              return theme === "dark"
                ? "text-white/50 group-hover:text-white"
                : "text-black/50 group-hover:text-black";
            };

            return (
              <div
                key={link.label}
                className="h-full flex items-center"
                onMouseEnter={() =>
                  link.id ? setActiveDropdown(link.id) : setActiveDropdown(null)
                }
              >
                <Link to={link.path} className="flex items-center gap-1 group">
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider transition-colors ${getTextColor()}`}
                  >
                    {link.label}
                  </span>
                  {link.id && (
                    <ChevronDown
                      size={10}
                      className={`transition-transform duration-300 ${isDropdownActive ? "rotate-180 text-primary" : "text-gray-500"}`}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all"
          >
            {theme === "dark" ? (
              <Sun size={16} className="text-white/50 hover:text-primary" />
            ) : (
              <Moon size={16} className="text-black/50 hover:text-primary" />
            )}
          </button>
          <Search
            size={18}
            className={`${theme === "dark" ? "text-white/40" : "text-black/40"} cursor-pointer hidden sm:block hover:text-primary transition-colors`}
          />
          <button onClick={handleAccountClick} className="hidden sm:block">
            <User
              size={18}
              className={`${theme === "dark" ? "text-white/40" : "text-black/40"} hover:text-primary transition-colors`}
            />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative group"
          >
            <ShoppingBag
              size={20}
              className={`${theme === "dark" ? "text-white" : "text-black"} group-hover:text-primary transition-colors`}
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-black text-[9px] font-black flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          <Menu
            className={`lg:hidden cursor-pointer ${theme === "dark" ? "text-white" : "text-black"}`}
            onClick={() => setMobileOpen(true)}
          />
        </div>
      </div>

      <AnimatePresence>
        {activeDropdown &&
          megaMenus[activeDropdown as keyof typeof megaMenus] && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`absolute top-full left-0 w-full py-12 px-8 shadow-2xl border-t ${theme === "dark" ? "bg-[#050505] text-white border-white/5" : "bg-white text-black border-black/5"}`}
            >
              <div className="max-w-[1400px] mx-auto">
                <div
                  className={`grid gap-10 ${activeDropdown === "multi" ? "grid-cols-3" : activeDropdown === "shop" ? "grid-cols-4" : "grid-cols-1"}`}
                >
                  {megaMenus[activeDropdown as keyof typeof megaMenus].map(
                    (section) => (
                      <div key={section.title} className="space-y-6">
                        <h4
                          className={`text-[10px] font-black uppercase tracking-[0.2em] pb-3 border-b ${theme === "dark" ? "text-white/20 border-white/5" : "text-black/20 border-black/5"}`}
                        >
                          {section.title}
                        </h4>
                        <ul
                          className={`grid gap-x-12 gap-y-3 ${section.links.length > 8 ? "grid-cols-2" : "grid-cols-1"}`}
                        >
                          {section.links.map((link) => (
                            <li key={link}>
                              <Link
                                to={
                                  activeDropdown === "shop" ||
                                  activeDropdown === "multi"
                                    ? "/shop"
                                    : activeDropdown === "retro"
                                      ? "/retro-studio"
                                      : activeDropdown === "custom"
                                        ? "/custom-studio"
                                        : "/faqs"
                                }
                                className={`text-[12px] font-bold transition-all hover:translate-x-1 block ${theme === "dark" ? "text-white/60 hover:text-primary" : "text-black/60 hover:text-primary"}`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                {link}
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