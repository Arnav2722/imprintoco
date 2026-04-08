// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingBag, User, Menu, X, LogOut, Search } from "lucide-react";
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

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
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
//     { label: "HOME", path: "/" },
//     { label: "SHOP", path: "/shop" },
//     { label: "CUSTOM PRINTS", path: "/custom-prints" },
//     { label: "EXPLORE", path: "/explore" },
//     { label: "ABOUT", path: "/about" },
//   ];

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 font-sans transform-gpu ${
//         scrolled
//           ? "bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
//           : "bg-transparent"
//       }`}
//       style={{ height: "70px" }}
//     >
//       <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between overflow-hidden">
//         {/* LEFT: LOGO SECTION */}
//         <div className="flex-1 flex justify-start items-center">
//           <Link
//             to="/"
//             className="relative z-[120] flex items-center group no-underline"
//           >
//             <img
//               src="/logo.png"
//               alt="Logo"
//               className="h-10 md:h-12 w-auto transition-transform duration-300 object-contain grayscale hover:grayscale-0"
//             />
//           </Link>
//         </div>

//         {/* CENTER: NAV LINKS */}
//         <div className="hidden lg:flex flex-[2] items-center justify-center gap-x-10">
//           {navItems.map((item) => (
//             <Link
//               key={item.label}
//               to={item.path}
//               className="relative text-[11px] font-bold tracking-[0.25em] text-white/60 hover:text-white transition-all py-1 group uppercase whitespace-nowrap no-underline"
//             >
//               {item.label}
//               <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-primary group-hover:w-full transition-all duration-300" />
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT: ACTIONS SECTION */}
//         <div className="flex-1 flex items-center justify-end gap-x-5 md:gap-x-7">
//           <button
//             onClick={handleAccountClick}
//             className="hidden md:flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-[11px] font-bold tracking-[0.2em] uppercase bg-transparent border-none p-0 cursor-pointer"
//           >
//             <User size={18} strokeWidth={2.5} />
//             <span className="hidden xl:block">
//               {user ? "Dashboard" : "Account"}
//             </span>
//           </button>

//           <button
//             onClick={() => setIsCartOpen(true)}
//             className="group relative flex items-center p-1 text-white hover:text-primary transition-all z-[120] bg-transparent border-none cursor-pointer"
//           >
//             <ShoppingBag size={20} strokeWidth={2.5} />
//             {totalItems > 0 && (
//               <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-black">
//                 {totalItems}
//               </span>
//             )}
//           </button>

//           {user && (
//             <button
//               onClick={() => signOut(auth)}
//               className="hidden md:block text-white/40 hover:text-red-500 transition-colors bg-transparent border-none p-0 cursor-pointer"
//             >
//               <LogOut size={18} strokeWidth={2.5} />
//             </button>
//           )}

//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="lg:hidden text-white p-1 z-[120] bg-transparent border-none cursor-pointer"
//           >
//             {mobileOpen ? (
//               <X size={26} strokeWidth={2.5} />
//             ) : (
//               <Menu size={26} strokeWidth={2.5} />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed inset-0 w-full h-screen bg-[#050505] z-[110] flex flex-col justify-start px-10 pt-32 lg:hidden"
//           >
//             <div className="flex flex-col gap-8">
//               {navItems.map((item, i) => (
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.05 }}
//                   key={item.label}
//                 >
//                   <Link
//                     to={item.path}
//                     onClick={() => setMobileOpen(false)}
//                     className="text-4xl font-bold tracking-tighter text-white hover:text-primary transition-all uppercase no-underline"
//                   >
//                     {item.label}
//                   </Link>
//                 </motion.div>
//               ))}

//               {/* Mobile Actions Overlay */}
//               <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-6">
//                 <button
//                   onClick={() => {
//                     handleAccountClick();
//                     setMobileOpen(false);
//                   }}
//                   className="text-left font-bold text-primary uppercase tracking-widest text-sm bg-transparent border-none"
//                 >
//                   {user ? "View Profile" : "Login / Join"}
//                 </button>
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
import { ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 200% Zoom and Responsive Fix: Scroll Lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser),
    );
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleAccountClick = async () => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists() && userDoc.data().role === "admin")
          navigate("/admin");
        else navigate("/profile");
      } catch {
        navigate("/profile");
      }
    } else navigate("/auth");
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Custom", path: "/custom-prints" },
    { label: "Explore", path: "/explore" },
    { label: "About", path: "/about" },
  ];

  return (
    // ✅ pointer-events-none ensures the container doesn't block clicks when transparent
    <nav className="fixed top-0 left-0 right-0 z-[1000] flex justify-center pt-2 md:pt-6 pointer-events-none">
      <motion.div
        initial={false}
        animate={{
          width: scrolled ? "92%" : "100%", // Slightly wider for better zoom handling
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          border: scrolled
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(255, 255, 255, 0)",
          borderRadius: scrolled ? "20px" : "0px",
        }}
        className="max-w-[1400px] h-[60px] md:h-[75px] flex items-center justify-between px-6 md:px-12 pointer-events-auto transition-all duration-500 shadow-2xl"
      >
        {/* LOGO */}
        <div className="flex-1 flex items-center">
          <Link to="/" className="inline-block relative z-[1001]">
            <img
              src="/logo.png"
              alt="Imprinto"
              className="h-8 md:h-11 w-auto transition-transform hover:scale-105"
            />
          </Link>
        </div>

        {/* CENTER LINKS - Desktop Only */}
        <div className="hidden lg:flex items-center gap-x-10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className="relative group py-2"
              >
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${isActive ? "text-primary" : "text-white/50 group-hover:text-white"}`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#00e5ff]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ACTIONS - RIGHT */}
        <div className="flex-1 flex items-center justify-end gap-x-4 md:gap-x-6">
          <button
            onClick={handleAccountClick}
            className="hidden sm:flex items-center group bg-transparent border-none cursor-pointer"
          >
            <User
              size={18}
              className="text-white/60 group-hover:text-primary transition-colors"
            />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center group bg-transparent border-none cursor-pointer"
          >
            <ShoppingBag
              size={20}
              className="text-white group-hover:text-primary transition-all"
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-black text-[9px] font-black flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white bg-transparent border-none cursor-pointer p-1"
          >
            <Menu size={26} />
          </button>
        </div>
      </motion.div>

      {/* ✅ RE-ENGINEERED MOBILE OVERLAY FOR 200% ZOOM */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[2000] flex flex-col pointer-events-auto"
            style={{ height: "100dvh" }} // Dynamic viewport height for mobile browsers
          >
            {/* Header inside Overlay to prevent background clicks */}
            <div className="flex justify-between items-center px-8 h-[80px] border-b border-white/5">
              <img src="/logo.png" className="h-8" alt="Logo" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-primary bg-transparent border-none p-2 cursor-pointer"
              >
                <X size={32} strokeWidth={3} />
              </button>
            </div>

            {/* Scrollable Links Area */}
            <div className="flex-1 overflow-y-auto px-10 py-12 flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-auto pt-10 border-t border-white/10 flex flex-col gap-8 pb-10">
                <button
                  onClick={() => {
                    handleAccountClick();
                    setMobileOpen(false);
                  }}
                  className="text-left text-primary font-black uppercase tracking-[0.3em] text-sm bg-transparent border-none p-0"
                >
                  {user ? "View Dashboard" : "Login / Join Account"}
                </button>
                {user && (
                  <button
                    onClick={() => {
                      signOut(auth);
                      setMobileOpen(false);
                    }}
                    className="text-left text-white/30 uppercase text-[10px] tracking-widest bg-transparent border-none p-0"
                  >
                    Sign Out Protocol
                  </button>
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
