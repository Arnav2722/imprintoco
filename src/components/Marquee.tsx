// import { motion } from "framer-motion";
// // import { Star, Zap, ShieldCheck, Flame } from "lucide-react";

// const Marquee = () => {
//   const items = [
//     {
//       text: "LIMITED DROP — JDM SERIES 01",
//       // icon: <Zap size={14} className="fill-current" />,
//     },
//     {
//       text: "FREE DELIVERY OVER ₹499",
//       // icon: <Star size={14} className="fill-current" />,
//     },
//     {
//       text: "VANDAL-PROOF VINYL",
//       // icon: <ShieldCheck size={14} className="fill-current" />,
//     },
//     {
//       text: "PREMIUM MATTE FINISH",
//       // icon: <Flame size={14} className="fill-current" />,
//     },
//   ];

//   // Items ko duplicate kar rahe hain taaki loop seamless chale
//   const scrollingItems = [...items, ...items, ...items, ...items];

//   return (
//     <div className="relative bg-primary overflow-hidden py-4 border-y border-black/10">
//       {/* Subtle background pattern for depth */}
//       <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

//       <motion.div
//         className="flex whitespace-nowrap"
//         animate={{ x: [0, -1000] }}
//         transition={{
//           duration: 25,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       >
//         {scrollingItems.map((item, i) => (
//           <div key={i} className="flex items-center mx-10 gap-6">
//             <span className="font-bricolage text-[11px] md:text-sm tracking-[0.2em] text-black font-black uppercase italic">
//               {item.text}
//             </span>
//             {/* <div className="text-black opacity-30">{item.icon}</div> */}
//           </div>
//         ))}
//       </motion.div>

//       {/* Skew effect container ko thoda slant deta hai (Optional: agar tumhe edgy look chahiye) */}
//       <style>{`
//         .animate-marquee-container {
//           transform: skewY(-1deg);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Marquee;

import { motion } from "framer-motion";

const Marquee = () => {
  const items = [
    "RAW JDM SPEC: SERIES 01 OUT NOW",
    "UNFADEABLE MATTE FINISH",
    "FREE SHIPPING ON HAULS OVER ₹499",
    "WATERPROOF VINYL — BUILT TO LAST",
    "NO SLOP — JUST AUTHENTIC ART",
    "CRAFTED FOR THE CORE FANS",
    "PREMIUM GRADE POSTERS",
  ];

  // Duplicating for a seamless loop
  const scrollingItems = [...items, ...items, ...items];

  return (
    <div className="relative bg-primary overflow-hidden py-5 border-y-4 border-foreground -rotate-1 scale-105 z-20 shadow-xl">
      {/* Subtle Grain for Premium Feel */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {scrollingItems.map((text, i) => (
          <div key={i} className="flex items-center px-12">
            <span className="font-display text-base md:text-xl tracking-tighter text-foreground font-black uppercase italic">
              {text}
            </span>
            {/* Custom spacer element to replace icons */}
            <div className="ml-12 w-3 h-3 bg-foreground rotate-45" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;