// import { useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ProductCard from "@/components/ProductCard";
// import PromoBanner from "@/components/PromoBanner";
// import { useProducts } from "@/hooks/use-products";

// const Shop = () => {
//   const [searchParams] = useSearchParams();
//   const catFilter = searchParams.get("cat");
//   const subFilter = searchParams.get("sub");
//   const [activeCategory, setActiveCategory] = useState<string>(catFilter || "all");
//   const [activeSub, setActiveSub] = useState<string>(subFilter || "all");

//   const { data: products = [], isLoading } = useProducts({
//     category: activeCategory,
//     subcategory: activeSub,
//   });

//   const categories = ["all", "stickers", "posters", "combo"];
//   const subcategories = [
//     "all", "cars", "bikes", "f1", "motogp", "superhero",
//     "movies", "tv_series", "music", "video_games",
//     "motivation", "cricket", "football", "custom",
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="pt-24 pb-20">
//         <div className="max-w-[1400px] mx-auto px-6">
//           <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">THE SHOP</h1>
//           <p className="text-muted-foreground font-body text-sm mb-8 max-w-md">
//             Premium vinyl stickers and wall posters. Every piece is designed for the underground.
//           </p>

//           <PromoBanner />

//           <div className="flex flex-wrap gap-3 mt-10 mb-6">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`font-display text-[10px] tracking-widest uppercase px-4 py-2 transition-colors duration-150 ${
//                   activeCategory === cat
//                     ? "bg-primary text-primary-foreground"
//                     : "bg-surface-container text-muted-foreground hover:text-foreground"
//                 }`}
//               >
//                 {cat === "tv_series" ? "TV SERIES" : cat}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-wrap gap-2 mb-12">
//             {subcategories.map((sub) => (
//               <button
//                 key={sub}
//                 onClick={() => setActiveSub(sub)}
//                 className={`font-display text-[10px] tracking-widest uppercase px-3 py-1.5 transition-colors duration-150 ${
//                   activeSub === sub
//                     ? "text-primary"
//                     : "text-muted-foreground hover:text-foreground"
//                 }`}
//               >
//                 {sub.replace("_", " ")}
//               </button>
//             ))}
//           </div>

//           {isLoading ? (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {Array.from({ length: 8 }).map((_, i) => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-surface-container aspect-square mb-3" />
//                   <div className="h-3 bg-surface-container w-3/4 mb-2" />
//                   <div className="h-3 bg-surface-container w-1/2" />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}

//           {!isLoading && products.length === 0 && (
//             <div className="text-center py-20">
//               <p className="text-muted-foreground font-body">No products found. Try a different filter.</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Shop;

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { motion } from "framer-motion";
import { Loader2, Filter, LayoutGrid } from "lucide-react";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const catParam = searchParams.get("cat") || "all";
  const subParam = searchParams.get("sub") || "all";

  const [activeCategory, setActiveCategory] = useState<string>(catParam);
  const [activeSub, setActiveSub] = useState<string>(subParam);

  const { data: products = [], isLoading } = useProducts({
    category: activeCategory,
    subcategory: activeSub,
  });

  const categories: string[] = ["all", "stickers", "posters", "combo"];
  const subcategories: string[] = [
    "all",
    "cars",
    "bikes",
    "f1",
    "motogp",
    "superhero",
    "movies",
    "tv_series",
    "music",
    "video_games",
    "motivation",
    "cricket",
    "football",
    "custom",
  ];

  // Sync URL with state
  useEffect(() => {
    const params: Record<string, string> = {};
    if (activeCategory !== "all") params.cat = activeCategory;
    if (activeSub !== "all") params.sub = activeSub;
    setSearchParams(params);
  }, [activeCategory, activeSub, setSearchParams]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* HEADER SECTION */}
          <header className="mb-16 text-left border-b border-white/5 pb-12">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              The <span className="text-primary">Inventory</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase max-w-xl leading-relaxed">
              Premium waterproof vinyl and matte artifacts. Engineered for the
              fans who live for the thrill.
            </p>
          </header>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* SIDEBAR FILTERS */}
            <aside className="lg:col-span-1 space-y-10 text-left">
              <div>
                <h3 className="flex items-center gap-2 text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase mb-6">
                  <Filter size={12} className="text-primary" /> Category
                </h3>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left text-[11px] font-black uppercase tracking-widest py-2 transition-all ${
                        activeCategory === cat
                          ? "text-primary translate-x-2"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {cat === "all" ? "Full Access" : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase mb-6">
                  <LayoutGrid size={12} className="text-primary" /> Subculture
                </h3>
                <div className="flex flex-col gap-2">
                  {subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setActiveSub(sub)}
                      className={`text-left text-[11px] font-black uppercase tracking-widest py-1 transition-all ${
                        activeSub === sub
                          ? "text-primary translate-x-2"
                          : "text-gray-600 hover:text-white"
                      }`}
                    >
                      {sub.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="lg:col-span-4">
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse space-y-4">
                      <div className="bg-[#0a0a0a] aspect-[2/3] border border-white/5" />
                      <div className="h-4 bg-[#0a0a0a] w-3/4" />
                      <div className="h-4 bg-[#0a0a0a] w-1/4" />
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="py-40 text-center border border-white/5 border-dashed">
                  <p className="text-gray-500 uppercase font-black tracking-widest text-xs">
                    No artifacts found in this sector.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("all");
                      setActiveSub("all");
                    }}
                    className="mt-6 text-primary text-[10px] font-black uppercase underline tracking-[0.2em]"
                  >
                    Reset Connection
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10"
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;