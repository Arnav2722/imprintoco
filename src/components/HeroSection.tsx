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

  const repeatedPosters = [...posterImages, ...posterImages, ...posterImages];

  return (
    <section className="relative min-h-[100svh] flex items-center justify-start overflow-hidden bg-background text-foreground pt-20 pb-12 font-body selection:bg-primary selection:text-black">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-primary/20 blur-[80px] md:blur-[160px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-10%] w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-accent/15 blur-[60px] md:blur-[140px] rounded-full" />

        {/* INFINITE LOOP - HIDDEN ON SMALL MOBILE, VISIBLE FROM LARGE MOBILE UP */}
        <div className="absolute right-0 top-0 h-full hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 rotate-3 opacity-30 lg:opacity-40 translate-x-8 md:translate-x-16">
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
                    className="w-32 h-48 md:w-48 md:h-72 bg-white border-2 md:border-4 border-white shadow-xl grayscale-[0.5] hover:grayscale-0 transition-all duration-500"
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
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-12 py-4">
        <div className="max-w-full lg:max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-white border-2 border-primary/20 px-3 py-1.5 md:px-4 md:py-2 mb-6 md:mb-8 shadow-sm"
          >
            <Sparkles size={14} className="text-primary animate-pulse" />
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] text-foreground">
              THE 2026 DROP IS HERE
            </span>
          </motion.div>

          {/* Massive Heading */}
          <div className="mb-4 md:mb-8">
            <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] md:leading-[0.8] tracking-tighter uppercase break-words">
              OWN YOUR <br />
              <span className="text-primary italic">OBSESSION.</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm sm:text-xl md:text-2xl font-medium max-w-lg mb-8 md:mb-12 uppercase tracking-tight leading-snug">
            Premium Matte Posters & Vinyl Stickers.
            <br className="hidden sm:block" />
            Vibrant art for the core fans.
          </p>

          {/* Price Block */}
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="bg-accent text-white px-5 py-3 md:px-8 md:py-5 shadow-[4px_4px_0px_0px_#00D4FF] md:shadow-[8px_8px_0px_0px_#00D4FF]">
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-80">
                Starting At
              </p>
              <p className="text-3xl md:text-5xl font-black leading-none tracking-tighter">
                ₹69
              </p>
            </div>
            <div className="h-10 md:h-16 w-[1px] md:w-[2px] bg-foreground/10" />
            <p className="text-foreground/40 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] leading-tight">
              Museum <br /> Quality
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full">
            <Button
              size="lg"
              className="h-16 md:h-20 px-8 md:px-12 bg-foreground text-background hover:bg-primary hover:text-foreground font-black text-base md:text-lg rounded-none transition-all flex justify-between sm:justify-center items-center gap-4 md:gap-8 group shadow-lg sm:w-auto"
              asChild
            >
              <Link to="/shop">
                SHOP NOW
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-16 md:h-20 px-8 md:px-12 border-[3px] md:border-4 border-foreground bg-transparent hover:bg-accent-lime hover:border-accent-lime hover:text-foreground font-black text-base md:text-lg rounded-none transition-all sm:w-auto"
              asChild
            >
              <Link to="/custom-prints">CUSTOMIZE</Link>
            </Button>
          </div>

          {/* Features */}
          <div className="mt-12 md:mt-20 flex flex-col sm:flex-row flex-wrap gap-y-4 gap-x-8 md:gap-x-12 border-t border-foreground/5 pt-8 md:pt-12">
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
  <div className="flex items-center gap-3 md:gap-4">
    <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-accent-lime rotate-45 shadow-[2px_2px_0px_0px_#00D4FF] md:shadow-[4px_4px_0px_0px_#00D4FF]" />
    <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] text-foreground/60">
      {text}
    </span>
  </div>
);

export default HeroSection;
