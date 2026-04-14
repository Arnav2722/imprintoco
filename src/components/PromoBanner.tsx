// import { Gift } from "lucide-react";

// const PromoBanner = () => {
//   return (
//     <section className="bg-primary/10 border border-primary/20 py-6 px-6">
//       <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
//         <Gift className="text-primary flex-shrink-0" size={28} />
//         <div className="text-center md:text-left">
//           <h3 className="font-display text-sm md:text-base font-bold tracking-wider uppercase text-foreground">
//             Buy. Reel. Save 20%.
//           </h3>
//           <p className="font-body text-xs md:text-sm text-muted-foreground mt-1">
//             Purchase any product, make a reel reviewing it on Instagram, and get{" "}
//             <span className="text-primary font-bold">20% off your next order</span> +{" "}
//             <span className="text-primary font-bold">a free surprise gift</span>. Tag us to claim.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PromoBanner;

import { Gift, Instagram, Zap } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="bg-white border-y-4 border-foreground py-8 px-6 relative overflow-hidden">
      {/* Decorative Background Icon */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <Instagram size={120} />
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12 relative z-10">
        {/* The Badge Icon */}
        <div className="w-16 h-16 bg-accent flex items-center justify-center shrink-0 rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Gift className="text-white" size={32} />
        </div>

        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
            <h3 className="font-display text-2xl md:text-3xl font-black tracking-tighter uppercase text-foreground">
              POST A REEL.{" "}
              <span className="text-primary italic">GET PAID.</span>
            </h3>
            <div className="bg-accent-lime px-3 py-1 border-2 border-foreground rotate-[-2deg] hidden md:block">
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                Limited Offer
              </span>
            </div>
          </div>

          <p className="font-body text-sm md:text-base text-foreground/60 font-bold uppercase tracking-tight leading-snug max-w-3xl">
            Flex your setup on Instagram. Tag us in a reel and we'll DM you a{" "}
            <span className="text-foreground border-b-2 border-primary">
              20% OFF VOUCHER
            </span>{" "}
            +{" "}
            <span className="text-foreground border-b-2 border-accent">
              A FREE SURPRISE GIFT
            </span>
            . No caps, just rewards.
          </p>
        </div>

        {/* Call to Action Badge */}
        <div className="flex items-center gap-4 bg-foreground text-background px-6 py-3 border-2 border-foreground shadow-[6px_6px_0px_0px_rgba(0,212,255,1)]">
          <Zap size={16} className="text-accent-lime fill-accent-lime" />
          <span className="text-xs font-black uppercase tracking-[0.2em]">
            Claim via DM
          </span>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;