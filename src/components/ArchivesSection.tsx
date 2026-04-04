import { Link } from "react-router-dom";
import heroCarImg from "@/assets/hero-car.jpg";
import bikeImg from "@/assets/product-bike.jpg";
import jdmImg from "@/assets/product-jdm.jpg";
import quoteImg from "@/assets/product-quote.jpg";

const categories = [
  { label: "CARS", image: heroCarImg, link: "/shop?sub=cars" },
  { label: "BIKES", image: bikeImg, link: "/shop?sub=bikes" },
  { label: "JDM", image: jdmImg, link: "/shop?sub=jdm" },
  { label: "QUOTES", image: quoteImg, link: "/shop?sub=quotes" },
];

const ArchivesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-surface-low">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">THE ARCHIVES</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.label} to={cat.link} className="group relative overflow-hidden aspect-[3/4]">
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-display text-lg font-bold text-primary">{cat.label}</h3>
                <span className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">
                  EXPLORE →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchivesSection;
