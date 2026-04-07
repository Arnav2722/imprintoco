// import { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useProduct } from "@/hooks/use-products";
// import { useCart } from "@/contexts/CartContext";
// import { Button } from "@/components/ui/button";
// import {
//   Loader2,
//   ArrowLeft,
//   ShieldCheck,
//   Zap,
//   Share2,
//   Box,
//   Fingerprint,
// } from "lucide-react";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const { addToCart } = useCart();
//   const { data: product, isLoading, error } = useProduct(id);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
//         <Loader2 className="animate-spin text-primary mb-4" size={48} />
//         <p className="uppercase tracking-[0.5em] text-[10px] font-black animate-pulse">
//           Syncing Database...
//         </p>
//       </div>
//     );
//   }

//   if (!product || error) {
//     return (
//       <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
//         <h1 className="text-6xl font-black uppercase mb-8 tracking-tighter">
//           Data Corrupted
//         </h1>
//         <Link
//           to="/shop"
//           className="border border-white/20 px-8 py-4 uppercase text-[10px] font-black tracking-widest hover:bg-white hover:text-black transition-all"
//         >
//           Return to Hub
//         </Link>
//       </div>
//     );
//   }

//   const hasSizes =
//     product.available_sizes && product.available_sizes.length > 0;
//   const needsSize = hasSizes && !selectedSize;

//   const handleAction = () => {
//     addToCart(product, selectedSize || undefined);
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-white font-bricolage overflow-x-hidden">
//       <Navbar />

//       <main className="pt-32 pb-20 px-6 max-w-[1600px] mx-auto">
//         {/* BACK BUTTON */}
//         <Link
//           to="/shop"
//           className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.3em] text-gray-500 hover:text-primary transition-all mb-16 uppercase group"
//         >
//           <ArrowLeft
//             size={16}
//             className="group-hover:-translate-x-2 transition-transform"
//           />
//           Navigate Back
//         </Link>

//         <div className="grid lg:grid-cols-12 gap-8">
//           {/* LEFT: IMAGE MASTER CARD (6 COLS) */}
//           <div className="lg:col-span-7 group">
//             <div className="relative aspect-[4/5] bg-[#0a0a0a] border border-white/5 overflow-hidden ring-1 ring-white/5 group-hover:ring-primary/20 transition-all duration-700">
//               {product.image_url ? (
//                 <img
//                   src={product.image_url}
//                   alt={product.name}
//                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-800 font-black text-4xl italic">
//                   NO_SIGNAL
//                 </div>
//               )}

//               {/* IMAGE OVERLAYS */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//               <div className="absolute top-8 left-8 flex flex-col gap-3">
//                 <div className="bg-primary text-black text-[10px] font-black px-4 py-2 uppercase tracking-[0.2em] skew-x-[-12deg]">
//                   {product.badge || "Tactical Gear"}
//                 </div>
//                 <div className="bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-black px-4 py-2 uppercase tracking-[0.2em]">
//                   ID // {product.id.slice(0, 12)}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: INFO & ACTION GRID (5 COLS) */}
//           <div className="lg:col-span-5 flex flex-col gap-6">
//             {/* HEADER CARD */}
//             <div className="bg-[#0a0a0a] border border-white/5 p-10 relative overflow-hidden group">
//               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
//                 <Fingerprint size={80} className="text-primary" />
//               </div>
//               <p className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4 opacity-80">
//                 {product.category} — {product.subcategory}
//               </p>
//               <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 group-hover:tracking-normal transition-all duration-500">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-4">
//                 <span className="text-4xl font-black tabular-nums">
//                   ₹{product.price}
//                 </span>
//                 <div className="h-[2px] flex-1 bg-white/5" />
//               </div>
//             </div>

//             {/* SPECS CARD */}
//             <div className="bg-[#0a0a0a] border border-white/5 p-8 flex flex-col gap-4">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Box size={14} />
//                 <h3 className="text-[10px] font-black tracking-[0.4em] uppercase">
//                   Tech Specs
//                 </h3>
//               </div>
//               <p className="text-gray-400 text-sm leading-relaxed uppercase font-bold tracking-tight">
//                 {product.description}
//               </p>
//             </div>

//             {/* SELECTION CARD */}
//             {hasSizes && (
//               <div className="bg-[#0a0a0a] border border-white/5 p-8 space-y-6">
//                 <h3 className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase">
//                   Available Modules
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   {product.available_sizes.map((size: string) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`flex-1 min-w-[100px] py-4 text-[11px] font-black uppercase tracking-widest border transition-all ${
//                         selectedSize === size
//                           ? "bg-white text-black border-white translate-y-[-4px] shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
//                           : "border-white/5 text-gray-500 hover:border-white/20 hover:text-white"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ACTION CARD */}
//             <div className="flex gap-4 h-24">
//               <button
//                 onClick={handleAction}
//                 disabled={needsSize}
//                 className="flex-[4] bg-primary text-black font-black uppercase tracking-[0.3em] text-[13px] hover:bg-white transition-all disabled:opacity-10 disabled:grayscale relative overflow-hidden group/btn"
//               >
//                 <span className="relative z-10">Authorize Acquisition</span>
//                 <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
//               </button>
//               <button
//                 className="flex-1 flex items-center justify-center border border-white/5 hover:border-primary transition-all group/share"
//                 onClick={() =>
//                   navigator
//                     .share({ title: product.name, url: window.location.href })
//                     .catch(() => {})
//                 }
//               >
//                 <Share2
//                   size={24}
//                   className="group-hover/share:text-primary transition-colors"
//                 />
//               </button>
//             </div>

//             {/* PROTOCOLS BENTO SUB-GRID */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-[#0a0a0a] border border-white/5 p-6 space-y-3 hover:border-primary/20 transition-colors">
//                 <ShieldCheck className="text-primary" size={24} />
//                 <div>
//                   <p className="text-[10px] font-black uppercase tracking-widest">
//                     Quality
//                   </p>
//                   <p className="text-[9px] font-bold text-gray-600 uppercase">
//                     300GSM Matte Protocol
//                   </p>
//                 </div>
//               </div>
//               <div className="bg-[#0a0a0a] border border-white/5 p-6 space-y-3 hover:border-primary/20 transition-colors">
//                 <Zap className="text-primary" size={24} />
//                 <div>
//                   <p className="text-[10px] font-black uppercase tracking-widest">
//                     Dispatch
//                   </p>
//                   <p className="text-[9px] font-bold text-gray-600 uppercase">
//                     48H Deployment
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;

import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  ArrowLeft,
  Share2,
  Package,
  MapPin,
  Truck,
  HelpCircle,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";

// --- Types ---
type ValidSize = "A3" | "A4" | "A5" | "13x19";
const validSizesArray: ValidSize[] = ["A5", "A4", "A3", "13x19"];

type DeliveryData = {
  status: "idle" | "checking" | "valid" | "invalid";
  cityName?: string;
  estimatedDate?: string;
};

// Price Mapping Constant
const SIZE_PRICES: Record<ValidSize, { current: number; original: number }> = {
  A5: { current: 79, original: 149 },
  A4: { current: 119, original: 179 },
  A3: { current: 149, original: 219 },
  "13x19": { current: 169, original: 249 },
};

const pincodeSchema = z.string().length(6).regex(/^\d+$/);

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { data: product, isLoading, error } = useProduct(id);

  const [selectedSize, setSelectedSize] = useState<ValidSize>("A3");
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>("");
  const [delivery, setDelivery] = useState<DeliveryData>({ status: "idle" });
  const [openAccordion, setOpenAccordion] = useState<string>("description");

  // Dynamic Price Calculation
  const currentPrices = useMemo(
    () => SIZE_PRICES[selectedSize],
    [selectedSize],
  );

  const handleCheckDelivery = () => {
    const result = pincodeSchema.safeParse(pincode);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Invalid",
        description: "Enter 6 digits.",
      });
      return;
    }

    setDelivery({ status: "checking" });
    setTimeout(() => {
      if (pincode.startsWith("30")) {
        setDelivery({
          status: "valid",
          cityName: "Jaipur",
          estimatedDate: "12 April",
        });
      } else {
        setDelivery({ status: "invalid" });
        toast({
          variant: "destructive",
          title: "Not Available",
          description: "No delivery here.",
        });
      }
    }, 1000);
  };

  const handleAction = () => {
    if (product) {
      // Product ki copy banayi selected size ke price ke saath
      const productWithSizePrice = {
        ...product,
        price: currentPrices.current,
      };

      addToCart(productWithSizePrice, selectedSize, quantity);

      toast({
        title: "Success",
        description: `${product.name} (${selectedSize}) added to cart.`,
      });
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  if (!product || error)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white uppercase font-black tracking-widest">
          Product Not Found
        </h1>
      </div>
    );

  const accordionItem = (
    id: string,
    icon: React.ReactNode,
    title: string,
    text: string,
  ) => {
    const isOpen = openAccordion === id;
    return (
      <div className="border-t border-white/5 py-4">
        <button
          onClick={() => setOpenAccordion(isOpen ? "" : id)}
          className="w-full flex justify-between items-center text-gray-500 uppercase text-[10px] font-black tracking-widest hover:text-white transition-colors"
        >
          <div className="flex items-center gap-3">
            {icon} {title}
          </div>
          <ChevronRight
            className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
            size={14}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-4" : "max-h-0"}`}
        >
          <p className="text-[10px] text-gray-600 leading-relaxed font-bold uppercase">
            {text}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-[1300px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="bg-[#0a0a0a] border border-white/5 aspect-square overflow-hidden group relative">
            <img
              src={product.image_url || ""}
              alt={product.name}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-105"
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-10 border-b border-white/5 pb-10">
              <p className="text-primary text-[10px] font-black tracking-[0.4em] mb-4 uppercase">
                {product.category} // {product.subcategory?.replace("_", " ")}
              </p>
              <h1 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <p className="text-4xl font-black tabular-nums">
                  ₹{currentPrices.current}
                </p>
                <p className="text-xl text-gray-600 line-through tabular-nums font-bold">
                  ₹{currentPrices.original}
                </p>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-[10px] text-gray-700 font-black uppercase mb-4 tracking-widest">
                  Select Dimensions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {validSizesArray.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-8 py-3 text-[10px] font-black border transition-all ${
                        selectedSize === s
                          ? "bg-white text-black border-white"
                          : "border-white/5 text-gray-500 hover:border-white/20"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] text-gray-700 font-black uppercase mb-4 tracking-widest">
                  Quantity
                </h3>
                <div className="flex items-center border border-white/5 w-fit bg-black">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-4 border-r border-white/5 hover:text-primary"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-16 text-center font-black tabular-nums text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-4 border-l border-white/5 hover:text-primary"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="p-8 bg-[#0a0a0a] border border-white/5 space-y-6">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Check Delivery
                  </span>
                </div>
                <div className="flex gap-3">
                  <Input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter Pincode"
                    className="bg-black border-white/5 rounded-none h-14 text-[11px] font-black uppercase tracking-widest"
                  />
                  <Button
                    onClick={handleCheckDelivery}
                    className="rounded-none bg-white text-black h-14 px-10 text-[11px] font-black uppercase tracking-widest hover:bg-gray-200"
                  >
                    Check
                  </Button>
                </div>
                {delivery.status === "valid" && (
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                    Delivery to {delivery.cityName} expected by{" "}
                    {delivery.estimatedDate}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleAction}
                  className="h-20 flex-[4] rounded-none bg-primary text-black font-black uppercase tracking-[0.3em] text-sm hover:bg-white transition-all"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="h-20 w-20 rounded-none border-white/5 hover:border-primary transition-colors"
                  onClick={() =>
                    navigator
                      .share({ title: product.name, url: window.location.href })
                      .catch(() => {})
                  }
                >
                  <Share2 size={20} />
                </Button>
              </div>

              <div className="pt-10">
                {accordionItem(
                  "description",
                  <HelpCircle size={14} />,
                  "Description",
                  product.description || "No description available.",
                )}
                {accordionItem(
                  "packaging",
                  <Package size={14} />,
                  "Packaging Details",
                  "Secured in a heavy-duty armored tube.",
                )}
                {accordionItem(
                  "shipping",
                  <Truck size={14} />,
                  "Shipping Protocol",
                  "Fast tracked delivery across all domestic zones.",
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