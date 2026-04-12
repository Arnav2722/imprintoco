// // import { motion } from "framer-motion";

// // const lifestyles = [
// //   {
// //     title: "Vibrant Walls",
// //     desc: "Anime & Manga aesthetics for your sanctuary.",
// //     image: "/Posters/Batman.jpg", // Yahan baad mein wo image dalna jisme deewar pe poster ho
// //     tag: "Aesthetics",
// //   },
// //   {
// //     title: "Tech Personalization",
// //     desc: "Premium vinyl stickers for your machines.",
// //     image: "/Posters/porsche1.jpg", // Laptop/Gadget mockup image
// //     tag: "Stickers",
// //   },
// //   {
// //     title: "The Speed Den",
// //     desc: "Motorsport legends in high-grade matte.",
// //     image: "/Posters/f1c3.jpg", // Room mockup with F1 posters
// //     tag: "Racing",
// //   },
// // ];

// // const LifestyleSection = () => {
// //   return (
// //     <section className="py-24 bg-[#050505]">
// //       <div className="max-w-[1400px] mx-auto px-6">
// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
// //           <div className="max-w-2xl">
// //             <h2 className="font-bricolage text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
// //               Live Your <br />
// //               <span className="text-primary not-italic">Lifestyle.</span>
// //             </h2>
// //           </div>
// //           <p className="text-gray-400 font-medium max-w-xs text-sm md:text-base leading-relaxed border-l-2 border-primary pl-4">
// //             From your workspace to your bedroom, bring your passion to life with
// //             our premium prints.
// //           </p>
// //         </div>

// //         {/* Layout */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //           {lifestyles.map((item, i) => (
// //             <motion.div
// //               key={i}
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               transition={{ delay: i * 0.2 }}
// //               className="group cursor-default"
// //             >
// //               <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6 bg-gray-900 border border-white/5">
// //                 {/* Overlay with Tag */}
// //                 <div className="absolute top-4 left-4 z-20">
// //                   <span className="bg-white text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest italic shadow-xl">
// //                     {item.tag}
// //                   </span>
// //                 </div>

// //                 {/* Main Lifestyle Image */}
// //                 <img
// //                   src={item.image}
// //                   alt={item.title}
// //                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
// //                 />

// //                 {/* Dark Vignette */}
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
// //               </div>

// //               <h3 className="font-bricolage text-2xl font-black italic uppercase tracking-tighter text-white mb-2">
// //                 {item.title}
// //               </h3>
// //               <p className="text-gray-500 text-sm font-medium leading-relaxed">
// //                 {item.desc}
// //               </p>
// //             </motion.div>
// //           ))}
// //         </div>

// //         {/* Brand Promise Row */}
// //         <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5">
// //           <div className="text-center md:text-left">
// //             <span className="block text-primary font-black text-xl mb-1 italic">
// //               300+ GSM
// //             </span>
// //             <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
// //               Museum Quality Paper
// //             </span>
// //           </div>
// //           <div className="text-center md:text-left">
// //             <span className="block text-primary font-black text-xl mb-1 italic">
// //               No Fade
// //             </span>
// //             <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
// //               UV Protected Inks
// //             </span>
// //           </div>
// //           <div className="text-center md:text-left">
// //             <span className="block text-primary font-black text-xl mb-1 italic">
// //               Anti-Scratch
// //             </span>
// //             <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
// //               Waterproof Vinyl
// //             </span>
// //           </div>
// //           <div className="text-center md:text-left">
// //             <span className="block text-primary font-black text-xl mb-1 italic">
// //               India Wide
// //             </span>
// //             <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
// //               Doorstep Delivery
// //             </span>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default LifestyleSection;

// import { motion } from "framer-motion";
// import { MoveRight } from "lucide-react";

// const vibes = [
//   {
//     title: "THE ZEN DEN",
//     desc: "Transform your sanctuary with curated anime aesthetics.",
//     image: "/Posters/Batman.jpg",
//     tag: "Minimalist",
//   },
//   {
//     title: "WORKSPACE 2.0",
//     desc: "Tough vinyl protection for your high-performance machines.",
//     image: "/Posters/porsche1.jpg",
//     tag: "Stickers",
//   },
//   {
//     title: "RACING HUB",
//     desc: "Legendary motorsport moments in archival matte finish.",
//     image: "/Posters/f1c3.jpg",
//     tag: "F1 Track",
//   },
// ];

// const LifestyleSection = () => {
//   return (
//     <section className="py-24 bg-[#050505] selection:bg-primary selection:text-black">
//       <div className="max-w-[1400px] mx-auto px-6">
//         {/* HEADER AREA */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
//           <div className="max-w-3xl">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-10 h-[2px] bg-primary" />
//               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
//                 Spatial Design
//               </span>
//             </div>
//             <h2 className="font-bricolage text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
//               UPGRADE <br />
//               <span className="text-white/20">YOUR SETUP</span>
//             </h2>
//           </div>
//           <div className="max-w-xs space-y-4">
//             <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest leading-relaxed">
//               From high-performance workspaces to personal sanctuaries, bring
//               your obsession to life.
//             </p>
//           </div>
//         </div>

//         {/* LIFESTYLE CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           {vibes.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               viewport={{ once: true }}
//               className="group"
//             >
//               <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] border border-white/5 mb-8">
//                 {/* Tag Badge */}
//                 <div className="absolute top-6 left-6 z-20">
//                   <span className="bg-primary text-black text-[9px] font-black px-4 py-1.5 uppercase tracking-widest">
//                     {item.tag}
//                   </span>
//                 </div>

//                 {/* Image */}
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//                 />

//                 {/* Dark Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

//                 {/* Internal Border Glow */}
//                 <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/20 transition-all duration-500" />
//               </div>

//               <div className="space-y-3">
//                 <h3 className="font-bricolage text-3xl font-black tracking-tighter text-white uppercase group-hover:text-primary transition-colors">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-500 text-xs font-bold uppercase tracking-wide leading-relaxed max-w-[90%]">
//                   {item.desc}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* QUALITY PROMISE - REDESIGNED */}
//         <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5 bg-[#080808]">
//           <PromiseItem label="300+ GSM" sub="Museum Quality Matte" />
//           <PromiseItem label="NEVER FADE" sub="UV-Protected Pigments" />
//           <PromiseItem label="TOUGH BUILT" sub="Waterproof & Scratchless" />
//           <PromiseItem label="SECURE SHIP" sub="Reinforced Tube Packing" />
//         </div>
//       </div>
//     </section>
//   );
// };

// const PromiseItem = ({ label, sub }: { label: string; sub: string }) => (
//   <div className="p-10 border-r border-b border-white/5 last:border-r-0 hover:bg-white/[0.02] transition-colors">
//     <span className="block text-primary font-black text-2xl mb-2 tracking-tighter uppercase">
//       {label}
//     </span>
//     <span className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-black">
//       {sub}
//     </span>
//   </div>
// );

// export default LifestyleSection;
import { motion } from "motion/react";
import { Sparkles, SwatchBook, Gift, Truck } from "lucide-react";

const perks = [
  {
    icon: <Sparkles className="text-primary" size={28} />,
    title: "Premium Finish",
    desc: "Every poster is printed on high-grade matte paper to ensure deep colors and zero glare.",
  },
  {
    icon: <SwatchBook className="text-primary" size={28} />,
    title: "Custom Built",
    desc: "Can't find your vibe? Upload your own designs and we will print them for you with precision.",
  },
  {
    icon: <Gift className="text-primary" size={28} />,
    title: "Member Perks",
    desc: "We regularly drop exclusive discount codes and bundles for our community members.",
  },
  {
    icon: <Truck className="text-primary" size={28} />,
    title: "Fast Delivery",
    desc: "No hidden fees. We provide reliable shipping across India with secure tube packaging.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-[#050505] selection:bg-primary selection:text-black">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-bricolage text-4xl md:text-6xl font-black uppercase tracking-tighter">
            WHY <span className="text-primary">CHOOSE US?</span>
          </h2>
          <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] max-w-md mx-auto">
            Small details make a big difference in your space
          </p>
        </div>

        {/* PERKS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#080808] border border-white/5 p-8 rounded-none flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-500"
            >
              <div className="mb-6 p-4 bg-white/5 rounded-full group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500">
                {item.icon}
              </div>

              <h3 className="font-bricolage text-xl font-black uppercase tracking-tight text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM TAGLINE */}
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
          <div className="inline-flex items-center gap-4 opacity-40">
            <span className="h-[1px] w-8 bg-white" />
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white">
              Built by fans for the fans
            </p>
            <span className="h-[1px] w-8 bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;