import { Gift } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="bg-primary/10 border border-primary/20 py-6 px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <Gift className="text-primary flex-shrink-0" size={28} />
        <div className="text-center md:text-left">
          <h3 className="font-display text-sm md:text-base font-bold tracking-wider uppercase text-foreground">
            Buy. Reel. Save 20%.
          </h3>
          <p className="font-body text-xs md:text-sm text-muted-foreground mt-1">
            Purchase any product, make a reel reviewing it on Instagram, and get{" "}
            <span className="text-primary font-bold">20% off your next order</span> +{" "}
            <span className="text-primary font-bold">a free surprise gift</span>. Tag us to claim.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
