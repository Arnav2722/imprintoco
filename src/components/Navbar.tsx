import { Link, useNavigate } from "react-router-dom";
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
    { label: "HOME", path: "/" },
    { label: "SHOP", path: "/shop" },
    { label: "CUSTOM PRINTS", path: "/custom-prints" },
    { label: "EXPLORE", path: "/explore" },
    { label: "ABOUT", path: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/5 h-16" : "bg-transparent h-20"}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="relative z-[120] flex items-center group">
          <img
            src="/logo.png"
            alt="Logo"
            className={`transition-all duration-500 ${scrolled ? "h-8" : "h-9 md:h-12"}`}
          />
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="relative text-[14px] font-bold tracking-[0.15em] text-white/70 hover:text-white transition-all py-2 group uppercase"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={handleAccountClick}
            className="hidden md:flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-[14px] font-bold tracking-widest uppercase"
          >
            <User size={18} />
            <span className="hidden xl:block">
              {user ? "Dashboard" : "Account"}
            </span>
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="group relative flex items-center p-2 text-white hover:text-primary transition-all z-[120]"
          >
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-black text-[10px] font-black flex items-center justify-center rounded-full ring-2 ring-black">
                {totalItems}
              </span>
            )}
          </button>
          {user && (
            <button
              onClick={() => signOut(auth)}
              className="hidden md:block text-white/50 hover:text-red-500 transition-colors"
            >
              <LogOut size={18} />
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 z-[120] rounded-full transition-colors"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-black z-[110] flex flex-col justify-start px-8 pt-24 lg:hidden"
          >
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
                    className="text-[28px] font-black tracking-tighter text-white hover:text-primary transition-all uppercase leading-none"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-6 border-t border-white/10 flex flex-col gap-4">
                <button
                  onClick={() => {
                    handleAccountClick();
                    setMobileOpen(false);
                  }}
                  className="text-left font-bold text-primary uppercase tracking-widest"
                >
                  {user ? "View Profile" : "Login / Join Now"}
                </button>
                {user && (
                  <button
                    onClick={() => {
                      signOut(auth);
                      setMobileOpen(false);
                    }}
                    className="text-left font-bold text-red-500 uppercase tracking-widest"
                  >
                    Logout
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