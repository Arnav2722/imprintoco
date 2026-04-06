import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  const posterImages = [
    "/Posters/Batman.jpg",
    "/Posters/F1.jpg",
    "/Posters/f1v2.jpg",
    "/Posters/Krishna Ji.jpg",
    "/Posters/f1c3.jpg",
    "/Posters/krishna2.jpg",
    "/Posters/porsche1.jpg",
    "/Posters/motivation1.jpg",
    "/Posters/f1v4.jpg",
  ];

  const repeatedPosters = [...posterImages, ...posterImages, ...posterImages];

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[#050505] text-white pt-24 md:pt-32 pb-20 selection:bg-primary selection:text-black font-bricolage">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[600px] h-[400px] md:h-[800px] bg-primary/20 blur-[100px] md:blur-[150px] rounded-full" />

        {/* 1. MOBILE & TABLET BACKGROUND (Centered Static Columns) */}
        <div className="lg:hidden absolute inset-0 opacity-[0.15] pointer-events-none flex justify-center items-center">
          <div className="flex gap-4 rotate-6 transform scale-110">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              {posterImages.slice(0, 4).map((src, i) => (
                <div
                  key={`mob-c1-${i}`}
                  className="w-[35vw] h-[52vw] max-w-[140px] bg-gray-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl"
                >
                  <img
                    src={src}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-6 translate-y-16">
              {posterImages.slice(4, 8).map((src, i) => (
                <div
                  key={`mob-c2-${i}`}
                  className="w-[35vw] h-[52vw] max-w-[140px] bg-gray-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl"
                >
                  <img
                    src={src}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. DESKTOP INFINITE LOOP GRID (Original Dynamic) */}
        <div className="absolute right-[-2%] top-0 h-[120%] hidden lg:grid grid-cols-3 gap-8 rotate-6 translate-x-10 opacity-60">
          <div className="relative h-full overflow-hidden">
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="flex flex-col gap-8"
            >
              {repeatedPosters.map((src, i) => (
                <PosterCard key={`col1-${i}`} src={src} />
              ))}
            </motion.div>
          </div>
          <div className="relative h-full overflow-hidden">
            <motion.div
              animate={{ y: ["-50%", "0%"] }}
              transition={{ duration: 45, ease: "linear", repeat: Infinity }}
              className="flex flex-col gap-8"
            >
              {repeatedPosters.map((src, i) => (
                <PosterCard key={`col2-${i}`} src={src} />
              ))}
            </motion.div>
          </div>
          <div className="relative h-full overflow-hidden">
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
              className="flex flex-col gap-8"
            >
              {repeatedPosters.map((src, i) => (
                <PosterCard key={`col3-${i}`} src={src} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full mt-10">
        <div className="mb-6 md:mb-8 text-left max-w-4xl">
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] md:leading-[0.8] tracking-tighter uppercase italic">
            OWN YOUR <br />
            <span className="text-primary not-italic">OBSESSION.</span>
          </h1>
        </div>

        <div className="max-w-xl mb-10 text-left">
          <p className="text-gray-400 text-base md:text-xl font-medium leading-relaxed mb-8">
            Premium Waterproof Stickers and Matte Finish Posters.{" "}
            <br className="hidden md:block" />
            Built for the fans who live for the thrill.
          </p>

          <div className="inline-flex flex-col items-start bg-white text-black p-3 md:p-4 skew-x-[-10deg] shadow-2xl">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 whitespace-nowrap">
              Everything Under
            </span>
            <span className="text-3xl md:text-4xl font-black leading-none italic">
              ₹299.00/-
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="h-14 md:h-16 px-8 md:px-10 bg-primary hover:bg-white text-black font-black text-lg md:text-xl rounded-none transition-all transform hover:translate-y-[-2px]"
            asChild
          >
            <Link to="/shop?cat=stickers">EXPLORE STICKERS</Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-14 md:h-16 px-8 md:px-10 border-2 border-white bg-transparent hover:bg-white hover:text-black font-black text-lg md:text-xl rounded-none transition-all transform hover:translate-y-[-2px]"
            asChild
          >
            <Link to="/shop?cat=posters">SHOP POSTERS</Link>
          </Button>
        </div>

        <div className="mt-12 md:mt-16 flex flex-wrap gap-x-8 md:gap-x-12 gap-y-4 border-t border-white/10 pt-8 opacity-50">
          <FeatureItem text="Premium Matte Finish" />
          <FeatureItem text="Waterproof Vinyl" />
          <FeatureItem text="Pan India Shipping" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20" />
    </section>
  );
};

const PosterCard = ({ src }: { src: string }) => (
  <div className="w-40 h-60 bg-gray-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl transition-all hover:scale-110 hover:border-primary/50 z-10 flex-shrink-0">
    <img
      src={src}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.currentTarget.src =
          "https://via.placeholder.com/300x450?text=Imprinto";
      }}
    />
  </div>
);

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2">
    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap">
      {text}
    </span>
  </div>
);

export default HeroSection;
