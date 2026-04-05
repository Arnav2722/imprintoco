import { Link } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "STICKERS", path: "/shop?cat=stickers" },
    { label: "POSTERS", path: "/shop?cat=posters" },
    { label: "COMBO PACKS", path: "/shop?cat=combo" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-bold tracking-widest text-foreground">
          Imprinto Co.
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/about" className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150 hidden md:block">
            ABOUT
          </Link>
          <Link to="/auth" className="text-foreground hover:text-primary transition-colors duration-150 hidden md:block">
            <User size={20} />
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="relative text-foreground hover:text-primary transition-colors duration-150">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface-container px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/about" onClick={() => setMobileOpen(false)} className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150">
            ABOUT
          </Link>
          <Link to="/auth" onClick={() => setMobileOpen(false)} className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150">
            LOGIN / SIGN UP
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
