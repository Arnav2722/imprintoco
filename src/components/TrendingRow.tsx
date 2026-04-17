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
// import { useRef, useMemo } from "react";
// import { useProducts } from "@/hooks/use-products";

// const TrendingRow = (): JSX.Element => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const { data: allProducts = [], isLoading } = useProducts();

//   const featuredProducts = useMemo(() => {
//     return allProducts.filter((p) => p.is_featured && p.is_active);
//   }, [allProducts]);

//   const scroll = (direction: "left" | "right"): void => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       const scrollAmount = clientWidth * 0.8;
//       const scrollTo =
//         direction === "left"
//           ? scrollLeft - scrollAmount
//           : scrollLeft + scrollAmount;

//       scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="py-16 md:py-24 bg-background border-t border-foreground/5 relative overflow-hidden">
//       <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-accent/5 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />

//       <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative z-10">
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
//           <div className="flex items-center gap-4 md:gap-5">
//             <div className="w-2 md:w-3 h-10 md:h-12 bg-primary" />
//             <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-foreground leading-none">
//               Trending <span className="text-accent italic">Now</span>
//             </h2>
//           </div>

//           <div className="flex items-center justify-between md:justify-end gap-4">
//             <Link
//               to="/shop"
//               className="md:hidden text-[10px] font-black uppercase tracking-widest border-b-2 border-primary pb-1"
//             >
//               View All
//             </Link>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => scroll("left")}
//                 aria-label="Scroll left"
//                 className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border-2 border-foreground hover:bg-primary transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
//               >
//                 <ChevronLeft size={20} />
//               </button>
//               <button
//                 onClick={() => scroll("right")}
//                 aria-label="Scroll right"
//                 className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border-2 border-foreground hover:bg-primary transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
//               >
//                 <ChevronRight size={20} />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={scrollRef}
//           className="flex overflow-x-auto pb-8 md:pb-12 gap-5 md:gap-8 no-scrollbar snap-x snap-mandatory touch-pan-x"
//         >
//           {isLoading ? (
//             <div className="w-full flex justify-center py-20">
//               <Loader2 className="animate-spin text-primary" size={40} />
//             </div>
//           ) : (
//             featuredProducts.map((product, i) => (
//               <motion.div
//                 key={product.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 viewport={{ once: true }}
//                 className="min-w-[260px] sm:min-w-[300px] md:min-w-[350px] snap-start group"
//               >
//                 <div className="relative aspect-[3/4] overflow-hidden bg-white border border-foreground/5 shadow-sm group-hover:shadow-xl md:group-hover:shadow-2xl transition-all duration-500">
//                   <Link
//                     to={`/product/${product.id}`}
//                     className="block w-full h-full"
//                   >
//                     <img
//                       src={product.image_url.replace(
//                         "/upload/",
//                         "/upload/w_800,f_auto,q_auto/",
//                       )}
//                       alt={product.name}
//                       loading="lazy"
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   </Link>

//                   <div className="absolute top-4 md:top-6 left-0 bg-foreground text-background text-[8px] md:text-[10px] font-black px-3 py-1.5 md:px-4 md:py-2 uppercase tracking-widest">
//                     {product.badge || "Best Seller"}
//                   </div>

//                   <button className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-white border-2 border-foreground flex items-center justify-center md:translate-y-20 md:group-hover:translate-y-0 transition-all duration-500 hover:bg-accent hover:border-accent hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
//                     <ShoppingBag
//                       className="w-5 h-5 md:w-6 md:h-6"
//                       strokeWidth={2.5}
//                     />
//                   </button>
//                 </div>

//                 <div className="mt-6 md:mt-8 px-1 md:px-2">
//                   <div className="flex items-center justify-between mb-1 md:mb-2">
//                     <span className="text-[9px] md:text-[11px] font-black text-primary tracking-[0.2em] uppercase">
//                       {product.category}
//                     </span>
//                     <div className="flex items-center gap-1 text-accent">
//                       <Star
//                         className="w-2.5 h-2.5 md:w-3 md:h-3"
//                         fill="currentColor"
//                       />
//                       <span className="text-[10px] md:text-[12px] font-black">
//                         5.0
//                       </span>
//                     </div>
//                   </div>

//                   <Link to={`/product/${product.id}`}>
//                     <h3 className="font-display text-xl md:text-2xl font-black text-foreground uppercase tracking-tighter group-hover:text-primary transition-colors leading-none truncate">
//                       {product.name}
//                     </h3>
//                   </Link>

//                   <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-3">
//                     <span className="text-xl md:text-2xl font-black text-foreground">
//                       ₹{product.price}
//                     </span>
//                     <span className="text-xs md:text-sm text-foreground/30 line-through font-bold">
//                       ₹{Math.round(product.price * 1.6)}
//                     </span>
//                     <div className="ml-auto bg-accent-lime px-1.5 py-0.5 text-[8px] md:text-[10px] font-black uppercase">
//                       Save 40%
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}

//           <Link
//             to="/shop"
//             className="min-w-[200px] sm:min-w-[300px] md:min-w-[350px] snap-start flex flex-col items-center justify-center border-2 md:border-4 border-dashed border-foreground/10 bg-white/50 hover:bg-white hover:border-primary transition-all duration-500 group"
//           >
//             <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-foreground flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] group-hover:shadow-none">
//               <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
//             </div>
//             <span className="font-display text-lg md:text-2xl font-black uppercase tracking-tighter text-foreground text-center px-4">
//               View All Collection
//             </span>
//           </Link>
//         </div>
//       </div>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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

  // Reset scroll to left on mount
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
      const scrollAmount = clientWidth * 0.8;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background border-t border-foreground/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-accent/5 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="w-2 md:w-3 h-10 md:h-12 bg-primary" />
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-foreground leading-none">
              Trending <span className="text-accent italic">Now</span>
            </h2>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4">
            <Link
              to="/shop"
              className="md:hidden text-[10px] font-black uppercase tracking-widest border-b-2 border-primary pb-1"
            >
              View All
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border-2 border-foreground hover:bg-primary transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border-2 border-foreground hover:bg-primary transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          dir="ltr"
          className="flex overflow-x-auto pb-8 md:pb-12 gap-5 md:gap-8 no-scrollbar snap-x snap-mandatory touch-pan-x"
        >
          {isLoading ? (
            <div className="w-full flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : (
            featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[380px] snap-start group"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border-2 border-foreground shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <Link
                    to={`/product/${product.id}`}
                    className="absolute inset-0 w-full h-full block"
                  >
                    <img
                      src={product.image_url.replace(
                        "/upload/",
                        "/upload/w_1000,f_auto,q_auto/",
                      )}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center block transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  <div className="absolute top-4 md:top-6 left-0 bg-foreground text-background text-[8px] md:text-[10px] font-black px-3 py-1.5 md:px-4 md:py-2 uppercase tracking-widest z-20">
                    {product.badge || "Best Seller"}
                  </div>

                  <button className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-white border-2 border-foreground flex items-center justify-center md:translate-y-24 md:group-hover:translate-y-0 transition-all duration-500 hover:bg-accent hover:border-accent hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20">
                    <ShoppingBag
                      className="w-5 h-5 md:w-6 md:h-6"
                      strokeWidth={2.5}
                    />
                  </button>
                </div>

                <div className="mt-6 md:mt-8 px-1 md:px-2">
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <span className="text-[9px] md:text-[11px] font-black text-primary tracking-[0.2em] uppercase">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-accent">
                      <Star
                        className="w-2.5 h-2.5 md:w-3 md:h-3"
                        fill="currentColor"
                      />
                      <span className="text-[10px] md:text-[12px] font-black">
                        5.0
                      </span>
                    </div>
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-xl md:text-2xl font-black text-foreground uppercase tracking-tighter group-hover:text-primary transition-colors truncate">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-3">
                    <span className="text-xl md:text-2xl font-black text-foreground">
                      ₹{product.price}
                    </span>
                    <span className="text-xs md:text-sm text-foreground/30 line-through font-bold italic">
                      ₹{Math.round(product.price * 1.6)}
                    </span>
                    <div className="ml-auto bg-accent-lime px-1.5 py-0.5 text-[8px] md:text-[10px] font-black uppercase">
                      Save 40%
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          <Link
            to="/shop"
            className="min-w-[280px] sm:min-w-[320px] md:min-w-[380px] snap-start flex flex-col items-center justify-center border-4 border-dashed border-foreground/10 bg-white/50 hover:bg-white hover:border-primary transition-all duration-500 group"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-foreground flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] group-hover:shadow-none">
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </div>
            <span className="font-display text-lg md:text-2xl font-black uppercase tracking-tighter text-foreground text-center px-4">
              View All Collection
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default TrendingRow;