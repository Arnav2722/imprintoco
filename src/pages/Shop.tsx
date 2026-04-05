import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import PromoBanner from "@/components/PromoBanner";
import { useProducts } from "@/hooks/use-products";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const catFilter = searchParams.get("cat");
  const subFilter = searchParams.get("sub");
  const [activeCategory, setActiveCategory] = useState<string>(catFilter || "all");
  const [activeSub, setActiveSub] = useState<string>(subFilter || "all");

  const { data: products = [], isLoading } = useProducts({
    category: activeCategory,
    subcategory: activeSub,
  });

  const categories = ["all", "stickers", "posters", "combo"];
  const subcategories = [
    "all", "cars", "bikes", "f1", "motogp", "superhero",
    "movies", "tv_series", "music", "video_games",
    "motivation", "cricket", "football", "custom",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">THE SHOP</h1>
          <p className="text-muted-foreground font-body text-sm mb-8 max-w-md">
            Premium vinyl stickers and wall posters. Every piece is designed for the underground.
          </p>

          <PromoBanner />

          <div className="flex flex-wrap gap-3 mt-10 mb-6">
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
                {cat === "tv_series" ? "TV SERIES" : cat}
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
                {sub.replace("_", " ")}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-surface-container aspect-square mb-3" />
                  <div className="h-3 bg-surface-container w-3/4 mb-2" />
                  <div className="h-3 bg-surface-container w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!isLoading && products.length === 0 && (
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
