// import { Link } from "react-router-dom";
// import {
//   ShoppingBag,
//   Star,
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useRef, useMemo, useEffect } from "react";
// import { useProducts } from "@/hooks/use-products";

// const TrendingRow = (): JSX.Element => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const { data: allProducts = [], isLoading } = useProducts();

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollLeft = 0;
//     }
//   }, [isLoading]);

//   const featuredProducts = useMemo(() => {
//     return allProducts.filter((p) => p.is_featured && p.is_active);
//   }, [allProducts]);

//   const scroll = (direction: "left" | "right"): void => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       const scrollAmount =
//         window.innerWidth < 768 ? clientWidth : clientWidth * 0.8;
//       const scrollTo =
//         direction === "left"
//           ? scrollLeft - scrollAmount
//           : scrollLeft + scrollAmount;

//       scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="pb-12 md:pb-24 bg-background relative overflow-hidden">
//       <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

//       <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
//           <div className="flex items-center gap-3">
//             <div className="w-2 h-8 md:h-12 bg-primary" />
//             <h2 className="font-display text-[7vw] sm:text-4xl md:text-6xl font-black tracking-tighter uppercase text-foreground leading-none">
//               Trending <span className="text-accent">Now</span>
//             </h2>
//           </div>

//           <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
//             <Link
//               to="/shop"
//               className="text-[8px] md:text-[10px] font-black uppercase tracking-widest border-b-2 border-primary pb-1"
//             >
//               View All
//             </Link>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => scroll("left")}
//                 className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white border-2 border-foreground hover:bg-primary transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
//               >
//                 <ChevronLeft size={20} strokeWidth={3} />
//               </button>
//               <button
//                 onClick={() => scroll("right")}
//                 className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white border-2 border-foreground hover:bg-primary transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
//               >
//                 <ChevronRight size={20} strokeWidth={3} />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={scrollRef}
//           className="flex overflow-x-auto pb-8 md:pb-12 gap-5 md:gap-8 no-scrollbar snap-x snap-mandatory touch-action-pan-y"
//         >
//           {isLoading ? (
//             <div className="w-full flex justify-center py-20">
//               <Loader2 className="animate-spin text-primary" size={32} />
//             </div>
//           ) : (
//             featuredProducts.map((product, i) => (
//               <motion.div
//                 key={product.id}
//                 initial={{ opacity: 0, y: 15 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 viewport={{ once: true }}
//                 className="min-w-[260px] sm:min-w-[320px] md:min-w-[380px] snap-start group"
//               >
//                 <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border-2 border-foreground shadow-sm group-hover:shadow-lg transition-all duration-500">
//                   <Link
//                     to={`/product/${product.id}`}
//                     className="absolute inset-0 z-10"
//                   >
//                     <img
//                       src={product.image_url.replace(
//                         "/upload/",
//                         "/upload/w_800,f_auto,q_auto/",
//                       )}
//                       alt={product.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </Link>

//                   <div className="absolute top-3 left-0 bg-foreground text-background text-[7px] md:text-[9px] font-black px-3 py-1.5 uppercase tracking-widest z-20">
//                     {product.badge || "Best Seller"}
//                   </div>

//                   <button className="absolute bottom-4 right-4 w-10 h-10 md:w-14 md:h-14 bg-white border-2 border-foreground flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-20">
//                     <ShoppingBag size={18} strokeWidth={3} />
//                   </button>
//                 </div>

//                 <div className="mt-5 px-1">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-[7px] md:text-[9px] font-black text-primary tracking-widest uppercase">
//                       {product.category}
//                     </span>
//                     <div className="flex items-center gap-1 text-accent">
//                       <Star size={10} fill="currentColor" />
//                       <span className="text-[8px] md:text-[10px] font-black">
//                         5.0
//                       </span>
//                     </div>
//                   </div>

//                   <Link to={`/product/${product.id}`}>
//                     <h3 className="font-display text-sm md:text-xl font-black text-foreground uppercase tracking-tight group-hover:text-primary truncate">
//                       {product.name}
//                     </h3>
//                   </Link>

//                   <div className="flex items-center gap-3 mt-3">
//                     <span className="text-lg md:text-2xl font-black text-foreground">
//                       ₹{product.price}
//                     </span>
//                     <span className="text-[10px] md:text-sm text-foreground/30 line-through font-bold">
//                       ₹{Math.round(product.price * 1.6)}
//                     </span>
//                     <div className="ml-auto bg-accent-lime px-2 py-0.5 text-[7px] md:text-[9px] font-black uppercase">
//                       -40%
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}

//           <Link
//             to="/shop"
//             className="min-w-[260px] sm:min-w-[320px] md:min-w-[380px] snap-start flex flex-col items-center justify-center border-4 border-dashed border-foreground/10 bg-white/50 hover:bg-white hover:border-primary transition-all duration-300 group"
//           >
//             <div className="w-14 h-14 md:w-20 md:h-20 rounded-none border-2 border-foreground flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
//               <ArrowRight size={24} />
//             </div>
//             <span className="font-display text-xs md:text-xl font-black uppercase tracking-tight text-foreground text-center px-4">
//               Explore More
//             </span>
//           </Link>
//         </div>
//       </div>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//           touch-action: pan-y;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default TrendingRow;

import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useMemo, useEffect } from "react";
import { useProducts } from "@/hooks/use-products";

const TrendingRow = (): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: allProducts = [], isLoading } = useProducts();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [isLoading]);

  const featuredProducts = useMemo(() => {
    return allProducts.filter((p) => p.is_featured && p.is_active);
  }, [allProducts]);

  const scroll = (direction: "left" | "right"): void => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        window.innerWidth < 768 ? clientWidth : clientWidth * 0.8;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="pb-12 md:pb-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 md:h-12 bg-primary" />
            <h2 className="font-display text-[7vw] sm:text-4xl md:text-6xl font-black tracking-tighter uppercase text-foreground leading-none">
              Trending <span className="text-accent">Now</span>
            </h2>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            <Link
              to="/shop"
              className="text-[8px] md:text-[10px] font-black uppercase tracking-widest border-b-2 border-primary pb-1"
            >
              View All
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white border-2 border-black hover:bg-primary transition-all shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white border-2 border-black hover:bg-primary transition-all shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
              >
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-12 pt-4 gap-5 md:gap-8 no-scrollbar snap-x snap-mandatory touch-action-pan-y"
        >
          {isLoading ? (
            <div className="w-full flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="min-w-[260px] sm:min-w-[320px] md:min-w-[380px] snap-start group"
              >
                {/* Product Image Card */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] group-hover:shadow-[8px_8px_0px_0px_#00D4FF] group-hover:-translate-y-2 transition-all duration-300">
                  <Link
                    to={`/product/${product.id}`}
                    className="absolute inset-0 z-10 block"
                  >
                    <img
                      src={product.image_url.replace(
                        "/upload/",
                        "/upload/w_800,f_auto,q_auto/",
                      )}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Badge */}
                  <div className="absolute top-3 left-0 bg-black text-white text-[7px] md:text-[9px] font-black px-3 py-1.5 uppercase tracking-widest z-20">
                    {product.badge || "Best Seller"}
                  </div>

                  {/* Quick Add Button */}
                  <button className="absolute bottom-4 right-4 w-10 h-10 md:w-14 md:h-14 bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000] hover:bg-primary hover:shadow-[3px_3px_0px_0px_#00D4FF] transition-colors z-20">
                    <ShoppingBag size={18} strokeWidth={3} />
                  </button>
                </div>

                {/* Product Details */}
                <div className="mt-5 px-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[7px] md:text-[9px] font-black text-primary tracking-widest uppercase">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-accent">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[8px] md:text-[10px] font-black">
                        5.0
                      </span>
                    </div>
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-sm md:text-xl font-black text-foreground uppercase tracking-tight hover:text-primary truncate transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-lg md:text-2xl font-black text-foreground">
                      ₹{product.price}
                    </span>
                    <span className="text-[10px] md:text-sm text-foreground/30 line-through font-bold">
                      ₹{Math.round(product.price * 1.6)}
                    </span>
                    <div className="ml-auto bg-primary px-2 py-0.5 text-[7px] md:text-[9px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                      -40%
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {/* Explore More Card */}
          <Link
            to="/shop"
            className="min-w-[260px] sm:min-w-[320px] md:min-w-[380px] snap-start flex flex-col items-center justify-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#00D4FF] hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-none border-2 border-black flex items-center justify-center mb-6 bg-primary shadow-[4px_4px_0px_0px_#000]">
              <ArrowRight size={24} />
            </div>
            <span className="font-display text-xs md:text-xl font-black uppercase tracking-tight text-foreground text-center px-4">
              Explore More
            </span>
          </Link>
        </div>
      </div>

      {/* Hide Scrollbar Utility */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none;
          touch-action: pan-y; 
        }
      `}</style>
    </section>
  );
};

export default TrendingRow;