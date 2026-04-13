// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Search, SlidersHorizontal, ArrowUpRight, Zap } from "lucide-react";

// // Mock data for initial UI check
// const CATEGORIES = ["All", "Anime", "Motorsport", "JDM", "Retro", "Minimalist"];

// const Explore = () => {
//   const [activeCategory, setActiveCategory] = useState("All");

//   return (
//     <div className="min-h-screen bg-[#020202] text-white font-bricolage selection:bg-primary/30">
//       <Navbar />

//       <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
//         {/* Header Section */}
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
//                 Curated collections of premium artifacts. Built for those who
//                 refuse to settle for empty walls.
//               </p>
//             </div>
//           </div>

//           {/* Search Bar - Brutalist Style */}
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
//             <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-4">
//               <span className="text-[9px] font-black text-white/20 tracking-widest uppercase">
//                 Press Enter to Search
//               </span>
//               <div className="h-8 w-px bg-white/10" />
//               <button className="text-white hover:text-primary transition-colors">
//                 <SlidersHorizontal size={18} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Filter Navigation */}
//         <div className="flex flex-wrap gap-3 mb-12 border-b border-white/5 pb-8">
//           {CATEGORIES.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
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

//         {/* Grid Section */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//           {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//             <div
//               key={i}
//               className="group relative flex flex-col gap-4 border border-white/5 p-3 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500"
//             >
//               {/* Product Visual */}
//               <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
//                 <img
//                   src={`/Posters/placeholder-${i}.jpg`} // Yahan apne image assets dalna
//                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
//                   alt="Product"
//                 />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                   <button className="bg-primary text-black p-4 rounded-none scale-90 group-hover:scale-100 transition-transform">
//                     <ArrowUpRight size={20} />
//                   </button>
//                 </div>
//               </div>

//               {/* Product Info */}
//               <div className="flex justify-between items-start pt-2">
//                 <div className="space-y-1">
//                   <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest">
//                     In Stock
//                   </p>
//                   <h3 className="text-xs md:text-sm font-black uppercase tracking-tighter italic group-hover:text-primary transition-colors">
//                     Artifact Prototype {i}
//                   </h3>
//                   <div className="flex gap-2">
//                     <span className="text-[8px] font-bold text-white/20 border border-white/10 px-1.5 py-0.5 uppercase">
//                       Matte
//                     </span>
//                     <span className="text-[8px] font-bold text-white/20 border border-white/10 px-1.5 py-0.5 uppercase">
//                       Heavy Finish
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-sm font-black italic">₹149</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Load More Button */}
//         <div className="mt-20 text-center">
//           <button className="group flex flex-col items-center gap-4 mx-auto">
//             <div className="h-12 w-px bg-white/10 group-hover:bg-primary transition-colors" />
//             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 group-hover:text-white transition-colors">
//               Load More Drops
//             </span>
//           </button>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Explore;

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  Zap,
  Loader2,
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
    <div className="min-h-screen bg-[#020202] text-white font-bricolage selection:bg-primary/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-8 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
              Explore <br />
              <span className="text-primary not-italic">The Vault.</span>
            </h1>

            <div className="bg-white/[0.02] border border-white/5 p-6 flex flex-col gap-2 max-w-sm">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                <Zap size={12} fill="currentColor" /> Handpicked Drops
              </span>
              <p className="text-[11px] text-white/40 font-bold leading-relaxed uppercase">
                Premium artifacts for the obsessed. Built to dominate your
                walls.
              </p>
            </div>
          </div>

          <div className="relative group">
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="SEARCH BY ANIME, CAR, OR THEME..."
              className="w-full bg-white/[0.02] border border-white/10 py-8 pl-16 pr-6 text-[11px] font-black tracking-[0.4em] uppercase focus:border-primary focus:bg-white/[0.04] outline-none transition-all placeholder:text-white/10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12 border-b border-white/5 pb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(8);
              }}
              className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-primary text-black border-primary italic scale-105"
                  : "bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col gap-4 border border-white/5 p-3 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                <img
                  src={product.img}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-90 group-hover:brightness-110"
                  alt={product.name}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-primary text-black p-4 rounded-none scale-90 group-hover:scale-100 transition-transform">
                    <ArrowUpRight size={20} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-start pt-2">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest leading-none">
                    {product.cat}
                  </p>
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-tighter italic group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex gap-2">
                    <span className="text-[8px] font-bold text-white/20 border border-white/10 px-1.5 py-0.5 uppercase tracking-tighter">
                      Limited Edition
                    </span>
                  </div>
                </div>
                <p className="text-sm font-black italic">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredProducts.length && (
          <div className="mt-20 text-center">
            <button
              onClick={handleLoadMore}
              disabled={isBtnLoading}
              className="group flex flex-col items-center gap-4 mx-auto disabled:opacity-50"
            >
              <div
                className={`h-12 w-px bg-white/10 group-hover:bg-primary transition-colors ${isBtnLoading ? "animate-bounce h-16 bg-primary" : ""}`}
              />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 group-hover:text-white transition-colors">
                {isBtnLoading ? "Unlocking..." : "Load More Drops"}
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