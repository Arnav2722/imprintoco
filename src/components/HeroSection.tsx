import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-car.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-end pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="JDM car in neon-lit street"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 w-full">
        <p className="font-display text-xs tracking-[0.3em] text-primary mb-4 uppercase">
          #UNTAMEDSURFACE
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6 max-w-3xl">
          UPGRADE
          <br />
          YOUR SPACE
          <br />
          <span className="text-primary">UNDER ₹299</span>
        </h1>
        <p className="text-muted-foreground max-w-md mb-8 font-body text-sm leading-relaxed">
          Premium vinyl stickers and posters for the car/bike aesthetic you love.
          Built for the underground.
        </p>
        <div className="flex gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/shop?cat=stickers">SHOP STICKERS</Link>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/shop?cat=posters">SHOP POSTERS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
