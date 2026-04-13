// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// const About = () => {
//   return (
//     <div className="min-h-screen bg-[#050505] text-white">
//       <Navbar />

//       <main className="pt-32 pb-20">
//         <div className="max-w-[1400px] mx-auto px-6">
//           {/* Main Headline */}
//           <div className="mb-16 md:mb-24">
//             <h1 className="font-bricolage text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter uppercase italic">
//               WE DON'T DO <br />
//               <span className="text-primary not-italic">CLEAN.</span>
//             </h1>
//           </div>

//           <div className="grid lg:grid-cols-[45%_55%] gap-16 items-start mb-24">
//             {/* Story Content */}
//             <div className="space-y-8">
//               <div className="inline-flex items-center gap-3 px-4 py-1 border border-primary/30 bg-primary/5 rounded-full">
//                 <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
//                 <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase italic">
//                   The Origin Story
//                 </span>
//               </div>

//               <div className="space-y-6">
//                 <p className="font-bricolage text-2xl md:text-3xl font-bold text-white leading-tight uppercase italic tracking-tighter">
//                   Imprinto Co. was born from late-night garage sessions, the
//                   smell of fresh vinyl, and a refusal to settle for generic wall
//                   art.
//                 </p>

//                 <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed">
//                   We design stickers and posters for people who live and breathe
//                   their obsessions. Every piece in our catalog is designed
//                   in-house, printed on premium materials, and tested to survive
//                   the street.
//                 </p>

//                 <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed italic border-l-2 border-primary pl-6">
//                   From Anime legends to F1 icons, from JDM beasts to raw
//                   motivational typography—we make artifacts, not merchandise. We
//                   ship across India. No corporate BS. Just raw, underground art.
//                 </p>
//               </div>

//               {/* Founder Signature Style */}
//               <div className="pt-8">
//                 <span className="font-bricolage text-4xl font-black italic tracking-tighter text-white opacity-40">
//                   Imprinto Co.
//                 </span>
//                 <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase mt-2">
//                   Est. 2024 • Jaipur, India
//                 </p>
//               </div>
//             </div>

//             {/* Visual Part */}
//             <div className="relative aspect-square md:aspect-video lg:aspect-auto lg:h-[600px] overflow-hidden rounded-sm border border-white/5 shadow-2xl">
//               <img
//                 src="/Posters/f1v2.jpg" // Yahan apni lifestyle-poster image use karna
//                 alt="Imprinto Lifestyle"
//                 className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-700 scale-105"
//                 loading="lazy"
//               />
//               {/* Overlay Decor */}
//               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
//               <div className="absolute bottom-8 left-8">
//                 <span className="font-bricolage text-xl font-black italic text-primary uppercase">
//                   Underground Culture.
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Stats Section */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-white/10">
//             {[
//               { num: "500+", label: "DESIGNS SHIPPED" },
//               { num: "10K+", label: "STICKERS SOLD" },
//               { num: "4.9★", label: "AVG RATING" },
//             ].map((stat, i) => (
//               <div
//                 key={stat.label}
//                 className={`p-12 flex flex-col items-center text-center ${
//                   i !== 2
//                     ? "border-b sm:border-b-0 sm:border-r border-white/10"
//                     : ""
//                 } hover:bg-white hover:text-black transition-all duration-500 group`}
//               >
//                 <span className="font-bricolage text-5xl md:text-7xl font-black text-primary block mb-3 group-hover:text-black">
//                   {stat.num}
//                 </span>
//                 <span className="text-[10px] tracking-[0.4em] text-gray-500 font-black uppercase group-hover:text-black">
//                   {stat.label}
//                 </span>
//               </div>
//             ))}
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

const About = () => {
  const stats = [
    { num: "500+", label: "Artifacts Created" },
    { num: "10K+", label: "Stickers Shipped" },
    { num: "4.9", label: "Community Rating" },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-primary/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Section 1: The Ethos */}
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-32">
            <div>
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-8 block">
                // Our Philosophy
              </span>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter uppercase mb-10">
                Art for the <br />
                <span className="italic font-light opacity-50 text-4xl md:text-6xl">
                  Obsessed.
                </span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-md">
                Imprinto Co. started in a garage with one mission: to kill
                boring walls. We don't do generic. We build artifacts for people
                who live for the thrill.
              </p>
            </div>

            <div className="border-l border-white/10 pl-10 hidden lg:block">
              <p className="text-gray-500 text-sm leading-relaxed uppercase tracking-widest">
                Based in Jaipur, India. <br />
                Shipping Raw Art Nationwide. <br />
                Est. 2024.
              </p>
            </div>
          </div>

          {/* Section 2: Image & Quote */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-32 border border-white/5 bg-white/[0.02]">
            <img
              src="/Posters/f1v2.jpg"
              alt="Lifestyle"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/40">
              <h2 className="text-center text-xl md:text-3xl font-medium tracking-tighter uppercase max-w-2xl leading-snug italic">
                "We don't sell merchandise. We sell the visual proof of your
                obsession."
              </h2>
            </div>
          </div>

          {/* Section 3: The Process */}
          <div className="grid md:grid-cols-3 gap-12 mb-32">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                01. Design
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Everything is designed in-house. No stock images. No lazy AI.
                Just raw creativity inspired by JDM, Anime, and F1 culture.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                02. Quality
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium matte finishes and waterproof vinyl. Built to survive
                the street and look sharp on your setup.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                03. Culture
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We are part of the community. We ship artifacts, not corporate
                BS. If it's not good enough for our walls, it's not good for
                yours.
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          {/* Commented until we get some orders and reviews */}
          {/* <div className="border-t border-b border-white/10 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <span className="text-5xl font-bold block mb-2">
                  {stat.num}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">
                  {stat.label}
                </span>
              </div>
            ))}
          </div> */}

          {/* Final Call */}
          <div className="py-32 text-center">
            <p className="text-gray-500 text-xs font-black tracking-[0.5em] uppercase mb-8">
              Own the obsession
            </p>
            <h4 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12">
              Ready to upgrade your space?
            </h4>
            <a
              href="/shop"
              className="inline-block px-12 py-5 bg-primary text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all duration-300"
            >
              Explore Collections
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
