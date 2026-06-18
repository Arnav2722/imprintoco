import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

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
  // const posterImages2 = [
  //   "/Posters/Batch2/Aventador_miamiBlue.jpg",
  //   "/Posters/Batch2/BikePoster.jpg",
  //   "/Posters/Batch2/Dragon balls.jpg",
  //   "/Posters/Batch2/Ducati.jpg",
  //   "/Posters/Batch2/ferrari_HyperCars.jpg",
  //   "/Posters/Batch2/DucatiPanigaleV4.jpg",
  //   "/Posters/Batch2/McLaren720S.jpg",
  //   "/Posters/Batch2/Mercedes_f1_Chandelier.jpg",
  //   "/Posters/Batch2/nathan-dumlao-eZIzlTVgqNU-unsplash.jpg",
  // ];
  // const posterImages3 = [
  //   "/Posters/Batch3/“THE LAST SON”.jpeg",
  //   "/Posters/Batch3/AventadorLambo.jpg",
  //   "/Posters/Batch3/BMW_RR.jpg",
  //   "/Posters/Batch3/chris-curry-UJij-wz7w88-unsplash.jpg",
  //   "/Posters/Batch3/Gokarting.jpg",
  //   "/Posters/Batch3/Mercedes_F1Car.jpg",
  //   "/Posters/Batch3/Naruto.jpg",
  //   "/Posters/Batch3/PorscheWEC.jpg",
  //   "/Posters/Batch3/STEVE.jpeg",
  // ];

  const repeatedPosters = [...posterImages, ...posterImages, ...posterImages];

  return (
    <section className="relative min-h-[100svh] flex items-center justify-start overflow-hidden bg-background text-foreground pt-32 md:pt-40 pb-12 font-body selection:bg-primary selection:text-black">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-primary/20 blur-[80px] md:blur-[160px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-10%] w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-accent/15 blur-[60px] md:blur-[140px] rounded-full" />

        {/* INFINITE LOOP */}
        <div className="absolute right-0 top-0 h-full hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 rotate-3 opacity-20 lg:opacity-40 translate-x-8 md:translate-x-16">
          {[45, 55, 50].map((duration, idx) => (
            <div
              key={idx}
              className={`relative h-full overflow-hidden ${idx === 2 ? "hidden lg:block" : ""}`}
            >
              <motion.div
                animate={{ y: idx === 1 ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ duration, ease: "linear", repeat: Infinity }}
                className="flex flex-col gap-4 md:gap-8"
              >
                {repeatedPosters.map((src, i) => (
                  <div
                    key={`d-bg-${idx}-${i}`}
                    className="w-32 h-48 md:w-48 md:h-72 bg-white border-2 md:border-4 border-white shadow-xl"
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 py-4">
        <div className="max-w-full lg:max-w-5xl">
          {/* Badge - Added mb-8 for more breathing room */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-white border-2 border-primary/20 px-3 py-1.5 mb-8 md:mb-12 shadow-sm"
          >
            <Sparkles size={14} className="text-primary animate-pulse" />
            <span className="text-[10px] md:text-[14px] font-black uppercase tracking-widest text-foreground">
              THE 2026 DROP IS HERE
            </span>
          </motion.div>

          {/* Heading - Increased bottom margin */}
          <div className="mb-8 md:mb-12">
            <h1 className="font-display text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter uppercase break-words">
              OWN YOUR <br />
              <span className="text-primary">OBSESSION</span>
            </h1>
          </div>

          <p className="text-muted-foreground text-[12px] sm:text-lg md:text-lg lg:text-xl font-medium max-w-[90%] sm:max-w-2xl lg:max-w-3xl mb-12 md:mb-16 uppercase tracking-tight leading-relaxed">
            Premium Matte Posters & Vinyl Stickers.
            <br className="hidden sm:block" />
            Vibrant art for the core fans.
          </p>

          {/* Price Block */}
          <div className="flex items-center gap-6 mb-12 md:mb-16 ">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#00D4FF] translate-x-1.5 translate-y-1.5" />
              <div className="relative bg-accent text-white px-6 py-4 flex flex-col items-start min-w-[140px]">
                <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] mb-2 opacity-90">
                  STARTING AT
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl md:text-2xl font-black">₹</span>
                  <span className="text-3xl md:text-5xl font-black leading-none tracking-tighter">
                    69
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-fit items-center">
            <Button
              size="lg"
              className="h-14 md:h-20 px-8 md:px-12 bg-foreground text-background hover:bg-primary hover:text-foreground font-black text-[10px] md:text-sm rounded-none transition-all flex justify-center items-center gap-4 group shadow-lg w-full sm:w-auto"
              asChild
            >
              <Link to="/shop">
                SHOP NOW
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 md:h-20 px-8 md:px-12 border-[3px] border-foreground bg-transparent hover:bg-accent-lime hover:border-accent-lime hover:text-foreground font-black text-[10px] md:text-sm rounded-none transition-all flex justify-center items-center w-full sm:w-auto"
              asChild
            >
              <Link to="/custom-prints">CUSTOMIZE</Link>
            </Button>
          </div>

          {/* Features */}
          <div className="mt-16 md:mt-24 flex flex-col sm:flex-row flex-wrap gap-y-4 gap-x-8 border-t border-foreground/5 pt-8">
            <FeatureItem text="Premium Matte" />
            <FeatureItem text="Waterproof Vinyl" />
            <FeatureItem text="Express Shipping" />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-2 h-2 bg-accent-lime rotate-45 shadow-[2px_2px_0px_0px_#00D4FF]" />
    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground/60">
      {text}
    </span>
  </div>
);

export default HeroSection;

// HERO SECTION ENDS HERE
