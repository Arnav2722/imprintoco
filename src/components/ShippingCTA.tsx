// import { Link } from "react-router-dom";
// import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

// const ShippingCTA = () => {
//   return (
//     <section className="py-20 bg-primary">
//       <div className="max-w-[1400px] mx-auto px-6">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//           <div className="text-black text-center lg:text-left">
//             <h2 className="font-bricolage text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] mb-4">
//               Stop Staring. <br /> Start{" "}
//               <span className="underline decoration-4">Owning.</span>
//             </h2>
//             <p className="font-bold uppercase tracking-widest text-sm opacity-80">
//               Free Shipping on orders above ₹599.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-8 items-center">
//             <div className="flex flex-col items-center text-black">
//               <Truck size={32} strokeWidth={2.5} />
//               <span className="text-[10px] font-black uppercase mt-2">
//                 Fast Delivery
//               </span>
//             </div>
//             <div className="flex flex-col items-center text-black">
//               <RotateCcw size={32} strokeWidth={2.5} />
//               <span className="text-[10px] font-black uppercase mt-2">
//                 Easy Exchange
//               </span>
//             </div>
//             <div className="flex flex-col items-center text-black">
//               <ShieldCheck size={32} strokeWidth={2.5} />
//               <span className="text-[10px] font-black uppercase mt-2">
//                 Secure Payment
//               </span>
//             </div>

//             <Link
//               to="/shop"
//               className="ml-0 sm:ml-8 h-20 px-12 bg-black text-white font-bricolage text-2xl font-black italic uppercase flex items-center hover:bg-white hover:text-black transition-all"
//             >
//               Shop All Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ShippingCTA;

import { Link } from "react-router-dom";
import { Truck, RotateCcw, ShieldCheck, ArrowRight } from "lucide-react";

const ShippingCTA = () => {
  return (
    <section className="py-24 bg-[#050505] border-y border-white/5 selection:bg-primary selection:text-black">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* LEFT: Heading in 2 Lines */}
          <div className="text-left space-y-8 w-full lg:w-auto">
            <h2 className="font-bricolage text-[11vw] sm:text-[8vw] lg:text-[4.5vw] font-black uppercase tracking-tighter leading-[0.85] text-white">
              STOP STARING. <br />
              <span className="text-primary">START OWNING.</span>
            </h2>

            <div className="flex items-center gap-4 opacity-40">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
                Free Shipping Above ₹599
              </span>
              <span className="w-12 h-[1px] bg-white/20" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
                Pan India Delivery
              </span>
            </div>
          </div>

          {/* RIGHT: Grouped Icons & Button */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-12 lg:gap-16">
            {/* Trust Icons */}
            <div className="flex gap-10 sm:gap-14">
              <TrustIcon icon={<Truck size={22} />} label="Express" />
              <TrustIcon icon={<RotateCcw size={22} />} label="Exchange" />
              <TrustIcon icon={<ShieldCheck size={22} />} label="Secure" />
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
  <div className="flex flex-col items-center gap-3 group cursor-default">
    <div className="text-white opacity-20 group-hover:text-primary group-hover:opacity-100 transition-all duration-500">
      {icon}
    </div>
    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-700 group-hover:text-white transition-colors duration-500">
      {label}
    </span>
  </div>
);

const ButtonCTA = () => (
  <Link
    to="/shop"
    className="w-full sm:w-auto h-20 px-10 bg-white text-black font-bricolage rounded-none transition-all duration-500 group flex items-center justify-between sm:justify-center gap-8 hover:bg-primary"
  >
    <div className="flex flex-col items-start leading-none">
      <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
        Shop
      </span>
      <span className="text-xl font-black uppercase tracking-tighter">
        Collection
      </span>
    </div>
    <ArrowRight
      size={20}
      className="group-hover:translate-x-2 transition-transform duration-500"
    />
  </Link>
);

export default ShippingCTA;
