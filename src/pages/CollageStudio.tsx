// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Zap, ArrowUpRight, Sparkles } from "lucide-react";
// import { motion } from "framer-motion";

// interface KitProduct {
//   id: number;
//   name: string;
//   img: string;
//   theme: string;
// }

// interface SizeOption {
//   label: string;
//   price: number;
// }

// interface KitCardProps {
//   item: KitProduct;
//   options: SizeOption[];
//   isFifty: boolean;
// }

// const THIRTY_PIECE_DATA: KitProduct[] = [
//   {
//     id: 1,
//     name: "Vintage Racing",
//     theme: "Automotive",
//     img: "/posters/car-30.png",
//   },
//   {
//     id: 2,
//     name: "Neon Cyberpunk",
//     theme: "Futuristic",
//     img: "/posters/cyber-30.png",
//   },
// ];

// const FIFTY_PIECE_DATA: KitProduct[] = [
//   {
//     id: 101,
//     name: "Ultimate Anime",
//     theme: "Otaku",
//     img: "/posters/anime-50.png",
//   },
//   {
//     id: 102,
//     name: "Dark Aesthetic",
//     theme: "Minimal",
//     img: "/posters/dark-50.png",
//   },
// ];

// const CollageStudio = () => {
//   return (
//     <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-24 sm:pt-40 pb-32 px-4 sm:px-6 max-w-[1400px] mx-auto">
//         {/* HERO SECTION */}
//         <header className="mb-20 space-y-6">
//           <div className="flex items-center gap-2">
//             <Zap size={18} className="text-accent fill-accent" />
//             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
//               Bundle Protocol v2.0
//             </span>
//           </div>
//           <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8]">
//             COLLAGE <br />
//             <span className="text-primary not-italic">STUDIO.</span>
//           </h1>
//         </header>

//         {/* SECTION 01: 30 PIECE KITS */}
//         <div className="mb-32">
//           <div className="flex items-center gap-4 mb-12 border-b-4 border-foreground pb-6">
//             <div className="bg-foreground text-background px-4 py-2 font-black text-xl italic">
//               01
//             </div>
//             <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
//               30-Piece Kits
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
//             {THIRTY_PIECE_DATA.map((item) => (
//               <KitCard
//                 key={item.id}
//                 item={item}
//                 isFifty={false}
//                 options={[
//                   { label: "A6", price: 349 },
//                   { label: "A5", price: 790 },
//                   { label: "A4", price: 990 },
//                 ]}
//               />
//             ))}
//           </div>
//         </div>

//         {/* SECTION 02: 50 PIECE KITS */}
//         <div>
//           <div className="flex items-center gap-4 mb-12 border-b-4 border-foreground pb-6">
//             <div className="bg-primary text-foreground px-4 py-2 font-black text-xl italic">
//               02
//             </div>
//             <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
//               50-Piece Kits
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
//             {FIFTY_PIECE_DATA.map((item) => (
//               <KitCard
//                 key={item.id}
//                 item={item}
//                 isFifty={true}
//                 options={[{ label: "A6", price: 389 }]}
//               />
//             ))}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// const KitCard = ({ item, options, isFifty }: KitCardProps) => {
//   const [selectedSize, setSelectedSize] = useState<string>(options[0].label);

//   const currentPrice = options.find((o) => o.label === selectedSize)?.price;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       className="group bg-white border-4 border-foreground flex flex-col sm:flex-row shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,212,255,1)] transition-all duration-500 overflow-hidden"
//     >
//       {/* LEFT: IMAGE */}
//       <div className="w-full sm:w-2/5 aspect-[4/5] sm:aspect-auto overflow-hidden border-b-4 sm:border-b-0 sm:border-r-4 border-foreground bg-muted relative">
//         <img
//           src={item.img}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//           alt={item.name}
//         />
//         <div className="absolute top-4 left-4 bg-foreground text-background text-[10px] font-black px-3 py-1 uppercase italic">
//           {isFifty ? "50 Units" : "30 Units"}
//         </div>
//       </div>

//       {/* RIGHT: CONTENT */}
//       <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
//         <div>
//           <div className="flex items-center gap-2 mb-4">
//             <Sparkles size={14} className="text-primary" />
//             <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
//               {item.theme} Protocol
//             </span>
//           </div>
//           <h3 className="text-3xl sm:text-4xl font-black uppercase italic leading-none mb-8">
//             {item.name}
//           </h3>

//           {/* SIZE SELECTOR */}
//           <div className="space-y-4 mb-8">
//             <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
//               Configuration
//             </span>
//             <div className="flex flex-wrap gap-2">
//               {options.map((opt) => (
//                 <button
//                   key={opt.label}
//                   onClick={() => setSelectedSize(opt.label)}
//                   className={`px-4 py-2 border-2 text-[11px] font-black transition-all ${
//                     selectedSize === opt.label
//                       ? "bg-foreground text-background border-foreground"
//                       : "bg-transparent text-foreground border-foreground/10 hover:border-foreground"
//                   }`}
//                 >
//                   {opt.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* PRICE & BUTTON */}
//         <div className="pt-6 border-t-2 border-foreground/5 flex flex-wrap items-end justify-between gap-4">
//           <div className="flex flex-col">
//             <span className="text-[10px] font-black text-foreground/20 uppercase mb-1">
//               Total Value
//             </span>
//             <p className="text-4xl font-black italic tracking-tighter leading-none text-primary">
//               ₹{currentPrice}
//             </p>
//           </div>

//           <button className="flex-1 sm:flex-none h-14 px-8 bg-foreground text-background font-black text-[11px] uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(255,46,99,0.3)] hover:bg-primary hover:text-foreground hover:shadow-none transition-all flex items-center justify-center gap-3">
//             ACQUIRE <ArrowUpRight size={18} strokeWidth={3} />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default CollageStudio;

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface KitProduct {
  id: number;
  name: string;
  img: string;
  theme: string;
}

interface SizeOption {
  label: string;
  price: number;
}

interface KitCardProps {
  item: KitProduct;
  options: SizeOption[];
  isFifty: boolean;
}

const THIRTY_PIECE_DATA: KitProduct[] = [
  {
    id: 1,
    name: "Vintage Racing",
    theme: "Automotive",
    img: "/posters/car-30.png",
  },
  {
    id: 2,
    name: "Neon Cyberpunk",
    theme: "Futuristic",
    img: "/posters/cyber-30.png",
  },
];

const FIFTY_PIECE_DATA: KitProduct[] = [
  {
    id: 101,
    name: "Ultimate Anime",
    theme: "Otaku",
    img: "/posters/anime-50.png",
  },
  {
    id: 102,
    name: "Dark Aesthetic",
    theme: "Minimal",
    img: "/posters/dark-50.png",
  },
];

const CollageStudio = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-28 md:pt-40 pb-32 px-6 max-w-[1400px] mx-auto">
        {/* HERO SECTION */}
        <header className="mb-16 md:mb-24 space-y-6">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-accent fill-accent" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
              Bundle Protocol v2.0
            </span>
          </div>
          <h1 className="font-display text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter italic leading-[0.9]">
            COLLAGE <br />
            <span className="text-primary not-italic">STUDIO.</span>
          </h1>
        </header>

        {/* SECTION 01: 30 PIECE KITS */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-10 md:mb-12 border-b-2 md:border-b-4 border-foreground pb-6">
            <div className="bg-foreground text-background px-3 py-1.5 md:px-4 md:py-2 font-black text-base md:text-xl italic">
              01
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">
              30-Piece Kits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {THIRTY_PIECE_DATA.map((item) => (
              <KitCard
                key={item.id}
                item={item}
                isFifty={false}
                options={[
                  { label: "A6", price: 349 },
                  { label: "A5", price: 790 },
                  { label: "A4", price: 990 },
                ]}
              />
            ))}
          </div>
        </div>

        {/* SECTION 02: 50 PIECE KITS */}
        <div>
          <div className="flex items-center gap-4 mb-10 md:mb-12 border-b-2 md:border-b-4 border-foreground pb-6">
            <div className="bg-primary text-foreground px-3 py-1.5 md:px-4 md:py-2 font-black text-base md:text-xl italic">
              02
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">
              50-Piece Kits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {FIFTY_PIECE_DATA.map((item) => (
              <KitCard
                key={item.id}
                item={item}
                isFifty={true}
                options={[{ label: "A6", price: 389 }]}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const KitCard = ({ item, options, isFifty }: KitCardProps): JSX.Element => {
  const [selectedSize, setSelectedSize] = useState<string>(options[0].label);

  const currentPrice =
    options.find((o) => o.label === selectedSize)?.price || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border-2 md:border-4 border-foreground flex flex-col xl:flex-row shadow-[6px_6px_0px_0px_#000] md:shadow-[10px_10px_0px_0px_#000] hover:shadow-[10px_10px_0px_0px_#00D4FF] md:hover:shadow-[16px_16px_0px_0px_#00D4FF] transition-all duration-500 overflow-hidden"
    >
      {/* LEFT: IMAGE */}
      <div className="w-full xl:w-2/5 aspect-[4/5] xl:aspect-auto overflow-hidden border-b-2 xl:border-b-0 xl:border-r-2 md:border-b-4 md:xl:border-b-0 md:xl:border-r-4 border-foreground bg-muted relative">
        <img
          src={item.img}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          alt={item.name}
        />
        <div className="absolute top-4 left-4 bg-foreground text-background text-[8px] md:text-[10px] font-black px-3 py-1 uppercase italic">
          {isFifty ? "50 UNITS" : "30 UNITS"}
        </div>
      </div>

      {/* RIGHT: CONTENT */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={12} className="text-primary" />
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-foreground/40">
              {item.theme} PROTOCOL
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase italic leading-none mb-6 md:mb-8">
            {item.name}
          </h3>

          {/* SIZE SELECTOR */}
          <div className="space-y-4 mb-8">
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-foreground/30">
              CONFIGURATION
            </span>
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setSelectedSize(opt.label)}
                  className={`px-3 py-2 md:px-4 md:py-2 border-2 text-[9px] md:text-[11px] font-black transition-all ${
                    selectedSize === opt.label
                      ? "bg-foreground text-background border-foreground shadow-[2px_2px_0px_0px_#00D4FF]"
                      : "bg-transparent text-foreground border-foreground/10 hover:border-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PRICE & BUTTON */}
        <div className="pt-6 border-t-2 border-foreground/5 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[9px] font-black text-foreground/20 uppercase mb-1">
              TOTAL VALUE
            </span>
            <p className="text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter leading-none text-primary">
              ₹{currentPrice}
            </p>
          </div>

          <button className="w-full sm:w-auto h-14 px-8 bg-black text-white font-black text-[10px] md:text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_0px_#FF2E63] hover:bg-primary hover:text-foreground hover:shadow-none transition-all flex items-center justify-center gap-3">
            ACQUIRE <ArrowUpRight size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CollageStudio;