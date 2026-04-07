import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <section className="py-20 bg-[#050505] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <h2 className="font-bricolage text-3xl md:text-5xl font-black italic tracking-tighter uppercase">
              Trending <span className="text-primary not-italic">Now</span>
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-2 text-gray-500 text-[10px] font-bold tracking-widest uppercase">
            Scroll to explore <span className="w-10 h-[1px] bg-gray-800" />
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar snap-x snap-mandatory">
          {trendingProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[280px] md:min-w-[320px] snap-start group"
            >
              <Link
                to={`/product/${product.id}`}
                className="block relative aspect-[2/3] overflow-hidden rounded-sm bg-gray-900 border border-white/5"
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-primary text-black text-[10px] font-black px-3 py-1 uppercase italic skew-x-[-10deg]">
                  Best Seller
                </div>

                {/* Quick Add Button - Floating Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform">
                  <button className="bg-white text-black p-4 rounded-full hover:bg-primary transition-colors shadow-2xl">
                    <ShoppingBag size={24} strokeWidth={2.5} />
                  </button>
                </div>
              </Link>

              {/* Product Info */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-bold">5.0</span>
                  </div>
                </div>

                <h3 className="font-bricolage text-xl font-bold text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xl font-black text-white">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-gray-600 line-through">
                    ₹499
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* View More Card at the end */}
          <Link
            to="/shop"
            className="min-w-[280px] md:min-w-[320px] snap-start flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-sm hover:border-primary/40 transition-colors group"
          >
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:border-primary transition-all">
              <span className="text-2xl text-white group-hover:text-black font-bold">
                →
              </span>
            </div>
            <span className="font-bricolage text-xl font-black italic uppercase tracking-tighter">
              View All Items
            </span>
          </Link>
        </div>
      </div>

      {/* Tailwind Utility for hiding scrollbar (Add this in index.css) */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default TrendingRow;
