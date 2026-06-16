// import { useState, useEffect, useMemo } from "react";
// import { useSearchParams } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ProductCard from "@/components/ProductCard";
// import { useProducts, DbProduct } from "@/hooks/use-products";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Filter,
//   LayoutGrid,
//   ArrowUpDown,
//   X,
//   Zap,
//   ChevronRight,
// } from "lucide-react";

// type SortOption = "newest" | "price-low" | "price-high";

// const Shop = (): JSX.Element => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
//   const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

//   const catParam = searchParams.get("cat") || "all";
//   const subParam = searchParams.get("sub") || "all";
//   const sortParam = (searchParams.get("sort") as SortOption) || "newest";

//   const [activeCategory, setActiveCategory] = useState<string>(catParam);
//   const [activeSub, setActiveSub] = useState<string>(subParam);
//   const [sortBy, setSortBy] = useState<SortOption>(sortParam);

//   const { data: allProducts = [], isLoading } = useProducts();

//   const filteredProducts = useMemo((): DbProduct[] => {
//     let result = [...allProducts].filter((p) => p.is_active);

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

//     if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
//     if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
//     if (sortBy === "newest") {
//       // Sorting by createdAt Timestamp if available, otherwise fallback
//       result.sort((a, b) => {
//         const dateA = a.createdAt?.seconds || 0;
//         const dateB = b.createdAt?.seconds || 0;
//         return dateB - dateA;
//       });
//     }
//     return result;
//   }, [allProducts, activeCategory, activeSub, sortBy]);

//   const categories: string[] = ["all", "stickers", "posters", "combo"];
//   const subcategories: string[] = [
//     "all",
//     "cars",
//     "bikes",
//     "f1",
//     "motogp",
//     "marvel",
//     "dc",
//     "superhero",
//     "movies",
//     "tv_series",
//     "music",
//     "video_games",
//     "motivation",
//     "devotion",
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
//     <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-40 pb-20 px-6 max-w-[1400px] mx-auto">
//         <header className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <Zap size={18} className="text-accent fill-accent" />
//               <span className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/40">
//                 Inventory Proc03
//               </span>
//             </div>
//             <h1 className="font-display text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8]">
//               THE <span className="text-primary not-italic">SHOP.</span>
//             </h1>
//           </div>

//           <div className="bg-white border-4 border-foreground p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-sm rotate-1">
//             <p className="text-[12px] text-foreground/60 font-black leading-tight uppercase tracking-tight">
//               Industrial grade prints and waterproof vinyls. Curated for the
//               community, engineered for impact.
//             </p>
//           </div>
//         </header>

//         <div className="flex border-4 border-foreground mb-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:hidden">
//           <button
//             onClick={() => {
//               setIsSortOpen(!isSortOpen);
//               setIsFilterOpen(false);
//             }}
//             className="flex-1 flex items-center justify-center gap-3 py-5 text-[11px] font-black uppercase tracking-widest border-r-4 border-foreground"
//           >
//             <ArrowUpDown size={16} className="text-primary" /> Sort
//           </button>
//           <button
//             onClick={() => {
//               setIsFilterOpen(!isFilterOpen);
//               setIsSortOpen(false);
//             }}
//             className="flex-1 flex items-center justify-center gap-3 py-5 text-[11px] font-black uppercase tracking-widest"
//           >
//             <Filter size={16} className="text-primary" /> Filter
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-5 gap-16">
//           <aside
//             className={`lg:col-span-1 space-y-12 ${
//               isFilterOpen
//                 ? "fixed inset-0 z-[2000] bg-white p-6 sm:p-10 pt-32 overflow-y-auto"
//                 : "hidden lg:block"
//             }`}
//           >
//             {isFilterOpen && (
//               <div className="fixed top-0 left-0 right-0 h-24 bg-white/95 backdrop-blur-md z-[2100] flex items-center justify-between px-6 lg:hidden border-b-4 border-foreground">
//                 <span className="text-[12px] font-black uppercase tracking-[0.3em]">
//                   Filter Archive
//                 </span>
//                 <button
//                   onClick={() => setIsFilterOpen(false)}
//                   className="w-12 h-12 bg-foreground text-background flex items-center justify-center shadow-[4px_4px_0px_0px_#00D4FF] active:translate-x-1 active:translate-y-1 transition-all"
//                 >
//                   <X size={24} strokeWidth={3} />
//                 </button>
//               </div>
//             )}

//             <div
//               className={`space-y-12 ${isFilterOpen ? "mt-4" : "sticky top-40"}`}
//             >
//               <div className="space-y-8">
//                 <h3 className="text-[11px] font-black text-foreground/30 uppercase tracking-[0.3em] flex items-center gap-3">
//                   <LayoutGrid size={14} /> CLASSIFICATION
//                 </h3>
//                 <div className="flex flex-col gap-4">
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => {
//                         setActiveCategory(cat);
//                         setIsFilterOpen(false);
//                       }}
//                       className={`text-left text-sm font-black uppercase italic tracking-tighter transition-all flex items-center justify-between group ${
//                         activeCategory === cat
//                           ? "text-primary translate-x-2"
//                           : "text-foreground/40 hover:text-foreground"
//                       }`}
//                     >
//                       {cat === "all" ? "MASTER ARCHIVE" : cat}
//                       <ChevronRight
//                         size={14}
//                         className={`transition-transform ${activeCategory === cat ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-8 pt-10 border-t-4 border-foreground/5">
//                 <h3 className="text-[11px] font-black text-foreground/30 uppercase tracking-[0.3em] flex items-center gap-3">
//                   <Filter size={14} /> CORE THEMES
//                 </h3>
//                 <div className="flex flex-col gap-3 h-[400px] overflow-y-auto pr-4 custom-scrollbar">
//                   {subcategories.map((sub) => (
//                     <button
//                       key={sub}
//                       onClick={() => {
//                         setActiveSub(sub);
//                         setIsFilterOpen(false);
//                       }}
//                       className={`text-left text-[11px] font-black uppercase tracking-widest py-2 transition-all border-l-4 pl-4 ${
//                         activeSub === sub
//                           ? "border-primary text-foreground bg-primary/5"
//                           : "border-transparent text-foreground/30 hover:text-foreground hover:border-foreground/20"
//                       }`}
//                     >
//                       {sub.replace("_", " ")}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </aside>

//           <div className="lg:col-span-4">
//             <div className="hidden lg:flex justify-end mb-12">
//               <div className="flex items-center gap-6 bg-white border-2 border-foreground px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//                 <span className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">
//                   Order By
//                 </span>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value as SortOption)}
//                   className="bg-transparent text-xs font-black uppercase outline-none cursor-pointer hover:text-primary transition-all"
//                 >
//                   <option value="newest">Latest Drops</option>
//                   <option value="price-low">Lowest Cost</option>
//                   <option value="price-high">Premium Tier</option>
//                 </select>
//               </div>
//             </div>

//             <AnimatePresence>
//               {isSortOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 100 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 100 }}
//                   className="fixed bottom-0 left-0 w-full bg-white z-[2000] p-10 border-t-4 border-foreground shadow-[0_-20px_40px_rgba(0,0,0,0.1)] md:hidden rounded-t-[2rem]"
//                 >
//                   <div className="flex justify-between items-center mb-10 pb-6 border-b-2 border-foreground/5">
//                     <span className="text-[12px] font-black uppercase tracking-[0.3em]">
//                       Sort Protocol
//                     </span>
//                     <button
//                       onClick={() => setIsSortOpen(false)}
//                       className="w-10 h-10 bg-muted flex items-center justify-center shadow-[2px_2px_0px_0px_#000]"
//                     >
//                       <X size={20} strokeWidth={3} />
//                     </button>
//                   </div>
//                   <div className="flex flex-col gap-6">
//                     {(
//                       ["newest", "price-low", "price-high"] as SortOption[]
//                     ).map((opt) => (
//                       <button
//                         key={opt}
//                         onClick={() => {
//                           setSortBy(opt);
//                           setIsSortOpen(false);
//                         }}
//                         className={`text-left text-xl font-black uppercase italic tracking-tighter ${sortBy === opt ? "text-primary scale-105" : "text-foreground/40"}`}
//                       >
//                         {opt.replace("-", " ")}
//                       </button>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {isLoading ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <div key={i} className="space-y-6">
//                     <div className="bg-muted aspect-[3/4] border-4 border-foreground/5 animate-pulse" />
//                     <div className="h-4 bg-muted w-3/4 animate-pulse" />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <motion.div
//                 layout
//                 className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12"
//               >
//                 <AnimatePresence mode="popLayout">
//                   {filteredProducts.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </AnimatePresence>
//               </motion.div>
//             )}

//             {filteredProducts.length === 0 && !isLoading && (
//               <div className="py-40 text-center border-4 border-dashed border-foreground/10">
//                 <p className="font-display text-3xl font-black text-foreground/20 uppercase italic tracking-tighter">
//                   Zero Artifacts Found
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       <Footer />
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; border-radius: 0px; }
//       `}</style>
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
import {
  Filter,
  LayoutGrid,
  ArrowUpDown,
  X,
  Zap,
  ChevronRight,
  Box,
} from "lucide-react";

type SortOption = "newest" | "price-low" | "price-high";

const Shop = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  const catParam = searchParams.get("cat") || "all";
  const subParam = searchParams.get("sub") || "all";
  const sortParam = (searchParams.get("sort") as SortOption) || "newest";

  const [activeCategory, setActiveCategory] = useState<string>(catParam);
  const [activeSub, setActiveSub] = useState<string>(subParam);
  const [sortBy, setSortBy] = useState<SortOption>(sortParam);

  const { data: allProducts = [], isLoading } = useProducts();

  const filteredProducts = useMemo((): DbProduct[] => {
    let result = [...allProducts].filter((p) => p.is_active);

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
    if (sortBy === "newest") {
      result.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      });
    }
    return result;
  }, [allProducts, activeCategory, activeSub, sortBy]);

  const categories = ["all", "stickers", "posters",  "combo"];
  // const categories = ["all", "stickers", "posters", "collage", "combo"];

  const layoutSpecs = ["2_piece", "3_piece", "5_panel", "30_piece", "50_piece"];

  const themes = [
    "all",
    "cars",
    "bikes",
    "f1",
    "motogp",
    "anime",
    "marvel",
    "dc",
    "superhero",
    "movies",
    "tv_series",
    "music",
    "video_games",
    "motivation",
    "devotion",
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
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-28 md:pt-40 pb-20 px-6 max-w-[1400px] mx-auto">
        <header className="mb-12 md:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-accent fill-accent" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
                Inventory Proc03
              </span>
            </div>
            <h1 className="font-display text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[1.1]">
              THE <span className="text-primary">SHOP</span>
            </h1>
          </div>

          <div className="bg-white border-2 md:border-4 border-foreground p-6 md:p-8 shadow-[6px_6px_0px_0px_#000] max-w-sm">
            <p className="text-[8px] md:text-[11px] text-foreground/60 font-black leading-relaxed uppercase tracking-tight">
              Industrial grade prints and waterproof vinyls. Curated for the
              community, engineered for impact.
            </p>
          </div>
        </header>

        {/* Mobile Filter & Sort Buttons */}
        <div className="flex border-2 border-foreground mb-8 bg-white shadow-[4px_4px_0px_0px_#000] lg:hidden">
          <button
            onClick={() => {
              setIsSortOpen(!isSortOpen);
              setIsFilterOpen(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-4 text-[9px] font-black uppercase tracking-widest border-r-2 border-foreground"
          >
            <ArrowUpDown size={14} className="text-primary" /> Sort
          </button>
          <button
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
              setIsSortOpen(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-4 text-[9px] font-black uppercase tracking-widest"
          >
            <Filter size={14} className="text-primary" /> Filter
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 md:gap-16">
          <aside
            className={`lg:col-span-1 space-y-12 ${
              isFilterOpen
                ? "fixed inset-0 z-[2000] bg-white p-6 pt-32 overflow-y-auto"
                : "hidden lg:block"
            }`}
          >
            {isFilterOpen && (
              <div className="fixed top-0 left-0 right-0 h-20 bg-white z-[2100] flex items-center justify-between px-6 border-b-2 border-foreground">
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Filter Archive
                </span>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-10 h-10 bg-foreground text-background flex items-center justify-center shadow-[4px_4px_0px_0px_#00D4FF]"
                >
                  <X size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            <div
              className={`space-y-10 ${isFilterOpen ? "mt-4" : "sticky top-40"}`}
            >
              {/* Classification */}
              <div className="space-y-6">
                <h3 className="text-[9px] font-black text-foreground/30 uppercase tracking-[0.3em] flex items-center gap-2">
                  <LayoutGrid size={12} /> Classification
                </h3>
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setActiveSub("all");
                        setIsFilterOpen(false);
                      }}
                      className={`text-left text-[10px] md:text-sm font-black uppercase tracking-tighter transition-all flex items-center justify-between group ${
                        activeCategory === cat
                          ? "text-primary translate-x-1"
                          : "text-foreground/40 hover:text-foreground"
                      }`}
                    >
                      {cat === "all" ? "All" : cat}
                      <ChevronRight
                        size={12}
                        className={`transition-transform ${activeCategory === cat ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* DYNAMIC LAYOUT SPECS (Only for Collage) */}
              {/* {(activeCategory === "collage" || activeCategory === "multi") && (
                <div className="space-y-6 pt-10 border-t-2 border-foreground/5 animate-in fade-in slide-in-from-left-4">
                  <h3 className="text-[9px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                    <Box size={12} className="text-primary" /> Layout Specs
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {layoutSpecs.map((spec) => (
                      <button
                        key={spec}
                        onClick={() => {
                          setActiveSub(spec);
                          setIsFilterOpen(false);
                        }}
                        className={`text-left text-[8px] md:text-[9px] font-black uppercase tracking-widest py-3 px-4 border-2 transition-all ${
                          activeSub === spec
                            ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_#00D4FF]"
                            : "border-foreground/10 text-foreground/40 hover:border-black"
                        }`}
                      >
                        {spec.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Core Themes */}
              <div className="space-y-6 pt-10 border-t-2 border-foreground/5">
                <h3 className="text-[9px] font-black text-foreground/30 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Filter size={12} /> Core Themes
                </h3>
                <div className="flex flex-col gap-2 h-[300px] overflow-y-auto pr-3 custom-scrollbar">
                  {themes.map((theme) => (
                    <button
                      key={theme}
                      onClick={() => {
                        setActiveSub(theme);
                        setIsFilterOpen(false);
                      }}
                      className={`text-left text-[8px] md:text-[10px] font-black uppercase tracking-widest py-2 transition-all border-l-2 pl-3 ${
                        activeSub === theme
                          ? "border-primary text-foreground bg-primary/5"
                          : "border-transparent text-foreground/30 hover:text-foreground hover:border-foreground/20"
                      }`}
                    >
                      {theme.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-4">
            {/* Desktop Sort */}
            <div className="hidden lg:flex justify-end mb-10">
              <div className="flex items-center gap-4 bg-white border-2 border-foreground px-4 py-2 shadow-[4px_4px_0px_0px_#000]">
                <span className="text-[8px] font-black text-foreground/30 uppercase tracking-widest">
                  Order By
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer hover:text-primary transition-all"
                >
                  <option value="newest">Latest Drops</option>
                  <option value="price-low">Lowest Cost</option>
                  <option value="price-high">Premium Tier</option>
                </select>
              </div>
            </div>

            {/* Mobile Sort Overlay */}
            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "100%" }}
                  className="fixed bottom-0 left-0 w-full bg-white z-[2000] p-8 border-t-2 border-foreground shadow-[0_-10px_30px_rgba(0,0,0,0.1)] lg:hidden"
                >
                  <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-foreground/5">
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Sort Protocol
                    </span>
                    <button onClick={() => setIsSortOpen(false)}>
                      <X size={18} strokeWidth={3} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-6">
                    {(
                      ["newest", "price-low", "price-high"] as SortOption[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setIsSortOpen(false);
                        }}
                        className={`text-left text-sm font-black uppercase tracking-widest ${sortBy === opt ? "text-primary" : "text-foreground/40"}`}
                      >
                        {opt.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="bg-muted aspect-[3/4] border-2 border-foreground/5 animate-pulse" />
                    <div className="h-3 bg-muted w-3/4 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {filteredProducts.length === 0 && !isLoading && (
              <div className="py-24 md:py-40 text-center border-2 border-dashed border-foreground/10">
                <p className="font-display text-base md:text-xl font-black text-foreground/20 uppercase tracking-widest">
                  Zero Artifacts Found
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; }
      `}</style>
    </div>
  );
};

export default Shop;