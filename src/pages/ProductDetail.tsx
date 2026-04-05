import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromoBanner from "@/components/PromoBanner";
import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { data: product, isLoading, error } = useProduct(id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mt-12 animate-pulse">
            <div className="bg-surface-container aspect-square" />
            <div className="space-y-4 py-12">
              <div className="h-4 bg-surface-container w-1/4" />
              <div className="h-10 bg-surface-container w-3/4" />
              <div className="h-6 bg-surface-container w-1/3" />
              <div className="h-16 bg-surface-container w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product || error) {
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

  const hasSizes = product.available_sizes && product.available_sizes.length > 0;
  const needsSize = hasSizes && !selectedSize;

  const handleBuy = () => {
    addToCart(product, selectedSize || undefined);
  };

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
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  width={800}
                  height={800}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface-container">
                  <span className="font-display text-sm tracking-widest text-muted-foreground uppercase">
                    {product.category}
                  </span>
                </div>
              )}
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
                {product.category} / {product.subcategory.replace("_", " ")}
              </p>
              <p className="font-display text-3xl font-bold text-primary mb-6">₹{product.price}</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
                {product.description}
              </p>

              {/* Size Selection for Posters */}
              {hasSizes && (
                <div className="mb-8">
                  <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-3">
                    SELECT SIZE
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.available_sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`font-display text-xs tracking-widest px-4 py-2 border transition-colors duration-150 ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-surface-highest text-muted-foreground hover:border-primary hover:text-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {needsSize && (
                    <p className="font-body text-xs text-destructive mt-2">Please select a size</p>
                  )}
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  variant="cta"
                  size="xl"
                  onClick={handleBuy}
                  disabled={needsSize}
                >
                  BUY NOW
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={handleBuy}
                  disabled={needsSize}
                >
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

              {/* Promo */}
              <div className="mt-8 border border-primary/20 bg-primary/5 p-4">
                <p className="font-display text-[10px] tracking-widest uppercase text-primary mb-1">
                  🎁 Reel & Save
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  Buy this, make a reel reviewing it, and get <strong className="text-primary">20% off</strong> your next purchase + a <strong className="text-primary">free surprise gift</strong>.
                </p>
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
