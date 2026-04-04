import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const catFilter = searchParams.get("cat");
  const subFilter = searchParams.get("sub");
  const [activeCategory, setActiveCategory] = useState<string>(catFilter || "all");
  const [activeSub, setActiveSub] = useState<string>(subFilter || "all");

  const categories = ["all", "stickers", "posters"];
  const subcategories = ["all", "cars", "bikes", "jdm", "f1", "motogp", "quotes"];

  const filtered = products.filter((p) => {
    if (activeCategory !== "all" && p.category !== activeCategory) return false;
    if (activeSub !== "all" && p.subcategory !== activeSub) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">THE SHOP</h1>
          <p className="text-muted-foreground font-body text-sm mb-12 max-w-md">
            Premium vinyl stickers and wall posters. Every piece is designed for the underground.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-display text-[10px] tracking-widest uppercase px-4 py-2 transition-colors duration-150 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-container text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSub(sub)}
                className={`font-display text-[10px] tracking-widest uppercase px-3 py-1.5 transition-colors duration-150 ${
                  activeSub === sub
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body">No products found. Try a different filter.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
