// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";

// const About = () => {
//   const stats = [
//     { num: "500+", label: "Artifacts Created" },
//     { num: "10K+", label: "Stickers Shipped" },
//     { num: "4.9", label: "Community Rating" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#020202] text-white selection:bg-primary/30">
//       <Navbar />

//       <main className="pt-32 pb-20 px-6">
//         <div className="max-w-[1200px] mx-auto">
//           {/* Section 1: The Ethos */}
//           <div className="grid lg:grid-cols-2 gap-20 items-end mb-32">
//             <div>
//               <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-8 block">
//                 // Our Philosophy
//               </span>
//               <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter uppercase mb-10">
//                 Art for the <br />
//                 <span className="italic font-light opacity-50 text-4xl md:text-6xl">
//                   Obsessed.
//                 </span>
//               </h1>
//               <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-md">
//                 Imprinto Co. started in a garage with one mission: to kill
//                 boring walls. We don't do generic. We build artifacts for people
//                 who live for the thrill.
//               </p>
//             </div>

//             <div className="border-l border-white/10 pl-10 hidden lg:block">
//               <p className="text-gray-500 text-sm leading-relaxed uppercase tracking-widest">
//                 Based in Jaipur, India. <br />
//                 Shipping Raw Art Nationwide. <br />
//                 Est. 2024.
//               </p>
//             </div>
//           </div>

//           {/* Section 2: Image & Quote */}
//           <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-32 border border-white/5 bg-white/[0.02]">
//             <img
//               src="/Posters/f1v2.jpg"
//               alt="Lifestyle"
//               className="w-full h-full object-cover opacity-60"
//             />
//             <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/40">
//               <h2 className="text-center text-xl md:text-3xl font-medium tracking-tighter uppercase max-w-2xl leading-snug italic">
//                 "We don't sell merchandise. We sell the visual proof of your
//                 obsession."
//               </h2>
//             </div>
//           </div>

//           {/* Section 3: The Process */}
//           <div className="grid md:grid-cols-3 gap-12 mb-32">
//             <div className="space-y-4">
//               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">
//                 01. Design
//               </h3>
//               <p className="text-gray-400 text-sm leading-relaxed">
//                 Everything is designed in-house. No stock images. No lazy AI.
//                 Just raw creativity inspired by JDM, Anime, and F1 culture.
//               </p>
//             </div>
//             <div className="space-y-4">
//               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">
//                 02. Quality
//               </h3>
//               <p className="text-gray-400 text-sm leading-relaxed">
//                 Premium matte finishes and waterproof vinyl. Built to survive
//                 the street and look sharp on your setup.
//               </p>
//             </div>
//             <div className="space-y-4">
//               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">
//                 03. Culture
//               </h3>
//               <p className="text-gray-400 text-sm leading-relaxed">
//                 We are part of the community. We ship artifacts, not corporate
//                 BS. If it's not good enough for our walls, it's not good for
//                 yours.
//               </p>
//             </div>
//           </div>

//           {/* Final Call */}
//           <div className="py-32 text-center">
//             <p className="text-gray-500 text-xs font-black tracking-[0.5em] uppercase mb-8">
//               Own the obsession
//             </p>
//             <h4 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">
//               Ready to upgrade your space?
//             </h4>
//             <a
//               href="/shop"
//               className="inline-block px-12 py-5 bg-primary text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all duration-300"
//             >
//               Explore Collections
//             </a>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default About;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Zap, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-[1300px] mx-auto">
          {/* Section 1: The Ethos */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-40">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <Zap size={18} className="text-accent fill-accent" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/40">
                  The Mission
                </span>
              </motion.div>

              <h1 className="font-display text-7xl md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase mb-12">
                ART FOR <br />
                <span className="text-primary italic">THE CORE.</span>
              </h1>

              <p className="text-foreground/70 text-xl md:text-2xl font-bold leading-tight uppercase max-w-lg">
                Imprinto Co. started with one goal: to kill boring walls. We
                don't do mass-market. We build premium visuals for the 1% who
                live for the thrill.
              </p>
            </div>

            <div className="lg:pt-24 flex flex-col gap-10">
              <div className="border-l-4 border-foreground pl-8 py-4">
                <p className="text-foreground/40 text-sm font-black leading-relaxed uppercase tracking-[0.2em]">
                  Jaipur, Rajasthan, India <br />
                  Est. 2024 <br />
                  Shipping NationWide
                </p>
              </div>
              <div className="bg-accent-lime p-8 border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-display text-2xl font-black uppercase mb-2">
                  RAW & AUTHENTIC.
                </h3>
                <p className="text-xs font-bold uppercase text-foreground/60">
                  No generic stock art. No lazy slop. Just pure culture.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Full-Bleed Creative Quote */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-40 border-4 border-foreground group">
            <img
              src="/Posters/f1v2.jpg"
              alt="Lifestyle"
              className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center p-8 bg-foreground/10 backdrop-blur-[2px]">
              <div className="bg-white border-4 border-foreground p-10 md:p-16 max-w-3xl rotate-[-1deg] shadow-[20px_20px_0px_0px_rgba(0,212,255,1)]">
                <h2 className="text-center text-2xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-foreground italic">
                  "WE DON'T SELL POSTERS. WE SELL THE VISUAL PROOF OF WHAT YOU
                  LIVE FOR."
                </h2>
              </div>
            </div>
          </div>

          {/* Section 3: The Process */}
          <div className="grid md:grid-cols-3 gap-0 border-4 border-foreground mb-40">
            <ProcessCard
              num="01"
              title="DESIGN"
              desc="Everything is designed in-house. We draw inspiration from JDM, Anime, and F1 history to create visuals you won't find anywhere else."
            />
            <ProcessCard
              num="02"
              title="QUALITY"
              desc="Heavier paper. Better ink. Waterproof vinyl. If it's not good enough for our own walls, it doesn't leave the shop."
            />
            <ProcessCard
              num="03"
              title="CULTURE"
              desc="We aren't a corporate brand. We are fans. We ship art that represents the community, the speed, and the obsession."
            />
          </div>

          {/* Final Call */}
          <div className="py-20 text-center bg-primary border-4 border-foreground shadow-[16px_16px_0px_0px_rgba(255,46,99,1)] mb-20 relative">
            <p className="text-foreground text-sm font-black tracking-[0.5em] uppercase mb-6">
              READY TO UPGRADE?
            </p>
            <h4 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-12 text-foreground leading-none">
              TRANSFORM YOUR <br /> SPACE TODAY.
            </h4>
            <a
              href="/shop"
              className="inline-flex items-center gap-4 px-16 py-6 bg-foreground text-background font-black uppercase tracking-widest text-sm hover:bg-accent-lime hover:text-foreground transition-all duration-300"
            >
              BROWSE ALL PRINTS
              <Target size={20} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ProcessCard = ({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) => (
  <div className="p-10 border-b-4 md:border-b-0 md:border-r-4 last:border-r-0 border-foreground hover:bg-muted transition-colors">
    <div className="flex items-center gap-4 mb-6">
      <span className="text-4xl font-black text-primary outline-text">
        {num}
      </span>
      <h3 className="font-display text-3xl font-black uppercase tracking-tighter text-foreground">
        {title}
      </h3>
    </div>
    <p className="text-foreground/60 text-sm font-bold uppercase leading-tight">
      {desc}
    </p>
  </div>
);

export default About;