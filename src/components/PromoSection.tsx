// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import stickersImg from "@/assets/product-stickers.jpg";

// const PromoSection = () => {
//   return (
//     <section className="py-20 md:py-28">
//       <div className="max-w-[1400px] mx-auto px-6">
//         <div className="bg-surface-low grid md:grid-cols-[30%_70%] min-h-[400px]">
//           <div className="p-10 md:p-16 flex flex-col justify-center">
//             <span className="font-display text-[10px] tracking-[0.3em] text-primary mb-4 uppercase">
//               LIMITED CHANCE OFFER
//             </span>
//             <h2 className="font-display text-4xl md:text-5xl font-bold leading-[0.95] mb-4">
//               ANY 5
//               <br />
//               STICKERS FOR
//               <br />
//               <span className="text-primary">₹199</span>
//             </h2>
//             <p className="text-muted-foreground text-sm font-body mb-8 max-w-xs">
//               Mix and match your favorite designs. High-gloss, waterproof, and zero residue.
//               Deal ends when stocks run out.
//             </p>
//             <Button variant="hero" size="default" asChild className="w-fit">
//               <Link to="/shop?cat=stickers">GRAB THE PACK</Link>
//             </Button>
//           </div>
//           <div className="relative overflow-hidden">
//             <img
//               src={stickersImg}
//               alt="Sticker collection"
//               className="w-full h-full object-cover"
//               loading="lazy"
//               width={800}
//               height={800}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PromoSection;

import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

const PromoSection = () => {
  return (
    <section className="py-20 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-white/5 p-8 md:p-16">
          {/* Background Decor */}
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Zap size={14} className="text-primary fill-primary" />
                <span className="text-[10px] font-black tracking-widest text-primary uppercase">
                  Limited Time Drop
                </span>
              </div>

              <h2 className="font-bricolage text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none mb-6">
                The <span className="text-primary not-italic">Motorsport</span>{" "}
                <br /> Essentials.
              </h2>

              <p className="text-gray-400 text-lg md:text-xl font-medium max-w-md mb-10 leading-relaxed">
                Get 15% off on your first bundle order. High-grade matte finish,
                built for the true fans.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop?cat=f1"
                  className="px-10 h-16 bg-white text-black font-black italic uppercase tracking-tighter flex items-center gap-3 hover:bg-primary transition-all group"
                >
                  Shop the Drop
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </Link>
                <div className="flex items-center gap-4 px-6 border border-white/10 text-white font-bold text-sm uppercase tracking-widest">
                  Code: <span className="text-primary">FIRST15</span>
                </div>
              </div>
            </div>

            {/* Visual Part (Stacked Posters) */}
            <div className="relative h-[300px] md:h-[450px] hidden md:flex items-center justify-center">
              <div className="absolute w-64 h-80 bg-gray-800 rotate-[-12deg] translate-x-[-20%] border border-white/10 rounded-lg overflow-hidden shadow-2xl z-0">
                <img
                  src="/Posters/f1v2.jpg"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
              <div className="absolute w-64 h-80 bg-gray-800 rotate-[8deg] translate-x-[20%] border border-white/10 rounded-lg overflow-hidden shadow-2xl z-10">
                <img
                  src="/Posters/f1c3.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;