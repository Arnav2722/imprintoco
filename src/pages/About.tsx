// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import lifestylePoster from "@/assets/lifestyle-poster.jpg";

// const About = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="pt-24 pb-20">
//         <div className="max-w-[1400px] mx-auto px-6">
//           <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8 max-w-2xl">
//             WE DON'T DO
//             <br />
//             <span className="text-primary">CLEAN.</span>
//           </h1>

//           <div className="grid md:grid-cols-[40%_60%] gap-12 mb-20">
//             <div>
//               <p className="text-foreground font-body text-sm leading-relaxed mb-6">
//                 Imprinto Co. was born from late-night garage sessions, the smell of fresh vinyl, and a
//                 refusal to settle for generic wall art. We design stickers and posters for people
//                 who live and breathe automotive culture.
//               </p>
//               <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
//                 Every piece in our catalog is designed in-house, printed on premium materials,
//                 and tested to survive the street. From JDM legends to MotoGP beasts, from F1
//                 icons to raw motivational typography—we make artifacts, not merchandise.
//               </p>
//               <p className="text-muted-foreground font-body text-sm leading-relaxed">
//                 We ship across India. No corporate BS. No templated designs.
//                 Just raw, underground automotive art.
//               </p>
//             </div>
//             <div className="overflow-hidden">
//               <img
//                 src={lifestylePoster}
//                 alt="Velocity lifestyle"
//                 className="w-full h-full object-cover"
//                 loading="lazy"
//                 width={1200}
//                 height={600}
//               />
//             </div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-4">
//             {[
//               { num: "500+", label: "DESIGNS SHIPPED" },
//               { num: "10K+", label: "STICKERS SOLD" },
//               { num: "4.9★", label: "AVG RATING" },
//             ].map((stat) => (
//               <div key={stat.label} className="bg-surface-low p-10">
//                 <span className="font-display text-4xl font-bold text-primary block mb-2">
//                   {stat.num}
//                 </span>
//                 <span className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">
//                   {stat.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default About;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Main Headline */}
          <div className="mb-16 md:mb-24">
            <h1 className="font-bricolage text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter uppercase italic">
              WE DON'T DO <br />
              <span className="text-primary not-italic">CLEAN.</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-[45%_55%] gap-16 items-start mb-24">
            {/* Story Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1 border border-primary/30 bg-primary/5 rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase italic">
                  The Origin Story
                </span>
              </div>

              <div className="space-y-6">
                <p className="font-bricolage text-2xl md:text-3xl font-bold text-white leading-tight uppercase italic tracking-tighter">
                  Imprinto Co. was born from late-night garage sessions, the
                  smell of fresh vinyl, and a refusal to settle for generic wall
                  art.
                </p>

                <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed">
                  We design stickers and posters for people who live and breathe
                  their obsessions. Every piece in our catalog is designed
                  in-house, printed on premium materials, and tested to survive
                  the street.
                </p>

                <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed italic border-l-2 border-primary pl-6">
                  From Anime legends to F1 icons, from JDM beasts to raw
                  motivational typography—we make artifacts, not merchandise. We
                  ship across India. No corporate BS. Just raw, underground art.
                </p>
              </div>

              {/* Founder Signature Style */}
              <div className="pt-8">
                <span className="font-bricolage text-4xl font-black italic tracking-tighter text-white opacity-40">
                  Imprinto Co.
                </span>
                <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase mt-2">
                  Est. 2024 • Jaipur, India
                </p>
              </div>
            </div>

            {/* Visual Part */}
            <div className="relative aspect-square md:aspect-video lg:aspect-auto lg:h-[600px] overflow-hidden rounded-sm border border-white/5 shadow-2xl">
              <img
                src="/Posters/f1v2.jpg" // Yahan apni lifestyle-poster image use karna
                alt="Imprinto Lifestyle"
                className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-700 scale-105"
                loading="lazy"
              />
              {/* Overlay Decor */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <span className="font-bricolage text-xl font-black italic text-primary uppercase">
                  Underground Culture.
                </span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-white/10">
            {[
              { num: "500+", label: "DESIGNS SHIPPED" },
              { num: "10K+", label: "STICKERS SOLD" },
              { num: "4.9★", label: "AVG RATING" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`p-12 flex flex-col items-center text-center ${
                  i !== 2
                    ? "border-b sm:border-b-0 sm:border-r border-white/10"
                    : ""
                } hover:bg-white hover:text-black transition-all duration-500 group`}
              >
                <span className="font-bricolage text-5xl md:text-7xl font-black text-primary block mb-3 group-hover:text-black">
                  {stat.num}
                </span>
                <span className="text-[10px] tracking-[0.4em] text-gray-500 font-black uppercase group-hover:text-black">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;