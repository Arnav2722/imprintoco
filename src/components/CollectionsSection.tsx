// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";

// const collections = [
//   {
//     title: "F1 TRACKS",
//     count: "24+ DESIGNS",
//     image: "/Posters/f1v2.jpg",
//     path: "/shop?cat=f1",
//     span: "md:col-span-2 md:row-span-2",
//   },
//   {
//     title: "ANIME CORE",
//     count: "12+ DESIGNS",
//     image: "/Posters/Batman.jpg",
//     path: "/shop?cat=anime",
//     span: "md:col-span-2 md:row-span-1",
//   },
//   {
//     title: "CINEMATIC",
//     count: "08+ DESIGNS",
//     image: "/Posters/motivation1.jpg",
//     path: "/shop?cat=movies",
//     span: "md:col-span-1 md:row-span-1",
//   },
//   {
//     title: "STREET MOTIVE",
//     count: "15+ DESIGNS",
//     image: "/Posters/porsche1.jpg",
//     path: "/shop?cat=motivation",
//     span: "md:col-span-1 md:row-span-1",
//   },
// ];

// const CollectionsSection = () => {
//   return (
//     <section className="py-24 bg-[#050505] selection:bg-primary selection:text-black">
//       <div className="max-w-[1400px] mx-auto px-6">
//         {/* HEADER AREA */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
//           <div className="max-w-2xl">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-[2px] bg-primary" />
//               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
//                 Curated Drops
//               </span>
//             </div>
//             <h2 className="font-bricolage text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
//               BROWSE <br />
//               <span className="text-white/20">COLLECTIONS</span>
//             </h2>
//           </div>

//           <Link
//             to="/shop"
//             className="group inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 hover:bg-primary hover:text-black transition-all duration-500"
//           >
//             <span className="font-black text-xs uppercase tracking-widest">
//               View All Vaults
//             </span>
//             <ArrowUpRight
//               size={18}
//               className="group-hover:rotate-45 transition-transform duration-500"
//             />
//           </Link>
//         </div>

//         {/* BENTO GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-6">
//           {collections.map((item, i) => (
//             <Link
//               key={i}
//               to={item.path}
//               className={`relative overflow-hidden group border border-white/5 bg-[#0a0a0a] ${item.span}`}
//             >
//               {/* IMAGE - Grayscale removed, natural colors active */}
//               <div className="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-110">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover transition-all duration-700"
//                 />
//                 {/* DYNAMIC GRADIENT - Refined for better color visibility */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-all duration-500" />
//               </div>

//               {/* CONTENT OVERLAY */}
//               <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
//                 <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
//                   <span className="text-[9px] font-black bg-primary text-black px-2 py-1 uppercase tracking-widest">
//                     Available Now
//                   </span>
//                   <div className="p-2 border border-white/20 rounded-full text-white bg-black/20 backdrop-blur-md">
//                     <ArrowUpRight size={14} />
//                   </div>
//                 </div>

//                 <div className="space-y-1">
//                   <p className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
//                     {item.count}
//                   </p>
//                   <h3 className="font-bricolage text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">
//                     {item.title.split(" ")[0]} <br />
//                     <span className="group-hover:text-primary transition-colors duration-500">
//                       {item.title.split(" ")[1]}
//                     </span>
//                   </h3>
//                 </div>
//               </div>

//               {/* BORDER GLOW ON HOVER */}
//               <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-95 group-hover:scale-100" />
//             </Link>
//           ))}
//         </div>

//         {/* BOTTOM TAGLINE */}
//         <div className="mt-12 flex flex-col md:flex-row items-center justify-between py-8 border-t border-white/5 gap-4">
//           <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.5em]">
//             Exclusive Imprinto Vault Access
//           </p>
//           <div className="flex gap-8">
//             <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">
//               Limited Prints
//             </span>
//             <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">
//               Premium Finish
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CollectionsSection;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

const collections = [
  {
    title: "F1 TRACKS",
    count: "24+ DESIGNS",
    image: "/Posters/f1v2.jpg",
    path: "/shop?cat=f1",
    span: "md:col-span-2 md:row-span-2",
    color: "bg-primary/10",
  },
  {
    title: "ANIME CORE",
    count: "12+ DESIGNS",
    image: "/Posters/Batman.jpg",
    path: "/shop?cat=anime",
    span: "md:col-span-2 md:row-span-1",
    color: "bg-accent/10",
  },
  {
    title: "CINEMATIC",
    count: "08+ DESIGNS",
    image: "/Posters/motivation1.jpg",
    path: "/shop?cat=movies",
    span: "md:col-span-1 md:row-span-1",
    color: "bg-accent-lime/20",
  },
  {
    title: "STREET MOTIVE",
    count: "15+ DESIGNS",
    image: "/Posters/porsche1.jpg",
    path: "/shop?cat=motivation",
    span: "md:col-span-1 md:row-span-1",
    color: "bg-gray-100",
  },
];

const CollectionsSection = () => {
  return (
    <section className="py-32 bg-background selection:bg-primary selection:text-black relative overflow-hidden">
      {/* Background Texture/Detail */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-[3px] bg-accent" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-accent">
                The Vaults
              </span>
            </motion.div>
            <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-foreground">
              CURATED <br />
              <span className="text-primary italic">DROPS.</span>
            </h2>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-6 bg-foreground text-background px-10 py-5 hover:bg-primary hover:text-foreground transition-all duration-500 rounded-none shadow-[10px_10px_0px_0px_rgba(0,212,255,0.2)]"
          >
            <span className="font-black text-xs uppercase tracking-widest">
              Explore All Vaults
            </span>
            <ArrowUpRight
              size={20}
              className="group-hover:rotate-45 transition-transform duration-500"
            />
          </Link>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[350px] gap-8">
          {collections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`${item.span}`}
            >
              <Link
                to={item.path}
                className={`relative h-full w-full block overflow-hidden group border-2 border-foreground/5 bg-white shadow-sm hover:shadow-2xl transition-all duration-500`}
              >
                {/* IMAGE CONTAINER */}
                <div className="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-110">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* LIGHT GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-90 group-hover:opacity-60 transition-all duration-500" />
                </div>

                {/* CONTENT OVERLAY */}
                <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black bg-foreground text-background px-3 py-1.5 uppercase tracking-widest translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      Limited Edition
                    </span>
                    <div className="w-12 h-12 bg-white flex items-center justify-center border-2 border-foreground rounded-none group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none">
                      <Plus size={20} className="text-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-black text-accent tracking-[0.4em] uppercase transition-all duration-500 group-hover:text-primary">
                      {item.count}
                    </p>
                    <h3 className="font-display text-4xl font-black tracking-tighter text-foreground uppercase leading-[0.9]">
                      {item.title.split(" ")[0]} <br />
                      <span className="italic outline-text">
                        {item.title.split(" ").slice(1).join(" ")}
                      </span>
                    </h3>
                  </div>
                </div>

                {/* VIBRANT BORDER ACCENT ON HOVER */}
                <div className="absolute inset-0 border-[6px] border-primary opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-[1.02]" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM MARQUEE-STYLE TAGLINE */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between py-10 border-t-4 border-foreground gap-8">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
            <p className="text-[12px] font-black text-foreground uppercase tracking-[0.4em]">
              Imprinto Premium Standards 2026
            </p>
          </div>
          <div className="flex gap-12 overflow-hidden">
            <span className="text-[11px] font-black text-foreground/30 uppercase tracking-[0.2em] whitespace-nowrap">
              High-Grip Vinyl
            </span>
            <span className="text-[11px] font-black text-foreground/30 uppercase tracking-[0.2em] whitespace-nowrap">
              Anti-Glare Matte
            </span>
            <span className="text-[11px] font-black text-foreground/30 uppercase tracking-[0.2em] whitespace-nowrap">
              Eco-Friendly Ink
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;