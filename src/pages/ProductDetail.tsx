import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
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

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-primary font-display text-sm tracking-widest hover:underline">
            BACK TO SHOP
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link to="/shop" className="font-display text-[10px] tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8 inline-block uppercase">
            ← Back to shop
          </Link>

          <div className="grid md:grid-cols-2 gap-12 mt-6">
            <div className="bg-surface-low aspect-square overflow-hidden">
              <img
                src={imageMap[product.image] || stickersImg}
                alt={product.name}
                className="w-full h-full object-cover"
                width={800}
                height={800}
              />
            </div>

            <div className="flex flex-col justify-center">
              {product.badge && (
                <span className="inline-block bg-secondary text-foreground font-display text-[10px] tracking-widest font-bold px-2 py-1 uppercase mb-4 w-fit">
                  {product.badge}
                </span>
              )}
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">
                {product.name}
              </h1>
              <p className="font-display text-xs tracking-widest text-muted-foreground uppercase mb-6">
                {product.category} / {product.subcategory}
              </p>
              <p className="font-display text-3xl font-bold text-primary mb-6">₹{product.price}</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
                {product.description}
              </p>

              <div className="flex gap-4">
                <Button variant="cta" size="xl" onClick={() => addToCart(product)}>
                  BUY NOW
                </Button>
                <Button variant="outline" size="xl" onClick={() => addToCart(product)}>
                  ADD TO CART
                </Button>
              </div>

              <div className="mt-12 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">Free shipping</span>
                  <span className="text-muted-foreground text-xs font-body">on orders above ₹499</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">Premium quality</span>
                  <span className="text-muted-foreground text-xs font-body">waterproof vinyl / 300gsm paper</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
