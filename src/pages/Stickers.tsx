// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Zap, ArrowUpRight, Droplets, ShieldCheck } from "lucide-react";
// import { motion } from "framer-motion";

// interface StickerItem {
//   id: number;
//   name: string;
//   price: number;
//   img: string;
// }

// const STICKERS: StickerItem[] = [
//   {
//     id: 1,
//     name: "Caffeine & Gas",
//     price: 49,
//     img: "https://images.unsplash.com/photo-1572375927083-074900481232?q=80&w=800",
//   },
//   {
//     id: 2,
//     name: "Neo Tokyo Drift",
//     price: 59,
//     img: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=800",
//   },
//   {
//     id: 3,
//     name: "Turbo Snail",
//     price: 49,
//     img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800",
//   },
//   {
//     id: 4,
//     name: "Initial D AE86",
//     price: 69,
//     img: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=800",
//   },
// ];

// const Stickers = () => {
//   return (
//     <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-40 pb-32 px-6 max-w-[1400px] mx-auto">
//         {/* HEADER SECTION */}
//         <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <Zap size={18} className="text-accent fill-accent" />
//               <span className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/40">
//                 Vinyl Protocol
//               </span>
//             </div>
//             <h1 className="font-display text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8]">
//               VINYL <span className="text-primary not-italic">STICKERS.</span>
//             </h1>
//             <div className="flex gap-6 pt-4">
//               <div className="flex items-center gap-2 opacity-30">
//                 <Droplets size={14} />
//                 <span className="text-[9px] font-black uppercase tracking-widest">
//                   Waterproof
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 opacity-30">
//                 <ShieldCheck size={14} />
//                 <span className="text-[9px] font-black uppercase tracking-widest">
//                   UV Protected
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-accent-lime border-4 border-foreground p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-1">
//             <p className="text-[11px] font-black uppercase leading-tight italic">
//               FREE SHIPPING ON 10+ STICKERS. <br /> AUTO-APPLIED AT CHECKOUT.
//             </p>
//           </div>
//         </header>

//         {/* GRID SECTION */}
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
//           {STICKERS.map((s, i) => (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.05 }}
//               key={s.id}
//               className="group relative flex flex-col bg-white border-4 border-foreground p-4 hover:shadow-[12px_12px_0px_0px_rgba(0,212,255,1)] transition-all duration-500"
//             >
//               <div className="aspect-square bg-muted overflow-hidden border-2 border-foreground/5 mb-5 relative">
//                 <img
//                   src={s.img}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
//                   alt={s.name}
//                 />
//                 <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                   <div className="bg-white border-2 border-foreground p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//                     <ArrowUpRight size={16} strokeWidth={3} />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <h3 className="text-xs font-black uppercase tracking-tight italic group-hover:text-primary transition-colors truncate">
//                   {s.name}
//                 </h3>
//                 <div className="flex justify-between items-end pt-2">
//                   <p className="text-xl font-black italic text-foreground leading-none">
//                     ₹{s.price}
//                   </p>
//                   <span className="text-[8px] font-black text-foreground/20 uppercase tracking-widest">
//                     In Stock
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Stickers;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, ArrowUpRight, Droplets, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface StickerItem {
  id: number;
  name: string;
  price: number;
  img: string;
}

const STICKERS: StickerItem[] = [
  {
    id: 1,
    name: "Caffeine & Gas",
    price: 49,
    img: "https://images.unsplash.com/photo-1572375927083-074900481232?q=80&w=800",
  },
  {
    id: 2,
    name: "Neo Tokyo Drift",
    price: 59,
    img: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=800",
  },
  {
    id: 3,
    name: "Turbo Snail",
    price: 49,
    img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800",
  },
  {
    id: 4,
    name: "Initial D AE86",
    price: 69,
    img: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=800",
  },
];

const Stickers = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-28 md:pt-40 pb-32 px-6 max-w-[1400px] mx-auto">
        {/* HEADER SECTION - Balanced Fonts */}
        <header className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-primary fill-primary" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-black/40">
                Vinyl Protocol v1.0
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter italic leading-none">
              VINYL <span className="text-primary not-italic">STICKERS.</span>
            </h1>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-1.5 opacity-30">
                <Droplets size={12} />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  Waterproof
                </span>
              </div>
              <div className="flex items-center gap-1.5 opacity-30">
                <ShieldCheck size={12} />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  UV Protected
                </span>
              </div>
            </div>
          </div>

          <div className="bg-accent-lime border-2 md:border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_#000] rotate-1 max-w-sm">
            <p className="text-[10px] md:text-[11px] font-black uppercase leading-tight italic">
              FREE SHIPPING ON 10+ STICKERS. <br /> AUTO-APPLIED AT CHECKOUT.
            </p>
          </div>
        </header>

        {/* GRID SECTION - Responsive spacing */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
          {STICKERS.map((s, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={s.id}
              onClick={() => navigate(`/shop?cat=stickers&q=${s.name}`)}
              className="group relative flex flex-col bg-white border-2 md:border-4 border-black p-3 md:p-4 hover:shadow-[8px_8px_0px_0px_#00D4FF] transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-square bg-gray-50 overflow-hidden border border-black/5 mb-4 relative">
                <img
                  src={s.img}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={s.name}
                />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white border-2 border-black p-2 shadow-[3px_3px_0px_0px_#000]">
                    <ArrowUpRight size={14} strokeWidth={3} />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-[10px] font-black uppercase tracking-tight italic group-hover:text-primary transition-colors truncate">
                  {s.name}
                </h3>
                <div className="flex justify-between items-end pt-1">
                  <p className="text-lg font-black italic leading-none">
                    ₹{s.price}
                  </p>
                  <span className="text-[7px] font-black text-black/20 uppercase tracking-widest">
                    In Stock
                  </span>
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

export default Stickers;