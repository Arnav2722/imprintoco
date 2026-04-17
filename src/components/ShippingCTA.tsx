// import { Link } from "react-router-dom";
// import { Truck, RotateCcw, ShieldCheck, ArrowRight } from "lucide-react";

// const ShippingCTA = () => {
//   return (
//     <section className="py-12 md:py-24 bg-background border-y-2 md:border-y-4 border-foreground selection:bg-primary selection:text-black relative overflow-hidden">
//       {/* Background Graphic Accent - Hidden on very small screens to avoid layout shift */}
//       <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-[0.02] md:opacity-[0.03] pointer-events-none select-none">
//         <h2 className="text-[40vw] md:text-[20vw] font-black uppercase italic leading-none">
//           IMPRINTO
//         </h2>
//       </div>

//       <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
//         <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 md:gap-16">
//           {/* LEFT: Heading & Mobile-Specific Alignment */}
//           <div className="text-center lg:text-left space-y-4 md:space-y-6 w-full lg:w-auto">
//             <h2 className="font-display text-[12vw] sm:text-[10vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-[0.9] md:leading-[0.8] text-foreground">
//               DIFFERENT BY <br />
//               <span className="text-primary italic">DESIGN.</span>
//             </h2>

//             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
//               <div className="flex items-center gap-2">
//                 <div className="w-1.5 h-1.5 bg-accent rotate-45" />
//                 <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground/50">
//                   FREE SHIPPING OVER ₹599
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-1.5 h-1.5 bg-accent-lime rotate-45" />
//                 <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground/50">
//                   PAN INDIA SHIPPING
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Layout fix for mobile icons and button */}
//           <div className="w-full lg:w-auto flex flex-col items-center gap-8 md:gap-16">
//             {/* Trust Icons - Proper spacing on mobile */}
//             <div className="grid grid-cols-3 gap-8 md:gap-12 w-full max-w-sm md:max-w-none">
//               <TrustIcon
//                 icon={<Truck className="w-6 h-6 md:w-8 md:h-8" />}
//                 label="Fast"
//               />
//               <TrustIcon
//                 icon={<RotateCcw className="w-6 h-6 md:w-8 md:h-8" />}
//                 label="Returns"
//               />
//               <TrustIcon
//                 icon={<ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />}
//                 label="Secure"
//               />
//             </div>

//             {/* CTA Button - Full width on mobile, shadow fix */}
//             <Link
//               to="/shop"
//               className="w-full sm:w-auto h-20 md:h-24 px-8 md:px-12 bg-foreground text-background font-display rounded-none transition-all duration-300 group flex items-center justify-between sm:justify-center gap-6 md:gap-10 hover:bg-primary hover:text-foreground shadow-[6px_6px_0px_0px_#FF2E63] md:shadow-[12px_12px_0px_0px_#FF2E63] hover:shadow-none active:translate-x-1 active:translate-y-1"
//             >
//               <div className="flex flex-col items-start leading-none">
//                 <span className="text-[8px] md:text-[11px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100">
//                   BROWSE
//                 </span>
//                 <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">
//                   THE COLLECTION
//                 </span>
//               </div>
//               <ArrowRight
//                 className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300"
//                 strokeWidth={3}
//               />
//             </Link>
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
//   <div className="flex flex-col items-center gap-2 md:gap-4 group cursor-default">
//     <div className="text-foreground/20 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
//       {icon}
//     </div>
//     <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground/30 group-hover:text-foreground transition-colors">
//       {label}
//     </span>
//   </div>
// );

// export default ShippingCTA;

import { Link } from "react-router-dom";
import { Truck, RotateCcw, ShieldCheck, ArrowRight } from "lucide-react";

const ShippingCTA = (): JSX.Element => {
  return (
    <section className="py-12 md:py-24 bg-background border-y-2 md:border-y-4 border-foreground selection:bg-primary selection:text-black relative overflow-hidden">
      {/* Background Graphic Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-[0.02] md:opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[40vw] md:text-[20vw] font-black uppercase italic leading-none">
          IMPRINTO
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 md:gap-16">
          {/* LEFT: Heading */}
          <div className="text-center lg:text-left space-y-4 md:space-y-6 w-full lg:w-auto">
            <h2 className="font-display text-[12vw] sm:text-[10vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-[0.9] md:leading-[0.8] text-foreground">
              DIFFERENT BY <br />
              <span className="text-primary italic">DESIGN.</span>
            </h2>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent rotate-45" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground/50">
                  FREE SHIPPING OVER ₹499
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent-lime rotate-45" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground/50">
                  PAN-INDIA SHIPPING
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Trust Icons and CTA */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-8 md:gap-16">
            <div className="grid grid-cols-3 gap-8 md:gap-12 w-full max-w-sm md:max-w-none">
              <TrustIcon
                icon={<Truck className="w-6 h-6 md:w-8 md:h-8" />}
                label="Fast"
              />
              <TrustIcon
                icon={<RotateCcw className="w-6 h-6 md:w-8 md:h-8" />}
                label="Returns"
              />
              <TrustIcon
                icon={<ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />}
                label="Secure"
              />
            </div>

            <Link
              to="/shop"
              className="w-full sm:w-auto h-20 md:h-24 px-8 md:px-12 bg-foreground text-background font-display rounded-none transition-all duration-300 group flex items-center justify-between sm:justify-center gap-6 md:gap-10 hover:bg-primary hover:text-foreground shadow-[6px_6px_0px_0px_#00D4FF] md:shadow-[12px_12px_0px_0px_#00D4FF] hover:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="text-[8px] md:text-[11px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100">
                  BROWSE
                </span>
                <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                  THE COLLECTION
                </span>
              </div>
              <ArrowRight
                className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300"
                strokeWidth={3}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TrustIconProps {
  icon: React.ReactNode;
  label: string;
}

const TrustIcon = ({ icon, label }: TrustIconProps): JSX.Element => (
  <div className="flex flex-col items-center gap-2 md:gap-4 group cursor-default">
    <div className="text-foreground/20 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
      {icon}
    </div>
    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground/30 group-hover:text-foreground transition-colors">
      {label}
    </span>
  </div>
);

export default ShippingCTA;