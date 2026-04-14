// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// interface MultiItem {
//   id: number;
//   name: string;
//   price: number;
//   type: string;
//   img: string;
// }

// const MULTI_DATA: MultiItem[] = [
//   {
//     id: 1,
//     name: "Cars Collage Kit",
//     price: 599,
//     type: "50-Piece Kit",
//     img: "../Posters/CarsA6Posters.png",
//   },
//   {
//     id: 2,
//     name: "Cyberpunk 5-Panel Split",
//     price: 1299,
//     type: "Split Poster",
//     img: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=800",
//   },
//   {
//     id: 3,
//     name: "Motorsport Combo Set",
//     price: 899,
//     type: "30-Piece Kit",
//     img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
//   },
//   {
//     id: 4,
//     name: "Anime Legend 3-Piece Split",
//     price: 999,
//     type: "Split Poster",
//     img: "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=800",
//   },
// ];

// const MultiCollections = () => {
//   return (
//     <div className="min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white font-bricolage transition-colors duration-500">
//       <Navbar />
//       <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
//         <header className="mb-16 space-y-4">
//           <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
//             Multi <span className="text-primary not-italic">Collections</span>
//           </h1>
//           <p className="text-black/40 dark:text-white/40 text-[10px] font-black tracking-[0.4em] uppercase">
//             Transform your walls with massive split art and collage sets
//           </p>
//         </header>

//         {/* ✅ Grid adjusted: 3 columns on desktop for better portrait view */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {MULTI_DATA.map((item) => (
//             <div
//               key={item.id}
//               className="group relative border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01] p-5 transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.03]"
//             >
//               {/* ✅ Fixed: aspect-video changed to aspect-[2/3] for Portrait mode */}
//               <div className="aspect-[2/3] overflow-hidden mb-8 relative bg-black/5 dark:bg-white/5">
//                 <img
//                   src={item.img}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   alt={item.name}
//                 />
//                 <div className="absolute top-4 left-4 bg-primary text-black text-[8px] font-black px-3 py-1 uppercase italic shadow-xl">
//                   New Arrival
//                 </div>
//               </div>

//               <div className="flex flex-col gap-6">
//                 <div className="space-y-2">
//                   <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
//                     {item.type}
//                   </span>
//                   <h3 className="text-2xl font-black uppercase italic leading-tight">
//                     {item.name}
//                   </h3>
//                 </div>

//                 <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-4">
//                   <p className="text-xl font-black italic">₹{item.price}</p>
//                   <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 text-[9px] font-black uppercase tracking-widest hover:bg-primary dark:hover:bg-primary transition-all">
//                     View Set
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default MultiCollections;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, ArrowUpRight, Layers, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

interface MultiItem {
  id: number;
  name: string;
  price: number;
  type: string;
  img: string;
}

const MULTI_DATA: MultiItem[] = [
  {
    id: 1,
    name: "Cars Collage Kit",
    price: 599,
    type: "50-Piece Kit",
    img: "../Posters/CarsA6Posters.png",
  },
  {
    id: 2,
    name: "Cyberpunk 5-Panel Split",
    price: 1299,
    type: "Split Poster",
    img: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=800",
  },
  {
    id: 3,
    name: "Motorsport Combo Set",
    price: 899,
    type: "30-Piece Kit",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
  },
  {
    id: 4,
    name: "Anime Legend 3-Piece Split",
    price: 999,
    type: "Split Poster",
    img: "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=800",
  },
];

const MultiCollections = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-40 pb-32 px-6 max-w-[1400px] mx-auto">
        {/* HEADER SECTION */}
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-accent fill-accent" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/40">
                Multi-Spec Protocol
              </span>
            </div>
            <h1 className="font-display text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8]">
              MULTI <br />
              <span className="text-primary not-italic">COLLECTIONS.</span>
            </h1>
          </div>

          <div className="bg-white border-4 border-foreground p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-sm rotate-1">
            <p className="text-[12px] text-foreground/60 font-black leading-tight uppercase tracking-tight">
              Maximum wall coverage. Industrial grade split art and curated
              collage sets engineered for the CORE.
            </p>
          </div>
        </header>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {MULTI_DATA.map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={item.id}
              className="group relative flex flex-col bg-white border-4 border-foreground shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[20px_20px_0px_0px_rgba(0,212,255,1)] transition-all duration-500 overflow-hidden"
            >
              {/* IMAGE SECTION */}
              <div className="aspect-[2/3] overflow-hidden border-b-4 border-foreground relative bg-muted">
                <img
                  src={item.img}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  alt={item.name}
                />

                {/* Status Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="bg-primary border-2 border-foreground px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[10px] font-black uppercase italic tracking-tighter">
                      NEW DROP
                    </span>
                  </div>
                  {item.id === 1 && (
                    <div className="bg-accent-lime border-2 border-foreground px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <span className="text-[10px] font-black uppercase italic tracking-tighter">
                        BEST SELLER
                      </span>
                    </div>
                  )}
                </div>

                {/* Industrial Icon Overlay */}
                <div className="absolute bottom-6 right-6">
                  <div className="w-12 h-12 bg-white border-2 border-foreground flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                    {item.type.includes("Kit") ? (
                      <LayoutGrid size={20} />
                    ) : (
                      <Layers size={20} />
                    )}
                  </div>
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="p-8 flex flex-col gap-8">
                <div className="space-y-3">
                  <span className="text-[11px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                    <Zap size={14} fill="currentColor" /> {item.type}
                  </span>
                  <h3 className="font-display text-3xl font-black uppercase italic leading-none group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </div>

                <div className="flex justify-between items-end border-t-2 border-foreground/5 pt-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">
                      Base Investment
                    </span>
                    <p className="text-3xl font-black italic text-foreground tracking-tighter leading-none">
                      ₹{item.price}
                    </p>
                  </div>

                  <button className="h-14 px-8 bg-foreground text-background font-black uppercase tracking-[0.2em] text-[11px] hover:bg-primary hover:text-foreground transition-all flex items-center gap-3 shadow-[6px_6px_0px_0px_rgba(255,46,99,1)] hover:shadow-none">
                    VIEW SET <ArrowUpRight size={16} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MultiCollections;