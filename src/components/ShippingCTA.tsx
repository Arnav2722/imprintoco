// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";

// const ShippingCTA = () => {
//   const [time, setTime] = useState({ hours: 2, minutes: 45, seconds: 12 });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime((prev) => {
//         let { hours, minutes, seconds } = prev;
//         seconds--;
//         if (seconds < 0) {
//           seconds = 59;
//           minutes--;
//         }
//         if (minutes < 0) {
//           minutes = 59;
//           hours--;
//         }
//         if (hours < 0) {
//           hours = 23;
//           minutes = 59;
//           seconds = 59;
//         }
//         return { hours, minutes, seconds };
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const pad = (n: number) => String(n).padStart(2, "0");

//   return (
//     <section className="py-20 md:py-28 bg-primary">
//       <div className="max-w-[1400px] mx-auto px-6 text-center">
//         <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[0.95] mb-4">
//           FREE SHIPPING
//           <br />
//           ENDS SOON
//         </h2>
//         <p className="font-display text-sm tracking-widest text-primary-foreground/70 mb-8 uppercase">
//           ON ALL ORDERS ABOVE ₹499
//         </p>

//         <div className="flex justify-center gap-3 mb-10">
//           {[
//             { val: pad(time.hours), label: "HRS" },
//             { val: pad(time.minutes), label: "MIN" },
//             { val: pad(time.seconds), label: "SEC" },
//           ].map((unit) => (
//             <div key={unit.label} className="bg-primary-foreground/20 px-4 py-3 min-w-[60px]">
//               <span className="font-display text-2xl font-bold text-primary-foreground block">
//                 {unit.val}
//               </span>
//               <span className="font-display text-[9px] tracking-widest text-primary-foreground/60">
//                 {unit.label}
//               </span>
//             </div>
//           ))}
//         </div>

//         <Button variant="secondary" size="lg" asChild>
//           <Link to="/shop">CLAIM DEAL</Link>
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default ShippingCTA;

import { Link } from "react-router-dom";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

const ShippingCTA = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-black text-center lg:text-left">
            <h2 className="font-bricolage text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] mb-4">
              Stop Staring. <br /> Start{" "}
              <span className="underline decoration-4">Owning.</span>
            </h2>
            <p className="font-bold uppercase tracking-widest text-sm opacity-80">
              Free Shipping on orders above ₹599.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <div className="flex flex-col items-center text-black">
              <Truck size={32} strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase mt-2">
                Fast Delivery
              </span>
            </div>
            <div className="flex flex-col items-center text-black">
              <RotateCcw size={32} strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase mt-2">
                Easy Exchange
              </span>
            </div>
            <div className="flex flex-col items-center text-black">
              <ShieldCheck size={32} strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase mt-2">
                Secure Payment
              </span>
            </div>

            <Link
              to="/shop"
              className="ml-0 sm:ml-8 h-20 px-12 bg-black text-white font-bricolage text-2xl font-black italic uppercase flex items-center hover:bg-white hover:text-black transition-all"
            >
              Shop All Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingCTA;