import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import stickersImg from "@/assets/product-stickers.jpg";

const PromoSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="bg-surface-low grid md:grid-cols-[30%_70%] min-h-[400px]">
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <span className="font-display text-[10px] tracking-[0.3em] text-primary mb-4 uppercase">
              LIMITED CHANCE OFFER
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-[0.95] mb-4">
              ANY 5
              <br />
              STICKERS FOR
              <br />
              <span className="text-primary">₹199</span>
            </h2>
            <p className="text-muted-foreground text-sm font-body mb-8 max-w-xs">
              Mix and match your favorite designs. High-gloss, waterproof, and zero residue.
              Deal ends when stocks run out.
            </p>
            <Button variant="hero" size="default" asChild className="w-fit">
              <Link to="/shop?cat=stickers">GRAB THE PACK</Link>
            </Button>
          </div>
          <div className="relative overflow-hidden">
            <img
              src={stickersImg}
              alt="Sticker collection"
              className="w-full h-full object-cover"
              loading="lazy"
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
