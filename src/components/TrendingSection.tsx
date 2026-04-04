import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const TrendingSection = () => {
  const trending = products.slice(0, 4);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary">
            TRENDING NOW
          </h2>
          <Link
            to="/shop"
            className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-150 uppercase"
          >
            VIEW ALL
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
