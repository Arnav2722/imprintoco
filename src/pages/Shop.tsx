// import { useState, useEffect, useMemo } from "react";
// import { useSearchParams } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ProductCard from "@/components/ProductCard";
// import { useProducts, DbProduct } from "@/hooks/use-products";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Loader2,
//   Filter,
//   LayoutGrid,
//   ChevronDown,
//   SortAsc,
// } from "lucide-react";

// type SortOption = "newest" | "price-low" | "price-high";

// const Shop = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   // URL Params Sync
//   const catParam = searchParams.get("cat") || "all";
//   const subParam = searchParams.get("sub") || "all";
//   const sortParam = (searchParams.get("sort") as SortOption) || "newest";

//   const [activeCategory, setActiveCategory] = useState<string>(catParam);
//   const [activeSub, setActiveSub] = useState<string>(subParam);
//   const [sortBy, setSortBy] = useState<SortOption>(sortParam);

//   // Data Fetching
//   const { data: allProducts = [], isLoading } = useProducts();

//   // Logic: Filter & Sort on Frontend for instant feel
//   const filteredProducts = useMemo(() => {
//     let result = [...allProducts];

//     if (activeCategory !== "all") {
//       result = result.filter(
//         (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
//       );
//     }

//     if (activeSub !== "all") {
//       result = result.filter(
//         (p) => p.subcategory?.toLowerCase() === activeSub.toLowerCase(),
//       );
//     }

//     // Sorting Logic
//     if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
//     if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
//     if (sortBy === "newest") result.reverse(); // Assuming Firestore returns chronological

//     return result;
//   }, [allProducts, activeCategory, activeSub, sortBy]);

//   const categories: string[] = ["all", "stickers", "posters", "combo"];
//   const subcategories: string[] = [
//     "all",
//     "cars",
//     "bikes",
//     "f1",
//     "motogp",
//     "superhero",
//     "movies",
//     "tv_series",
//     "music",
//     "video_games",
//     "motivation",
//     "cricket",
//     "football",
//   ];

//   useEffect(() => {
//     const params: Record<string, string> = {};
//     if (activeCategory !== "all") params.cat = activeCategory;
//     if (activeSub !== "all") params.sub = activeSub;
//     if (sortBy !== "newest") params.sort = sortBy;
//     setSearchParams(params);
//   }, [activeCategory, activeSub, sortBy, setSearchParams]);

//   return (
//     <div className="min-h-screen bg-[#050505] text-white font-bricolage selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-32 pb-20 px-6">
//         <div className="max-w-[1400px] mx-auto">
//           {/* HEADER SECTION */}
//           <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-10 gap-8">
//             <div>
//               <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
//                 The <span className="text-primary">Inventory</span>
//               </h1>
//               <p className="text-gray-500 text-[10px] font-black tracking-[0.3em] uppercase max-w-xl leading-relaxed">
//                 Premium waterproof artifacts. Engineered for the obsessed.
//               </p>
//             </div>

//             {/* SORT DROPDOWN */}
//             <div className="relative flex items-center gap-4">
//               <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
//                 <SortAsc size={14} /> Sort By:
//               </span>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value as SortOption)}
//                 className="bg-transparent border-b border-white/10 text-white text-[11px] font-black uppercase tracking-widest focus:border-primary outline-none py-1 cursor-pointer"
//               >
//                 <option value="newest" className="bg-black">
//                   New Arrivals
//                 </option>
//                 <option value="price-low" className="bg-black">
//                   Price: Low to High
//                 </option>
//                 <option value="price-high" className="bg-black">
//                   Price: High to Low
//                 </option>
//               </select>
//             </div>
//           </header>

//           <div className="grid lg:grid-cols-5 gap-16">
//             {/* SIDEBAR FILTERS */}
//             <aside className="lg:col-span-1 space-y-12">
//               <div className="sticky top-32">
//                 <div className="mb-10">
//                   <h3 className="flex items-center gap-2 text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase mb-6">
//                     <Filter size={12} className="text-primary" /> Sector
//                   </h3>
//                   <div className="flex flex-col gap-3">
//                     {categories.map((cat) => (
//                       <button
//                         key={cat}
//                         onClick={() => setActiveCategory(cat)}
//                         className={`text-left text-[11px] font-black uppercase tracking-widest transition-all ${
//                           activeCategory === cat
//                             ? "text-primary translate-x-2"
//                             : "text-gray-500 hover:text-white"
//                         }`}
//                       >
//                         {cat === "all" ? "All Divisions" : cat}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="flex items-center gap-2 text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase mb-6">
//                     <LayoutGrid size={12} className="text-primary" /> Subculture
//                   </h3>
//                   <div className="flex flex-col gap-2 h-72 overflow-y-auto custom-scrollbar">
//                     {subcategories.map((sub) => (
//                       <button
//                         key={sub}
//                         onClick={() => setActiveSub(sub)}
//                         className={`text-left text-[11px] font-black uppercase tracking-widest py-1 transition-all ${
//                           activeSub === sub
//                             ? "text-primary translate-x-2"
//                             : "text-gray-600 hover:text-white"
//                         }`}
//                       >
//                         {sub.replace("_", " ")}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </aside>

//             {/* PRODUCT GRID */}
//             <div className="lg:col-span-4">
//               {isLoading ? (
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
//                   {Array.from({ length: 6 }).map((_, i) => (
//                     <div key={i} className="animate-pulse space-y-4">
//                       <div className="bg-[#0a0a0a] aspect-[3/4] border border-white/5" />
//                       <div className="h-2 bg-[#0a0a0a] w-3/4 rounded-full" />
//                       <div className="h-2 bg-[#0a0a0a] w-1/4 rounded-full" />
//                     </div>
//                   ))}
//                 </div>
//               ) : filteredProducts.length === 0 ? (
//                 <div className="py-40 text-center border border-white/5 border-dashed">
//                   <p className="text-gray-500 uppercase font-black tracking-widest text-[10px]">
//                     No artifacts found in this sector.
//                   </p>
//                   <button
//                     onClick={() => {
//                       setActiveCategory("all");
//                       setActiveSub("all");
//                     }}
//                     className="mt-6 text-primary text-[10px] font-black uppercase underline tracking-[0.2em]"
//                   >
//                     Reset Connection
//                   </button>
//                 </div>
//               ) : (
//                 <motion.div
//                   layout
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
//                 >
//                   <AnimatePresence mode="popLayout">
//                     {filteredProducts.map((product) => (
//                       <motion.div
//                         layout
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         key={product.id}
//                       >
//                         <ProductCard product={product} />
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Shop;

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts, DbProduct } from "@/hooks/use-products";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, LayoutGrid, ChevronDown, ArrowUpDown, X } from "lucide-react";

type SortOption = "newest" | "price-low" | "price-high";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // URL Params Sync
  const catParam = searchParams.get("cat") || "all";
  const subParam = searchParams.get("sub") || "all";
  const sortParam = (searchParams.get("sort") as SortOption) || "newest";

  const [activeCategory, setActiveCategory] = useState<string>(catParam);
  const [activeSub, setActiveSub] = useState<string>(subParam);
  const [sortBy, setSortBy] = useState<SortOption>(sortParam);

  const { data: allProducts = [], isLoading } = useProducts();

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];
    if (activeCategory !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }
    if (activeSub !== "all") {
      result = result.filter(
        (p) => p.subcategory?.toLowerCase() === activeSub.toLowerCase(),
      );
    }
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") result.reverse();
    return result;
  }, [allProducts, activeCategory, activeSub, sortBy]);

  const categories = ["all", "stickers", "posters", "combo"];
  const subcategories = [
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
  ];

  useEffect(() => {
    const params: Record<string, string> = {};
    if (activeCategory !== "all") params.cat = activeCategory;
    if (activeSub !== "all") params.sub = activeSub;
    if (sortBy !== "newest") params.sort = sortBy;
    setSearchParams(params);
  }, [activeCategory, activeSub, sortBy, setSearchParams]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        {/* HEADER */}
        <header className="mb-10 text-left border-b border-white/5 pb-8">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
            The <span className="text-primary">Collection</span>
          </h1>
          <p className="text-gray-500 text-[11px] font-bold tracking-[0.2em] uppercase max-w-xl">
            High quality prints and stickers for your space. Pick your vibe.
          </p>
        </header>

        {/* MOBILE CONTROLS (Sort & Filter Buttons) */}
        <div className="flex border border-white/10 mb-8 sticky top-20 z-40 bg-black md:hidden">
          <button
            onClick={() => {
              setIsSortOpen(!isSortOpen);
              setIsFilterOpen(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10"
          >
            <ArrowUpDown size={14} className="text-primary" /> Sort
          </button>
          <button
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
              setIsSortOpen(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Filter size={14} className="text-primary" /> Filter
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* DESKTOP SIDEBAR / MOBILE DROPDOWN */}
          <aside
            className={`lg:col-span-1 space-y-10 ${isFilterOpen ? "block fixed inset-0 z-50 bg-black p-10 pt-24" : "hidden lg:block"}`}
          >
            {isFilterOpen && (
              <button
                onClick={() => setIsFilterOpen(false)}
                className="absolute top-8 right-8 text-primary"
              >
                <X size={30} />
              </button>
            )}

            <div className="space-y-10">
              <div>
                <h3 className="text-[10px] font-black text-gray-600 tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                  <LayoutGrid size={12} /> Choose Category
                </h3>
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`text-left text-[11px] font-black uppercase tracking-widest transition-all ${
                        activeCategory === cat
                          ? "text-primary translate-x-2"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {cat === "all" ? "Everything" : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-black text-gray-600 tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                  <Filter size={12} /> Themes
                </h3>
                <div className="flex flex-col gap-2 h-64 overflow-y-auto pr-4 custom-scrollbar">
                  {subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setActiveSub(sub);
                        setIsFilterOpen(false);
                      }}
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
            </div>
          </aside>

          {/* PRODUCT AREA */}
          <div className="lg:col-span-4">
            {/* DESKTOP SORTING */}
            <div className="hidden lg:flex justify-end mb-8">
              <div className="flex items-center gap-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <span>Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent border-b border-white/10 text-white outline-none py-1 cursor-pointer hover:border-primary transition-all"
                >
                  <option value="newest" className="bg-black">
                    Newest First
                  </option>
                  <option value="price-low" className="bg-black">
                    Price: Low to High
                  </option>
                  <option value="price-high" className="bg-black">
                    Price: High to Low
                  </option>
                </select>
              </div>
            </div>

            {/* MOBILE SORT OVERLAY */}
            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="fixed bottom-0 left-0 w-full bg-[#0a0a0a] z-50 p-6 border-t border-white/10 md:hidden"
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em]">
                      Sort Options
                    </span>
                    <button onClick={() => setIsSortOpen(false)}>
                      <X size={20} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    {(
                      ["newest", "price-low", "price-high"] as SortOption[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setIsSortOpen(false);
                        }}
                        className={`text-left py-2 text-[11px] font-black uppercase tracking-widest ${sortBy === opt ? "text-primary" : "text-white"}`}
                      >
                        {opt.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* GRID */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse space-y-4">
                    <div className="bg-[#0a0a0a] aspect-[3/4] border border-white/5" />
                    <div className="h-2 bg-[#0a0a0a] w-3/4" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;