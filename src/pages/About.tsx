// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";
// import { Zap, Target } from "lucide-react";

// const About = () => {
//   return (
//     <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-28 md:pt-40 pb-20 px-6 overflow-hidden">
//         <div className="max-w-[1300px] mx-auto">
//           {/* Section 1: The Ethos */}
//           <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start mb-24 md:mb-40">
//             <div>
//               <motion.div
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="flex items-center gap-2 mb-8"
//               >
//                 <Zap size={14} className="text-accent fill-accent" />
//                 <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40">
//                   The Mission
//                 </span>
//               </motion.div>

//               <h1 className="font-display text-[10vw] sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.2] tracking-tighter uppercase mb-10">
//                 ART FOR <br />
//                 <span className="text-primary">THE CORE</span>
//               </h1>

//               <p className="text-foreground/70 text-[10px] md:text-xl font-black leading-relaxed uppercase max-w-lg">
//                 Imprinto Co. started with one goal: to kill boring walls. We
//                 don't do mass-market. We build premium visuals for the 1% who
//                 live for the thrill.
//               </p>
//             </div>

//             <div className="lg:pt-24 flex flex-col gap-8 md:gap-10">
//               <div className="border-l-4 border-foreground pl-6 md:pl-8 py-2">
//                 <p className="text-foreground/40 text-[8px] md:text-xs font-black leading-relaxed uppercase tracking-widest">
//                   Jaipur, Rajasthan, India <br />
//                   Est. 2024 <br />
//                   Shipping NationWide
//                 </p>
//               </div>
//               <div className="bg-accent-lime p-6 md:p-8 border-2 md:border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
//                 <h3 className="font-display text-sm md:text-2xl font-black uppercase mb-2">
//                   RAW & AUTHENTIC
//                 </h3>
//                 <p className="text-[7px] md:text-xs font-black uppercase text-foreground/60">
//                   No generic stock art. No lazy slop. Just pure culture.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Section 2: Creative Quote */}
//           <div className="relative w-full aspect-[4/5] md:aspect-[21/9] overflow-hidden mb-24 md:mb-40 border-2 md:border-4 border-foreground">
//             <img
//               src="/Posters/f1v2.jpg"
//               alt="Lifestyle"
//               className="w-full h-full object-cover grayscale-[0.2]"
//             />
//             <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 bg-foreground/10 backdrop-blur-[2px]">
//               <div className="bg-white border-2 md:border-4 border-foreground p-6 md:p-16 max-w-3xl shadow-[10px_10px_0px_0px_rgba(0,212,255,1)] md:shadow-[20px_20px_0px_0px_rgba(0,212,255,1)]">
//                 <h2 className="text-center text-[8px] md:text-3xl lg:text-4xl font-black tracking-widest uppercase leading-relaxed text-foreground">
//                   "WE DON'T SELL POSTERS. WE SELL THE VISUAL PROOF OF WHAT YOU
//                   LIVE FOR"
//                 </h2>
//               </div>
//             </div>
//           </div>

//           {/* Section 3: The Process */}
//           <div className="grid grid-cols-1 md:grid-cols-3 border-2 md:border-4 border-foreground mb-24 md:mb-40">
//             <ProcessCard
//               num="01"
//               title="DESIGN"
//               desc="Everything is designed in-house. We draw inspiration from JDM, Anime, and F1 history to create visuals you won't find anywhere else."
//             />
//             <ProcessCard
//               num="02"
//               title="QUALITY"
//               desc="Heavier paper. Better ink. Waterproof vinyl. If it's not good enough for our own walls, it doesn't leave the shop."
//             />
//             <ProcessCard
//               num="03"
//               title="CULTURE"
//               desc="We aren't a corporate brand. We are fans. We ship art that represents the community, the speed, and the obsession."
//             />
//           </div>

//           {/* Final Call */}
//           <div className="py-12 md:py-20 text-center bg-primary border-2 md:border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(255,46,99,1)] md:shadow-[16px_16px_0px_0px_rgba(255,46,99,1)] mb-20">
//             <p className="text-foreground text-[8px] md:text-xs font-black tracking-widest uppercase mb-6">
//               READY TO UPGRADE?
//             </p>
//             <h4 className="font-display text-[8vw] md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-10 text-foreground leading-tight">
//               TRANSFORM YOUR <br /> SPACE TODAY
//             </h4>
//             <a
//               href="/shop"
//               className="inline-flex items-center gap-3 px-8 md:px-16 py-4 md:py-6 bg-foreground text-background font-black uppercase tracking-widest text-[10px] md:text-sm hover:bg-accent-lime hover:text-foreground transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
//             >
//               BROWSE PRINTS
//               <Target size={18} />
//             </a>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// const ProcessCard = ({
//   num,
//   title,
//   desc,
// }: {
//   num: string;
//   title: string;
//   desc: string;
// }) => (
//   <div className="p-8 md:p-10 border-b-2 md:border-b-0 md:border-r-2 last:border-r-0 border-foreground hover:bg-muted/50 transition-colors">
//     <div className="flex items-center gap-4 mb-6">
//       <span className="text-2xl md:text-4xl font-black text-primary">
//         {num}
//       </span>
//       <h3 className="font-display text-base md:text-2xl font-black uppercase tracking-tight text-foreground">
//         {title}
//       </h3>
//     </div>
//     <p className="text-foreground/60 text-[8px] md:text-xs font-black uppercase leading-relaxed">
//       {desc}
//     </p>
//   </div>
// );

// export default About;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-32 md:pt-48 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="mb-20 md:mb-32">
            <h1 className="text-[16vw] md:text-8xl font-black uppercase tracking-tighter leading-[1.1] md:leading-[0.9] mb-8">
              ABOUT <br /> US
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-6 border-t-2 border-foreground pt-6">
              <p className="text-sm md:text-base font-bold max-w-lg uppercase leading-relaxed opacity-80">
                Imprinto started with one simple idea: walls are meant to be
                more than just blank space. We don't believe in mass-produced,
                soulless decor. We build visuals for people who care about what
                they put on their walls.
              </p>
            </div>
          </div>

          {/* Featured Visual */}
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-foreground mb-20 md:mb-32 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,212,255,1)]">
            <img
              src="/Posters/f1v2.jpg"
              alt="About"
              className="w-full h-full object-cover grayscale-[0.2]"
            />
          </div>

          {/* Manifesto Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            <div className="md:col-span-1">
              <h3 className="text-xs font-black uppercase tracking-widest mb-4 border-l-4 border-primary pl-4">
                Our approach
              </h3>
            </div>
            <div className="md:col-span-2 space-y-6">
              <p className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                We aren't just selling posters. We are helping you display what
                actually matters to you.
              </p>
              <p className="text-xs md:text-sm font-bold opacity-60 uppercase tracking-wide leading-relaxed">
                Everything here is handled by us. We use heavy 300gsm matte paper because quality
                matters, and we don't think you should settle for flimsy prints.
                We are just a team of fans making things we'd be proud to hang
                in our own rooms.
              </p>
            </div>
          </div>

          {/* Process */}
          <div className="grid md:grid-cols-3 gap-6 gap-y-10">
            <ProcessBox
              num="01"
              title="Original Design"
              desc="We draw our own concepts. No generic templates."
            />
            <ProcessBox
              num="02"
              title="Real Quality"
              desc="Heavy paper, sharp ink, and built to last."
            />
            <ProcessBox
              num="03"
              title="Reliable Shipping"
              desc="Packed safe, delivered fast, all across India."
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ProcessBox = ({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) => (
  <div className="bg-background p-8 border-4 border-foreground hover:bg-primary transition-colors group flex flex-col items-center text-center">
    <span className="text-3xl font-black opacity-20 block mb-4">{num}</span>
    <h4 className="text-lg font-black uppercase mb-2">{title}</h4>
    <p className="text-[10px] md:text-xs font-black uppercase opacity-60 group-hover:opacity-100 leading-tight">
      {desc}
    </p>
  </div>
);

export default About;