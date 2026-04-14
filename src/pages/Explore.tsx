// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import {
//   Search,
//   SlidersHorizontal,
//   ArrowUpRight,
//   Zap,
//   Loader2,
// } from "lucide-react";

// const CATEGORIES = ["All", "Anime", "Motorsport", "JDM", "Retro", "Minimalist"];

// const ALL_PRODUCTS = [
//   {
//     id: 1,
//     name: "Nismo R34 Z-Tune",
//     price: 149,
//     cat: "JDM",
//     img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 2,
//     name: "Red Bull RB20 Concept",
//     price: 149,
//     cat: "Motorsport",
//     img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 3,
//     name: "Gundam Wing Zero",
//     price: 149,
//     cat: "Anime",
//     img: "https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 4,
//     name: "Tokyo Night Drifter",
//     price: 119,
//     cat: "Retro",
//     img: "https://images.unsplash.com/photo-1555624150-43503813e8b5?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 5,
//     name: "Porsche 911 GT3 RS",
//     price: 169,
//     cat: "Motorsport",
//     img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 6,
//     name: "Akira Neo-Tokyo",
//     price: 149,
//     cat: "Anime",
//     img: "https://images.unsplash.com/photo-1560972550-aba3456b5564?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 7,
//     name: "Skyline GTR V-Spec",
//     price: 149,
//     cat: "JDM",
//     img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 8,
//     name: "Initial D AE86",
//     price: 119,
//     cat: "Anime",
//     img: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 9,
//     name: "Ferrari F40 Legacy",
//     price: 189,
//     cat: "Motorsport",
//     img: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 10,
//     name: "Cyberpunk Oni Mask",
//     price: 99,
//     cat: "Anime",
//     img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 11,
//     name: "Supra MK4 Turbo",
//     price: 149,
//     cat: "JDM",
//     img: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: 12,
//     name: "Vaporwave Sunset",
//     price: 119,
//     cat: "Retro",
//     img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
//   },
// ];

// const Explore = () => {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [visibleCount, setVisibleCount] = useState(8);
//   const [isBtnLoading, setIsBtnLoading] = useState(false);

//   const filteredProducts = ALL_PRODUCTS.filter(
//     (p) => activeCategory === "All" || p.cat === activeCategory,
//   );

//   const handleLoadMore = () => {
//     setIsBtnLoading(true);
//     setTimeout(() => {
//       setVisibleCount((prev) => prev + 4);
//       setIsBtnLoading(false);
//     }, 600);
//   };

//   return (
//     <div className="min-h-screen bg-[#020202] text-white font-bricolage selection:bg-primary/30">
//       <Navbar />

//       <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
//         <div className="flex flex-col gap-8 mb-16">
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//             <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
//               Explore <br />
//               <span className="text-primary not-italic">The Vault.</span>
//             </h1>

//             <div className="bg-white/[0.02] border border-white/5 p-6 flex flex-col gap-2 max-w-sm">
//               <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
//                 <Zap size={12} fill="currentColor" /> Handpicked Drops
//               </span>
//               <p className="text-[11px] text-white/40 font-bold leading-relaxed uppercase">
//                 Premium artifacts for the obsessed. Built to dominate your
//                 walls.
//               </p>
//             </div>
//           </div>

//           <div className="relative group">
//             <Search
//               className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors"
//               size={20}
//             />
//             <input
//               type="text"
//               placeholder="SEARCH BY ANIME, CAR, OR THEME..."
//               className="w-full bg-white/[0.02] border border-white/10 py-8 pl-16 pr-6 text-[11px] font-black tracking-[0.4em] uppercase focus:border-primary focus:bg-white/[0.04] outline-none transition-all placeholder:text-white/10"
//             />
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-3 mb-12 border-b border-white/5 pb-8">
//           {CATEGORIES.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setActiveCategory(cat);
//                 setVisibleCount(8);
//               }}
//               className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
//                 activeCategory === cat
//                   ? "bg-primary text-black border-primary italic scale-105"
//                   : "bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//           {filteredProducts.slice(0, visibleCount).map((product) => (
//             <div
//               key={product.id}
//               className="group relative flex flex-col gap-4 border border-white/5 p-3 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500"
//             >
//               <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
//                 <img
//                   src={product.img}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-90 group-hover:brightness-110"
//                   alt={product.name}
//                 />
//                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                   <button className="bg-primary text-black p-4 rounded-none scale-90 group-hover:scale-100 transition-transform">
//                     <ArrowUpRight size={20} />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-between items-start pt-2">
//                 <div className="space-y-1">
//                   <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest leading-none">
//                     {product.cat}
//                   </p>
//                   <h3 className="text-xs md:text-sm font-black uppercase tracking-tighter italic group-hover:text-primary transition-colors">
//                     {product.name}
//                   </h3>
//                   <div className="flex gap-2">
//                     <span className="text-[8px] font-bold text-white/20 border border-white/10 px-1.5 py-0.5 uppercase tracking-tighter">
//                       Limited Edition
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-sm font-black italic">₹{product.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {visibleCount < filteredProducts.length && (
//           <div className="mt-20 text-center">
//             <button
//               onClick={handleLoadMore}
//               disabled={isBtnLoading}
//               className="group flex flex-col items-center gap-4 mx-auto disabled:opacity-50"
//             >
//               <div
//                 className={`h-12 w-px bg-white/10 group-hover:bg-primary transition-colors ${isBtnLoading ? "animate-bounce h-16 bg-primary" : ""}`}
//               />
//               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 group-hover:text-white transition-colors">
//                 {isBtnLoading ? "Unlocking..." : "Load More Drops"}
//               </span>
//             </button>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Explore;

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowUpRight,
  Zap,
  Loader2,
  ChevronRight,
  Filter,
} from "lucide-react";

const CATEGORIES = ["All", "Anime", "Motorsport", "JDM", "Retro", "Minimalist"];

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Nismo R34 Z-Tune",
    price: 149,
    cat: "JDM",
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Red Bull RB20 Concept",
    price: 149,
    cat: "Motorsport",
    img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Gundam Wing Zero",
    price: 149,
    cat: "Anime",
    img: "https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Tokyo Night Drifter",
    price: 119,
    cat: "Retro",
    img: "https://images.unsplash.com/photo-1555624150-43503813e8b5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Porsche 911 GT3 RS",
    price: 169,
    cat: "Motorsport",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    name: "Akira Neo-Tokyo",
    price: 149,
    cat: "Anime",
    img: "https://images.unsplash.com/photo-1560972550-aba3456b5564?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    name: "Skyline GTR V-Spec",
    price: 149,
    cat: "JDM",
    img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    name: "Initial D AE86",
    price: 119,
    cat: "Anime",
    img: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 9,
    name: "Ferrari F40 Legacy",
    price: 189,
    cat: "Motorsport",
    img: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 10,
    name: "Cyberpunk Oni Mask",
    price: 99,
    cat: "Anime",
    img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 11,
    name: "Supra MK4 Turbo",
    price: 149,
    cat: "JDM",
    img: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 12,
    name: "Vaporwave Sunset",
    price: 119,
    cat: "Retro",
    img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
  },
];

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const filteredProducts = ALL_PRODUCTS.filter(
    (p) => activeCategory === "All" || p.cat === activeCategory,
  );

  const handleLoadMore = () => {
    setIsBtnLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsBtnLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-40 pb-24 px-6 max-w-[1400px] mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-12 mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-accent fill-accent" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/40">
                  Archive Selection
                </span>
              </div>
              <h1 className="font-display text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8]">
                EXPLORE <br />
                <span className="text-primary not-italic">THE SHOP.</span>
              </h1>
            </div>

            <div className="bg-white border-4 border-foreground p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-sm rotate-1">
              <p className="text-[12px] text-foreground/60 font-black leading-tight uppercase tracking-tight">
                Premium artifacts engineered for the community. High-spec prints
                designed to dominate your environment.
              </p>
            </div>
          </div>

          {/* SEARCH BAR - Massively enlarged industrial style */}
          <div className="relative group">
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-4 text-foreground/20 group-focus-within:text-primary transition-colors">
              <Search size={28} strokeWidth={3} />
            </div>
            <input
              type="text"
              placeholder="SEARCH BY THEME, CAR, OR ANIME..."
              className="w-full bg-white border-4 border-foreground py-10 pl-24 pr-10 text-xl font-black tracking-widest uppercase focus:bg-primary/5 outline-none transition-all placeholder:text-foreground/10 shadow-[12px_12px_0px_0px_rgba(0,212,255,1)] focus:shadow-none"
            />
          </div>
        </div>

        {/* CATEGORY FILTER BAR */}
        <div className="sticky top-24 z-30 bg-background/80 backdrop-blur-md py-6 mb-16 border-b-4 border-foreground/5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-4 min-w-max">
            <div className="flex items-center gap-2 mr-6 border-r-2 border-foreground/10 pr-6">
              <Filter size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Filter By
              </span>
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(8);
                }}
                className={`px-10 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground shadow-[6px_6px_0px_0px_rgba(0,212,255,1)] italic"
                    : "bg-white text-foreground/40 border-foreground/10 hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.slice(0, visibleCount).map((product, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={product.id}
                className="group relative flex flex-col bg-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[16px_16px_0px_0px_rgba(0,212,255,1)] transition-all duration-500 overflow-hidden"
              >
                <div className="relative aspect-[3/4] overflow-hidden border-b-4 border-foreground">
                  <img
                    src={product.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                    alt={product.name}
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white border-4 border-foreground p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                      <ArrowUpRight size={24} strokeWidth={3} />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-accent-lime border-2 border-foreground px-3 py-1 text-[9px] font-black uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {product.cat}
                  </div>
                </div>

                <div className="p-6 flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-display text-lg md:text-xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-[9px] font-black text-foreground/30 border-2 border-foreground/5 px-2 py-0.5 uppercase">
                        Heavyweight Matte
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black italic text-foreground leading-none">
                      ₹{product.price}
                    </p>
                    <p className="text-[8px] font-black text-accent uppercase mt-1 italic tracking-widest">
                      In Stock
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* LOAD MORE BUTTON */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-24 text-center">
            <button
              onClick={handleLoadMore}
              disabled={isBtnLoading}
              className="group relative inline-flex flex-col items-center gap-6 mx-auto"
            >
              <div className="w-20 h-20 border-4 border-foreground flex items-center justify-center rounded-none group-hover:bg-primary transition-all">
                {isBtnLoading ? (
                  <Loader2 className="animate-spin text-foreground" size={32} />
                ) : (
                  <ChevronRight
                    size={32}
                    strokeWidth={3}
                    className="rotate-90 group-hover:translate-y-1 transition-transform"
                  />
                )}
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/30 group-hover:text-foreground transition-colors">
                {isBtnLoading ? "SYNCING..." : "LOAD MORE DROPS"}
              </span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Explore;