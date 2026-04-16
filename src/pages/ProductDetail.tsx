// import { useState, useMemo, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useProduct } from "@/hooks/use-products";
// import { useCart } from "@/contexts/CartContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Loader2,
//   Package,
//   MapPin,
//   Truck,
//   HelpCircle,
//   ChevronRight,
//   Minus,
//   Plus,
//   Share2,
//   Zap,
//   ShieldCheck,
// } from "lucide-react";
// import { toast } from "@/components/ui/use-toast";
// import { z } from "zod";
// import { motion, AnimatePresence } from "framer-motion";

// type DeliveryData = {
//   status: "idle" | "checking" | "valid" | "invalid";
//   cityName?: string;
//   estimatedDate?: string;
// };

// type ValidSize = "A3" | "A4" | "A5" | "13x19";
// const validSizesArray: ValidSize[] = ["A5", "A4", "A3", "13x19"];

// const SIZE_DETAILS: Record<ValidSize, { label: string; dimensions: string }> = {
//   A5: { label: "A5", dimensions: "14.8 x 21 cm" },
//   A4: { label: "A4", dimensions: "21 x 29.7 cm" },
//   A3: { label: "A3", dimensions: "29.7 x 42 cm" },
//   "13x19": { label: "13x19", dimensions: "33 x 48.2 cm" },
// };

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

//   const [selectedSize, setSelectedSize] = useState<ValidSize>("A5");
//   const [quantity, setQuantity] = useState<number>(1);
//   const [pincode, setPincode] = useState<string>("");
//   const [delivery, setDelivery] = useState<DeliveryData>({ status: "idle" });
//   const [openAccordion, setOpenAccordion] = useState<string>("description");

//   const currentPrices = useMemo(
//     () => SIZE_PRICES[selectedSize],
//     [selectedSize],
//   );

//   useEffect(() => {
//     const originalTitle = product ? `${product.name} | IMPRINTO.` : "IMPRINTO.";
//     const handleVisibilityChange = () => {
//       document.title = document.hidden ? "Still Thinking? 👀" : originalTitle;
//     };
//     window.addEventListener("visibilitychange", handleVisibilityChange);
//     document.title = originalTitle;
//     return () =>
//       window.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, [product]);

//   const getEstimatedDate = (daysToAdd: number) => {
//     const date = new Date();
//     date.setDate(date.getDate() + daysToAdd);
//     return date.toLocaleDateString("en-IN", { day: "numeric", month: "long" });
//   };

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
//       setDelivery({
//         status: "valid",
//         cityName: pincode.startsWith("11")
//           ? "Delhi"
//           : pincode.startsWith("30")
//             ? "Jaipur"
//             : "Domestic Zone",
//         estimatedDate: getEstimatedDate(
//           pincode.startsWith("11") || pincode.startsWith("30") ? 3 : 5,
//         ),
//       });
//     }, 800);
//   };

//   const handleAction = () => {
//     if (product) {
//       addToCart(
//         { ...product, price: currentPrices.current },
//         selectedSize,
//         quantity,
//       );
//       toast({
//         title: "ADDED TO HAUL",
//         description: `${product.name} is ready for procurement.`,
//       });
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Loader2
//           className="animate-spin text-primary"
//           size={48}
//           strokeWidth={3}
//         />
//       </div>
//     );

//   if (!product || error)
//     return (
//       <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
//         <h1 className="font-display text-4xl font-black uppercase tracking-tighter">
//           ARTIFACT NOT FOUND
//         </h1>
//         <Link
//           to="/shop"
//           className="bg-foreground text-background px-8 py-3 font-black uppercase tracking-widest text-xs"
//         >
//           Return to Shop
//         </Link>
//       </div>
//     );

//   const accordionItem = (
//     id: string,
//     icon: React.ReactNode,
//     title: string,
//     content: React.ReactNode,
//   ) => {
//     const isOpen = openAccordion === id;
//     return (
//       <div
//         className={`border-b-2 border-foreground/5 transition-all ${isOpen ? "bg-muted/30" : ""}`}
//       >
//         <button
//           onClick={() => setOpenAccordion(isOpen ? "" : id)}
//           className="w-full flex justify-between items-center p-6 text-foreground uppercase text-[11px] font-black tracking-widest hover:bg-muted transition-all"
//         >
//           <div className="flex items-center gap-4">
//             <span className={isOpen ? "text-primary" : "text-foreground/20"}>
//               {icon}
//             </span>
//             {title}
//           </div>
//           <ChevronRight
//             className={`transition-transform duration-500 ${isOpen ? "rotate-90 text-primary" : ""}`}
//             size={18}
//             strokeWidth={3}
//           />
//         </button>
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="overflow-hidden"
//             >
//               <div className="px-16 pb-8 text-[12px] text-foreground/60 leading-relaxed font-bold uppercase space-y-4">
//                 {content}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
//       <Navbar />
//       <main className="pt-32 pb-32 px-6 max-w-[1400px] mx-auto">
//         <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
//           {/* LEFT: IMAGE VIEW */}
//           <div className="top-32">
//             <div className="bg-white border-4 border-foreground aspect-[3/4] overflow-hidden group relative shadow-[16px_16px_0px_0px_rgba(0,0,0,0.05)]">
//               <img
//                 src={product.image_url || ""}
//                 alt={product.name}
//                 className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
//               />
//               <div className="absolute top-6 left-6 bg-primary border-2 border-foreground px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//                 <span className="text-[10px] font-black uppercase italic tracking-tighter">
//                   Premium Spec
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: DETAILS */}
//           <div className="flex flex-col">
//             <div className="mb-12 border-b-4 border-foreground pb-10">
//               <div className="flex items-center gap-2 mb-4">
//                 <Zap size={14} className="text-accent fill-accent" />
//                 <span className="text-primary text-[11px] font-black tracking-[0.4em] uppercase">
//                   {product.category} // {product.subcategory?.replace("_", " ")}
//                 </span>
//               </div>
//               <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.8]">
//                 {product.name}
//               </h1>
//               <div className="flex items-end gap-6">
//                 <p className="font-display text-6xl font-black italic text-foreground tracking-tighter leading-none">
//                   ₹{currentPrices.current}
//                 </p>
//                 <div className="flex flex-col">
//                   <p className="text-[10px] font-black uppercase text-foreground/20 leading-none mb-1">
//                     MSRP
//                   </p>
//                   <p className="text-2xl text-foreground/20 line-through tabular-nums font-black leading-none">
//                     ₹{currentPrices.original}
//                   </p>
//                 </div>
//                 <div className="bg-accent-lime border-2 border-foreground px-3 py-1 ml-auto rotate-2">
//                   <span className="text-[10px] font-black uppercase">
//                     Save 40%
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-12">
//               {/* SIZE SELECTION */}
//               <div>
//                 <h3 className="text-[11px] text-foreground/40 font-black uppercase mb-6 tracking-widest flex items-center gap-2">
//                   <ChevronRight size={14} className="text-primary" /> Select
//                   Dimensions
//                 </h3>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   {validSizesArray.map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => setSelectedSize(s)}
//                       className={`flex flex-col items-center justify-center py-5 border-4 transition-all ${
//                         selectedSize === s
//                           ? "bg-foreground text-background border-foreground shadow-[inset_4px_4px_0px_rgba(0,212,255,1)]"
//                           : "bg-white border-foreground/5 text-foreground/40 hover:border-foreground"
//                       }`}
//                     >
//                       <span className="text-lg font-black italic">
//                         {SIZE_DETAILS[s].label}
//                       </span>
//                       <span className="text-[8px] font-bold mt-1 opacity-60">
//                         ({SIZE_DETAILS[s].dimensions})
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* QUANTITY */}
//               <div className="flex flex-col sm:flex-row sm:items-center gap-12">
//                 <div>
//                   <h3 className="text-[11px] text-foreground/40 font-black uppercase mb-6 tracking-widest">
//                     Set Quantity
//                   </h3>
//                   <div className="flex items-center border-4 border-foreground w-fit bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
//                     <button
//                       onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                       className="p-5 border-r-4 border-foreground hover:bg-muted transition-colors"
//                     >
//                       <Minus size={18} strokeWidth={3} />
//                     </button>
//                     <span className="w-20 text-center font-black tabular-nums text-2xl">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity((q) => q + 1)}
//                       className="p-5 border-l-4 border-foreground hover:bg-muted transition-colors"
//                     >
//                       <Plus size={18} strokeWidth={3} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex-1 bg-white border-4 border-foreground p-6 relative overflow-hidden group">
//                   <div className="flex items-center gap-3 mb-4">
//                     <MapPin size={18} className="text-primary" />
//                     <span className="text-[10px] font-black uppercase tracking-widest">
//                       Verify Logistics
//                     </span>
//                   </div>
//                   <div className="flex gap-2">
//                     <Input
//                       value={pincode}
//                       onChange={(e) => setPincode(e.target.value)}
//                       placeholder="PINCODE"
//                       className="bg-muted border-2 border-foreground rounded-none h-12 text-xs font-black tracking-[0.3em] focus-visible:ring-0"
//                     />
//                     <Button
//                       onClick={handleCheckDelivery}
//                       className="rounded-none bg-foreground text-background h-12 px-6 text-[10px] font-black uppercase hover:bg-primary transition-all"
//                     >
//                       CHECK
//                     </Button>
//                   </div>
//                   {delivery.status === "valid" && (
//                     <motion.p
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       className="text-[9px] font-black text-primary uppercase mt-4 flex items-center gap-2"
//                     >
//                       <Truck size={14} /> Expected in {delivery.cityName} by{" "}
//                       {delivery.estimatedDate}
//                     </motion.p>
//                   )}
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Button
//                   onClick={handleAction}
//                   className="h-24 flex-[4] rounded-none bg-foreground text-background font-black uppercase tracking-[0.4em] text-sm hover:bg-primary hover:text-foreground transition-all shadow-[12px_12px_0px_0px_rgba(255,46,99,1)] hover:shadow-none active:translate-x-1 active:translate-y-1 group"
//                 >
//                   PROCURE ARTIFACT{" "}
//                   <ChevronRight
//                     size={20}
//                     className="ml-4 group-hover:translate-x-2 transition-transform"
//                   />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="h-24 w-24 rounded-none border-4 border-foreground bg-white hover:bg-muted transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
//                   onClick={() =>
//                     navigator
//                       .share({ title: product.name, url: window.location.href })
//                       .catch(() => {})
//                   }
//                 >
//                   <Share2 size={24} strokeWidth={3} />
//                 </Button>
//               </div>

//               {/* INFO ACCORDIONS */}
//               <div className="pt-10 border-t-4 border-foreground/10">
//                 {accordionItem(
//                   "description",
//                   <HelpCircle size={18} />,
//                   "SPECIFICATIONS",
//                   <div className="space-y-4">
//                     <p className="text-foreground text-[14px] font-black">
//                       PREMIUM PRINT ARCHIVE
//                     </p>
//                     <p>
//                       • QUALITY: 300 GSM ARCHIVAL MATTE BOARD FOR MAXIMUM COLOR
//                       DEPTH.
//                     </p>
//                     <p>
//                       • DESIGN: 0.5CM INDUSTRIAL WHITE BORDER FOR PRECISION
//                       FRAMING.
//                     </p>
//                     <p className="text-primary italic mt-4">
//                       CRITICAL NOTES: NOT SELF-ADHESIVE. FRAMES NOT INCLUDED.
//                       SCREEN-TO-PRINT VARIANCE MAY OCCUR.
//                     </p>
//                   </div>,
//                 )}
//                 {accordionItem(
//                   "packaging",
//                   <Package size={18} />,
//                   "PACKAGING PROTOCOL",
//                   <div className="space-y-4">
//                     <p className="text-foreground underline font-black">
//                       REINFORCED TUBE PROTECTION:
//                     </p>
//                     <p>
//                       • A4 SIZE: UP TO 20 UNITS | A3 & 13X19: UP TO 15 UNITS
//                     </p>
//                     <p className="text-foreground underline font-black pt-4">
//                       FLAT-PACK SECURE BOX:
//                     </p>
//                     <p>• EXCEEDS TUBE CAPACITY LIMITS OR A5/A6 FORMATS.</p>
//                   </div>,
//                 )}
//                 {accordionItem(
//                   "shipping",
//                   <Truck size={18} />,
//                   "LOGISTICS PROTOCOL",
//                   <div className="space-y-4">
//                     <p className="text-foreground font-black">
//                       DOMESTIC FULFILLMENT:
//                     </p>
//                     <p>• PREPAID: EXPRESS DELIVERY (3-5 BUSINESS DAYS)</p>
//                     <p>• COD: STANDARD LOGISTICS (7-9 BUSINESS DAYS)</p>
//                     <p className="mt-4 italic opacity-50 text-[10px]">
//                       ALL ARTIFACTS ARE PRINT-ON-DEMAND. 48HR PROCESSING WINDOW
//                       APPLIES.
//                     </p>
//                   </div>,
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
  Package,
  MapPin,
  Truck,
  HelpCircle,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Zap,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

type DeliveryData = {
  status: "idle" | "checking" | "valid" | "invalid";
  cityName?: string;
  estimatedDate?: string;
};

type ValidSize = "A3" | "A4" | "A5" | "13x19";
const validSizesArray: ValidSize[] = ["A5", "A4", "A3", "13x19"];

const SIZE_DETAILS: Record<ValidSize, { label: string; dimensions: string }> = {
  A5: { label: "A5", dimensions: "14.8 x 21 cm" },
  A4: { label: "A4", dimensions: "21 x 29.7 cm" },
  A3: { label: "A3", dimensions: "29.7 x 42 cm" },
  "13x19": { label: "13x19", dimensions: "33 x 48.2 cm" },
};

const SIZE_PRICES: Record<ValidSize, { current: number; original: number }> = {
  A5: { current: 69, original: 119 },
  A4: { current: 109, original: 189 },
  A3: { current: 139, original: 239 },
  "13x19": { current: 159, original: 269 },
};

const pincodeSchema = z.string().length(6).regex(/^\d+$/);

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { data: product, isLoading, error } = useProduct(id);

  const [selectedSize, setSelectedSize] = useState<ValidSize>("A5");
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>("");
  const [delivery, setDelivery] = useState<DeliveryData>({ status: "idle" });
  const [openAccordion, setOpenAccordion] = useState<string>("description");

  const currentPrices = useMemo(
    () => SIZE_PRICES[selectedSize],
    [selectedSize],
  );

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

  const getEstimatedDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "long" });
  };

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
      setDelivery({
        status: "valid",
        cityName: pincode.startsWith("11")
          ? "Delhi"
          : pincode.startsWith("30")
            ? "Jaipur"
            : "Domestic Zone",
        estimatedDate: getEstimatedDate(
          pincode.startsWith("11") || pincode.startsWith("30") ? 3 : 5,
        ),
      });
    }, 800);
  };

  const handleAction = () => {
    if (product) {
      addToCart(
        { ...product, price: currentPrices.current },
        selectedSize,
        quantity,
      );
      toast({
        title: "ADDED TO HAUL",
        description: `${product.name} is ready for procurement.`,
      });
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2
          className="animate-spin text-primary"
          size={48}
          strokeWidth={3}
        />
      </div>
    );

  if (!product || error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <h1 className="font-display text-4xl font-black uppercase tracking-tighter">
          ARTIFACT NOT FOUND
        </h1>
        <Link
          to="/shop"
          className="bg-foreground text-background px-8 py-3 font-black uppercase tracking-widest text-xs"
        >
          Return to Shop
        </Link>
      </div>
    );

  const accordionItem = (
    id: string,
    icon: React.ReactNode,
    title: string,
    content: React.ReactNode,
  ) => {
    const isOpen = openAccordion === id;
    return (
      <div
        className={`border-b-2 border-foreground/5 transition-all ${isOpen ? "bg-muted/30" : ""}`}
      >
        <button
          onClick={() => setOpenAccordion(isOpen ? "" : id)}
          className="w-full flex justify-between items-center p-6 text-foreground uppercase text-[11px] font-black tracking-widest hover:bg-muted transition-all"
        >
          <div className="flex items-center gap-4">
            <span className={isOpen ? "text-primary" : "text-foreground/20"}>
              {icon}
            </span>
            {title}
          </div>
          <ChevronRight
            className={`transition-transform duration-500 ${isOpen ? "rotate-90 text-primary" : ""}`}
            size={18}
            strokeWidth={3}
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
              <div className="px-16 pb-8 text-[12px] text-foreground/60 leading-relaxed font-bold uppercase space-y-4">
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />
      <main className="pt-32 pb-32 px-6 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* LEFT: IMAGE VIEW */}
          <div className="top-32">
            <div className="bg-white border-4 border-foreground aspect-[3/4] overflow-hidden group relative shadow-[16px_16px_0px_0px_rgba(0,0,0,0.05)]">
              <img
                src={product.image_url || ""}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6 bg-primary border-2 border-foreground px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] font-black uppercase italic tracking-tighter">
                  Premium Spec
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col">
            <div className="mb-12 border-b-4 border-foreground pb-10">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} className="text-accent fill-accent" />
                <span className="text-primary text-[11px] font-black tracking-[0.4em] uppercase">
                  {product.category} // {product.subcategory?.replace("_", " ")}
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.8]">
                {product.name}
              </h1>
              <div className="flex items-end gap-6">
                <p className="font-display text-6xl font-black italic text-foreground tracking-tighter leading-none">
                  ₹{currentPrices.current}
                </p>
                <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase text-foreground/20 leading-none mb-1">
                    MSRP
                  </p>
                  <p className="text-2xl text-foreground/20 line-through tabular-nums font-black leading-none">
                    ₹{currentPrices.original}
                  </p>
                </div>
                <div className="bg-accent-lime border-2 border-foreground px-3 py-1 ml-auto rotate-2">
                  <span className="text-[10px] font-black uppercase">
                    Save 40%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {/* SIZE SELECTION */}
              <div>
                <h3 className="text-[11px] text-foreground/40 font-black uppercase mb-6 tracking-widest flex items-center gap-2">
                  <ChevronRight size={14} className="text-primary" /> Select
                  Dimensions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {validSizesArray.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`flex flex-col items-center justify-center py-5 border-4 transition-all ${
                        selectedSize === s
                          ? "bg-foreground text-background border-foreground shadow-[inset_4px_4px_0px_rgba(0,212,255,1)]"
                          : "bg-white border-foreground/5 text-foreground/40 hover:border-foreground"
                      }`}
                    >
                      <span className="text-lg font-black italic">
                        {SIZE_DETAILS[s].label}
                      </span>
                      <span className="text-[8px] font-bold mt-1 opacity-60">
                        ({SIZE_DETAILS[s].dimensions})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY & LOGISTICS */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-12">
                <div>
                  <h3 className="text-[11px] text-foreground/40 font-black uppercase mb-6 tracking-widest">
                    Set Quantity
                  </h3>
                  <div className="flex items-center border-4 border-foreground w-fit bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-5 border-r-4 border-foreground hover:bg-muted transition-colors"
                    >
                      <Minus size={18} strokeWidth={3} />
                    </button>
                    <span className="w-20 text-center font-black tabular-nums text-2xl">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-5 border-l-4 border-foreground hover:bg-muted transition-colors"
                    >
                      <Plus size={18} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 bg-white border-4 border-foreground p-6 relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin size={18} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Verify Logistics
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="PINCODE"
                      className="bg-muted border-2 border-foreground rounded-none h-12 text-xs font-black tracking-[0.3em] focus-visible:ring-0"
                    />
                    <Button
                      onClick={handleCheckDelivery}
                      className="rounded-none bg-foreground text-background h-12 px-6 text-[10px] font-black uppercase hover:bg-primary transition-all"
                    >
                      CHECK
                    </Button>
                  </div>
                  {delivery.status === "valid" && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[9px] font-black text-primary uppercase mt-4 flex items-center gap-2"
                    >
                      <Truck size={14} /> Expected in {delivery.cityName} by{" "}
                      {delivery.estimatedDate}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleAction}
                  className="h-24 flex-[4] rounded-none bg-foreground text-background font-black uppercase tracking-[0.4em] text-sm hover:bg-primary hover:text-foreground transition-all shadow-[12px_12px_0px_0px_rgba(255,46,99,1)] hover:shadow-none active:translate-x-1 active:translate-y-1 group"
                >
                  Add to Cart{" "}
                  <ChevronRight
                    size={20}
                    className="ml-4 group-hover:translate-x-2 transition-transform"
                  />
                </Button>
                <Button
                  variant="outline"
                  className="h-24 w-24 rounded-none border-4 border-foreground bg-white hover:bg-muted transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                  onClick={() =>
                    navigator
                      .share({ title: product.name, url: window.location.href })
                      .catch(() => {})
                  }
                >
                  <Share2 size={24} strokeWidth={3} />
                </Button>
              </div>

              {/* INFO ACCORDIONS */}
              <div className="pt-10 border-t-4 border-foreground/10">
                {accordionItem(
                  "description",
                  <HelpCircle size={18} />,
                  "SPECIFICATIONS",
                  <div className="space-y-4">
                    <p className="text-foreground text-[14px] font-black">
                      PREMIUM PRINT ARCHIVE
                    </p>
                    <p>
                      • QUALITY: 300 GSM ARCHIVAL MATTE BOARD FOR MAXIMUM COLOR
                      DEPTH.
                    </p>
                    <p>
                      • DESIGN: 0.5CM INDUSTRIAL WHITE BORDER FOR PRECISION
                      FRAMING.
                    </p>
                    <p className="text-primary italic mt-4">
                      CRITICAL NOTES: NOT SELF-ADHESIVE. FRAMES NOT INCLUDED.
                      SCREEN-TO-PRINT VARIANCE MAY OCCUR.
                    </p>
                  </div>,
                )}
                {accordionItem(
                  "packaging",
                  <Package size={18} />,
                  "PACKAGING PROTOCOL",
                  <div className="space-y-4">
                    <p className="text-foreground underline font-black">
                      REINFORCED TUBE PROTECTION:
                    </p>
                    <p>
                      • A4 SIZE: UP TO 20 UNITS | A3 & 13X19: UP TO 15 UNITS
                    </p>
                    <p className="text-foreground underline font-black pt-4">
                      FLAT-PACK SECURE BOX:
                    </p>
                    <p>• EXCEEDS TUBE CAPACITY LIMITS OR A5/A6 FORMATS.</p>
                  </div>,
                )}
                {accordionItem(
                  "shipping",
                  <Truck size={18} />,
                  "LOGISTICS PROTOCOL",
                  <div className="space-y-4">
                    <p className="text-foreground font-black">
                      DOMESTIC FULFILLMENT:
                    </p>
                    <p>• PREPAID: EXPRESS DELIVERY (3-5 BUSINESS DAYS)</p>
                    <p>• COD: STANDARD LOGISTICS (7-9 BUSINESS DAYS)</p>
                    <p className="mt-4 italic opacity-50 text-[10px]">
                      ALL ARTIFACTS ARE PRINT-ON-DEMAND. 48HR PROCESSING WINDOW
                      APPLIES.
                    </p>
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