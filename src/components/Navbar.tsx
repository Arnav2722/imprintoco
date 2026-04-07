// import { Link, useNavigate } from "react-router-dom";
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

//   useEffect(() => {
//     // Scroll threshold ko thoda badhaya hai taaki jump na mehsoos ho
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
//       className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 font-sans ${
//         scrolled
//           ? "bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
//           : "bg-transparent"
//       }`}
//       style={{ height: "70px" }} // FIXED HEIGHT: Isse layout hilega nahi click par
//     >
//       <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between overflow-hidden">
//         {/* LOGO SECTION - Flex-1 ensures it stays left */}
//         <div className="flex-1 flex justify-start">
//           <Link
//             to="/"
//             className="relative z-[120] flex items-center group no-underline"
//           >
//             <img
//               src="/logo.png"
//               alt="Logo"
//               className="h-10 md:h-12 w-auto transition-transform duration-300 object-contain"
//             />
//           </Link>
//         </div>

//         {/* LINKS SECTION - Flex-2 keeps it centered */}
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

//         {/* ACTIONS SECTION - Flex-1 stays right */}
//         <div className="flex-1 flex items-center justify-end gap-x-6 md:gap-x-8">
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
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu, X, LogOut, Search } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
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
    { label: "HOME", path: "/" },
    { label: "SHOP", path: "/shop" },
    { label: "CUSTOM PRINTS", path: "/custom-prints" },
    { label: "EXPLORE", path: "/explore" },
    { label: "ABOUT", path: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 font-sans transform-gpu ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
      style={{ height: "70px" }}
    >
      <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between overflow-hidden">
        {/* LEFT: LOGO SECTION */}
        <div className="flex-1 flex justify-start items-center">
          <Link
            to="/"
            className="relative z-[120] flex items-center group no-underline"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 md:h-12 w-auto transition-transform duration-300 object-contain grayscale hover:grayscale-0"
            />
          </Link>
        </div>

        {/* CENTER: NAV LINKS */}
        <div className="hidden lg:flex flex-[2] items-center justify-center gap-x-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="relative text-[11px] font-bold tracking-[0.25em] text-white/60 hover:text-white transition-all py-1 group uppercase whitespace-nowrap no-underline"
            >
              {item.label}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* RIGHT: ACTIONS SECTION */}
        <div className="flex-1 flex items-center justify-end gap-x-5 md:gap-x-7">
          <button
            onClick={handleAccountClick}
            className="hidden md:flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-[11px] font-bold tracking-[0.2em] uppercase bg-transparent border-none p-0 cursor-pointer"
          >
            <User size={18} strokeWidth={2.5} />
            <span className="hidden xl:block">
              {user ? "Dashboard" : "Account"}
            </span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="group relative flex items-center p-1 text-white hover:text-primary transition-all z-[120] bg-transparent border-none cursor-pointer"
          >
            <ShoppingBag size={20} strokeWidth={2.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-black">
                {totalItems}
              </span>
            )}
          </button>

          {user && (
            <button
              onClick={() => signOut(auth)}
              className="hidden md:block text-white/40 hover:text-red-500 transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              <LogOut size={18} strokeWidth={2.5} />
            </button>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-1 z-[120] bg-transparent border-none cursor-pointer"
          >
            {mobileOpen ? (
              <X size={26} strokeWidth={2.5} />
            ) : (
              <Menu size={26} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 w-full h-screen bg-[#050505] z-[110] flex flex-col justify-start px-10 pt-32 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.label}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="text-4xl font-bold tracking-tighter text-white hover:text-primary transition-all uppercase no-underline"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Actions Overlay */}
              <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-6">
                <button
                  onClick={() => {
                    handleAccountClick();
                    setMobileOpen(false);
                  }}
                  className="text-left font-bold text-primary uppercase tracking-widest text-sm bg-transparent border-none"
                >
                  {user ? "View Profile" : "Login / Join"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;