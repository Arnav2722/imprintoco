import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import heroCarImg from "@/assets/hero-car.jpg";
import stickersImg from "@/assets/product-stickers.jpg";
import posterF1Img from "@/assets/product-poster-f1.jpg";
import bikeImg from "@/assets/product-bike.jpg";
import jdmImg from "@/assets/product-jdm.jpg";
import quoteImg from "@/assets/product-quote.jpg";

const imageMap: Record<string, string> = {
  "hero-car": heroCarImg,
  "product-stickers": stickersImg,
  "product-poster-f1": posterF1Img,
  "product-bike": bikeImg,
  "product-jdm": jdmImg,
  "product-quote": quoteImg,
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative bg-surface-low overflow-hidden mb-3 aspect-square">
          <img
            src={imageMap[product.image] || stickersImg}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150"
            loading="lazy"
            width={800}
            height={800}
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-secondary text-foreground font-display text-[10px] tracking-widest font-bold px-2 py-1 uppercase">
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      <h3 className="font-display text-xs tracking-wider uppercase text-foreground mb-1">
        <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
          {product.name}
        </Link>
      </h3>
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-primary">₹{product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="font-display text-[10px] tracking-widest uppercase bg-primary text-primary-foreground px-3 py-1.5 hover:brightness-110 transition-all duration-150"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
