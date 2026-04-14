// import { Link } from "react-router-dom";
// import { ArrowRight, Zap } from "lucide-react";

// const PromoSection = () => {
//   return (
//     <section className="py-20 bg-[#050505]">
//       <div className="max-w-[1400px] mx-auto px-6">
//         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-white/5 p-8 md:p-16">
//           {/* Background Decor */}
//           <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             {/* Text Content */}
//             <div className="relative z-10">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
//                 <Zap size={14} className="text-primary fill-primary" />
//                 <span className="text-[10px] font-black tracking-widest text-primary uppercase">
//                   Limited Time Drop
//                 </span>
//               </div>

//               <h2 className="font-bricolage text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none mb-6">
//                 The <span className="text-primary not-italic">Motorsport</span>{" "}
//                 <br /> Essentials.
//               </h2>

//               <p className="text-gray-400 text-lg md:text-xl font-medium max-w-md mb-10 leading-relaxed">
//                 Get 15% off on your first bundle order. High-grade matte finish,
//                 built for the true fans.
//               </p>

//               <div className="flex flex-wrap gap-4">
//                 <Link
//                   to="/shop?cat=f1"
//                   className="px-10 h-16 bg-white text-black font-black italic uppercase tracking-tighter flex items-center gap-3 hover:bg-primary transition-all group"
//                 >
//                   Shop the Drop
//                   <ArrowRight
//                     size={20}
//                     className="group-hover:translate-x-2 transition-transform"
//                   />
//                 </Link>
//                 <div className="flex items-center gap-4 px-6 border border-white/10 text-white font-bold text-sm uppercase tracking-widest">
//                   Code: <span className="text-primary">FIRST15</span>
//                 </div>
//               </div>
//             </div>

//             {/* Visual Part (Stacked Posters) */}
//             <div className="relative h-[300px] md:h-[450px] hidden md:flex items-center justify-center">
//               <div className="absolute w-64 h-80 bg-gray-800 rotate-[-12deg] translate-x-[-20%] border border-white/10 rounded-lg overflow-hidden shadow-2xl z-0">
//                 <img
//                   src="/Posters/f1v2.jpg"
//                   className="w-full h-full object-cover opacity-50"
//                 />
//               </div>
//               <div className="absolute w-64 h-80 bg-gray-800 rotate-[8deg] translate-x-[20%] border border-white/10 rounded-lg overflow-hidden shadow-2xl z-10">
//                 <img
//                   src="/Posters/f1c3.jpg"
//                   className="w-full h-full object-cover"
//                 />
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
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="relative overflow-hidden bg-accent-lime p-8 md:p-20 border-4 border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-4">
            <Gift size={120} className="text-foreground/5 -rotate-12" />
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-foreground mb-8"
              >
                <Zap size={16} className="text-accent-lime fill-accent-lime" />
                <span className="text-[11px] font-black tracking-[0.3em] text-background uppercase">
                  Exclusive Offer
                </span>
              </motion.div>

              <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter text-foreground uppercase leading-[0.85] mb-8">
                THE <br />
                <span className="italic text-accent">
                  MOTORSPORT
                </span> <br /> ESSENTIALS.
              </h2>

              <p className="text-foreground/70 text-lg md:text-xl font-bold max-w-md mb-12 leading-tight uppercase">
                Take 15% off your first bundle. Museum-grade prints designed for
                the 1%.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link
                  to="/shop?cat=f1"
                  className="px-12 h-20 bg-foreground text-background font-black uppercase tracking-widest flex items-center gap-4 hover:bg-primary hover:text-foreground transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,46,99,1)] hover:shadow-none"
                >
                  Shop the Drop
                  <ArrowRight size={24} />
                </Link>

                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-1">
                    Use Code
                  </span>
                  <div className="text-2xl font-black text-foreground border-b-4 border-accent">
                    FIRST15
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Part (Floating Premium Posters) */}
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
              {/* Poster 1 */}
              <motion.div
                initial={{ rotate: -15, x: -50 }}
                whileInView={{ rotate: -12, x: -30 }}
                className="absolute w-64 h-80 bg-white border-4 border-foreground p-2 shadow-2xl z-0"
              >
                <img
                  src="/Posters/f1v2.jpg"
                  className="w-full h-full object-cover grayscale-[0.3]"
                  alt="Promo 1"
                />
              </motion.div>

              {/* Poster 2 */}
              <motion.div
                initial={{ rotate: 10, x: 50 }}
                whileInView={{ rotate: 6, x: 30 }}
                className="absolute w-72 h-96 bg-white border-4 border-foreground p-2 shadow-[20px_20px_0px_0px_rgba(0,212,255,1)] z-10"
              >
                <img
                  src="/Posters/f1c3.jpg"
                  className="w-full h-full object-cover"
                  alt="Promo 2"
                />
              </motion.div>

              {/* Decorative Tag */}
              <div className="absolute top-10 right-10 bg-accent text-white font-black px-4 py-2 -rotate-12 z-20 text-sm">
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