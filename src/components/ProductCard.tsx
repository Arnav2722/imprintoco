import { useState, forwardRef } from "react"; // 1. forwardRef import kiya
import { Link } from "react-router-dom";
import { DbProduct } from "@/hooks/use-products";
import { ChevronRight, ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: DbProduct;
}

interface SizeOption {
  label: string;
  price: number;
}

// 2. Component ko forwardRef mein wrap kiya taake Framer Motion iska ref access kar sake
const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product }, ref): JSX.Element => {
    const isKit: boolean = product.category?.toLowerCase().includes("collage");
    const [selectedSize, setSelectedSize] = useState<string>(
      isKit ? "A6" : "A5",
    );

    const posterSizes: SizeOption[] = [
      { label: "A5", price: 69 },
      { label: "A4", price: 109 },
      { label: "A3", price: 139 },
      { label: "13x19", price: 159 },
    ];

    const kitSizes: SizeOption[] = [
      { label: "A6", price: 179 },
      { label: "A5", price: 219 },
      { label: "A4", price: 319 },
    ];

    const activeSizes: SizeOption[] = isKit ? kitSizes : posterSizes;
    const activeData: SizeOption =
      activeSizes.find((s) => s.label === selectedSize) || activeSizes[0];

    const optimizedImage = product.image_url
      ? product.image_url.replace("/upload/", "/upload/w_600,f_auto,q_auto/")
      : null;

    return (
      // 3. Sabse upar wale div mein ref={ref} assign kar diya
      <div
        ref={ref}
        className="group flex flex-col h-full bg-white border-2 border-foreground hover:shadow-[6px_6px_0px_0px_#00D4FF] md:hover:shadow-[10px_10px_0px_0px_#00D4FF] transition-all duration-500 overflow-hidden"
      >
        <Link
          to={`/product/${product.id}`}
          className="block relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-muted border-b-2 border-foreground"
        >
          {optimizedImage ? (
            <img
              src={optimizedImage}
              alt={product.name}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30">
              <span className="font-display text-[7px] md:text-[9px] tracking-widest text-foreground/20 uppercase font-black text-center px-2">
                Preview Missing
              </span>
            </div>
          )}

          {isKit && (
            <div className="absolute top-2 left-2 bg-primary border-2 border-foreground px-1.5 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
              <span className="text-[6px] md:text-[8px] font-black uppercase text-foreground">
                16 • 24 • 52 PCS
              </span>
            </div>
          )}

          <div className="absolute top-4 right-4 w-10 h-10 bg-white border-2 border-foreground hidden md:flex items-center justify-center translate-y-[-60px] group-hover:translate-y-0 transition-transform duration-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-10">
            <ArrowUpRight
              size={16}
              strokeWidth={3}
              className="text-foreground"
            />
          </div>
        </Link>

        <div className="p-3 md:p-6 flex flex-col flex-1 gap-3 md:gap-4 bg-white">
          <div>
            <h3 className="font-display text-[10px] md:text-lg font-black tracking-tight uppercase text-foreground mb-1 md:mb-2 truncate group-hover:text-primary transition-colors leading-tight">
              {product.name}
            </h3>
            <p className="text-[6px] md:text-[9px] text-foreground/40 font-black tracking-widest uppercase truncate">
              {product.category} — {product.subcategory?.replace("_", " ")}
            </p>
          </div>

          <div
            className={`grid gap-1 py-2 md:py-3 border-y-2 border-foreground/5 ${isKit ? "grid-cols-3" : "grid-cols-4"}`}
          >
            {activeSizes.map((size) => (
              <button
                key={size.label}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSize(size.label);
                }}
                className={`flex flex-col items-center justify-center py-1.5 md:py-2 px-0.5 border-2 transition-all ${
                  selectedSize === size.label
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground border-transparent hover:border-foreground/20"
                }`}
              >
                <span className="text-[6px] md:text-[9px] font-black leading-none mb-1 uppercase">
                  {size.label}
                </span>
                <span className="text-[5px] md:text-[8px] opacity-70 font-black">
                  {isKit ? `From ₹${size.price}` : `₹${size.price}`}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-auto pt-1 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="flex flex-row sm:flex-col items-baseline sm:items-start justify-between sm:justify-start gap-1">
              <div className="flex flex-col">
                <span className="text-[6px] md:text-[9px] font-black text-foreground/30 uppercase tracking-widest mb-0.5">
                  {isKit
                    ? `${selectedSize} Collage Kit`
                    : `${selectedSize} Print`}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-2xl font-black text-foreground">
                    ₹{activeData.price}
                  </span>
                  <span className="text-[8px] md:text-xs text-foreground/20 line-through font-bold">
                    ₹{Math.round(activeData.price * 1.6)}
                  </span>
                </div>
              </div>
              <div className="sm:hidden bg-accent-lime px-1.5 py-0.5 text-[6px] font-black uppercase">
                -40%
              </div>
            </div>

            <Link
              to={`/product/${product.id}`}
              className="w-full sm:w-auto h-9 md:h-12 px-3 md:px-6 bg-foreground text-background flex items-center justify-center gap-2 hover:bg-primary hover:text-foreground transition-all duration-300 shadow-[3px_3px_0px_0px_#00D4FF] md:shadow-[4px_4px_0px_0px_#00D4FF] md:group-hover:shadow-none"
            >
              <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">
                VIEW
              </span>
              <ChevronRight
                size={12}
                strokeWidth={3}
                className="md:w-3.5 md:h-3.5"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  },
);

// Display name debugging ke liye useful hota hai
ProductCard.displayName = "ProductCard";

export default ProductCard;