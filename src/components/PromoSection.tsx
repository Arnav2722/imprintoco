// import { Link } from "react-router-dom";
// import { ArrowRight, Zap, Gift } from "lucide-react";
// import { motion } from "framer-motion";

// const PromoSection = () => {
//   return (
//     <section className="py-12 md:py-24 bg-background relative overflow-hidden">
//       <div className="max-w-[1400px] mx-auto px-6 md:px-10">
//         <div className="relative overflow-hidden bg-accent-lime p-8 sm:p-10 md:p-20 border-2 md:border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
//           {/* Decorative Elements */}
//           <div className="absolute top-0 right-0 p-4 opacity-10 md:opacity-100 pointer-events-none">
//             <Gift className="w-12 h-12 md:w-[100px] md:h-[100px] text-foreground/5 -rotate-12" />
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Visual Part (Posters) - Fixed Scaling for Mobile */}
//             <div className="relative h-[250px] sm:h-[400px] md:h-[500px] flex items-center justify-center order-1 lg:order-2">
//               {/* Poster 1 */}
//               <motion.div
//                 initial={{ rotate: -15, x: -30 }}
//                 whileInView={{ rotate: -12, x: -20 }}
//                 viewport={{ once: true }}
//                 className="absolute w-36 h-48 sm:w-64 sm:h-80 bg-white border-2 md:border-4 border-foreground p-1 shadow-xl z-0"
//               >
//                 <img
//                   src="/Posters/f1v2.jpg"
//                   className="w-full h-full object-cover grayscale-[0.2]"
//                   alt="Promo 1"
//                 />
//               </motion.div>

//               {/* Poster 2 */}
//               <motion.div
//                 initial={{ rotate: 10, x: 30 }}
//                 whileInView={{ rotate: 6, x: 20 }}
//                 viewport={{ once: true }}
//                 className="absolute w-40 h-52 sm:w-72 sm:h-96 bg-white border-2 md:border-4 border-foreground p-1 shadow-[6px_6px_0px_0px_rgba(0,212,255,1)] md:shadow-[15px_15px_0px_0px_rgba(0,212,255,1)] z-10"
//               >
//                 <img
//                   src="/Posters/f1c3.jpg"
//                   className="w-full h-full object-cover"
//                   alt="Promo 2"
//                 />
//               </motion.div>

//               <div className="absolute top-2 right-2 sm:top-10 sm:right-10 bg-accent text-white font-black px-2 py-1 md:px-4 md:py-2 -rotate-12 z-20 text-[8px] md:text-xs">
//                 LIMITED
//               </div>
//             </div>

//             {/* Text Content */}
//             <div className="relative z-10 order-2 lg:order-1 text-center lg:text-left">
//               <motion.div
//                 initial={{ x: -10, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 className="inline-flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 bg-foreground mb-6"
//               >
//                 <Zap size={12} className="text-accent-lime fill-accent-lime" />
//                 <span className="text-[7px] md:text-[10px] font-black tracking-widest text-background uppercase">
//                   Exclusive Offer
//                 </span>
//               </motion.div>

//               <h2 className="font-display text-[8vw] sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase leading-[1.2] mb-6">
//                 THE <br />
//                 <span className="text-accent">MOTORSPORT</span> <br />
//                 ESSENTIALS
//               </h2>

//               <p className="text-foreground/70 text-[9px] md:text-base font-bold max-w-md mb-8 leading-relaxed uppercase mx-auto lg:mx-0">
//                 Take 15% off your first bundle. Museum-grade prints designed for
//                 the 1%.
//               </p>

//               <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
//                 <Link
//                   to="/shop?cat=f1"
//                   className="w-full sm:w-auto px-6 md:px-10 h-14 md:h-20 bg-foreground text-background font-black uppercase text-[10px] md:text-xs flex items-center justify-center gap-3 hover:bg-primary hover:text-foreground transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,46,99,1)] md:shadow-[8px_8px_0px_0px_rgba(255,46,99,1)]"
//                 >
//                   Shop Drop
//                   <ArrowRight size={16} />
//                 </Link>

//                 <div className="flex flex-col items-center sm:items-start">
//                   <span className="text-[7px] md:text-[9px] font-black text-foreground/40 uppercase tracking-widest mb-1">
//                     Use Code
//                   </span>
//                   <div className="text-base md:text-xl font-black text-foreground border-b-4 border-accent">
//                     FIRST15
//                   </div>
//                 </div>
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
    <section className="py-12 md:py-24 bg-background relative overflow-hidden w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 w-full">
        <div className="relative overflow-hidden bg-accent-lime p-6 sm:p-10 md:p-20 border-2 md:border-4 border-foreground shadow-[4px_4px_0px_0px_black] md:shadow-[12px_12px_0px_0px_black] w-full">
          <div className="absolute top-0 right-0 p-4 opacity-10 md:opacity-100 pointer-events-none">
            <Gift className="w-12 h-12 md:w-[100px] md:h-[100px] text-foreground/5 -rotate-12" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center w-full">
            <div className="relative z-10 order-2 lg:order-1 text-center lg:text-left w-full flex flex-col items-center lg:items-start">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-foreground mb-4 md:mb-6"
              >
                <Zap className="text-accent-lime fill-accent-lime" size={12} />
                <span className="text-[8px] md:text-[10px] font-black tracking-widest text-background uppercase">
                  Top Picks
                </span>
              </motion.div>

              <h2 className="font-display text-[12vw] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground uppercase leading-[1.1] mb-4 md:mb-6">
                MATCH
                <span className="text-accent"> DAY </span> <br />
                ARCHIVE
              </h2>

              <p className="text-foreground/80 text-xs sm:text-sm md:text-base font-bold max-w-md mb-8 leading-relaxed uppercase">
                Upgrade your walls with premium posters. From cricket stadiums
                to race tracks. Grab yours before they sell out.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start w-full">
                <Link
                  className="w-full sm:w-auto px-8 md:px-10 h-14 md:h-16 bg-foreground text-background font-black uppercase text-[10px] md:text-xs flex items-center justify-center gap-3 hover:bg-primary hover:text-foreground transition-all duration-300 shadow-[4px_4px_0px_0px_rgb(255,46,99)] md:shadow-[6px_6px_0px_0px_rgb(255,46,99)]"
                  to="/shop?sort=trending"
                >
                  Shop Now
                  <ArrowRight size={16} />
                </Link>

                <div className="flex flex-col items-center sm:items-start mt-2 sm:mt-0">
                  <span className="text-[8px] md:text-[10px] font-black text-foreground/50 uppercase tracking-widest mb-1">
                    Stock Alert
                  </span>
                  <div className="text-sm md:text-xl font-black text-foreground border-b-2 md:border-b-4 border-accent pb-0.5 md:pb-1">
                    SELLING FAST
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[300px] sm:h-[450px] md:h-[500px] flex items-center justify-center order-1 lg:order-2 w-full">
              <motion.div
                initial={{ rotate: -15, x: -30 }}
                whileInView={{ rotate: -10, x: -20 }}
                viewport={{ once: true }}
                className="absolute w-[45%] sm:w-[220px] md:w-[260px] aspect-[3/4] bg-white border-2 md:border-4 border-foreground p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] z-0"
              >
                <img
                  src="/Posters/f1v2.jpg"
                  className="w-full h-full object-cover grayscale-[0.2]"
                  alt="Cricket Poster"
                />
              </motion.div>

              <motion.div
                initial={{ rotate: 10, x: 30 }}
                whileInView={{ rotate: 6, x: 20 }}
                viewport={{ once: true }}
                className="absolute w-[55%] sm:w-[260px] md:w-[320px] aspect-[3/4] bg-white border-2 md:border-4 border-foreground p-1 shadow-[4px_4px_0px_0px_rgb(0,212,255)] md:shadow-[12px_12px_0px_0px_rgb(0,212,255)] z-10"
              >
                <img
                  src="/Posters/f1c3.jpg"
                  className="w-full h-full object-cover"
                  alt="Football Poster"
                />
              </motion.div>

              <div className="absolute top-0 right-0 sm:top-4 sm:right-4 md:top-10 md:right-10 bg-accent text-white font-black px-3 py-1.5 md:px-4 md:py-2 -rotate-12 z-20 text-[8px] md:text-xs shadow-[2px_2px_0px_0px_black]">
                LIMITED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;