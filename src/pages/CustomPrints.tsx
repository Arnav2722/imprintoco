// import { useState, useMemo, ChangeEvent } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   X,
//   Upload,
//   Ruler,
//   Zap,
//   ChevronRight,
//   MessageSquare,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// type ValidSize = "A3" | "A4" | "A5" | "13x19";

// interface UploadedFile {
//   id: string;
//   file: File;
//   preview: string;
// }

// const SIZE_INFO: Record<ValidSize, { dims: string; basePrice: number }> = {
//   A5: { dims: "14.8 x 21 cm", basePrice: 69 },
//   A4: { dims: "21 x 29.7 cm", basePrice: 109 },
//   A3: { dims: "29.7 x 42 cm", basePrice: 139 },
//   "13x19": { dims: "33 x 48.2 cm", basePrice: 159 },
// };

// const CustomPrints = (): JSX.Element => {
//   const [files, setFiles] = useState<UploadedFile[]>([]);
//   const [selectedSize, setSelectedSize] = useState<ValidSize>("A4");
//   const [phone, setPhone] = useState<string>("");

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files).map((f) => ({
//         id: Math.random().toString(36).substring(7),
//         file: f,
//         preview: URL.createObjectURL(f),
//       }));
//       setFiles((prev) => [...prev, ...newFiles]);
//     }
//   };

//   const removeFile = (id: string): void => {
//     setFiles((prev) => prev.filter((f) => f.id !== id));
//   };

//   const stats = useMemo(() => {
//     const count = files.length;
//     const unitPrice = SIZE_INFO[selectedSize].basePrice;
//     const freeItems = Math.floor(count / 4);
//     const totalPrice = count > 0 ? (count - freeItems) * unitPrice : 0;
//     return { count, freeItems, totalPrice, unitPrice };
//   }, [files, selectedSize]);

//   return (
//     <div className="min-h-screen bg-white text-black font-body selection:bg-primary">
//       <Navbar />

//       <main className="pt-28 md:pt-36 pb-20 px-6 max-w-[1400px] mx-auto">
//         <header className="mb-10 border-b-2 border-black pb-6">
//           <div className="flex items-center gap-2 mb-2">
//             <Zap size={14} className="text-primary fill-primary" />
//             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/40">
//               Custom Prints Studio
//             </span>
//           </div>
//           <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
//             CUSTOM <span className="text-primary not-italic">STUDIO.</span>
//           </h1>
//         </header>

//         <div className="grid lg:grid-cols-2 gap-10 items-start">
//           <div className="space-y-8">
//             <div className="relative group aspect-video border-2 border-dashed border-black/20 hover:border-black bg-gray-50 flex flex-col items-center justify-center p-8 text-center transition-all cursor-pointer">
//               <Upload
//                 size={32}
//                 className="text-black/20 group-hover:text-black mb-4"
//               />
//               <h3 className="text-lg font-black uppercase tracking-tighter">
//                 Upload Designs
//               </h3>
//               <p className="text-[9px] font-bold uppercase tracking-widest text-black/40 mt-1">
//                 High-res JPG/PNG
//               </p>
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 accept="image/*"
//               />
//             </div>

//             <div className="grid grid-cols-4 gap-3">
//               <AnimatePresence>
//                 {files.map((f) => (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                     key={f.id}
//                     className="relative p-1 bg-white border-2 border-black aspect-[2/3] shadow-[3px_3px_0px_0px_#000]"
//                   >
//                     <img
//                       src={f.preview}
//                       className="w-full h-full object-cover"
//                       alt="Preview"
//                     />
//                     <button
//                       onClick={() => removeFile(f.id)}
//                       className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 border-2 border-black flex items-center justify-center hover:bg-primary"
//                     >
//                       <X size={12} />
//                     </button>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           </div>

//           <div className="bg-white border-2 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_#00D4FF]">
//             <div className="mb-8 pb-8 border-b-2 border-black/5">
//               <div className="flex flex-col mb-8">
//                 {/* <span className="text-[9px] font-black text-black/30 uppercase tracking-widest mb-2">
//                   Base Price
//                 </span> */}
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-5xl font-black italic text-black tracking-tighter">
//                     ₹{stats.unitPrice}
//                   </span>
//                   <span className="text-xl font-black text-black/20 uppercase tracking-tighter italic">
//                     / UNIT
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 {(Object.keys(SIZE_INFO) as ValidSize[]).map((s) => (
//                   <button
//                     key={s}
//                     onClick={() => setSelectedSize(s)}
//                     className={`p-4 border-2 text-left transition-all ${
//                       selectedSize === s
//                         ? "bg-black text-white border-black shadow-[2px_2px_0px_0px_#00D4FF]"
//                         : "bg-white border-black/10 hover:border-black"
//                     }`}
//                   >
//                     <p className="text-[11px] font-black uppercase leading-none">
//                       {s}
//                     </p>
//                     <p className="text-[8px] uppercase mt-1 font-bold opacity-40">
//                       {SIZE_INFO[s].dims}
//                     </p>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-6">
//               <p className="text-[15px] font-black uppercase text-primary">
//                 Final: ₹{stats.totalPrice}
//               </p>
//               <div className="p-4 border-2 border-black bg-primary/5">
//                 <p className="text-[10px] font-black uppercase flex items-center gap-2">
//                   <Zap size={12} fill="black" /> Buy 3 Get 1 Free
//                 </p>
//                 <div className="flex justify-between mt-2">
//                   <p className="text-[8px] font-bold uppercase opacity-60">
//                     Items: {stats.count}
//                   </p>
//                   {/* <p className="text-[8px] font-black uppercase text-primary">
//                     Final: ₹{stats.totalPrice}
//                   </p> */}
//                 </div>
//               </div>

//               <div className="relative">
//                 <MessageSquare
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20"
//                   size={16}
//                 />
//                 <Input
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="WHATSAPP NUMBER"
//                   className="bg-gray-50 border-2 border-black rounded-none h-12 text-[10px] font-black px-12 focus-visible:ring-0"
//                 />
//               </div>

//               <Button
//                 disabled={files.length === 0}
//                 className="w-full h-16 bg-black text-white font-black uppercase tracking-widest text-[10px] rounded-none hover:bg-primary hover:text-black shadow-[4px_4px_0px_0px_#FF2E63] transition-all disabled:opacity-20"
//               >
//                 Add to Cart <ChevronRight size={14} className="ml-2" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default CustomPrints;

import { useState, useMemo, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  Upload,
  Zap,
  ChevronRight,
  MessageSquare,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import { DbProduct } from "@/hooks/use-products";

type ValidSize = "A3" | "A4" | "A5" | "13x19";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

const SIZE_INFO: Record<ValidSize, { dims: string; basePrice: number }> = {
  A5: { dims: "14.8 x 21 cm", basePrice: 69 },
  A4: { dims: "21 x 29.7 cm", basePrice: 109 },
  A3: { dims: "29.7 x 42 cm", basePrice: 139 },
  "13x19": { dims: "33 x 48.2 cm", basePrice: 159 },
};

const CustomPrints = (): JSX.Element => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedSize, setSelectedSize] = useState<ValidSize>("A4");
  const [phone, setPhone] = useState<string>("");
  const { addToCart } = useCart();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        id: Math.random().toString(36).substring(7),
        file: f,
        preview: URL.createObjectURL(f),
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string): void => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const stats = useMemo(() => {
    const count = files.length;
    const unitPrice = SIZE_INFO[selectedSize].basePrice;
    const freeItems = Math.floor(count / 4);
    const totalPrice = count > 0 ? (count - freeItems) * unitPrice : 0;
    return { count, freeItems, totalPrice, unitPrice };
  }, [files, selectedSize]);

  const handleAddToCart = (): void => {
    if (files.length === 0) {
      toast({
        title: "ERROR",
        description: "Upload at least one design first.",
      });
      return;
    }

    const cartItem = {
      id: "custom-" + Date.now(),
      name: `Custom ${selectedSize} Poster Pack`,
      price: stats.totalPrice / stats.count,
      image_url: files[0].preview,
      category: "custom",
      subcategory: selectedSize,
    } as unknown as DbProduct;

    addToCart(cartItem, selectedSize, stats.count);
    toast({
      title: "ADDED TO CART",
      description: `${stats.count} custom prints added.`,
    });
  };

  return (
    <div className="min-h-screen bg-white text-black font-body selection:bg-primary">
      <Navbar />
      <main className="pt-28 md:pt-36 pb-20 px-6 max-w-[1400px] mx-auto">
        <header className="mb-10 border-b-2 border-black pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-primary fill-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/40">
              Custom Prints Studio
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
            CUSTOM <span className="text-primary not-italic">STUDIO.</span>
          </h1>
        </header>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8">
            <div className="relative group aspect-video border-2 border-dashed border-black/20 hover:border-black bg-gray-50 flex flex-col items-center justify-center p-8 text-center transition-all cursor-pointer">
              <Upload
                size={32}
                className="text-black/20 group-hover:text-black mb-4"
              />
              <h3 className="text-lg font-black uppercase tracking-tighter">
                Upload Designs
              </h3>
              <p className="text-[9px] font-bold uppercase tracking-widest text-black/40 mt-1">
                High-res JPG / PNG
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              <AnimatePresence>
                {files.map((f) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative p-1 bg-white border-2 border-black aspect-[2/3] shadow-[3px_3px_0px_0px_#000]"
                  >
                    <img
                      src={f.preview}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                    <button
                      onClick={() => removeFile(f.id)}
                      className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 border-2 border-black flex items-center justify-center hover:bg-primary"
                    >
                      <X size={12} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-white border-2 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_#00D4FF]">
            <div className="mb-8 pb-8 border-b-2 border-black/5">
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black italic text-black tracking-tighter">
                  ₹{stats.unitPrice}
                </span>
                <span className="text-xl font-black text-black/20 uppercase tracking-tighter italic">
                  / UNIT
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(SIZE_INFO) as ValidSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`p-4 border-2 text-left transition-all ${selectedSize === s ? "bg-black text-white border-black shadow-[2px_2px_0px_0px_#00D4FF]" : "bg-white border-black/10 hover:border-black"}`}
                  >
                    <p className="text-[11px] font-black uppercase leading-none">
                      {s}
                    </p>
                    <p className="text-[8px] uppercase mt-1 font-bold opacity-40">
                      {SIZE_INFO[s].dims}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center bg-primary/5 p-4 border-2 border-black">
                <p className="text-[10px] font-black uppercase">
                  Buy 3 Get 1 Free
                </p>
                <p className="text-sm font-black text-primary">
                  ₹{stats.totalPrice}
                </p>
              </div>

              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WHATSAPP NUMBER"
                className="bg-gray-50 border-2 border-black rounded-none h-12 text-[10px] font-black px-4"
              />

              <Button
                onClick={handleAddToCart}
                disabled={files.length === 0}
                className="w-full h-16 bg-black text-white font-black uppercase rounded-none hover:bg-primary hover:text-black shadow-[4px_4px_0px_0px_#FF2E63] transition-all"
              >
                Add to Cart <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomPrints;