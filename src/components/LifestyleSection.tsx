import lifestylePoster from "@/assets/lifestyle-poster.jpg";
import lifestyleSticker from "@/assets/lifestyle-sticker.jpg";

const LifestyleSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] mb-16 max-w-lg">
          YOUR VIBE,
          <br />
          HARDCODED.
        </h2>

        <div className="grid md:grid-cols-[70%_30%] gap-4 mb-8">
          <div className="overflow-hidden aspect-video">
            <img
              src={lifestylePoster}
              alt="Car posters on wall"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={600}
            />
          </div>
          <div className="overflow-hidden aspect-video md:aspect-auto">
            <img
              src={lifestyleSticker}
              alt="Stickers on car"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>
        </div>

        <blockquote className="max-w-md ml-auto text-right">
          <p className="text-muted-foreground text-sm font-body italic mb-2">
            "We don't do clean. We do raw. Every piece is designed to survive the
            street and look better with age."
          </p>
        </blockquote>
      </div>
    </section>
  );
};

export default LifestyleSection;
