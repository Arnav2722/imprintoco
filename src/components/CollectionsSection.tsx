// import { Link } from "react-router-dom";
// import ProductCard from "@/components/ProductCard";
// import { useProducts } from "@/hooks/use-products";

// const TrendingSection = () => {
//   const { data: products = [] } = useProducts();
//   const trending = products.slice(0, 4);

//   return (
//     <section className="py-20 md:py-28">
//       <div className="max-w-[1400px] mx-auto px-6">
//         <div className="flex items-end justify-between mb-12">
//           <h2 className="font-display text-3xl md:text-5xl font-bold text-primary">
//             TRENDING NOW
//           </h2>
//           <Link
//             to="/shop"
//             className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150 uppercase"
//           >
//             VIEW ALL
//           </Link>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {trending.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrendingSection;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const collections = [
  {
    title: "F1 COLLECTIONS",
    image: "/Posters/f1v2.jpg",
    path: "/shop?cat=f1",
    span: "md:col-span-2 md:row-span-2", // Bada box
  },
  {
    title: "ANIME ART",
    image: "/Posters/Batman.jpg",
    path: "/shop?cat=anime",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "MOVIES",
    image: "/Posters/motivation1.jpg",
    path: "/shop?cat=movies",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "MOTIVATION",
    image: "/Posters/porsche1.jpg",
    path: "/shop?cat=motivation",
    span: "md:col-span-2 md:row-span-1",
  },
];

const CollectionsSection = () => {
  return (
    <section className="py-20 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-bricolage text-4xl md:text-6xl font-extrabold tracking-tighter uppercase italic">
              Shop by{" "}
              <span className="text-primary not-italic">Collections</span>
            </h2>
            <p className="text-gray-500 mt-2 font-medium tracking-wide uppercase text-[10px] md:text-xs">
              Handpicked designs for your obsession
            </p>
          </div>
          <Link
            to="/shop"
            className="group flex items-center gap-2 font-bold text-xs tracking-widest text-white hover:text-primary transition-all duration-300 uppercase italic"
          >
            Explore More
            <span className="w-8 h-[1px] bg-white group-hover:bg-primary group-hover:w-12 transition-all duration-300" />
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-4">
          {collections.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`relative overflow-hidden group rounded-sm border border-white/5 ${item.span}`}
            >
              {/* Image Background */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className="font-bricolage text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase leading-none mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Browse Collection
                  </p>
                </motion.div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none bg-gradient-to-tr from-white/20 to-transparent transition-opacity duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;