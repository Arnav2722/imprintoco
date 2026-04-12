// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";

// const HeroSection = () => {
//   const posterImages = [
//     "/Posters/Batman.jpg",
//     "/Posters/F1.jpg",
//     "/Posters/f1v2.jpg",
//     "/Posters/Krishna Ji.jpg",
//     "/Posters/f1c3.jpg",
//     "/Posters/krishna2.jpg",
//     "/Posters/porsche1.jpg",
//     "/Posters/motivation1.jpg",
//     "/Posters/f1v4.jpg",
//   ];

//   const repeatedPosters = [...posterImages, ...posterImages, ...posterImages];

//   return (
//     <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[#050505] text-white pt-24 md:pt-32 pb-20 selection:bg-primary selection:text-black font-bricolage">
//       {/* BACKGROUND ELEMENTS */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         {/* Ambient Glow */}
//         <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[600px] h-[400px] md:h-[800px] bg-primary/20 blur-[100px] md:blur-[150px] rounded-full" />

//         {/* 1. MOBILE & TABLET BACKGROUND (Centered Static Columns) */}
//         <div className="lg:hidden absolute inset-0 opacity-[0.15] pointer-events-none flex justify-center items-center">
//           <div className="flex gap-4 rotate-6 transform scale-110">
//             {/* Column 1 */}
//             <div className="flex flex-col gap-6">
//               {posterImages.slice(0, 4).map((src, i) => (
//                 <div
//                   key={`mob-c1-${i}`}
//                   className="w-[35vw] h-[52vw] max-w-[140px] bg-gray-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl"
//                 >
//                   <img
//                     src={src}
//                     className="w-full h-full object-cover"
//                     alt=""
//                   />
//                 </div>
//               ))}
//             </div>
//             {/* Column 2 */}
//             <div className="flex flex-col gap-6 translate-y-16">
//               {posterImages.slice(4, 8).map((src, i) => (
//                 <div
//                   key={`mob-c2-${i}`}
//                   className="w-[35vw] h-[52vw] max-w-[140px] bg-gray-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl"
//                 >
//                   <img
//                     src={src}
//                     className="w-full h-full object-cover"
//                     alt=""
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* 2. DESKTOP INFINITE LOOP GRID (Original Dynamic) */}
//         <div className="absolute right-[-2%] top-0 h-[120%] hidden lg:grid grid-cols-3 gap-8 rotate-6 translate-x-10 opacity-60">
//           <div className="relative h-full overflow-hidden">
//             <motion.div
//               animate={{ y: ["0%", "-50%"] }}
//               transition={{ duration: 40, ease: "linear", repeat: Infinity }}
//               className="flex flex-col gap-8"
//             >
//               {repeatedPosters.map((src, i) => (
//                 <PosterCard key={`col1-${i}`} src={src} />
//               ))}
//             </motion.div>
//           </div>
//           <div className="relative h-full overflow-hidden">
//             <motion.div
//               animate={{ y: ["-50%", "0%"] }}
//               transition={{ duration: 45, ease: "linear", repeat: Infinity }}
//               className="flex flex-col gap-8"
//             >
//               {repeatedPosters.map((src, i) => (
//                 <PosterCard key={`col2-${i}`} src={src} />
//               ))}
//             </motion.div>
//           </div>
//           <div className="relative h-full overflow-hidden">
//             <motion.div
//               animate={{ y: ["0%", "-50%"] }}
//               transition={{ duration: 35, ease: "linear", repeat: Infinity }}
//               className="flex flex-col gap-8"
//             >
//               {repeatedPosters.map((src, i) => (
//                 <PosterCard key={`col3-${i}`} src={src} />
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* CONTENT CONTAINER */}
//       <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full mt-10">
//         <div className="mb-6 md:mb-8 text-left max-w-4xl">
//           <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] md:leading-[0.8] tracking-tighter uppercase italic">
//             OWN YOUR <br />
//             <span className="text-primary not-italic">OBSESSION.</span>
//           </h1>
//         </div>

//         <div className="max-w-xl mb-10 text-left">
//           <p className="text-gray-400 text-base md:text-xl font-medium leading-relaxed mb-8">
//             Premium Waterproof Stickers and Matte Finish Posters.{" "}
//             <br className="hidden md:block" />
//             Built for the fans who live for the thrill.
//           </p>

//           <div className="inline-flex flex-col items-start bg-white text-black p-3 md:p-4 skew-x-[-10deg] shadow-2xl">
//             <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 whitespace-nowrap">
//               Everything Under
//             </span>
//             <span className="text-3xl md:text-4xl font-black leading-none italic">
//               ₹299.00/-
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <Button
//             size="lg"
//             className="h-14 md:h-16 px-8 md:px-10 bg-primary hover:bg-white text-black font-black text-lg md:text-xl rounded-none transition-all transform hover:translate-y-[-2px]"
//             asChild
//           >
//             <Link to="/shop?cat=stickers">EXPLORE STICKERS</Link>
//           </Button>

//           <Button
//             variant="outline"
//             size="lg"
//             className="h-14 md:h-16 px-8 md:px-10 border-2 border-white bg-transparent hover:bg-white hover:text-black font-black text-lg md:text-xl rounded-none transition-all transform hover:translate-y-[-2px]"
//             asChild
//           >
//             <Link to="/shop?cat=posters">SHOP POSTERS</Link>
//           </Button>
//         </div>

//         <div className="mt-12 md:mt-16 flex flex-wrap gap-x-8 md:gap-x-12 gap-y-4 border-t border-white/10 pt-8 opacity-50">
//           <FeatureItem text="Premium Matte Finish" />
//           <FeatureItem text="Waterproof Vinyl" />
//           <FeatureItem text="Pan India Shipping" />
//         </div>
//       </div>

//       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20" />
//     </section>
//   );
// };

// const PosterCard = ({ src }: { src: string }) => (
//   <div className="w-40 h-60 bg-gray-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl transition-all hover:scale-110 hover:border-primary/50 z-10 flex-shrink-0">
//     <img
//       src={src}
//       className="w-full h-full object-cover"
//       onError={(e) => {
//         e.currentTarget.src =
//           "https://via.placeholder.com/300x450?text=Imprinto";
//       }}
//     />
//   </div>
// );

// const FeatureItem = ({ text }: { text: string }) => (
//   <div className="flex items-center gap-2">
//     <span className="w-1.5 h-1.5 bg-primary rounded-full" />
//     <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap">
//       {text}
//     </span>
//   </div>
// );

// export default HeroSection;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const posterImages = [
    "/Posters/Batman.jpg",
    "/Posters/F1.jpg",
    "/Posters/f1v2.jpg",
    "/Posters/Krishna Ji.jpg",
    "/Posters/f1c3.jpg",
    "/Posters/krishna2.jpg",
    "/Posters/porsche1.jpg",
    "/Posters/motivation1.jpg",
    "/Posters/f1v4.jpg",
  ];

  const repeatedPosters = [...posterImages, ...posterImages, ...posterImages];

  return (
    <section className="relative min-h-[100svh] flex items-center justify-start overflow-hidden bg-[#050505] text-white pt-24 pb-12 font-bricolage selection:bg-primary selection:text-black">
      {/* BACKGROUND ELEMENTS - FIXED DULLNESS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Vibrant Glows */}
        <div className="absolute top-[5%] right-[-10%] w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-primary/25 blur-[100px] md:blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-primary/10 blur-[80px] rounded-full" />

        {/* MOBILE GRID BACKGROUND */}
        <div className="lg:hidden absolute inset-0 opacity-[0.12] flex justify-center items-center">
          <div className="flex gap-4 rotate-6 scale-125">
            <div className="flex flex-col gap-6">
              {posterImages.slice(0, 3).map((src, i) => (
                <div
                  key={`m-bg-${i}`}
                  className="w-[45vw] aspect-[3/4] bg-gray-900 border border-white/5 rounded-none overflow-hidden"
                >
                  <img
                    src={src}
                    className="w-full h-full object-cover grayscale"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP INFINITE LOOP */}
        <div className="absolute right-0 top-0 h-full hidden lg:grid grid-cols-3 gap-8 rotate-3 opacity-30 translate-x-12">
          {[40, 50, 45].map((duration, idx) => (
            <div key={idx} className="relative h-full overflow-hidden">
              <motion.div
                animate={{ y: idx === 1 ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ duration, ease: "linear", repeat: Infinity }}
                className="flex flex-col gap-8"
              >
                {repeatedPosters.map((src, i) => (
                  <div
                    key={`d-bg-${idx}-${i}`}
                    className="w-44 h-64 bg-gray-900 border border-white/5 grayscale hover:grayscale-0 transition-all duration-700"
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 py-2">
        <div className="max-w-4xl">
          {/* Badge - Fixed Overlap */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 mb-10 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] py-2">
              New Drops Internalized
            </span>
          </motion.div>

          {/* Heading - Responsive Scaling */}
          {/* <div className="mb-8">
            <h1 className="text-[13vw] sm:text-[10vw] lg:text-[7.5vw] font-black leading-[1] sm:leading-[0.9] tracking-tighter uppercase text-white">
              OWN YOUR <br />
              <span className="text-primary">OBSESSION</span>
            </h1>
          </div> */}

            <div className="mb-6 md:mb-8 text-left max-w-4xl">
              <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] md:leading-[0.8] tracking-tighter uppercase italic">
                OWN YOUR <br />
                <span className="text-primary not-italic">OBSESSION.</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm sm:text-lg md:text-xl font-medium max-w-xl mb-12 uppercase tracking-tight leading-relaxed">
            Premium Matte Posters & Vinyl Stickers.{" "}
            <br className="hidden sm:block" />
            Built for the core fans.
          </p>

          {/* Price Block - Ultra Mobile Optimized */}
          <div className="flex items-center gap-6 mb-12">
            <div className="bg-primary text-black px-6 py-4 sm:px-8 sm:py-5 border-l-8 border-white shadow-2xl">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-70">
                Starting At
              </p>
              <p className="text-3xl sm:text-4xl font-black leading-none uppercase tracking-tighter">
                ₹149
              </p>
            </div>
            <div className="h-12 w-[1px] bg-white/10" />
            <p className="text-gray-600 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] leading-tight">
              Premium <br /> Quality
            </p>
          </div>

          {/* Buttons - Mobile Responsive Flex */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="h-16 px-10 bg-white text-black hover:bg-primary font-black text-sm rounded-none transition-all flex justify-between sm:justify-center items-center gap-6 group"
              asChild
            >
              <Link to="/shop">
                SHOP ALL{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-16 px-10 border-white/20 bg-transparent hover:bg-white hover:text-black font-black text-sm rounded-none transition-all backdrop-blur-sm"
              asChild
            >
              <Link to="/custom-prints">CUSTOMIZE</Link>
            </Button>
          </div>

          {/* Features - Mobile Grid */}
          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/5 pt-10">
            <FeatureItem text="Matte Finish" />
            <FeatureItem text="Waterproof" />
            <FeatureItem text="Fast Shipping" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
    </section>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-1.5 h-1.5 bg-primary shadow-[0_0_8px_#FAFF00]" />
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
      {text}
    </span>
  </div>
);

export default HeroSection;