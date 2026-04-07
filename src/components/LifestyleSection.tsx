// import lifestylePoster from "@/assets/lifestyle-poster.jpg";
// import lifestyleSticker from "@/assets/lifestyle-sticker.jpg";

// const LifestyleSection = () => {
//   return (
//     <section className="py-20 md:py-28">
//       <div className="max-w-[1400px] mx-auto px-6">
//         <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] mb-16 max-w-lg">
//           YOUR VIBE,
//           <br />
//           HARDCODED.
//         </h2>

//         <div className="grid md:grid-cols-[70%_30%] gap-4 mb-8">
//           <div className="overflow-hidden aspect-video">
//             <img
//               src={lifestylePoster}
//               alt="Car posters on wall"
//               className="w-full h-full object-cover"
//               loading="lazy"
//               width={1200}
//               height={600}
//             />
//           </div>
//           <div className="overflow-hidden aspect-video md:aspect-auto">
//             <img
//               src={lifestyleSticker}
//               alt="Stickers on car"
//               className="w-full h-full object-cover"
//               loading="lazy"
//               width={1200}
//               height={800}
//             />
//           </div>
//         </div>

//         <blockquote className="max-w-md ml-auto text-right">
//           <p className="text-muted-foreground text-sm font-body italic mb-2">
//             "We don't do clean. We do raw. Every piece is designed to survive the
//             street and look better with age."
//           </p>
//         </blockquote>
//       </div>
//     </section>
//   );
// };

// export default LifestyleSection;

import { motion } from "framer-motion";

const lifestyles = [
  {
    title: "Vibrant Walls",
    desc: "Anime & Manga aesthetics for your sanctuary.",
    image: "/Posters/Batman.jpg", // Yahan baad mein wo image dalna jisme deewar pe poster ho
    tag: "Aesthetics",
  },
  {
    title: "Tech Personalization",
    desc: "Premium vinyl stickers for your machines.",
    image: "/Posters/porsche1.jpg", // Laptop/Gadget mockup image
    tag: "Stickers",
  },
  {
    title: "The Speed Den",
    desc: "Motorsport legends in high-grade matte.",
    image: "/Posters/f1c3.jpg", // Room mockup with F1 posters
    tag: "Racing",
  },
];

const LifestyleSection = () => {
  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-bricolage text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
              Live Your <br />
              <span className="text-primary not-italic">Lifestyle.</span>
            </h2>
          </div>
          <p className="text-gray-400 font-medium max-w-xs text-sm md:text-base leading-relaxed border-l-2 border-primary pl-4">
            From your workspace to your bedroom, bring your passion to life with
            our premium prints.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lifestyles.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-default"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6 bg-gray-900 border border-white/5">
                {/* Overlay with Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-white text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest italic shadow-xl">
                    {item.tag}
                  </span>
                </div>

                {/* Main Lifestyle Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />

                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>

              <h3 className="font-bricolage text-2xl font-black italic uppercase tracking-tighter text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brand Promise Row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5">
          <div className="text-center md:text-left">
            <span className="block text-primary font-black text-xl mb-1 italic">
              300+ GSM
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              Museum Quality Paper
            </span>
          </div>
          <div className="text-center md:text-left">
            <span className="block text-primary font-black text-xl mb-1 italic">
              No Fade
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              UV Protected Inks
            </span>
          </div>
          <div className="text-center md:text-left">
            <span className="block text-primary font-black text-xl mb-1 italic">
              Anti-Scratch
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              Waterproof Vinyl
            </span>
          </div>
          <div className="text-center md:text-left">
            <span className="block text-primary font-black text-xl mb-1 italic">
              India Wide
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              Doorstep Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;