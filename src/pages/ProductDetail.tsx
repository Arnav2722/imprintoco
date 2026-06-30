import { useState, useMemo, useEffect, ReactNode } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/contexts/CartContext";
import {
  Loader2,
  Package,
  Truck,
  HelpCircle,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Zap,
  Maximize2,
  Info,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface SizePrice {
  current: number;
  original: number;
}

interface SizeDetail {
  label: string;
  dim: string;
}

interface ProductConfig {
  sizes: string[];
  details: Record<string, SizeDetail>;
  prices: Record<string, SizePrice>;
}

interface KitConfig {
  packs: string[];
  sizes: string[];
  details: Record<string, SizeDetail>;
  prices: Record<
    string,
    Record<
      string,
      {
        current: number;
        original: number;
      }
    >
  >;
}

const ProductDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { data: product, isLoading, error } = useProduct(id);

  const isKit: boolean = !!product?.category?.toLowerCase().includes("collage");

  const POSTER_CONFIG: ProductConfig = {
    sizes: ["A5", "A4", "A3", "13x19"],
    details: {
      A5: { label: "A5", dim: "14.8x21cm" },
      A4: { label: "A4", dim: "21x29.7cm" },
      A3: { label: "A3", dim: "29.7x42cm" },
      "13x19": { label: "13x19", dim: "33x48cm" },
    },
    prices: {
      A5: { current: 69, original: 119 },
      A4: { current: 109, original: 189 },
      A3: { current: 139, original: 239 },
      "13x19": { current: 159, original: 269 },
    },
  };

const KIT_CONFIG: KitConfig = {
  packs: ["16", "24", "52"],

  sizes: ["A6", "A5", "A4"],

  details: {
    A6: { label: "A6", dim: "10.5 × 14.8 cm" },
    A5: { label: "A5", dim: "14.8 × 21 cm" },
    A4: { label: "A4", dim: "21 × 29.7 cm" },
  },

  prices: {
    "16": {
      A6: { current: 179, original: 299 },
      A5: { current: 219, original: 349 },
      A4: { current: 319, original: 499 },
    },

    "24": {
      A6: { current: 269, original: 399 },
      A5: { current: 379, original: 599 },
      A4: { current: 449, original: 699 },
    },

    "52": {
      A6: { current: 349, original: 599 },
      A5: { current: 499, original: 799 },
      A4: { current: 799, original: 1299 },
    },
  },
};

  // const activeConfig: ProductConfig = isKit ? KIT_CONFIG : POSTER_CONFIG;

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedPack, setSelectedPack] = useState<string>("16");
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<string>("description");

  useEffect(() => {
    if (product) {
      if (isKit) {
        setSelectedPack("16");
        setSelectedSize("A6");
      } else {
        setSelectedSize("A5");
      }
    }
  }, [product, isKit]);

  const currentPrices = useMemo(() => {
    if (!isKit) {
      if (!selectedSize || !POSTER_CONFIG.prices[selectedSize]) {
        return { current: 0, original: 0 };
      }

      return POSTER_CONFIG.prices[selectedSize];
    }

    return (
      KIT_CONFIG.prices?.[selectedPack]?.[selectedSize] || {
        current: 0,
        original: 0,
      }
    );
  }, [isKit, selectedPack, selectedSize]);

  const handleAction = (): void => {
    if (product && currentPrices.current > 0) {
      addToCart(
        { ...product, price: currentPrices.current },
        selectedSize,
        isKit ? selectedPack : undefined,
        quantity,
      );
      toast({ title: "ADDED", description: `${product.name} ready in cart.` });
    }
  };

  const accordionItem = (
    id: string,
    icon: ReactNode,
    title: string,
    content: ReactNode,
  ) => {
    const isOpen = openAccordion === id;
    return (
      <div className="border-b border-foreground/10 transition-all">
        <button
          onClick={() => setOpenAccordion(isOpen ? "" : id)}
          className="w-full flex justify-between items-center py-4 px-1 text-foreground uppercase text-[9px] font-black tracking-widest"
        >
          <div className="flex items-center gap-3">
            <span className={isOpen ? "text-primary" : "text-foreground/20"}>
              {icon}
            </span>
            {title}
          </div>
          <ChevronRight
            className={`transition-transform ${isOpen ? "rotate-90 text-primary" : "text-foreground/20"}`}
            size={14}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pb-6 px-1 text-[10px] text-foreground/60 leading-relaxed font-bold uppercase">
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  if (!product || error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-black uppercase tracking-tighter">
          ITEM NOT FOUND
        </h1>
        <Link
          to="/shop"
          className="bg-black text-white px-6 py-2 text-[10px] font-black uppercase shadow-[4px_4px_0_0_#00D4FF]"
        >
          BACK TO SHOP
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black font-body">
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <div className="bg-white border-2 border-black aspect-[3/4] overflow-hidden group relative shadow-[8px_8px_0_0_#000]">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#000] z-10">
                <span className="text-[8px] font-black uppercase italic">
                  {isKit ? "BUNDLE" : product.badge || "PREMIUM"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <header className="mb-8 border-b-2 border-black pb-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={12} className="text-primary fill-primary" />
                <span className="text-black/40 text-[9px] font-black tracking-widest uppercase">
                  {product.category} / {product.subcategory?.replace("_", " ")}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4 leading-none">
                {product.name}
              </h1>
              <div className="flex items-end gap-3">
                <p className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none text-primary">
                  ₹{currentPrices.current}
                </p>
                <p className="text-lg text-black/20 line-through font-black leading-none pb-0.5">
                  ₹{currentPrices.original}
                </p>
                <div className="bg-black text-white px-2 py-1 text-[8px] font-black uppercase ml-auto">
                  SAVE 40%
                </div>
              </div>
            </header>

            {isKit && (
              <div>
                <h3 className="text-[9px] text-black/40 font-black uppercase mb-3 tracking-widest">
                  Pack Size
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  {KIT_CONFIG.packs.map((pack) => (
                    <button
                      key={pack}
                      onClick={() => setSelectedPack(pack)}
                      className={`flex flex-col items-center justify-center py-3 border-2 transition-all ${
                        selectedPack === pack
                          ? "bg-black text-white border-black shadow-[2px_2px_0_0_#00D4FF]"
                          : "bg-white border-black/5 text-black/40 hover:border-black"
                      }`}
                    >
                      <span className="text-[11px] font-black">{pack}</span>

                      <span className="text-[7px] font-bold opacity-60">
                        PIECES
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-8">
              <div>
                <h3 className="text-[9px] text-black/40 font-black uppercase mb-3 tracking-widest">
                  Size
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  {(isKit ? KIT_CONFIG.sizes : POSTER_CONFIG.sizes).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`flex flex-col items-center justify-center py-3 border-2 transition-all ${
                        selectedSize === s
                          ? "bg-black text-white border-black shadow-[2px_2px_0_0_#00D4FF]"
                          : "bg-white border-black/5 text-black/40 hover:border-black"
                      }`}
                    >
                      <span className="text-[11px] font-black uppercase">
                        {
                          (isKit ? KIT_CONFIG.details : POSTER_CONFIG.details)[
                            s
                          ].label
                        }
                      </span>

                      <span className="text-[7px] font-bold opacity-60 mt-0.5">
                        (
                        {
                          (isKit ? KIT_CONFIG.details : POSTER_CONFIG.details)[
                            s
                          ].dim
                        }
                        )
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Optimized Quantity Selector */}
              <div>
                <h3 className="text-[9px] text-black/40 font-black uppercase mb-3 tracking-widest">
                  Quantity
                </h3>
                <div className="flex items-center border-2 border-black w-full sm:w-fit bg-white shadow-[3px_3px_0_0_#000]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-14 h-12 flex items-center justify-center hover:bg-muted border-r-2 border-black"
                  >
                    <Minus size={14} strokeWidth={4} />
                  </button>
                  <span className="flex-1 sm:w-16 text-center font-black text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-14 h-12 flex items-center justify-center hover:bg-muted border-l-2 border-black"
                  >
                    <Plus size={14} strokeWidth={4} />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAction}
                  className="flex-[4] h-16 bg-black text-white font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-black shadow-[6px_6px_0_0_#00D4FF] flex items-center justify-center gap-2 group transition-all"
                >
                  ADD TO CART{" "}
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button
                  onClick={() =>
                    navigator
                      .share({ title: product.name, url: window.location.href })
                      .catch(() => {})
                  }
                  className="w-16 h-16 border-2 border-black flex items-center justify-center hover:bg-muted transition-all"
                >
                  <Share2 size={18} strokeWidth={3} />
                </button>
              </div>

              <div className="pt-6">
                {accordionItem(
                  "description",
                  <HelpCircle size={14} />,
                  "Product Description",
                  <div className="space-y-6">
                    <p>
                      Discover premium posters designed to redefine your walls.
                    </p>
                  </div>,
                )}
                {accordionItem(
                  "specs",
                  <Maximize2 size={14} />,
                  "Specifications",
                  <div className="space-y-3">
                    <p>• 300 GSM Archival Matte Paper</p>
                  </div>,
                )}
                {accordionItem(
                  "packaging",
                  <Package size={14} />,
                  "Packaging Details",
                  <div className="space-y-4">
                    <p>• Roll/Tube Packaging available.</p>
                  </div>,
                )}
                {accordionItem(
                  "shipping",
                  <Truck size={14} />,
                  "Shipping and Processing",
                  <div className="space-y-4">
                    <p>• Prepaid: ₹ 45 Charge.</p>
                  </div>,
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
