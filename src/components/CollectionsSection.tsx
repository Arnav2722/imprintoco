// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowUpRight, Plus, Loader2 } from "lucide-react";
// import { useMemo } from "react";
// import { useProducts } from "@/hooks/use-products";

// const CollectionsSection = (): JSX.Element => {
//   const { data: allProducts = [], isLoading } = useProducts();

//   // Dynamic Collection Logic based on your Firebase Screenshot
//   const collections = useMemo(() => {
//     const config = [
//       {
//         targetSub: "F1", // Matches your 'subcategory' field in Firebase
//         title: "F1 TRACKS",
//         fallbackImage: "/Posters/f1v2.jpg",
//         span: "md:col-span-2 md:row-span-2",
//       },
//       {
//         targetSub: "Anime",
//         title: "ANIME CORE",
//         fallbackImage: "/Posters/Batman.jpg",
//         span: "md:col-span-2 md:row-span-1",
//       },
//       {
//         targetSub: "Formula 1", // Just in case you use full names
//         title: "CINEMATIC",
//         fallbackImage: "/Posters/motivation1.jpg",
//         span: "md:col-span-1 md:row-span-1",
//       },
//       {
//         targetSub: "Cars",
//         title: "STREET MOTIVE",
//         fallbackImage: "/Posters/porsche1.jpg",
//         span: "md:col-span-1 md:row-span-1",
//       },
//     ];

//     return config.map((cat) => {
//       // Yahan hum 'subcategory' check kar rahe hain kyunki aapne Firebase mein wahan 'F1' likha hai
//       const filtered = allProducts.filter(
//         (p) =>
//           p.subcategory?.trim().toLowerCase() === cat.targetSub.toLowerCase() &&
//           p.is_active,
//       );

//       const displayImage =
//         filtered.length > 0 ? filtered[0].image_url : cat.fallbackImage;

//       return {
//         title: cat.title,
//         span: cat.span,
//         count: `${filtered.length.toString().padStart(2, "0")}+ DESIGNS`,
//         image: displayImage.replace(
//           "/upload/",
//           "/upload/w_1000,f_auto,q_auto/",
//         ),
//         path: `/shop?sub=${cat.targetSub.toLowerCase()}`,
//       };
//     });
//   }, [allProducts]);

//   if (isLoading) {
//     return (
//       <div className="h-[600px] flex items-center justify-center">
//         <Loader2 className="animate-spin text-primary" size={40} />
//       </div>
//     );
//   }

//   return (
//     <section className="py-16 md:py-32 bg-background selection:bg-primary selection:text-black relative overflow-hidden">
//       <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

//       <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative z-10">
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
//           <div className="max-w-2xl">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="flex items-center gap-3 mb-4 md:mb-6"
//             >
//               <div className="w-8 md:w-12 h-[2px] md:h-[3px] bg-accent" />
//               <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-accent">
//                 The Vaults
//               </span>
//             </motion.div>
//             <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] md:leading-[0.8] text-foreground">
//               CURATED <br />
//               <span className="text-primary italic">DROPS.</span>
//             </h2>
//           </div>

//           <Link
//             to="/shop"
//             className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-6 bg-foreground text-background px-8 md:px-10 py-4 md:py-5 hover:bg-primary hover:text-foreground transition-all duration-500 rounded-none shadow-[6px_6px_0px_0px_rgba(0,212,255,0.2)]"
//           >
//             <span className="font-black text-[10px] md:text-xs uppercase tracking-widest">
//               Explore All Vaults
//             </span>
//             <ArrowUpRight
//               size={20}
//               className="group-hover:rotate-45 transition-transform duration-500"
//             />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[300px] md:auto-rows-[350px] gap-4 md:gap-8">
//           {collections.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               viewport={{ once: true }}
//               className={`${item.span} group`}
//             >
//               <Link
//                 to={item.path}
//                 className="relative h-full w-full block overflow-hidden border-2 border-foreground/5 bg-white shadow-sm hover:shadow-2xl transition-all duration-500"
//               >
//                 <div className="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-110">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent opacity-90 group-hover:opacity-70 transition-all duration-500" />
//                 </div>

//                 <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-10">
//                   <div className="flex justify-between items-start">
//                     <span className="text-[8px] md:text-[10px] font-black bg-foreground text-background px-2 py-1 md:px-3 md:py-1.5 uppercase tracking-widest translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
//                       Limited Edition
//                     </span>
//                     <div className="w-10 h-10 md:w-12 md:h-12 bg-white flex items-center justify-center border-2 border-foreground rounded-none group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none">
//                       <Plus size={18} className="text-foreground" />
//                     </div>
//                   </div>

//                   <div className="space-y-1 md:space-y-2">
//                     <p className="text-[9px] md:text-[11px] font-black text-accent tracking-[0.3em] md:tracking-[0.4em] uppercase transition-all duration-500 group-hover:text-primary">
//                       {item.count}
//                     </p>
//                     <h3 className="font-display text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase leading-[0.9]">
//                       {item.title.split(" ")[0]} <br />
//                       <span className="italic opacity-80">
//                         {item.title.split(" ").slice(1).join(" ")}
//                       </span>
//                     </h3>
//                   </div>
//                 </div>

//                 <div className="absolute inset-0 border-[4px] md:border-[6px] border-primary opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-[1.01]" />
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CollectionsSection;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus, Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useProducts } from "@/hooks/use-products";

const CollectionsSection = (): JSX.Element => {
  const { data: allProducts = [], isLoading } = useProducts();

  const collections = useMemo(() => {
    const config = [
      {
        targetSub: "F1",
        title: "F1 TRACKS",
        fallbackImage: "/Posters/f1v2.jpg",
        span: "md:col-span-2 md:row-span-2",
      },
      {
        targetSub: "Anime",
        title: "ANIME CORE",
        fallbackImage: "/Posters/Batman.jpg",
        span: "md:col-span-2 md:row-span-1",
      },
      {
        targetSub: "Formula 1",
        title: "CINEMATIC",
        fallbackImage: "/Posters/motivation1.jpg",
        span: "md:col-span-1 md:row-span-1",
      },
      {
        targetSub: "Cars",
        title: "STREET MOTIVE",
        fallbackImage: "/Posters/porsche1.jpg",
        span: "md:col-span-1 md:row-span-1",
      },
    ];

    return config.map((cat) => {
      const filtered = allProducts.filter(
        (p) =>
          p.subcategory?.trim().toLowerCase() === cat.targetSub.toLowerCase() &&
          p.is_active,
      );

      const displayImage =
        filtered.length > 0 ? filtered[0].image_url : cat.fallbackImage;

      return {
        title: cat.title,
        span: cat.span,
        count: `${filtered.length.toString().padStart(2, "0")}+ DESIGNS`,
        image: displayImage.replace(
          "/upload/",
          "/upload/w_1000,f_auto,q_auto/",
        ),
        path: `/shop?sub=${cat.targetSub.toLowerCase()}`,
      };
    });
  }, [allProducts]);

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <section className="py-2 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* Header Container */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-6 md:w-10 h-[2px] bg-accent" />
              <span className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                The Collection
              </span>
            </motion.div>
            <h2 className="font-display text-[8vw] sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[1.1] text-foreground">
              CURATED <br />
              <span className="text-primary">DROPS</span>
            </h2>
          </div>

          {/* Desktop Only Button (Hidden on Mobile) */}
          <Link
            to="/shop"
            className="hidden md:flex group w-auto items-center justify-center gap-4 bg-foreground text-background px-10 py-5 hover:bg-primary hover:text-foreground transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,212,255,1)]"
          >
            <span className="font-black text-xs uppercase tracking-widest">
              Explore All Collections
            </span>
            <ArrowUpRight
              size={18}
              className="group-hover:rotate-45 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[280px] md:auto-rows-[350px] gap-4 md:gap-8">
          {collections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`${item.span} group`}
            >
              <Link
                to={item.path}
                className="relative h-full w-full block overflow-hidden border-2 border-foreground/5 bg-white shadow-sm transition-all duration-500"
              >
                <div className="absolute inset-0 transition-all duration-700 group-hover:scale-105">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent opacity-95 group-hover:opacity-80 transition-opacity" />
                </div>

                <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[6px] md:text-[8px] font-black bg-foreground text-background px-2 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Limited
                    </span>
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white flex items-center justify-center border-2 border-foreground group-hover:bg-primary transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Plus size={16} className="text-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[7px] md:text-[9px] font-black text-accent tracking-widest uppercase group-hover:text-primary transition-colors">
                      {item.count}
                    </p>
                    <h3 className="font-display text-xl md:text-3xl font-black tracking-tighter text-foreground uppercase leading-[1.1]">
                      {item.title.split(" ")[0]} <br />
                      <span className="text-foreground/70">
                        {item.title.split(" ").slice(1).join(" ")}
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="absolute inset-0 border-4 border-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            </motion.div>
          ))}

          {/* Mobile Only Button (Moves to bottom of grid) */}
          <div className="md:hidden pt-4">
            <Link
              to="/shop"
              className="group w-full flex items-center justify-between bg-foreground text-background px-6 py-6 hover:bg-primary hover:text-foreground transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,212,255,1)]"
            >
              <span className="font-black text-[10px] uppercase tracking-widest">
                Explore All Collections
              </span>
              <ArrowUpRight
                size={20}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
