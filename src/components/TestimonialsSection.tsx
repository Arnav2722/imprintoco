// import { Star, Instagram } from "lucide-react";
// import { motion } from "framer-motion";

// interface Review {
//   user: string;
//   text: string;
//   image: string;
//   tag: string;
// }

// const reviews: Review[] = [
//   {
//     user: "@arnav.v",
//     text: "Matte finish is actually insane. Zero glare even with my desk lamp right next to it.",
//     image: "/Posters/f1c3.jpg",
//     tag: "Trackside",
//   },
//   {
//     user: "@otaku_den",
//     text: "Stickers survived the Rajasthan monsoon on my helmet. Not a single peel. Legit quality.",
//     image: "/Posters/f1v2.jpg",
//     tag: "Rider",
//   },
//   {
//     user: "@karan_p",
//     text: "Packaging was heavy duty. No bends, no creases. Best unboxing experience so far.",
//     image: "/Posters/Batman.jpg",
//     tag: "Collector",
//   },
//   {
//     user: "@pixel_perfect",
//     text: "Cleanest prints in India. The minimalism in the manga collection is just 10/10.",
//     image: "/Posters/porsche1.jpg",
//     tag: "Designer",
//   },
//   {
//     user: "@vroom_vroom",
//     text: "Senna bundle is a mood. Colors are punchy and look premium. Getting the Porsche set next.",
//     image: "/Posters/f1v4.jpg",
//     tag: "Motorsport",
//   },
// ];

// // Duplicated for seamless marquee effect
// const duplicatedReviews: Review[] = [...reviews, ...reviews];

// const TestimonialsSection = (): JSX.Element => {
//   return (
//     <section className="py-16 md:py-32 bg-background border-t-2 md:border-t-4 border-foreground overflow-hidden relative">
//       {/* Background Graphic */}
//       <div className="absolute top-0 right-10 opacity-[0.03] md:opacity-[0.05] pointer-events-none">
//         <Instagram className="w-48 h-48 md:w-[400px] md:h-[400px]" />
//       </div>

//       <div className="max-w-[1400px] mx-auto px-5 md:px-10 mb-12 md:mb-20 relative z-10">
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
//           <div className="max-w-2xl text-left">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="flex items-center gap-3 mb-4"
//             >
//               <div className="w-8 md:w-12 h-[2px] md:h-[3px] bg-accent" />
//               <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-accent">
//                 Real Feedback
//               </span>
//             </motion.div>
//             <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] md:leading-[0.8] text-foreground">
//               THE <span className="text-primary italic">CIRCLE.</span>
//             </h2>
//           </div>
//           <p className="text-foreground/40 font-black uppercase tracking-widest text-[10px] md:text-sm border-l-4 border-primary pl-4 md:pl-6 max-w-[180px] md:max-w-[200px]">
//             Real people. Raw setups. Pure obsession.
//           </p>
//         </div>
//       </div>

//       {/* Infinite Marquee Container */}
//       <div className="flex relative py-6 md:py-10">
//         <motion.div
//           className="flex gap-4 md:gap-8 pr-4 md:pr-8"
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{
//             duration: 40,
//             ease: "linear",
//             repeat: Infinity,
//           }}
//         >
//           {duplicatedReviews.map((rev: Review, i: number) => (
//             <div
//               key={`${rev.user}-${i}`}
//               className="min-w-[280px] md:min-w-[450px] bg-white border-2 md:border-4 border-foreground p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,212,255,1)] md:shadow-[10px_10px_0px_0px_rgba(0,212,255,1)] group hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300"
//             >
//               <div className="aspect-[4/3] w-full overflow-hidden border-2 border-foreground mb-4 md:mb-6 bg-muted">
//                 <img
//                   src={rev.image}
//                   alt={`${rev.user} setup`}
//                   loading="lazy"
//                   className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
//                 />
//               </div>

//               <div className="flex gap-1 mb-4 md:mb-5">
//                 {[...Array(5)].map((_, starIndex: number) => (
//                   <Star
//                     key={starIndex}
//                     className="w-3 h-3 md:w-3.5 md:h-3.5 fill-accent text-accent"
//                   />
//                 ))}
//               </div>

//               <p className="text-foreground font-bold leading-snug text-base md:text-xl mb-6 md:mb-8 uppercase tracking-tight">
//                 &ldquo;{rev.text}&rdquo;
//               </p>

//               <div className="pt-4 md:pt-6 border-t-2 border-foreground/5 flex items-center justify-between">
//                 <div className="flex flex-col">
//                   <span className="font-display text-base md:text-lg font-black text-foreground uppercase italic leading-none">
//                     {rev.user}
//                   </span>
//                   <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">
//                     Verified Drop
//                   </span>
//                 </div>
//                 <div className="px-2 py-0.5 md:px-3 md:py-1 bg-accent-lime border-2 border-foreground">
//                   <span className="text-[8px] md:text-[10px] font-black text-foreground uppercase tracking-widest">
//                     {rev.tag}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>

//       <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-60 bg-gradient-to-r from-background via-background/80 to-transparent z-20" />
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-60 bg-gradient-to-l from-background via-background/80 to-transparent z-20" />
//     </section>
//   );
// };

// export default TestimonialsSection;