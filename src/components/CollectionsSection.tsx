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
        span: "sm:col-span-2 sm:row-span-2",
      },
      {
        targetSub: "Anime",
        title: "ANIME CORE",
        fallbackImage: "/Posters/Batman.jpg",
        span: "sm:col-span-2 sm:row-span-1",
      },
      {
        targetSub: "Formula 1",
        title: "CINEMATIC",
        fallbackImage: "/Posters/motivation1.jpg",
        span: "sm:col-span-1 sm:row-span-1",
      },
      {
        targetSub: "Cars",
        title: "STREET MOTIVE",
        fallbackImage: "/Posters/porsche1.jpg",
        span: "sm:col-span-1 sm:row-span-1",
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
        image: displayImage.replace("/upload/", "/upload/w_800,f_auto,q_auto/"),
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
    <section className="py-12 md:py-24 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-black/40">
                THE GALLERY
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
              CURATED <span className="text-primary italic">DROPS.</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-3 bg-black text-white px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-black transition-all shadow-[6px_6px_0px_0px_#00D4FF]"
          >
            Explore All <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* GRID SYSTEM - Specific padding for 1200px (lg) */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {collections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${item.span} group relative overflow-hidden border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#00D4FF] transition-all duration-300`}
            >
              <Link to={item.path} className="block w-full h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute inset-0 p-4 sm:p-6 lg:p-5 xl:p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[7px] md:text-[8px] font-black bg-white text-black px-2 py-1 uppercase tracking-widest">
                      LIMITED
                    </span>
                    <div className="bg-primary p-1.5 md:p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                      <Plus size={14} strokeWidth={3} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.2em] uppercase">
                      {item.count}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl lg:text-xl xl:text-3xl font-black text-white uppercase tracking-tighter leading-none italic">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {collections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${item.span} group relative overflow-hidden border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#00D4FF] transition-all duration-300`}
            >
              <Link to={item.path} className="block w-full h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Content Container - Adjusted padding for md (tablet) */}
                <div className="absolute inset-0 p-4 sm:p-5 md:p-3 lg:p-5 xl:p-6 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[7px] md:text-[8px] font-black bg-white text-black px-2 py-1 uppercase tracking-widest">
                      LIMITED
                    </span>
                    <div className="bg-primary p-1.5 md:p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                      <Plus size={14} strokeWidth={3} />
                    </div>
                  </div>

                  <div className="space-y-1 w-full">
                    <p className="text-[8px] md:text-[9px] lg:text-[10px] font-black text-primary tracking-[0.2em] uppercase">
                      {item.count}
                    </p>
                    {/* Adjusted text sizes specifically for narrow tablet columns */}
                    <h3 className="font-display text-xl sm:text-2xl md:text-base lg:text-xl xl:text-3xl font-black text-white uppercase tracking-tighter leading-none ">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Call to Action */}
        <div className="md:hidden mt-8">
          <Link
            to="/shop"
            className="w-full flex items-center justify-between bg-black text-white px-6 py-5 font-black uppercase text-[10px] tracking-widest shadow-[6px_6px_0px_0px_#00D4FF]"
          >
            Explore All Collections <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;

// comment 2
