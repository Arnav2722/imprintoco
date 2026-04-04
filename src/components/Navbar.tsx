import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: "STICKERS", path: "/shop?cat=stickers" },
    { label: "POSTERS", path: "/shop?cat=posters" },
    { label: "COMBO PACKS", path: "/shop" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-bold tracking-widest text-foreground">
          VELOCITY
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
          <button className="relative text-foreground hover:text-primary transition-colors duration-150">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
