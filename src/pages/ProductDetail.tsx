// import { useState, useMemo, useEffect, ReactNode } from "react";
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
//   Maximize2,
// } from "lucide-react";
// import { toast } from "@/components/ui/use-toast";
// import { z } from "zod";
// import { motion, AnimatePresence } from "framer-motion";

// // --- CONFIGURATION TYPES ---
// interface SizePrice {
//   current: number;
//   original: number;
// }

// interface SizeDetail {
//   label: string;
//   dim: string;
// }

// interface ProductConfig {
//   sizes: string[];
//   details: Record<string, SizeDetail>;
//   prices: Record<string, SizePrice>;
// }

// type DeliveryData = {
//   status: "idle" | "checking" | "valid" | "invalid";
//   cityName?: string;
//   estimatedDate?: string;
// };

// const pincodeSchema = z.string().length(6).regex(/^\d+$/);

// const ProductDetail = (): JSX.Element => {
//   const { id } = useParams<{ id: string }>();
//   const { addToCart } = useCart();
//   const { data: product, isLoading, error } = useProduct(id);

//   const isKit: boolean = !!product?.category?.toLowerCase().includes("collage");

//   const POSTER_CONFIG: ProductConfig = {
//     sizes: ["A5", "A4", "A3", "13x19"],
//     details: {
//       A5: { label: "A5", dim: "14.8 x 21 cm" },
//       A4: { label: "A4", dim: "21 x 29.7 cm" },
//       A3: { label: "A3", dim: "29.7 x 42 cm" },
//       "13x19": { label: "13x19", dim: "33 x 48.2 cm" },
//     },
//     prices: {
//       A5: { current: 69, original: 119 },
//       A4: { current: 109, original: 189 },
//       A3: { current: 139, original: 239 },
//       "13x19": { current: 159, original: 269 },
//     },
//   };

//   const KIT_CONFIG: ProductConfig = {
//     sizes: ["A6", "A5", "A4"],
//     details: {
//       A6: { label: "A6 Bundle", dim: "30 Units | 10x15 cm" },
//       A5: { label: "A5 Bundle", dim: "30 Units | 15x21 cm" },
//       A4: { label: "A4 Bundle", dim: "30 Units | 21x30 cm" },
//     },
//     prices: {
//       A6: { current: 349, original: 599 },
//       A5: { current: 790, original: 1290 },
//       A4: { current: 990, original: 1590 },
//     },
//   };

//   const activeConfig: ProductConfig = isKit ? KIT_CONFIG : POSTER_CONFIG;

//   const [selectedSize, setSelectedSize] = useState<string>("");
//   const [quantity, setQuantity] = useState<number>(1);
//   const [pincode, setPincode] = useState<string>("");
//   const [delivery, setDelivery] = useState<DeliveryData>({ status: "idle" });
//   const [openAccordion, setOpenAccordion] = useState<string>("description");

//   useEffect(() => {
//     if (product) setSelectedSize(isKit ? "A6" : "A5");
//   }, [product, isKit]);

//   useEffect(() => {
//     const originalTitle: string = product
//       ? `${product.name} | IMPRINTO.`
//       : "IMPRINTO.";
//     const handleVisibilityChange = () => {
//       document.title = document.hidden ? "Still Thinking? 👀" : originalTitle;
//     };
//     window.addEventListener("visibilitychange", handleVisibilityChange);
//     document.title = originalTitle;
//     return () =>
//       window.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, [product]);

//   const currentPrices = useMemo<SizePrice>(() => {
//     if (!selectedSize || !activeConfig.prices[selectedSize]) {
//       return { current: 0, original: 0 };
//     }
//     return activeConfig.prices[selectedSize];
//   }, [selectedSize, activeConfig]);

//   const optimizedImage: string = product?.image_url
//     ? product.image_url.replace("/upload/", "/upload/w_1200,f_auto,q_auto/")
//     : "";

//   const getEstimatedDate = (daysToAdd: number): string => {
//     const date = new Date();
//     date.setDate(date.getDate() + daysToAdd);
//     return date.toLocaleDateString("en-IN", { day: "numeric", month: "long" });
//   };

//   const handleCheckDelivery = (): void => {
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

//   const handleAction = (): void => {
//     if (product && currentPrices.current > 0) {
//       addToCart(
//         { ...product, price: currentPrices.current },
//         selectedSize,
//         quantity,
//       );
//       toast({
//         title: "ADDED TO CART",
//         description: `${product.name} (${selectedSize}) is ready.`,
//       });
//     }
//   };

//   const accordionItem = (
//     id: string,
//     icon: ReactNode,
//     title: string,
//     content: ReactNode,
//   ) => {
//     const isOpen: boolean = openAccordion === id;
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
//               <div className="px-6 md:px-16 pb-8 text-[12px] text-foreground/60 leading-relaxed font-bold uppercase space-y-4">
//                 {content}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     );
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="animate-spin text-primary" size={48} />
//       </div>
//     );
//   if (!product || error)
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-6">
//         <h1 className="font-display text-4xl font-black uppercase">
//           ARTIFACT NOT FOUND
//         </h1>
//         <Link
//           to="/shop"
//           className="bg-foreground text-background px-8 py-3 font-black uppercase text-xs"
//         >
//           Return to Shop
//         </Link>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
//       <Navbar />
//       <main className="pt-24 md:pt-32 pb-32 px-4 md:px-6 max-w-[1400px] mx-auto">
//         <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">
//           <div className="lg:sticky lg:top-32">
//             <div className="bg-white border-4 border-foreground aspect-[3/4] overflow-hidden group relative shadow-[12px_12px_0px_0px_#00D4FF] md:shadow-[16px_16px_0px_0px_#00D4FF]">
//               <img
//                 src={optimizedImage}
//                 alt={product.name}
//                 className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
//               />
//               <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-primary border-2 border-foreground px-3 md:px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
//                 <span className="text-[9px] md:text-[10px] font-black uppercase italic tracking-tighter">
//                   {isKit ? "30 PCS BUNDLE" : product.badge || "Premium Spec"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col">
//             <div className="mb-10 md:mb-12 border-b-4 border-foreground pb-8 md:pb-10">
//               <div className="flex items-center gap-2 mb-4">
//                 <Zap size={14} className="text-accent fill-accent" />
//                 <span className="text-primary text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase">
//                   {product.category} // {product.subcategory?.replace("_", " ")}
//                 </span>
//               </div>
//               <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-[0.9] md:leading-[0.8]">
//                 {product.name}
//               </h1>
//               <div className="flex items-end gap-4 md:gap-6">
//                 <p className="font-display text-5xl md:text-6xl font-black italic text-foreground tracking-tighter leading-none">
//                   ₹{currentPrices.current}
//                 </p>
//                 <div className="flex flex-col">
//                   <p className="text-[9px] font-black uppercase text-foreground/20 leading-none mb-1">
//                     MSRP
//                   </p>
//                   <p className="text-xl md:text-2xl text-foreground/20 line-through tabular-nums font-black leading-none">
//                     ₹{currentPrices.original}
//                   </p>
//                 </div>
//                 <div className="bg-accent-lime border-2 border-foreground px-2 md:px-3 py-1 ml-auto rotate-2">
//                   <span className="text-[9px] md:text-[10px] font-black uppercase">
//                     Save 40%
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-10 md:space-y-12">
//               <div>
//                 <h3 className="text-[10px] md:text-[11px] text-foreground/40 font-black uppercase mb-4 md:mb-6 tracking-widest flex items-center gap-2">
//                   <ChevronRight size={14} className="text-primary" />{" "}
//                   {isKit ? "Select Pack Size" : "Select Dimensions"}
//                 </h3>
//                 <div
//                   className={`grid gap-2 md:gap-3 ${isKit ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}
//                 >
//                   {activeConfig.sizes.map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => setSelectedSize(s)}
//                       className={`flex flex-col items-center justify-center py-4 md:py-5 border-2 md:border-4 transition-all ${selectedSize === s ? "bg-foreground text-background border-foreground shadow-[inset_2px_2px_0px_#00D4FF] md:shadow-[inset_4px_4px_0px_#00D4FF]" : "bg-white border-foreground/5 text-foreground/40 hover:border-foreground"}`}
//                     >
//                       <span className="text-sm md:text-lg font-black italic">
//                         {activeConfig.details[s].label}
//                       </span>
//                       <span className="text-[7px] md:text-[8px] font-bold mt-1 opacity-60">
//                         ({activeConfig.details[s].dim})
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row sm:items-center gap-8 md:gap-12">
//                 <div>
//                   <h3 className="text-[10px] md:text-[11px] text-foreground/40 font-black uppercase mb-4 md:mb-6 tracking-widest">
//                     Set Quantity
//                   </h3>
//                   <div className="flex items-center border-2 md:border-4 border-foreground w-fit bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//                     <button
//                       onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                       className="p-4 md:p-5 border-r-2 md:border-r-4 border-foreground hover:bg-muted transition-colors"
//                     >
//                       <Minus size={16} strokeWidth={3} />
//                     </button>
//                     <span className="w-16 md:w-20 text-center font-black tabular-nums text-xl md:text-2xl">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity((q) => q + 1)}
//                       className="p-4 md:p-5 border-l-2 md:border-l-4 border-foreground hover:bg-muted transition-colors"
//                     >
//                       <Plus size={16} strokeWidth={3} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex-1 bg-white border-2 md:border-4 border-foreground p-5 md:p-6 relative overflow-hidden group">
//                   <div className="flex items-center gap-3 mb-4">
//                     <MapPin size={18} className="text-primary" />
//                     <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">
//                       Verify Logistics
//                     </span>
//                   </div>
//                   <div className="flex gap-2">
//                     <Input
//                       value={pincode}
//                       onChange={(e) => setPincode(e.target.value)}
//                       placeholder="PINCODE"
//                       className="bg-muted border-2 border-foreground rounded-none h-10 md:h-12 text-[10px] font-black focus-visible:ring-0"
//                     />
//                     <Button
//                       onClick={handleCheckDelivery}
//                       className="rounded-none bg-foreground text-background h-10 md:h-12 px-4 md:px-6 text-[9px] font-black uppercase hover:bg-primary"
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

//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Button
//                   onClick={handleAction}
//                   className="h-16 sm:h-24 w-full sm:flex-[4] rounded-none bg-foreground text-background font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-xs sm:text-sm hover:bg-primary hover:text-foreground transition-all shadow-[8px_8px_0px_0px_#00D4FF] sm:shadow-[12px_12px_0px_0px_#00D4FF] hover:shadow-none group"
//                 >
//                   Add to Cart{" "}
//                   <ChevronRight
//                     size={20}
//                     className="ml-2 sm:ml-4 group-hover:translate-x-2 transition-transform"
//                   />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="h-16 w-full sm:h-24 sm:w-24 rounded-none border-2 md:border-4 border-foreground bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] flex items-center justify-center"
//                   onClick={() =>
//                     navigator
//                       .share({ title: product.name, url: window.location.href })
//                       .catch(() => {})
//                   }
//                 >
//                   <Share2 size={22} strokeWidth={3} />
//                 </Button>
//               </div>

//               <div className="pt-8 md:pt-10 border-t-4 border-foreground/10">
//                 {accordionItem(
//                   "description",
//                   <HelpCircle size={18} />,
//                   "SPECIFICATIONS",
//                   <div className="space-y-4">
//                     <p className="text-foreground text-[13px] font-black">
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
//                     </p>
//                   </div>,
//                 )}
//                 {accordionItem(
//                   "size_guide",
//                   <Maximize2 size={18} />,
//                   "SIZE GUIDE PROTOCOL",
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="border-2 border-foreground/10 p-3">
//                         <p className="font-black text-foreground">A5 FORMAT</p>
//                         <p>Small & Impactful (Handheld size)</p>
//                       </div>
//                       <div className="border-2 border-foreground/10 p-3">
//                         <p className="font-black text-foreground">A4 FORMAT</p>
//                         <p>Standard Display (Laptop screen size)</p>
//                       </div>
//                       <div className="border-2 border-foreground/10 p-3">
//                         <p className="font-black text-foreground">A3 FORMAT</p>
//                         <p>Large Format (Double A4 size)</p>
//                       </div>
//                       <div className="border-2 border-foreground/10 p-3">
//                         <p className="font-black text-foreground">
//                           13x19 FORMAT
//                         </p>
//                         <p>Premium Large (Gallery scale)</p>
//                       </div>
//                     </div>
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
//                       ALL PRODUCTS ARE PRINT-ON-DEMAND. 48HR PROCESSING WINDOW
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

import { useState, useMemo, useEffect, ReactNode } from "react";
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
  Maximize2,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
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

type DeliveryData = {
  status: "idle" | "checking" | "valid" | "invalid";
  cityName?: string;
  estimatedDate?: string;
};

const pincodeSchema = z.string().length(6).regex(/^\d+$/);

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

  const KIT_CONFIG: ProductConfig = {
    sizes: ["A6", "A5", "A4"],
    details: {
      A6: { label: "A6 Pack", dim: "30 Pcs" },
      A5: { label: "A5 Pack", dim: "30 Pcs" },
      A4: { label: "A4 Pack", dim: "30 Pcs" },
    },
    prices: {
      A6: { current: 349, original: 599 },
      A5: { current: 790, original: 1290 },
      A4: { current: 990, original: 1590 },
    },
  };

  const activeConfig: ProductConfig = isKit ? KIT_CONFIG : POSTER_CONFIG;

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>("");
  const [delivery, setDelivery] = useState<DeliveryData>({ status: "idle" });
  const [openAccordion, setOpenAccordion] = useState<string>("description");

  useEffect(() => {
    if (product) setSelectedSize(isKit ? "A6" : "A5");
  }, [product, isKit]);

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

  const currentPrices = useMemo<SizePrice>(() => {
    if (!selectedSize || !activeConfig.prices[selectedSize]) {
      return { current: 0, original: 0 };
    }
    return activeConfig.prices[selectedSize];
  }, [selectedSize, activeConfig]);

  const handleCheckDelivery = (): void => {
    const result = pincodeSchema.safeParse(pincode);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Invalid PIN",
        description: "6 digits required.",
      });
      return;
    }
    setDelivery({ status: "checking" });
    setTimeout(() => {
      setDelivery({
        status: "valid",
        cityName: pincode.startsWith("30") ? "Jaipur" : "Domestic Zone",
        estimatedDate: "4-6 Days",
      });
    }, 800);
  };

  const handleAction = (): void => {
    if (product && currentPrices.current > 0) {
      addToCart(
        { ...product, price: currentPrices.current },
        selectedSize,
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
              <div className="pb-6 text-[10px] text-foreground/60 leading-relaxed font-bold uppercase">
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
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">
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

            <div className="space-y-8">
              <div>
                <h3 className="text-[9px] text-black/40 font-black uppercase mb-3 tracking-widest flex items-center gap-2">
                  <ChevronRight size={12} className="text-primary" />{" "}
                  {isKit ? "Set Capacity" : "Dimensions"}
                </h3>
                <div
                  className={`grid gap-2 ${isKit ? "grid-cols-3" : "grid-cols-4"}`}
                >
                  {activeConfig.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`flex flex-col items-center justify-center py-3 border-2 transition-all ${selectedSize === s ? "bg-black text-white border-black shadow-[2px_2px_0_0_#00D4FF]" : "bg-white border-black/5 text-black/40 hover:border-black"}`}
                    >
                      <span className="text-[11px] font-black uppercase">
                        {activeConfig.details[s].label}
                      </span>
                      <span className="text-[7px] font-bold opacity-60 mt-0.5">
                        ({activeConfig.details[s].dim})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="shrink-0">
                  <h3 className="text-[9px] text-black/40 font-black uppercase mb-3 tracking-widest">
                    Quantity
                  </h3>
                  <div className="flex items-center border-2 border-black w-fit bg-white shadow-[3px_3px_0_0_#000]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-3 hover:bg-muted"
                    >
                      <Minus size={12} strokeWidth={4} />
                    </button>
                    <span className="w-10 text-center font-black text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-3 hover:bg-muted"
                    >
                      <Plus size={12} strokeWidth={4} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 bg-white border-2 border-black p-4 shadow-[3px_3px_0_0_#000]">
                  <p className="text-[8px] font-black uppercase tracking-widest mb-3 opacity-40">
                    Verification
                  </p>
                  <div className="flex gap-2">
                    <input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="PINCODE"
                      className="bg-muted border-2 border-black rounded-none h-10 w-full px-4 text-[10px] font-black focus:outline-none"
                    />
                    <button
                      onClick={handleCheckDelivery}
                      className="bg-black text-white h-10 px-4 text-[9px] font-black uppercase hover:bg-primary"
                    >
                      CHECK
                    </button>
                  </div>
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
                  "Specifications",
                  <div className="space-y-3">
                    • 300 GSM ARCHIVAL MATTE • NON-SELF ADHESIVE • 0.5CM WHITE
                    BORDER • FRAMES NOT INCLUDED.
                  </div>,
                )}
                {accordionItem(
                  "shipping",
                  <Truck size={14} />,
                  "Logistics",
                  <div className="space-y-3">
                    • PREPAID: 3-5 DAYS • COD: 7-9 DAYS • PRINTED ON DEMAND •
                    48HR PROCESSING.
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