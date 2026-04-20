// import { Link } from "react-router-dom";
// import { ArrowRight, Zap, Gift } from "lucide-react";
// import { motion } from "framer-motion";

// const PromoSection = () => {
//   return (
//     <section className="py-12 md:py-24 bg-background relative overflow-hidden">
//       <div className="max-w-[1400px] mx-auto px-5 md:px-10">
//         <div className="relative overflow-hidden bg-accent-lime p-6 sm:p-10 md:p-20 border-2 md:border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
//           {/* Decorative Elements */}
//           <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10 md:opacity-100">
//             <Gift className="w-16 h-16 md:w-[120px] md:h-[120px] text-foreground/5 -rotate-12" />
//           </div>
//           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

//           <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
//             {/* Text Content */}
//             <div className="relative z-10 order-2 lg:order-1 text-center lg:text-left">
//               <motion.div
//                 initial={{ x: -20, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-foreground mb-6 md:mb-8"
//               >
//                 <Zap size={14} className="text-accent-lime fill-accent-lime" />
//                 <span className="text-[9px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.3em] text-background uppercase">
//                   Exclusive Offer
//                 </span>
//               </motion.div>

//               <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground uppercase leading-[0.9] md:leading-[0.85] mb-6 md:mb-8">
//                 THE <br className="hidden sm:block" />
//                 <span className="italic text-accent">
//                   MOTORSPORT
//                 </span> <br /> ESSENTIALS.
//               </h2>

//               <p className="text-foreground/70 text-base md:text-xl font-bold max-w-md mb-8 md:mb-12 leading-tight uppercase mx-auto lg:mx-0">
//                 Take 15% off your first bundle. Museum-grade prints designed for
//                 the 1%.
//               </p>

//               <div className="flex flex-col sm:flex-row items-center lg:items-center gap-6 md:gap-8 justify-center lg:justify-start">
//                 <Link
//                   to="/shop?cat=f1"
//                   className="w-full sm:w-auto px-8 md:px-12 h-16 md:h-20 bg-foreground text-background font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-primary hover:text-foreground transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(255,46,99,1)] md:shadow-[8px_8px_0px_0px_rgba(255,46,99,1)] hover:shadow-none"
//                 >
//                   Shop the Drop
//                   <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
//                 </Link>

//                 <div className="flex flex-col items-center sm:items-start">
//                   <span className="text-[9px] md:text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-1">
//                     Use Code
//                   </span>
//                   <div className="text-xl md:text-2xl font-black text-foreground border-b-4 border-accent">
//                     FIRST15
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Visual Part (Floating Premium Posters) */}
//             <div className="relative h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center order-1 lg:order-2 scale-75 sm:scale-90 md:scale-100">
//               {/* Poster 1 */}
//               <motion.div
//                 initial={{ rotate: -15, x: -50 }}
//                 whileInView={{ rotate: -12, x: -30 }}
//                 viewport={{ once: true }}
//                 className="absolute w-48 h-64 sm:w-64 sm:h-80 bg-white border-2 md:border-4 border-foreground p-1.5 md:p-2 shadow-2xl z-0"
//               >
//                 <img
//                   src="/Posters/f1v2.jpg"
//                   className="w-full h-full object-cover grayscale-[0.3]"
//                   alt="Promo 1"
//                 />
//               </motion.div>

//               {/* Poster 2 */}
//               <motion.div
//                 initial={{ rotate: 10, x: 50 }}
//                 whileInView={{ rotate: 6, x: 30 }}
//                 viewport={{ once: true }}
//                 className="absolute w-56 h-72 sm:w-72 sm:h-96 bg-white border-2 md:border-4 border-foreground p-1.5 md:p-2 shadow-[10px_10px_0px_0px_rgba(0,212,255,1)] md:shadow-[20px_20px_0px_0px_rgba(0,212,255,1)] z-10"
//               >
//                 <img
//                   src="/Posters/f1c3.jpg"
//                   className="w-full h-full object-cover"
//                   alt="Promo 2"
//                 />
//               </motion.div>

//               {/* Decorative Tag */}
//               <div className="absolute top-4 right-4 sm:top-10 sm:right-10 bg-accent text-white font-black px-3 py-1.5 md:px-4 md:py-2 -rotate-12 z-20 text-xs md:text-sm">
//                 LIMITED
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PromoSection;

import { Link } from "react-router-dom";
import { ArrowRight, Zap, Gift } from "lucide-react";
import { motion } from "framer-motion";

const PromoSection = () => {
  return (
    <section className="py-12 md:py-24 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="relative overflow-hidden bg-accent-lime p-8 sm:p-10 md:p-20 border-2 md:border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-4 opacity-10 md:opacity-100 pointer-events-none">
            <Gift className="w-12 h-12 md:w-[100px] md:h-[100px] text-foreground/5 -rotate-12" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual Part (Posters) - Fixed Scaling for Mobile */}
            <div className="relative h-[250px] sm:h-[400px] md:h-[500px] flex items-center justify-center order-1 lg:order-2">
              {/* Poster 1 */}
              <motion.div
                initial={{ rotate: -15, x: -30 }}
                whileInView={{ rotate: -12, x: -20 }}
                viewport={{ once: true }}
                className="absolute w-36 h-48 sm:w-64 sm:h-80 bg-white border-2 md:border-4 border-foreground p-1 shadow-xl z-0"
              >
                <img
                  src="/Posters/f1v2.jpg"
                  className="w-full h-full object-cover grayscale-[0.2]"
                  alt="Promo 1"
                />
              </motion.div>

              {/* Poster 2 */}
              <motion.div
                initial={{ rotate: 10, x: 30 }}
                whileInView={{ rotate: 6, x: 20 }}
                viewport={{ once: true }}
                className="absolute w-40 h-52 sm:w-72 sm:h-96 bg-white border-2 md:border-4 border-foreground p-1 shadow-[6px_6px_0px_0px_rgba(0,212,255,1)] md:shadow-[15px_15px_0px_0px_rgba(0,212,255,1)] z-10"
              >
                <img
                  src="/Posters/f1c3.jpg"
                  className="w-full h-full object-cover"
                  alt="Promo 2"
                />
              </motion.div>

              <div className="absolute top-2 right-2 sm:top-10 sm:right-10 bg-accent text-white font-black px-2 py-1 md:px-4 md:py-2 -rotate-12 z-20 text-[8px] md:text-xs">
                LIMITED
              </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 order-2 lg:order-1 text-center lg:text-left">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 bg-foreground mb-6"
              >
                <Zap size={12} className="text-accent-lime fill-accent-lime" />
                <span className="text-[7px] md:text-[10px] font-black tracking-widest text-background uppercase">
                  Exclusive Offer
                </span>
              </motion.div>

              <h2 className="font-display text-[8vw] sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase leading-[1.2] mb-6">
                THE <br />
                <span className="text-accent">MOTORSPORT</span> <br />
                ESSENTIALS
              </h2>

              <p className="text-foreground/70 text-[9px] md:text-base font-bold max-w-md mb-8 leading-relaxed uppercase mx-auto lg:mx-0">
                Take 15% off your first bundle. Museum-grade prints designed for
                the 1%.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <Link
                  to="/shop?cat=f1"
                  className="w-full sm:w-auto px-6 md:px-10 h-14 md:h-20 bg-foreground text-background font-black uppercase text-[10px] md:text-xs flex items-center justify-center gap-3 hover:bg-primary hover:text-foreground transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,46,99,1)] md:shadow-[8px_8px_0px_0px_rgba(255,46,99,1)]"
                >
                  Shop Drop
                  <ArrowRight size={16} />
                </Link>

                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[7px] md:text-[9px] font-black text-foreground/40 uppercase tracking-widest mb-1">
                    Use Code
                  </span>
                  <div className="text-base md:text-xl font-black text-foreground border-b-4 border-accent">
                    FIRST15
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;