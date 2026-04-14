// import { Star } from "lucide-react";
// import { motion } from "framer-motion";

// const reviews = [
//   {
//     user: "@arnav.v",
//     text: "The matte finish on the F1 posters is insane. Zero glare, looks premium on my office wall.",
//     image: "/Posters/f1c3.jpg", // Yahan user ki deewar wali photo aayegi
//     tag: "Racing Fan",
//   },
//   {
//     user: "@otaku_den",
//     text: "Stickers are actually waterproof! Put them on my bike and they survived the monsoon perfectly.",
//     image: "/Posters/f1v2.jpg", // Yahan laptop/bike wali photo aayegi
//     tag: "Anime Head",
//   },
//   {
//     user: "@karan_p",
//     text: "Packaging was top-notch. No bends or creases. Imprinto is the GOAT for posters.",
//     image: "/Posters/Batman.jpg",
//     tag: "Verified Buyer",
//   },
//   {
//     user: "@pixel_perfect",
//     text: "Cleanest minimalist posters I've found in India. Minimalist manga collection is a 10/10.",
//     image: "/Posters/porsche1.jpg",
//     tag: "Designer",
//   },
//   {
//     user: "@vroom_vroom",
//     text: "Got the Senna bundle. The colors are so vibrant. Definitely buying more for my room.",
//     image: "/Posters/f1v4.jpg",
//     tag: "Motorsport",
//   },
// ];

// // Loop ko seamless banane ke liye array ko double kar rahe hain
// const duplicatedReviews = [...reviews, ...reviews];

// const TestimonialsSection = () => {
//   return (
//     <section className="py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
//       <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center md:text-left">
//         <h2 className="font-bricolage text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
//           The <span className="text-primary not-italic">Community.</span>
//         </h2>
//         <p className="text-gray-500 mt-4 font-medium uppercase tracking-[0.2em] text-xs">
//           Don't take our word for it. Take theirs.
//         </p>
//       </div>

//       {/* Infinite Marquee Container */}
//       <div className="flex relative">
//         <motion.div
//           className="flex gap-6 pr-6"
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{
//             duration: 30,
//             ease: "linear",
//             repeat: Infinity,
//           }}
//         >
//           {duplicatedReviews.map((rev, i) => (
//             <div
//               key={i}
//               className="min-w-[300px] md:min-w-[400px] bg-[#0a0a0a] border border-white/5 rounded-sm p-4 hover:border-primary/40 transition-colors group"
//             >
//               {/* User Image (Mockup/Wall Photo) */}
//               <div className="aspect-video w-full overflow-hidden rounded-sm mb-6 bg-gray-900">
//                 <img
//                   src={rev.image}
//                   alt="Customer setup"
//                   className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
//                 />
//               </div>

//               <div className="flex gap-1 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     size={12}
//                     className="fill-primary text-primary"
//                   />
//                 ))}
//               </div>

//               <p className="text-gray-400 font-medium leading-relaxed italic text-sm md:text-base mb-6">
//                 "{rev.text}"
//               </p>

//               <div className="pt-4 border-t border-white/5 flex items-center justify-between">
//                 <span className="font-bricolage text-base font-bold text-white uppercase italic">
//                   {rev.user}
//                 </span>
//                 <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest group-hover:text-primary transition-colors">
//                   {rev.tag}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Visual Fade effect on sides */}
//       <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10" />
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10" />
//     </section>
//   );
// };

// export default TestimonialsSection;

import { Star, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    user: "@arnav.v",
    text: "Matte finish is actually insane. Zero glare even with my desk lamp right next to it.",
    image: "/Posters/f1c3.jpg",
    tag: "Trackside",
  },
  {
    user: "@otaku_den",
    text: "Stickers survived the Rajasthan monsoon on my helmet. Not a single peel. Legit quality.",
    image: "/Posters/f1v2.jpg",
    tag: "Rider",
  },
  {
    user: "@karan_p",
    text: "Packaging was heavy duty. No bends, no creases. Best unboxing experience so far.",
    image: "/Posters/Batman.jpg",
    tag: "Collector",
  },
  {
    user: "@pixel_perfect",
    text: "Cleanest prints in India. The minimalism in the manga collection is just 10/10.",
    image: "/Posters/porsche1.jpg",
    tag: "Designer",
  },
  {
    user: "@vroom_vroom",
    text: "Senna bundle is a mood. Colors are punchy and look premium. Getting the Porsche set next.",
    image: "/Posters/f1v4.jpg",
    tag: "Motorsport",
  },
];

const duplicatedReviews = [...reviews, ...reviews, ...reviews];

const TestimonialsSection = () => {
  return (
    <section className="py-32 bg-background border-t-4 border-foreground overflow-hidden relative">
      {/* Background Graphic */}
      <div className="absolute top-0 right-10 opacity-[0.05] pointer-events-none">
        <Instagram size={400} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mb-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-[3px] bg-accent" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-accent">
                Real Feedback
              </span>
            </motion.div>
            <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-foreground">
              THE <span className="text-primary italic">CIRCLE.</span>
            </h2>
          </div>
          <p className="text-foreground/40 font-black uppercase tracking-widest text-xs md:text-sm border-l-4 border-primary pl-6 max-w-[200px]">
            Real people. Raw setups. Pure obsession.
          </p>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="flex relative py-10">
        <motion.div
          className="flex gap-8 pr-8"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedReviews.map((rev, i) => (
            <div
              key={i}
              className="min-w-[320px] md:min-w-[450px] bg-white border-4 border-foreground p-6 shadow-[10px_10px_0px_0px_rgba(0,212,255,1)] group hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300"
            >
              {/* Customer Setup Photo */}
              <div className="aspect-[4/3] w-full overflow-hidden border-2 border-foreground mb-6 bg-muted">
                <img
                  src={rev.image}
                  alt="Customer setup"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex gap-1.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-accent text-accent" />
                ))}
              </div>

              <p className="text-foreground font-bold leading-snug text-lg md:text-xl mb-8 uppercase tracking-tight">
                "{rev.text}"
              </p>

              <div className="pt-6 border-t-2 border-foreground/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-display text-lg font-black text-foreground uppercase italic leading-none">
                    {rev.user}
                  </span>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">
                    Verified Drop
                  </span>
                </div>
                <div className="px-3 py-1 bg-accent-lime border-2 border-foreground">
                  <span className="text-[10px] font-black text-foreground uppercase tracking-widest">
                    {rev.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Edge Fades for Light Mode */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-60 bg-gradient-to-r from-background to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-60 bg-gradient-to-l from-background to-transparent z-20" />
    </section>
  );
};

export default TestimonialsSection;