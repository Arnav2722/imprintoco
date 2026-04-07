// import { useState, useMemo } from "react";
// import { useParams, Link } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useProduct } from "@/hooks/use-products";
// import { useCart } from "@/contexts/CartContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Loader2,
//   ArrowLeft,
//   Share2,
//   Package,
//   MapPin,
//   Truck,
//   HelpCircle,
//   ChevronRight,
//   Minus,
//   Plus,
// } from "lucide-react";
// import { toast } from "@/components/ui/use-toast";
// import { z } from "zod";

// // --- Types ---
// type ValidSize = "A3" | "A4" | "A5" | "13x19";
// const validSizesArray: ValidSize[] = ["A5", "A4", "A3", "13x19"];

// type DeliveryData = {
//   status: "idle" | "checking" | "valid" | "invalid";
//   cityName?: string;
//   estimatedDate?: string;
// };

// // Price Mapping Constant
// const SIZE_PRICES: Record<ValidSize, { current: number; original: number }> = {
//   A5: { current: 79, original: 149 },
//   A4: { current: 119, original: 179 },
//   A3: { current: 149, original: 219 },
//   "13x19": { current: 169, original: 249 },
// };

// const pincodeSchema = z.string().length(6).regex(/^\d+$/);

// const ProductDetail = () => {
//   const { id } = useParams();
//   const { addToCart } = useCart();
//   const { data: product, isLoading, error } = useProduct(id);

//   const [selectedSize, setSelectedSize] = useState<ValidSize>("A3");
//   const [quantity, setQuantity] = useState<number>(1);
//   const [pincode, setPincode] = useState<string>("");
//   const [delivery, setDelivery] = useState<DeliveryData>({ status: "idle" });
//   const [openAccordion, setOpenAccordion] = useState<string>("description");

//   // Dynamic Price Calculation
//   const currentPrices = useMemo(
//     () => SIZE_PRICES[selectedSize],
//     [selectedSize],
//   );

//   const handleCheckDelivery = () => {
//     const result = pincodeSchema.safeParse(pincode);
//     if (!result.success) {
//       toast({
//         variant: "destructive",
//         title: "Invalid",
//         description: "Enter 6 digits.",
//       });
//       return;
//     }

//     setDelivery({ status: "checking" });
//     setTimeout(() => {
//       if (pincode.startsWith("30")) {
//         setDelivery({
//           status: "valid",
//           cityName: "Jaipur",
//           estimatedDate: "12 April",
//         });
//       } else {
//         setDelivery({ status: "invalid" });
//         toast({
//           variant: "destructive",
//           title: "Not Available",
//           description: "No delivery here.",
//         });
//       }
//     }, 1000);
//   };

//   const handleAction = () => {
//     if (product) {
//       // Product ki copy banayi selected size ke price ke saath
//       const productWithSizePrice = {
//         ...product,
//         price: currentPrices.current,
//       };

//       addToCart(productWithSizePrice, selectedSize, quantity);

//       toast({
//         title: "Success",
//         description: `${product.name} (${selectedSize}) added to cart.`,
//       });
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <Loader2 className="animate-spin text-primary" size={40} />
//       </div>
//     );

//   if (!product || error)
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <h1 className="text-white uppercase font-black tracking-widest">
//           Product Not Found
//         </h1>
//       </div>
//     );

//   const accordionItem = (
//     id: string,
//     icon: React.ReactNode,
//     title: string,
//     text: string,
//   ) => {
//     const isOpen = openAccordion === id;
//     return (
//       <div className="border-t border-white/5 py-4">
//         <button
//           onClick={() => setOpenAccordion(isOpen ? "" : id)}
//           className="w-full flex justify-between items-center text-gray-500 uppercase text-[10px] font-black tracking-widest hover:text-white transition-colors"
//         >
//           <div className="flex items-center gap-3">
//             {icon} {title}
//           </div>
//           <ChevronRight
//             className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
//             size={14}
//           />
//         </button>
//         <div
//           className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-4" : "max-h-0"}`}
//         >
//           <p className="text-[10px] text-gray-600 leading-relaxed font-bold uppercase">
//             {text}
//           </p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-white font-bricolage">
//       <Navbar />
//       <main className="pt-32 pb-20 px-6 max-w-[1300px] mx-auto">
//         <div className="grid lg:grid-cols-2 gap-16 items-start">
//           <div className="bg-[#0a0a0a] border border-white/5 aspect-square overflow-hidden group relative">
//             <img
//               src={product.image_url || ""}
//               alt={product.name}
//               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-105"
//             />
//           </div>

//           <div className="flex flex-col">
//             <div className="mb-10 border-b border-white/5 pb-10">
//               <p className="text-primary text-[10px] font-black tracking-[0.4em] mb-4 uppercase">
//                 {product.category} // {product.subcategory?.replace("_", " ")}
//               </p>
//               <h1 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
//                 {product.name}
//               </h1>

//               <div className="flex items-baseline gap-4">
//                 <p className="text-4xl font-black tabular-nums">
//                   ₹{currentPrices.current}
//                 </p>
//                 <p className="text-xl text-gray-600 line-through tabular-nums font-bold">
//                   ₹{currentPrices.original}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-10">
//               <div>
//                 <h3 className="text-[10px] text-gray-700 font-black uppercase mb-4 tracking-widest">
//                   Select Dimensions
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {validSizesArray.map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => setSelectedSize(s)}
//                       className={`px-8 py-3 text-[10px] font-black border transition-all ${
//                         selectedSize === s
//                           ? "bg-white text-black border-white"
//                           : "border-white/5 text-gray-500 hover:border-white/20"
//                       }`}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-[10px] text-gray-700 font-black uppercase mb-4 tracking-widest">
//                   Quantity
//                 </h3>
//                 <div className="flex items-center border border-white/5 w-fit bg-black">
//                   <button
//                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                     className="p-4 border-r border-white/5 hover:text-primary"
//                   >
//                     <Minus size={14} />
//                   </button>
//                   <span className="w-16 text-center font-black tabular-nums text-lg">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={() => setQuantity((q) => q + 1)}
//                     className="p-4 border-l border-white/5 hover:text-primary"
//                   >
//                     <Plus size={14} />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-8 bg-[#0a0a0a] border border-white/5 space-y-6">
//                 <div className="flex items-center gap-3">
//                   <MapPin size={16} className="text-primary" />
//                   <span className="text-[10px] font-black uppercase tracking-widest">
//                     Check Delivery
//                   </span>
//                 </div>
//                 <div className="flex gap-3">
//                   <Input
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                     placeholder="Enter Pincode"
//                     className="bg-black border-white/5 rounded-none h-14 text-[11px] font-black uppercase tracking-widest"
//                   />
//                   <Button
//                     onClick={handleCheckDelivery}
//                     className="rounded-none bg-white text-black h-14 px-10 text-[11px] font-black uppercase tracking-widest hover:bg-gray-200"
//                   >
//                     Check
//                   </Button>
//                 </div>
//                 {delivery.status === "valid" && (
//                   <p className="text-[10px] font-black text-primary uppercase tracking-widest">
//                     Delivery to {delivery.cityName} expected by{" "}
//                     {delivery.estimatedDate}
//                   </p>
//                 )}
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <Button
//                   onClick={handleAction}
//                   className="h-20 flex-[4] rounded-none bg-primary text-black font-black uppercase tracking-[0.3em] text-sm hover:bg-white transition-all"
//                 >
//                   Add to Cart
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="h-20 w-20 rounded-none border-white/5 hover:border-primary transition-colors"
//                   onClick={() =>
//                     navigator
//                       .share({ title: product.name, url: window.location.href })
//                       .catch(() => {})
//                   }
//                 >
//                   <Share2 size={20} />
//                 </Button>
//               </div>

//               <div className="pt-10">
//                 {accordionItem(
//                   "description",
//                   <HelpCircle size={14} />,
//                   "Description",
//                   product.description || "No description available.",
//                 )}
//                 {accordionItem(
//                   "packaging",
//                   <Package size={14} />,
//                   "Packaging Details",
//                   "Secured in a heavy-duty armored tube.",
//                 )}
//                 {accordionItem(
//                   "shipping",
//                   <Truck size={14} />,
//                   "Shipping Protocol",
//                   "Fast tracked delivery across all domestic zones.",
//                 )}
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

import { useState, useMemo, useEffect } from "react";
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

type ValidSize = "A3" | "A4" | "A5" | "13x19";
const validSizesArray: ValidSize[] = ["A5", "A4", "A3", "13x19"];

type DeliveryData = {
  status: "idle" | "checking" | "valid" | "invalid";
  cityName?: string;
  estimatedDate?: string;
};

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

  const currentPrices = useMemo(
    () => SIZE_PRICES[selectedSize],
    [selectedSize],
  );

  // Tab Switching Inspiration Logic
  useEffect(() => {
    const originalTitle = product ? `${product.name} | IMPRINTO.` : "IMPRINTO.";
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Still Thinking? 👀" : originalTitle;
    };
    window.addEventListener("visibilitychange", handleVisibilityChange);
    document.title = originalTitle;
    return () =>
      window.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [product]);

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
      const productWithSizePrice = { ...product, price: currentPrices.current };
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
                    className="p-4 border-r border-white/5 hover:text-primary transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-16 text-center font-black tabular-nums text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-4 border-l border-white/5 hover:text-primary transition-colors"
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