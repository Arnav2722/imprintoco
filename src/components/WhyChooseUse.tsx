// import { motion } from "framer-motion";
// import { Sparkles, SwatchBook, Truck, Zap, Globe } from "lucide-react";

// const WhyChooseUs = (): JSX.Element => {
//   return (
//     <section className="py-12 md:py-24 bg-background selection:bg-primary selection:text-black border-t border-foreground/5">
//       <div className="max-w-[1400px] mx-auto px-5 md:px-10">
//         {/* COMPACT HEADER */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
//           <div className="max-w-xl">
//             <div className="flex items-center gap-2 mb-3">
//               <Zap size={14} className="text-accent fill-accent" />
//               <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-foreground/40">
//                 The Imprinto Standard
//               </span>
//             </div>
//             <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] md:leading-none text-foreground">
//               WHY <span className="text-primary italic">CHOOSE US?</span>
//             </h2>
//           </div>
//           <p className="text-foreground/50 text-[10px] md:text-[11px] font-bold uppercase tracking-widest max-w-[200px] leading-relaxed border-l-2 border-primary pl-4">
//             Details that define your space.
//           </p>
//         </div>

//         {/* REFINED BENTO GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[180px]">
//           {/* Card 1: Premium Finish */}
//           <motion.div
//             whileHover={{ y: -5 }}
//             className="sm:col-span-2 sm:row-span-2 bg-white border-2 border-foreground p-6 md:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#00D4FF] md:shadow-[8px_8px_0px_0px_#00D4FF] group"
//           >
//             <Sparkles className="w-8 h-8 text-primary" />
//             <div>
//               <h3 className="font-display text-xl md:text-2xl font-black uppercase mb-2">
//                 Museum Grade Finish
//               </h3>
//               <p className="text-foreground/60 text-[10px] md:text-xs font-bold uppercase leading-tight">
//                 300gsm heavyweight matte paper. Deep blacks, zero glare, and
//                 archival inks for authentic gallery-standard quality.
//               </p>
//             </div>
//           </motion.div>

//           {/* Card 2: Fast Shipping */}
//           <motion.div
//             whileHover={{ y: -5 }}
//             className="sm:col-span-2 sm:row-span-1 bg-accent-lime border-2 border-foreground p-5 md:p-6 flex items-center gap-4 md:gap-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
//           >
//             <div className="w-10 h-10 md:w-12 md:h-12 bg-background border-2 border-foreground flex items-center justify-center shrink-0">
//               <Truck className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
//             </div>
//             <div>
//               <h3 className="font-display text-lg md:text-xl font-black uppercase leading-none">
//                 Express Delivery
//               </h3>
//               <p className="text-[9px] md:text-[10px] font-black uppercase text-foreground/50 mt-1">
//                 3-5 Day delivery Pan-India
//               </p>
//             </div>
//           </motion.div>

//           {/* Card 3: Custom Prints */}
//           <motion.div
//             whileHover={{ y: -5 }}
//             className="col-span-1 row-span-1 bg-accent border-2 border-foreground p-5 md:p-6 flex flex-col justify-between text-white shadow-[5px_5px_0px_0px_#00D4FF] md:shadow-[6px_6px_0px_0px_#00D4FF]"
//           >
//             <SwatchBook className="w-5 h-5" />
//             <h3 className="font-display text-base md:text-lg font-black uppercase leading-tight">
//               Custom <br /> Prints
//             </h3>
//           </motion.div>

//           {/* Card 4: Global Standards */}
//           <motion.div
//             whileHover={{ y: -5 }}
//             className="col-span-1 row-span-1 bg-foreground border-2 border-foreground p-5 md:p-6 flex flex-col justify-between text-background shadow-[5px_5px_0px_0px_#CCFF00] md:shadow-[6px_6px_0px_0px_#CCFF00]"
//           >
//             <Globe className="w-5 h-5 text-accent-lime" />
//             <h3 className="font-display text-base md:text-lg font-black uppercase leading-tight">
//               Global <br /> Standards
//             </h3>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;

import { motion } from "framer-motion";
import { Sparkles, SwatchBook, Truck, Zap, Globe } from "lucide-react";

const WhyChooseUs = (): JSX.Element => {
  return (
    <section className="py-12 md:py-24 bg-background selection:bg-primary selection:text-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* COMPACT HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={12} className="text-accent fill-accent" />
              <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] text-foreground/40">
                The Imprinto Standard
              </span>
            </div>
            <h2 className="font-display text-[8vw] sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1.2] text-foreground">
              WHY <span className="text-primary">CHOOSE US?</span>
            </h2>
          </div>
          <p className="text-foreground/50 text-[8px] md:text-[10px] font-black uppercase tracking-widest max-w-[200px] leading-relaxed border-l-2 border-primary pl-4">
            Details that define your space.
          </p>
        </div>

        {/* REFINED BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {/* Card 1: Premium Finish */}
          <motion.div
            whileHover={{ y: -5 }}
            className="sm:col-span-2 sm:row-span-2 bg-white border-2 border-foreground p-6 md:p-10 flex flex-col justify-between shadow-[6px_6px_0px_0px_#00D4FF] group"
          >
            <Sparkles className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-display text-lg md:text-2xl font-black uppercase mb-3 leading-tight">
                Museum Grade Finish
              </h3>
              <p className="text-foreground/60 text-[8px] md:text-[10px] font-black uppercase leading-normal">
                300gsm heavyweight matte paper. Deep blacks, zero glare, and
                archival inks for authentic gallery-standard quality.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Fast Shipping */}
          <motion.div
            whileHover={{ y: -5 }}
            className="sm:col-span-2 sm:row-span-1 bg-accent-lime border-2 border-foreground p-6 flex items-center gap-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-background border-2 border-foreground flex items-center justify-center shrink-0">
              <Truck
                className="w-5 h-5 md:w-6 md:h-6 text-foreground"
                strokeWidth={3}
              />
            </div>
            <div>
              <h3 className="font-display text-base md:text-xl font-black uppercase leading-none">
                Express Delivery
              </h3>
              <p className="text-[7px] md:text-[9px] font-black uppercase text-foreground/50 mt-2">
                3-5 Day delivery Pan-India
              </p>
            </div>
          </motion.div>

          {/* Card 3: Custom Prints */}
          <motion.div
            whileHover={{ y: -5 }}
            className="col-span-1 row-span-1 bg-accent border-2 border-foreground p-6 flex flex-col justify-between text-white shadow-[4px_4px_0px_0px_#00D4FF]"
          >
            <SwatchBook className="w-5 h-5" strokeWidth={3} />
            <h3 className="font-display text-xs md:text-lg font-black uppercase leading-tight">
              Custom <br /> Prints
            </h3>
          </motion.div>

          {/* Card 4: Global Standards */}
          <motion.div
            whileHover={{ y: -5 }}
            className="col-span-1 row-span-1 bg-foreground border-2 border-foreground p-6 flex flex-col justify-between text-background shadow-[4px_4px_0px_0px_#CCFF00]"
          >
            <Globe className="w-5 h-5 text-accent-lime" strokeWidth={3} />
            <h3 className="font-display text-xs md:text-lg font-black uppercase leading-tight">
              Global <br /> Standards
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;