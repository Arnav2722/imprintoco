// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const collections = [
//   {
//     title: "F1 COLLECTIONS",
//     image: "/Posters/f1v2.jpg",
//     path: "/shop?cat=f1",
//     span: "md:col-span-2 md:row-span-2", // Bada box
//   },
//   {
//     title: "ANIME ART",
//     image: "/Posters/Batman.jpg",
//     path: "/shop?cat=anime",
//     span: "md:col-span-1 md:row-span-1",
//   },
//   {
//     title: "MOVIES",
//     image: "/Posters/motivation1.jpg",
//     path: "/shop?cat=movies",
//     span: "md:col-span-1 md:row-span-1",
//   },
//   {
//     title: "MOTIVATION",
//     image: "/Posters/porsche1.jpg",
//     path: "/shop?cat=motivation",
//     span: "md:col-span-2 md:row-span-1",
//   },
// ];

// const CollectionsSection = () => {
//   return (
//     <section className="py-20 bg-[#050505]">
//       <div className="max-w-[1400px] mx-auto px-6">
//         {/* Header */}
//         <div className="flex items-end justify-between mb-12">
//           <div>
//             <h2 className="font-bricolage text-4xl md:text-6xl font-extrabold tracking-tighter uppercase italic">
//               Shop by{" "}
//               <span className="text-primary not-italic">Collections</span>
//             </h2>
//             <p className="text-gray-500 mt-2 font-medium tracking-wide uppercase text-[10px] md:text-xs">
//               Handpicked designs for your obsession
//             </p>
//           </div>
//           <Link
//             to="/shop"
//             className="group flex items-center gap-2 font-bold text-xs tracking-widest text-white hover:text-primary transition-all duration-300 uppercase italic"
//           >
//             Explore More
//             <span className="w-8 h-[1px] bg-white group-hover:bg-primary group-hover:w-12 transition-all duration-300" />
//           </Link>
//         </div>

//         {/* Bento Grid Layout */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-4">
//           {collections.map((item, i) => (
//             <Link
//               key={i}
//               to={item.path}
//               className={`relative overflow-hidden group rounded-sm border border-white/5 ${item.span}`}
//             >
//               {/* Image Background */}
//               <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover"
//                 />
//                 {/* Dark Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
//               </div>

//               {/* Content */}
//               <div className="absolute inset-0 p-8 flex flex-col justify-end">
//                 <motion.div
//                   initial={{ y: 20, opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   transition={{ delay: i * 0.1 }}
//                 >
//                   <h3 className="font-bricolage text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase leading-none mb-2">
//                     {item.title}
//                   </h3>
//                   <p className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
//                     Browse Collection
//                   </p>
//                 </motion.div>
//               </div>

//               {/* Shine Effect */}
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none bg-gradient-to-tr from-white/20 to-transparent transition-opacity duration-500" />
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CollectionsSection;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const collections = [
  {
    title: "F1 TRACKS",
    count: "24+ DESIGNS",
    image: "/Posters/f1v2.jpg",
    path: "/shop?cat=f1",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "ANIME CORE",
    count: "12+ DESIGNS",
    image: "/Posters/Batman.jpg",
    path: "/shop?cat=anime",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "CINEMATIC",
    count: "08+ DESIGNS",
    image: "/Posters/motivation1.jpg",
    path: "/shop?cat=movies",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "STREET MOTIVE",
    count: "15+ DESIGNS",
    image: "/Posters/porsche1.jpg",
    path: "/shop?cat=motivation",
    span: "md:col-span-1 md:row-span-1",
  },
];

const CollectionsSection = () => {
  return (
    <section className="py-24 bg-[#050505] selection:bg-primary selection:text-black">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                Curated Drops
              </span>
            </div>
            <h2 className="font-bricolage text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              BROWSE <br />
              <span className="text-white/20">COLLECTIONS</span>
            </h2>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 hover:bg-primary hover:text-black transition-all duration-500"
          >
            <span className="font-black text-xs uppercase tracking-widest">
              View All Vaults
            </span>
            <ArrowUpRight
              size={18}
              className="group-hover:rotate-45 transition-transform duration-500"
            />
          </Link>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-6">
          {collections.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`relative overflow-hidden group border border-white/5 bg-[#0a0a0a] ${item.span}`}
            >
              {/* IMAGE - Grayscale removed, natural colors active */}
              <div className="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-110">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                {/* DYNAMIC GRADIENT - Refined for better color visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-all duration-500" />
              </div>

              {/* CONTENT OVERLAY */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                  <span className="text-[9px] font-black bg-primary text-black px-2 py-1 uppercase tracking-widest">
                    Available Now
                  </span>
                  <div className="p-2 border border-white/20 rounded-full text-white bg-black/20 backdrop-blur-md">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {item.count}
                  </p>
                  <h3 className="font-bricolage text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">
                    {item.title.split(" ")[0]} <br />
                    <span className="group-hover:text-primary transition-colors duration-500">
                      {item.title.split(" ")[1]}
                    </span>
                  </h3>
                </div>
              </div>

              {/* BORDER GLOW ON HOVER */}
              <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-95 group-hover:scale-100" />
            </Link>
          ))}
        </div>

        {/* BOTTOM TAGLINE */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between py-8 border-t border-white/5 gap-4">
          <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.5em]">
            Exclusive Imprinto Vault Access
          </p>
          <div className="flex gap-8">
            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">
              Limited Prints
            </span>
            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">
              Premium Finish
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;