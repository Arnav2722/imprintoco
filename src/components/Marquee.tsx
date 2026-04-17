import { motion } from "framer-motion";

const Marquee = (): JSX.Element => {
  const items: string[] = [
    // "Premium Matte Posters & Vinyl Stickers",
    // "Starting at just ₹69.",
    // "FREE SHIPPING ON ORDERS OVER ₹499",
    // "Colors that look good in any light.",
    // "Matte finish that doesn’t glare under your desk lamp.",
    // "CRAFTED FOR THE CORE FANS",
    // "PREMIUM GRADE POSTERS",
    "PREMIUM MATTE POSTERS & VINYL STICKERS",
    "STARTING AT JUST ₹69.",
    "FREE SHIPPING ON ORDERS OVER ₹499",
    "COLORS THAT LOOK GOOD IN ANY LIGHT.",
    "MATTE FINISH THAT DOESN’T GLARE UNDER YOUR DESK LAMP.",
    "CRAFTED FOR THE CORE FANS",
    "PREMIUM GRADE POSTERS",
  ];

  // Duplicating once for a seamless infinite loop transition
  const scrollingItems: string[] = [...items, ...items];

  return (
    <div className="relative bg-primary overflow-hidden py-5 border-y-4 border-foreground -rotate-1 scale-105 z-20 shadow-xl">
      {/* Subtle Grain for Premium Feel */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30, // Slightly slower for better readability
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {scrollingItems.map((text: string, i: number) => (
          <div key={`${text}-${i}`} className="flex items-center px-12">
            <span className="font-display text-base md:text-xl tracking-tighter text-foreground font-black uppercase italic">
              {text}
            </span>
            {/* Custom spacer element */}
            <div className="ml-12 w-3 h-3 bg-foreground rotate-45" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;