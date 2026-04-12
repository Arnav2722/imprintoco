// const Marquee = () => {
//   const items = [
//     "LIMITED DROP — JDM SERIES 01",
//     "FREE DELIVERY OVER ₹499",
//     "VANDAL-PROOF VINYL",
//     "LIMITED DROP — JDM SERIES 01",
//     "FREE DELIVERY OVER ₹499",
//   ];

//   return (
//     <div className="bg-primary overflow-hidden py-2.5">
//       <div className="animate-marquee flex whitespace-nowrap">
//         {[...items, ...items].map((item, i) => (
//           <span
//             key={i}
//             className="font-display text-xs tracking-widest text-primary-foreground mx-8 font-bold uppercase"
//           >
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Marquee;

import { motion } from "framer-motion";
// import { Star, Zap, ShieldCheck, Flame } from "lucide-react";

const Marquee = () => {
  const items = [
    {
      text: "LIMITED DROP — JDM SERIES 01",
      // icon: <Zap size={14} className="fill-current" />,
    },
    {
      text: "FREE DELIVERY OVER ₹499",
      // icon: <Star size={14} className="fill-current" />,
    },
    {
      text: "VANDAL-PROOF VINYL",
      // icon: <ShieldCheck size={14} className="fill-current" />,
    },
    {
      text: "PREMIUM MATTE FINISH",
      // icon: <Flame size={14} className="fill-current" />,
    },
  ];

  // Items ko duplicate kar rahe hain taaki loop seamless chale
  const scrollingItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative bg-primary overflow-hidden py-4 border-y border-black/10">
      {/* Subtle background pattern for depth */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {scrollingItems.map((item, i) => (
          <div key={i} className="flex items-center mx-10 gap-6">
            <span className="font-bricolage text-[11px] md:text-sm tracking-[0.2em] text-black font-black uppercase italic">
              {item.text}
            </span>
            {/* <div className="text-black opacity-30">{item.icon}</div> */}
          </div>
        ))}
      </motion.div>

      {/* Skew effect container ko thoda slant deta hai (Optional: agar tumhe edgy look chahiye) */}
      <style>{`
        .animate-marquee-container {
          transform: skewY(-1deg);
        }
      `}</style>
    </div>
  );
};

export default Marquee;