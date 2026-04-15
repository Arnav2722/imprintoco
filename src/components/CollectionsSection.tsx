// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowUpRight, Plus } from "lucide-react";

// const collections = [
//   {
//     title: "F1 TRACKS",
//     count: "24+ DESIGNS",
//     image: "/Posters/f1v2.jpg",
//     path: "/shop?cat=f1",
//     span: "md:col-span-2 md:row-span-2",
//     color: "bg-primary/10",
//   },
//   {
//     title: "ANIME CORE",
//     count: "12+ DESIGNS",
//     image: "/Posters/Batman.jpg",
//     path: "/shop?cat=anime",
//     span: "md:col-span-2 md:row-span-1",
//     color: "bg-accent/10",
//   },
//   {
//     title: "CINEMATIC",
//     count: "08+ DESIGNS",
//     image: "/Posters/motivation1.jpg",
//     path: "/shop?cat=movies",
//     span: "md:col-span-1 md:row-span-1",
//     color: "bg-accent-lime/20",
//   },
//   {
//     title: "STREET MOTIVE",
//     count: "15+ DESIGNS",
//     image: "/Posters/porsche1.jpg",
//     path: "/shop?cat=motivation",
//     span: "md:col-span-1 md:row-span-1",
//     color: "bg-gray-100",
//   },
// ];

// const CollectionsSection = () => {
//   return (
//     <section className="py-32 bg-background selection:bg-primary selection:text-black relative overflow-hidden">
//       {/* Background Texture/Detail */}
//       <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

//       <div className="max-w-[1400px] mx-auto px-6 relative z-10">
//         {/* HEADER AREA */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
//           <div className="max-w-2xl">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="flex items-center gap-3 mb-6"
//             >
//               <div className="w-12 h-[3px] bg-accent" />
//               <span className="text-[11px] font-black uppercase tracking-[0.5em] text-accent">
//                 The Vaults
//               </span>
//             </motion.div>
//             <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-foreground">
//               CURATED <br />
//               <span className="text-primary italic">DROPS.</span>
//             </h2>
//           </div>

//           <Link
//             to="/shop"
//             className="group inline-flex items-center gap-6 bg-foreground text-background px-10 py-5 hover:bg-primary hover:text-foreground transition-all duration-500 rounded-none shadow-[10px_10px_0px_0px_rgba(0,212,255,0.2)]"
//           >
//             <span className="font-black text-xs uppercase tracking-widest">
//               Explore All Vaults
//             </span>
//             <ArrowUpRight
//               size={20}
//               className="group-hover:rotate-45 transition-transform duration-500"
//             />
//           </Link>
//         </div>

//         {/* BENTO GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[350px] gap-8">
//           {collections.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               viewport={{ once: true }}
//               className={`${item.span}`}
//             >
//               <Link
//                 to={item.path}
//                 className={`relative h-full w-full block overflow-hidden group border-2 border-foreground/5 bg-white shadow-sm hover:shadow-2xl transition-all duration-500`}
//               >
//                 {/* IMAGE CONTAINER */}
//                 <div className="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-110">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-cover"
//                   />
//                   {/* LIGHT GRADIENT OVERLAY */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-90 group-hover:opacity-60 transition-all duration-500" />
//                 </div>

//                 {/* CONTENT OVERLAY */}
//                 <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
//                   <div className="flex justify-between items-start">
//                     <span className="text-[10px] font-black bg-foreground text-background px-3 py-1.5 uppercase tracking-widest translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
//                       Limited Edition
//                     </span>
//                     <div className="w-12 h-12 bg-white flex items-center justify-center border-2 border-foreground rounded-none group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none">
//                       <Plus size={20} className="text-foreground" />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <p className="text-[11px] font-black text-accent tracking-[0.4em] uppercase transition-all duration-500 group-hover:text-primary">
//                       {item.count}
//                     </p>
//                     <h3 className="font-display text-4xl font-black tracking-tighter text-foreground uppercase leading-[0.9]">
//                       {item.title.split(" ")[0]} <br />
//                       <span className="italic outline-text">
//                         {item.title.split(" ").slice(1).join(" ")}
//                       </span>
//                     </h3>
//                   </div>
//                 </div>

//                 {/* VIBRANT BORDER ACCENT ON HOVER */}
//                 <div className="absolute inset-0 border-[6px] border-primary opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-[1.02]" />
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {/* BOTTOM MARQUEE-STYLE TAGLINE */}
//         <div className="mt-20 flex flex-col md:flex-row items-center justify-between py-10 border-t-4 border-foreground gap-8">
//           <div className="flex items-center gap-4">
//             <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
//             <p className="text-[12px] font-black text-foreground uppercase tracking-[0.4em]">
//               Imprinto Premium Standards 2026
//             </p>
//           </div>
//           <div className="flex gap-12 overflow-hidden">
//             <span className="text-[11px] font-black text-foreground/30 uppercase tracking-[0.2em] whitespace-nowrap">
//               High-Grip Vinyl
//             </span>
//             <span className="text-[11px] font-black text-foreground/30 uppercase tracking-[0.2em] whitespace-nowrap">
//               Anti-Glare Matte
//             </span>
//             <span className="text-[11px] font-black text-foreground/30 uppercase tracking-[0.2em] whitespace-nowrap">
//               Eco-Friendly Ink
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
    <section className="py-16 md:py-32 bg-background selection:bg-primary selection:text-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative z-10">
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4 md:mb-6"
            >
              <div className="w-8 md:w-12 h-[2px] md:h-[3px] bg-accent" />
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-accent">
                The Vaults
              </span>
            </motion.div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] md:leading-[0.8] text-foreground">
              CURATED <br />
              <span className="text-primary italic">DROPS.</span>
            </h2>
          </div>

          <Link
            to="/shop"
            className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-6 bg-foreground text-background px-8 md:px-10 py-4 md:py-5 hover:bg-primary hover:text-foreground transition-all duration-500 rounded-none shadow-[6px_6px_0px_0px_rgba(0,212,255,0.2)]"
          >
            <span className="font-black text-[10px] md:text-xs uppercase tracking-widest">
              Explore All Vaults
            </span>
            <ArrowUpRight
              size={20}
              className="group-hover:rotate-45 transition-transform duration-500"
            />
          </Link>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[300px] md:auto-rows-[350px] gap-4 md:gap-8">
          {collections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`${item.span} group`}
            >
              <Link
                to={item.path}
                className="relative h-full w-full block overflow-hidden border-2 border-foreground/5 bg-white shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* IMAGE CONTAINER */}
                <div className="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-110">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent opacity-90 group-hover:opacity-70 transition-all duration-500" />
                </div>

                {/* CONTENT OVERLAY */}
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] md:text-[10px] font-black bg-foreground text-background px-2 py-1 md:px-3 md:py-1.5 uppercase tracking-widest translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      Limited Edition
                    </span>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white flex items-center justify-center border-2 border-foreground rounded-none group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none">
                      <Plus size={18} className="text-foreground" />
                    </div>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <p className="text-[9px] md:text-[11px] font-black text-accent tracking-[0.3em] md:tracking-[0.4em] uppercase transition-all duration-500 group-hover:text-primary">
                      {item.count}
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase leading-[0.9]">
                      {item.title.split(" ")[0]} <br />
                      <span className="italic opacity-80">
                        {item.title.split(" ").slice(1).join(" ")}
                      </span>
                    </h3>
                  </div>
                </div>

                {/* VIBRANT BORDER ACCENT */}
                <div className="absolute inset-0 border-[4px] md:border-[6px] border-primary opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-[1.01]" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM TAGLINE */}
        <div className="mt-12 md:mt-20 flex flex-col lg:flex-row items-start lg:items-center justify-between py-8 md:py-10 border-t-2 md:border-t-4 border-foreground gap-6 md:gap-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-2 md:w-3 h-2 md:h-3 bg-primary rounded-full animate-ping" />
            <p className="text-[10px] md:text-[12px] font-black text-foreground uppercase tracking-[0.2em] md:tracking-[0.4em]">
              Imprinto Premium Standards 2026
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-12 w-full lg:w-auto">
            {["High-Grip Vinyl", "Anti-Glare Matte", "Eco-Friendly Ink"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[9px] md:text-[11px] font-black text-foreground/30 uppercase tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;