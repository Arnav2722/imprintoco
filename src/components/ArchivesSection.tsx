// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const archiveItems = [
//   { name: "Vintage Racing", count: "12+ Items", path: "/shop?cat=vintage" },
//   { name: "Cyberpunk Vibes", count: "08+ Items", path: "/shop?cat=cyberpunk" },
//   { name: "Minimalist Manga", count: "15+ Items", path: "/shop?cat=manga" },
//   { name: "Abstract Geometry", count: "10+ Items", path: "/shop?cat=abstract" },
//   { name: "Iconic Cinema", count: "20+ Items", path: "/shop?cat=cinema" },
//   { name: "Retrowave", count: "06+ Items", path: "/shop?cat=retrowave" },
// ];

// const ArchivesSection = () => {
//   return (
//     <section className="py-24 bg-[#050505] border-t border-white/5">
//       <div className="max-w-[1400px] mx-auto px-6">
//         {/* Header */}
//         <div className="mb-16">
//           <h2 className="font-bricolage text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
//             The <span className="text-primary not-italic">Archives</span>
//           </h2>
//           <p className="text-gray-500 mt-4 font-medium tracking-widest uppercase text-xs">
//             Deep dive into our curated categories
//           </p>
//         </div>

//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
//           {archiveItems.map((item, i) => (
//             <Link
//               key={i}
//               to={item.path}
//               className="group relative p-10 border-white/10 border-[0.5px] hover:bg-white transition-colors duration-500 overflow-hidden"
//             >
//               {/* Background Glow Effect on Hover */}
//               <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

//               <div className="relative z-10 flex flex-col justify-between h-32">
//                 <div>
//                   <span className="text-primary font-black text-xs tracking-widest uppercase mb-2 block">
//                     {item.count}
//                   </span>
//                   <h3 className="font-bricolage text-3xl font-extrabold italic uppercase tracking-tighter text-white group-hover:text-black transition-colors duration-500">
//                     {item.name}
//                   </h3>
//                 </div>

//                 <div className="flex items-center gap-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
//                   <span className="text-xs font-black uppercase italic text-black">
//                     Enter Vault
//                   </span>
//                   <div className="w-8 h-[2px] bg-black" />
//                 </div>
//               </div>

//               {/* Decorative Number in background */}
//               <span className="absolute right-6 bottom-4 text-7xl font-black text-white/5 group-hover:text-black/5 transition-colors pointer-events-none">
//                 0{i + 1}
//               </span>
//             </Link>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <div className="mt-12 flex justify-center">
//           <Link to="/shop" className="group flex flex-col items-center gap-2">
//             <span className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-500 group-hover:text-primary transition-colors">
//               Full Catalog
//             </span>
//             <div className="w-1 h-12 bg-gradient-to-b from-primary to-transparent" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ArchivesSection;