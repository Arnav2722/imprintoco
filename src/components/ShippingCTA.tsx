// import { Link } from "react-router-dom";
// import { Truck, RotateCcw, ShieldCheck, ArrowRight } from "lucide-react";

// const ShippingCTA = () => {
//   return (
//     <section className="py-24 bg-[#050505] border-y border-white/5 selection:bg-primary selection:text-black">
//       <div className="max-w-[1400px] mx-auto px-6">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//           {/* LEFT: Heading in 2 Lines */}
//           <div className="text-left space-y-8 w-full lg:w-auto">
//             <h2 className="font-bricolage text-[11vw] sm:text-[8vw] lg:text-[4.5vw] font-black uppercase tracking-tighter leading-[0.85] text-white">
//               STOP STARING. <br />
//               <span className="text-primary">START OWNING.</span>
//             </h2>

//             <div className="flex items-center gap-4 opacity-40">
//               <span className="text-[9px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
//                 Free Shipping Above ₹599
//               </span>
//               <span className="w-12 h-[1px] bg-white/20" />
//               <span className="text-[9px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
//                 Pan India Delivery
//               </span>
//             </div>
//           </div>

//           {/* RIGHT: Grouped Icons & Button */}
//           <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-12 lg:gap-16">
//             {/* Trust Icons */}
//             <div className="flex gap-10 sm:gap-14">
//               <TrustIcon icon={<Truck size={22} />} label="Express" />
//               <TrustIcon icon={<RotateCcw size={22} />} label="Exchange" />
//               <TrustIcon icon={<ShieldCheck size={22} />} label="Secure" />
//             </div>

//             {/* CTA Button */}
//             <ButtonCTA />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const TrustIcon = ({
//   icon,
//   label,
// }: {
//   icon: React.ReactNode;
//   label: string;
// }) => (
//   <div className="flex flex-col items-center gap-3 group cursor-default">
//     <div className="text-white opacity-20 group-hover:text-primary group-hover:opacity-100 transition-all duration-500">
//       {icon}
//     </div>
//     <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-700 group-hover:text-white transition-colors duration-500">
//       {label}
//     </span>
//   </div>
// );

// const ButtonCTA = () => (
//   <Link
//     to="/shop"
//     className="w-full sm:w-auto h-20 px-10 bg-white text-black font-bricolage rounded-none transition-all duration-500 group flex items-center justify-between sm:justify-center gap-8 hover:bg-primary"
//   >
//     <div className="flex flex-col items-start leading-none">
//       <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
//         Shop
//       </span>
//       <span className="text-xl font-black uppercase tracking-tighter">
//         Collection
//       </span>
//     </div>
//     <ArrowRight
//       size={20}
//       className="group-hover:translate-x-2 transition-transform duration-500"
//     />
//   </Link>
// );

// export default ShippingCTA;

import { Link } from "react-router-dom";
import { Truck, RotateCcw, ShieldCheck, ArrowRight } from "lucide-react";

const ShippingCTA = () => {
  return (
    <section className="py-24 bg-background border-y-4 border-foreground selection:bg-primary selection:text-black relative overflow-hidden">
      {/* Background Graphic Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-[0.03] pointer-events-none">
        <h2 className="text-[20vw] font-black uppercase italic leading-none">
          IMPRINTO
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* LEFT: Aggressive Heading */}
          <div className="text-left space-y-6 w-full lg:w-auto">
            <h2 className="font-display text-[12vw] sm:text-[8vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-[0.8] text-foreground">
              STOP STARING. <br />
              <span className="text-primary italic">GET THE GOODS.</span>
            </h2>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rotate-45" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">
                  FREE SHIPPING OVER ₹599
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-lime rotate-45" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">
                  PAN INDIA DROPS
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Grouped Icons & Button */}
          <div className="w-full lg:w-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* Trust Icons */}
            <div className="flex gap-12">
              <TrustIcon icon={<Truck size={28} />} label="Fast" />
              <TrustIcon icon={<RotateCcw size={28} />} label="Returns" />
              <TrustIcon icon={<ShieldCheck size={28} />} label="Safe" />
            </div>

            {/* CTA Button */}
            <ButtonCTA />
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustIcon = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex flex-col items-center gap-4 group cursor-default">
    <div className="text-foreground/20 group-hover:text-primary group-hover:scale-110 transition-all duration-500">
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 group-hover:text-foreground transition-colors duration-500">
      {label}
    </span>
  </div>
);

const ButtonCTA = () => (
  <Link
    to="/shop"
    className="w-full sm:w-auto h-24 px-12 bg-foreground text-background font-display rounded-none transition-all duration-500 group flex items-center justify-between sm:justify-center gap-10 hover:bg-primary hover:text-foreground shadow-[12px_12px_0px_0px_rgba(255,46,99,1)] hover:shadow-none"
  >
    <div className="flex flex-col items-start leading-none">
      <span className="text-[11px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100">
        EXPLORE
      </span>
      <span className="text-2xl font-black uppercase tracking-tighter">
        ALL COLLECTIONS
      </span>
    </div>
    <ArrowRight
      size={24}
      strokeWidth={3}
      className="group-hover:translate-x-3 transition-transform duration-500"
    />
  </Link>
);

export default ShippingCTA;