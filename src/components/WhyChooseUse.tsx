// import { motion } from "motion/react";
// import { Sparkles, SwatchBook, Gift, Truck } from "lucide-react";

// const perks = [
//   {
//     icon: <Sparkles className="text-primary" size={28} />,
//     title: "Premium Finish",
//     desc: "Every poster is printed on high-grade matte paper to ensure deep colors and zero glare.",
//   },
//   {
//     icon: <SwatchBook className="text-primary" size={28} />,
//     title: "Custom Built",
//     desc: "Can't find your vibe? Upload your own designs and we will print them for you with precision.",
//   },
//   {
//     icon: <Gift className="text-primary" size={28} />,
//     title: "Member Perks",
//     desc: "We regularly drop exclusive discount codes and bundles for our community members.",
//   },
//   {
//     icon: <Truck className="text-primary" size={28} />,
//     title: "Fast Delivery",
//     desc: "No hidden fees. We provide reliable shipping across India with secure tube packaging.",
//   },
// ];

// const WhyChooseUs = () => {
//   return (
//     <section className="py-24 bg-[#050505] selection:bg-primary selection:text-black">
//       <div className="max-w-[1400px] mx-auto px-6">
//         {/* HEADER */}
//         <div className="text-center mb-20 space-y-4">
//           <h2 className="font-bricolage text-4xl md:text-6xl font-black uppercase tracking-tighter">
//             WHY <span className="text-primary">CHOOSE US?</span>
//           </h2>
//           <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] max-w-md mx-auto">
//             Small details make a big difference in your space
//           </p>
//         </div>

//         {/* PERKS GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {perks.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               viewport={{ once: true }}
//               className="bg-[#080808] border border-white/5 p-8 rounded-none flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-500"
//             >
//               <div className="mb-6 p-4 bg-white/5 rounded-full group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500">
//                 {item.icon}
//               </div>

//               <h3 className="font-bricolage text-xl font-black uppercase tracking-tight text-white mb-3">
//                 {item.title}
//               </h3>
//               <p className="text-gray-500 text-xs font-medium leading-relaxed">
//                 {item.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* BOTTOM TAGLINE */}
//         <div className="mt-20 pt-10 border-t border-white/5 text-center">
//           <div className="inline-flex items-center gap-4 opacity-40">
//             <span className="h-[1px] w-8 bg-white" />
//             <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white">
//               Built by fans for the fans
//             </p>
//             <span className="h-[1px] w-8 bg-white" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;

import { motion } from "framer-motion";
import {
  Sparkles,
  SwatchBook,
  Truck,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background selection:bg-primary selection:text-black border-t border-foreground/5">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* COMPACT HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-accent fill-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
                The Imprinto Standard
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none text-foreground">
              WHY <span className="text-primary italic">CHOOSE US?</span>
            </h2>
          </div>
          <p className="text-foreground/50 text-[11px] font-bold uppercase tracking-widest max-w-[200px] leading-relaxed border-l-2 border-primary pl-4">
            Details that define your space.
          </p>
        </div>

        {/* REFINED BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
          {/* Card 1: Premium Finish (Large) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-2 bg-white border-2 border-foreground p-8 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,212,255,1)] group"
          >
            <Sparkles size={32} className="text-primary" />
            <div>
              <h3 className="font-display text-2xl font-black uppercase mb-2">
                Museum Grade Finish
              </h3>
              <p className="text-foreground/60 text-xs font-bold uppercase leading-tight">
                250gsm heavyweight matte paper. Deep blacks, zero glare, and
                archival inks that won't fade for 100+ years.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Fast Shipping (Wide) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-1 bg-accent-lime border-2 border-foreground p-6 flex items-center gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="w-12 h-12 bg-background border-2 border-foreground flex items-center justify-center shrink-0">
              <Truck size={24} className="text-foreground" />
            </div>
            <div>
              <h3 className="font-display text-xl font-black uppercase leading-none">
                Express Delivery
              </h3>
              <p className="text-[10px] font-black uppercase text-foreground/50 mt-1">
                3-5 Day delivery across India
              </p>
            </div>
          </motion.div>

          {/* Card 3: Custom Prints */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-1 md:row-span-1 bg-accent border-2 border-foreground p-6 flex flex-col justify-between text-white shadow-[6px_6px_0px_0px_rgba(0,212,255,1)]"
          >
            <SwatchBook size={20} />
            <h3 className="font-display text-lg font-black uppercase leading-tight">
              Custom <br /> Prints
            </h3>
          </motion.div>

          {/* Card 4: Global Design Quality */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-1 md:row-span-1 bg-foreground border-2 border-foreground p-6 flex flex-col justify-between text-background shadow-[6px_6px_0px_0px_rgba(204,255,0,1)]"
          >
            <Globe size={20} className="text-accent-lime" />
            <h3 className="font-display text-lg font-black uppercase leading-tight">
              Global <br /> Standards
            </h3>
          </motion.div>

          {/* Card 5: Secure Packaging (Bottom Wide) */}
          {/* <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-1 bg-white border-2 border-foreground p-6 flex items-center justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-4">
              <ShieldCheck size={24} className="text-accent" />
              <h3 className="font-display text-xl font-black uppercase">
                Tough Tube Packaging
              </h3>
            </div>
            <p className="text-[9px] font-black uppercase text-foreground/40 max-w-[100px] text-right">
              Zero damage guarantee on every order.
            </p>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;