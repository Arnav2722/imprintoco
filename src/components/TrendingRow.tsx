// import { Link } from "react-router-dom";
// import { ShoppingBag, Star } from "lucide-react";
// import { motion } from "framer-motion";

// const trendingProducts = [
//   {
//     id: 1,
//     name: "Ayrton Senna 'Legend'",
//     price: "299",
//     category: "F1",
//     image: "/Posters/f1c3.jpg",
//   },
//   {
//     id: 2,
//     name: "Luffy Gear 5",
//     price: "299",
//     category: "Anime",
//     image: "/Posters/f1v2.jpg",
//   },
//   {
//     id: 3,
//     name: "Batman: Dark Knight",
//     price: "299",
//     category: "Movies",
//     image: "/Posters/Batman.jpg",
//   },
//   {
//     id: 4,
//     name: "Porsche GT3 RS",
//     price: "299",
//     category: "Automotive",
//     image: "/Posters/porsche1.jpg",
//   },
//   {
//     id: 5,
//     name: "Senna vs Prost",
//     price: "299",
//     category: "F1",
//     image: "/Posters/f1v4.jpg",
//   },
// ];

// const TrendingRow = () => {
//   return (
//     <section className="py-20 bg-[#050505] border-t border-white/5">
//       <div className="max-w-[1400px] mx-auto px-6">
//         {/* Section Header */}
//         <div className="flex items-center justify-between mb-10">
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-8 bg-primary rounded-full" />
//             <h2 className="font-bricolage text-3xl md:text-5xl font-black italic tracking-tighter uppercase">
//               Trending <span className="text-primary not-italic">Now</span>
//             </h2>
//           </div>

//           <div className="hidden md:flex items-center gap-2 text-gray-500 text-[10px] font-bold tracking-widest uppercase">
//             Scroll to explore <span className="w-10 h-[1px] bg-gray-800" />
//           </div>
//         </div>

//         {/* Horizontal Scroll Container */}
//         <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar snap-x snap-mandatory">
//           {trendingProducts.map((product, i) => (
//             <motion.div
//               key={product.id}
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="min-w-[280px] md:min-w-[320px] snap-start group"
//             >
//               <Link
//                 to={`/product/${product.id}`}
//                 className="block relative aspect-[2/3] overflow-hidden rounded-sm bg-gray-900 border border-white/5"
//               >
//                 {/* Product Image */}
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />

//                 {/* Badge */}
//                 <div className="absolute top-4 left-4 bg-primary text-black text-[10px] font-black px-3 py-1 uppercase italic skew-x-[-10deg]">
//                   Best Seller
//                 </div>

//                 {/* Quick Add Button - Floating Overlay */}
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform">
//                   <button className="bg-white text-black p-4 rounded-full hover:bg-primary transition-colors shadow-2xl">
//                     <ShoppingBag size={24} strokeWidth={2.5} />
//                   </button>
//                 </div>
//               </Link>

//               {/* Product Info */}
//               <div className="mt-5">
//                 <div className="flex items-center justify-between mb-1">
//                   <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
//                     {product.category}
//                   </span>
//                   <div className="flex items-center gap-1 text-gray-500">
//                     <Star size={10} fill="currentColor" />
//                     <span className="text-[10px] font-bold">5.0</span>
//                   </div>
//                 </div>

//                 <h3 className="font-bricolage text-xl font-bold text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">
//                   {product.name}
//                 </h3>

//                 <div className="flex items-center gap-2 mt-2">
//                   <span className="text-xl font-black text-white">
//                     ₹{product.price}
//                   </span>
//                   <span className="text-xs text-gray-600 line-through">
//                     ₹499
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}

//           {/* View More Card at the end */}
//           <Link
//             to="/shop"
//             className="min-w-[280px] md:min-w-[320px] snap-start flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-sm hover:border-primary/40 transition-colors group"
//           >
//             <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:border-primary transition-all">
//               <span className="text-2xl text-white group-hover:text-black font-bold">
//                 →
//               </span>
//             </div>
//             <span className="font-bricolage text-xl font-black italic uppercase tracking-tighter">
//               View All Items
//             </span>
//           </Link>
//         </div>
//       </div>

//       {/* Tailwind Utility for hiding scrollbar (Add this in index.css) */}
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
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

const trendingProducts = [
  {
    id: 1,
    name: "Ayrton Senna 'Legend'",
    price: "299",
    category: "F1",
    image: "/Posters/f1c3.jpg",
  },
  {
    id: 2,
    name: "Luffy Gear 5",
    price: "299",
    category: "Anime",
    image: "/Posters/f1v2.jpg",
  },
  {
    id: 3,
    name: "Batman: Dark Knight",
    price: "299",
    category: "Movies",
    image: "/Posters/Batman.jpg",
  },
  {
    id: 4,
    name: "Porsche GT3 RS",
    price: "299",
    category: "Automotive",
    image: "/Posters/porsche1.jpg",
  },
  {
    id: 5,
    name: "Senna vs Prost",
    price: "299",
    category: "F1",
    image: "/Posters/f1v4.jpg",
  },
];

const TrendingRow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-background border-t border-foreground/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex items-center gap-5">
            <div className="w-3 h-12 bg-primary" />
            <h2 className="font-display text-5xl md:text-6xl font-black tracking-tighter uppercase text-foreground">
              Trending <span className="text-accent italic">Now</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Scroll Navigation Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 flex items-center justify-center bg-white border-2 border-foreground hover:bg-primary transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 flex items-center justify-center bg-white border-2 border-foreground hover:bg-primary transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-12 gap-8 no-scrollbar snap-x snap-mandatory"
        >
          {trendingProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[350px] snap-start group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white border border-foreground/5 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                <Link
                  to={`/product/${product.id}`}
                  className="block w-full h-full"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <div className="absolute top-6 left-0 bg-foreground text-background text-[10px] font-black px-4 py-2 uppercase tracking-widest">
                  Best Seller
                </div>

                <button className="absolute bottom-6 right-6 w-14 h-14 bg-white border-2 border-foreground flex items-center justify-center translate-y-20 group-hover:translate-y-0 transition-all duration-500 hover:bg-accent hover:border-accent hover:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                  <ShoppingBag size={22} strokeWidth={2.5} />
                </button>
              </div>

              <div className="mt-8 px-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black text-primary tracking-[0.2em] uppercase">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-accent">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[12px] font-black">5.0</span>
                  </div>
                </div>

                <Link to={`/product/${product.id}`}>
                  <h3 className="font-display text-2xl font-black text-foreground uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-2xl font-black text-foreground">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-foreground/30 line-through font-bold">
                    ₹499
                  </span>
                  <div className="ml-auto bg-accent-lime px-2 py-0.5 text-[10px] font-black uppercase">
                    Save 40%
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <Link
            to="/shop"
            className="min-w-[300px] md:min-w-[350px] snap-start flex flex-col items-center justify-center border-4 border-dashed border-foreground/5 bg-white/50 hover:bg-white hover:border-primary transition-all duration-500 group"
          >
            <div className="w-20 h-20 rounded-full border-2 border-foreground flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] group-hover:shadow-none">
              <ArrowRight
                size={32}
                className="group-hover:translate-x-2 transition-transform"
              />
            </div>
            <span className="font-display text-2xl font-black uppercase tracking-tighter text-foreground">
              View All Vaults
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