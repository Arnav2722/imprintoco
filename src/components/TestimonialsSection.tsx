import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    user: "@arnav.v",
    text: "The matte finish on the F1 posters is insane. Zero glare, looks premium on my office wall.",
    image: "/Posters/f1c3.jpg", // Yahan user ki deewar wali photo aayegi
    tag: "Racing Fan",
  },
  {
    user: "@otaku_den",
    text: "Stickers are actually waterproof! Put them on my bike and they survived the monsoon perfectly.",
    image: "/Posters/f1v2.jpg", // Yahan laptop/bike wali photo aayegi
    tag: "Anime Head",
  },
  {
    user: "@karan_p",
    text: "Packaging was top-notch. No bends or creases. Imprinto is the GOAT for posters.",
    image: "/Posters/Batman.jpg",
    tag: "Verified Buyer",
  },
  {
    user: "@pixel_perfect",
    text: "Cleanest minimalist posters I've found in India. Minimalist manga collection is a 10/10.",
    image: "/Posters/porsche1.jpg",
    tag: "Designer",
  },
  {
    user: "@vroom_vroom",
    text: "Got the Senna bundle. The colors are so vibrant. Definitely buying more for my room.",
    image: "/Posters/f1v4.jpg",
    tag: "Motorsport",
  },
];

// Loop ko seamless banane ke liye array ko double kar rahe hain
const duplicatedReviews = [...reviews, ...reviews];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center md:text-left">
        <h2 className="font-bricolage text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
          The <span className="text-primary not-italic">Community.</span>
        </h2>
        <p className="text-gray-500 mt-4 font-medium uppercase tracking-[0.2em] text-xs">
          Don't take our word for it. Take theirs.
        </p>
      </div>

      {/* Infinite Marquee Container */}
      <div className="flex relative">
        <motion.div
          className="flex gap-6 pr-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedReviews.map((rev, i) => (
            <div
              key={i}
              className="min-w-[300px] md:min-w-[400px] bg-[#0a0a0a] border border-white/5 rounded-sm p-4 hover:border-primary/40 transition-colors group"
            >
              {/* User Image (Mockup/Wall Photo) */}
              <div className="aspect-video w-full overflow-hidden rounded-sm mb-6 bg-gray-900">
                <img
                  src={rev.image}
                  alt="Customer setup"
                  className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                />
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-gray-400 font-medium leading-relaxed italic text-sm md:text-base mb-6">
                "{rev.text}"
              </p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="font-bricolage text-base font-bold text-white uppercase italic">
                  {rev.user}
                </span>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest group-hover:text-primary transition-colors">
                  {rev.tag}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Visual Fade effect on sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10" />
    </section>
  );
};

export default TestimonialsSection;
