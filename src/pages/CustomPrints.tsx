// import { useState, useMemo } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   X,
//   Upload,
//   Ruler,
//   Zap,
//   Loader2,
//   ChevronRight,
//   Camera,
//   Image as ImageIcon,
//   MessageSquare,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// type ValidSize = "A3" | "A4" | "A5" | "13x19";
// type RetroSize = "3.5 x 4.2" | "A6";
// type PrintQty = 10 | 20 | 30 | 40 | 50;

// const SIZE_INFO: Record<ValidSize, { dims: string; basePrice: number }> = {
//   A5: { dims: "14.8 x 21 cm", basePrice: 79 },
//   A4: { dims: "21 x 29.7 cm", basePrice: 119 },
//   A3: { dims: "29.7 x 42 cm", basePrice: 149 },
//   "13x19": { dims: "33 x 48.2 cm", basePrice: 169 },
// };

// const COMBO_OFFERS = [
//   { id: "b2g1", buy: 2, get: 1, label: "+1 FREE SET", sets: 3 },
//   { id: "b3g2", buy: 3, get: 2, label: "+2 FREE SETS", sets: 5 },
//   {
//     id: "b4g3",
//     buy: 4,
//     get: 3,
//     label: "+3 FREE SETS",
//     sets: 7,
//     bestValue: true,
//   },
// ];

// const CustomPrints = () => {
//   const [activeTab, setActiveTab] = useState<"posters" | "retro">("posters");
//   const [files, setFiles] = useState<
//     { id: string; file: File; preview: string }[]
//   >([]);
//   const [selectedSize, setSelectedSize] = useState<ValidSize | RetroSize>("A4");
//   const [printQty, setPrintQty] = useState<PrintQty>(10);
//   const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
//   const [phone, setPhone] = useState("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files).map((f) => ({
//         id: Math.random().toString(36).substring(7),
//         file: f,
//         preview: URL.createObjectURL(f),
//       }));
//       const limit = activeTab === "retro" ? printQty : 99;
//       setFiles((prev) => [...prev, ...newFiles].slice(0, limit));
//     }
//   };

//   const stats = useMemo(() => {
//     if (activeTab === "posters") {
//       const count = files.length;
//       const basePrice =
//         (SIZE_INFO[selectedSize as ValidSize]?.basePrice || 0) + 30;
//       const freeItems = Math.floor(count / 4);
//       const totalPrice = (count - freeItems) * basePrice;
//       return { count, freeItems, totalPrice, basePrice };
//     } else {
//       const basePrice = selectedSize === "3.5 x 4.2" ? 179 : 249;
//       const offer = COMBO_OFFERS.find((o) => o.id === selectedOffer);
//       const multiplier = offer ? offer.buy : 1;
//       return {
//         count: files.length,
//         totalPrice: basePrice * multiplier,
//         basePrice,
//       };
//     }
//   }, [files, selectedSize, activeTab, selectedOffer]);

//   return (
//     <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-32 pb-32 px-6 max-w-[1400px] mx-auto">
//         {/* TAB NAVIGATION - Industrial Switcher */}
//         <div className="flex justify-center mb-20">
//           <div className="flex bg-white border-4 border-foreground p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
//             <button
//               onClick={() => {
//                 setActiveTab("posters");
//                 setFiles([]);
//                 setSelectedSize("A4");
//                 setSelectedOffer(null);
//               }}
//               className={`flex items-center gap-3 px-10 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === "posters" ? "bg-foreground text-background shadow-[inset_4px_4px_0px_rgba(0,212,255,1)]" : "hover:bg-muted"}`}
//             >
//               <ImageIcon size={16} /> Custom Posters
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab("retro");
//                 setFiles([]);
//                 setSelectedSize("3.5 x 4.2");
//               }}
//               className={`flex items-center gap-3 px-10 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === "retro" ? "bg-foreground text-background shadow-[inset_4px_4px_0px_rgba(0,212,255,1)]" : "hover:bg-muted"}`}
//             >
//               <Camera size={16} /> Retro Prints
//             </button>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-20 items-start">
//           {/* LEFT: UPLOAD & PREVIEW */}
//           <div className="space-y-10">
//             <div className="relative group aspect-video border-4 border-dashed border-foreground/20 hover:border-primary bg-white flex flex-col items-center justify-center p-12 text-center transition-all cursor-pointer">
//               <Upload
//                 size={48}
//                 className="text-foreground/10 group-hover:text-primary mb-6 transition-all group-hover:-translate-y-2"
//               />
//               <h3 className="font-display text-2xl font-black uppercase tracking-tighter">
//                 {activeTab === "retro"
//                   ? `DROP ${printQty} SNAPSHOTS`
//                   : "UPLOAD YOUR DESIGNS"}
//               </h3>
//               <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mt-2">
//                 High-res JPG/PNG preferred for peak sharpness
//               </p>
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 accept="image/*"
//               />
//             </div>

//             <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
//               <AnimatePresence>
//                 {files.map((f) => (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     key={f.id}
//                     className={`relative p-1 bg-white border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] group ${activeTab === "retro" ? "aspect-[3.5/4.2]" : "aspect-[2/3]"}`}
//                   >
//                     <img
//                       src={f.preview}
//                       className="w-full h-full object-cover"
//                       alt="Preview"
//                     />
//                     <button
//                       onClick={() =>
//                         setFiles(files.filter((x) => x.id !== f.id))
//                       }
//                       className="absolute -top-3 -right-3 bg-accent text-white w-8 h-8 border-2 border-foreground flex items-center justify-center hover:bg-foreground transition-all rotate-12"
//                     >
//                       <X size={16} strokeWidth={3} />
//                     </button>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* RIGHT: STUDIO CONFIG */}
//           <div className="space-y-12 bg-white border-4 border-foreground p-10 md:p-14 shadow-[16px_16px_0px_0px_rgba(0,212,255,1)]">
//             <header className="space-y-4 border-b-4 border-foreground pb-10">
//               <div className="flex items-center gap-2">
//                 <Zap size={18} className="text-accent fill-accent" />
//                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/40">
//                   Studio Proc01
//                 </span>
//               </div>
//               <h1 className="font-display text-6xl font-black uppercase tracking-tighter italic leading-none">
//                 CONFIG <span className="text-primary not-italic">BASE.</span>
//               </h1>
//               <div className="flex items-end justify-between pt-4">
//                 <div className="flex flex-col">
//                   <span className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">
//                     Net Investment
//                   </span>
//                   <span className="font-display text-6xl font-black italic text-foreground leading-none">
//                     ₹{stats.totalPrice}
//                   </span>
//                 </div>
//                 {selectedOffer && (
//                   <div className="bg-accent-lime border-2 border-foreground px-4 py-2 text-[10px] font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//                     OFFER SECURED
//                   </div>
//                 )}
//               </div>
//             </header>

//             {/* SELECTION GRID */}
//             <div className="space-y-10">
//               <div className="space-y-6">
//                 <label className="text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
//                   <Ruler size={16} /> Choose Frame Dimensions
//                 </label>
//                 <div className="grid grid-cols-2 gap-4">
//                   {activeTab === "posters"
//                     ? (Object.keys(SIZE_INFO) as ValidSize[]).map((s) => (
//                         <button
//                           key={s}
//                           onClick={() => setSelectedSize(s)}
//                           className={`p-6 border-4 text-left transition-all ${selectedSize === s ? "bg-foreground text-background border-foreground shadow-[inset_4px_4px_0px_rgba(0,212,255,1)]" : "bg-white border-foreground/10 hover:border-foreground"}`}
//                         >
//                           <p className="text-xl font-black italic uppercase leading-none">
//                             {s}
//                           </p>
//                           <p className="text-[10px] uppercase mt-2 font-bold tracking-widest opacity-60">
//                             {SIZE_INFO[s].dims}
//                           </p>
//                         </button>
//                       ))
//                     : (["3.5 x 4.2", "A6"] as RetroSize[]).map((s) => (
//                         <button
//                           key={s}
//                           onClick={() => setSelectedSize(s)}
//                           className={`p-6 border-4 text-left transition-all ${selectedSize === s ? "bg-foreground text-background border-foreground shadow-[inset_4px_4px_0px_rgba(0,212,255,1)]" : "bg-white border-foreground/10 hover:border-foreground"}`}
//                         >
//                           <p className="text-xl font-black italic uppercase leading-none">
//                             {s}
//                           </p>
//                         </button>
//                       ))}
//                 </div>
//               </div>

//               {activeTab === "retro" && (
//                 <div className="space-y-6">
//                   <label className="text-[11px] font-black uppercase tracking-widest">
//                     Set Capacity (Photos per Pack)
//                   </label>
//                   <div className="grid grid-cols-5 gap-3">
//                     {[10, 20, 30, 40, 50].map((q) => (
//                       <button
//                         key={q}
//                         onClick={() => {
//                           setPrintQty(q as PrintQty);
//                           setFiles([]);
//                         }}
//                         className={`py-4 border-2 font-black transition-all ${printQty === q ? "bg-primary text-foreground border-foreground" : "bg-white border-foreground/10 hover:border-foreground"}`}
//                       >
//                         {q}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* OFFERS AREA */}
//               <div className="space-y-6 pt-10 border-t-2 border-foreground/5">
//                 <p className="text-[11px] font-black text-primary uppercase flex items-center gap-3">
//                   <Zap size={16} fill="currentColor" />{" "}
//                   {activeTab === "posters"
//                     ? "POSTER PROTOCOL"
//                     : "BULK DISCOUNTS"}
//                 </p>
//                 {activeTab === "posters" ? (
//                   <div className="p-8 border-4 border-foreground bg-accent-lime shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
//                     <p className="text-sm font-black italic uppercase">
//                       The 4th Element is Free.
//                     </p>
//                     <p className="text-[10px] text-foreground/60 mt-2 font-bold uppercase leading-tight">
//                       Add 4 posters, pay for 3. Automatic system unlock.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {COMBO_OFFERS.map((o) => (
//                       <button
//                         key={o.id}
//                         onClick={() =>
//                           setSelectedOffer(selectedOffer === o.id ? null : o.id)
//                         }
//                         className={`relative p-5 border-4 text-left transition-all ${selectedOffer === o.id ? "bg-foreground text-background border-foreground" : "bg-white border-foreground/10 hover:border-foreground"}`}
//                       >
//                         {o.bestValue && (
//                           <span className="absolute -top-3 right-4 bg-primary text-[8px] text-foreground px-2 py-1 font-black uppercase border-2 border-foreground">
//                             BEST VALUE
//                           </span>
//                         )}
//                         <p
//                           className={`text-xs font-black uppercase leading-tight ${selectedOffer === o.id ? "text-primary" : ""}`}
//                         >
//                           BUY {o.buy} SETS
//                         </p>
//                         <p className="text-[9px] font-bold mt-1 tracking-widest">
//                           {o.label}
//                         </p>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* ACTION CALL */}
//               <div className="space-y-6 pt-10 border-t-2 border-foreground/5">
//                 <div className="relative group">
//                   <MessageSquare
//                     className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-all"
//                     size={20}
//                   />
//                   <Input
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     placeholder="WHATSAPP NUMBER"
//                     className="bg-muted border-4 border-foreground rounded-none h-20 text-sm font-black tracking-[0.3em] px-16 focus-visible:ring-0 focus:bg-white transition-all placeholder:text-foreground/10"
//                   />
//                 </div>
//                 <Button
//                   disabled={files.length === 0}
//                   className="w-full h-24 bg-foreground text-background font-black uppercase tracking-[0.4em] text-lg rounded-none hover:bg-primary hover:text-foreground transition-all shadow-[12px_12px_0px_0px_rgba(255,46,99,1)] hover:shadow-none group"
//                 >
//                   {activeTab === "posters"
//                     ? `SECURE ${stats.count} POSTERS`
//                     : `CONFIRM RETRO PACK`}
//                   <ChevronRight
//                     size={24}
//                     className="ml-4 group-hover:translate-x-2 transition-transform"
//                   />
//                 </Button>
//               </div>
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
  Ruler,
  Zap,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
                High-res JPG/PNG
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={f.id}
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
              <div className="flex flex-col mb-8">
                {/* <span className="text-[9px] font-black text-black/30 uppercase tracking-widest mb-2">
                  Base Price
                </span> */}
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black italic text-black tracking-tighter">
                    ₹{stats.unitPrice}
                  </span>
                  <span className="text-xl font-black text-black/20 uppercase tracking-tighter italic">
                    / UNIT
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(SIZE_INFO) as ValidSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`p-4 border-2 text-left transition-all ${
                      selectedSize === s
                        ? "bg-black text-white border-black shadow-[2px_2px_0px_0px_#00D4FF]"
                        : "bg-white border-black/10 hover:border-black"
                    }`}
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
              <p className="text-[15px] font-black uppercase text-primary">
                Final: ₹{stats.totalPrice}
              </p>
              <div className="p-4 border-2 border-black bg-primary/5">
                <p className="text-[10px] font-black uppercase flex items-center gap-2">
                  <Zap size={12} fill="black" /> Buy 3 Get 1 Free
                </p>
                <div className="flex justify-between mt-2">
                  <p className="text-[8px] font-bold uppercase opacity-60">
                    Items: {stats.count}
                  </p>
                  {/* <p className="text-[8px] font-black uppercase text-primary">
                    Final: ₹{stats.totalPrice}
                  </p> */}
                </div>
              </div>

              <div className="relative">
                <MessageSquare
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20"
                  size={16}
                />
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="WHATSAPP NUMBER"
                  className="bg-gray-50 border-2 border-black rounded-none h-12 text-[10px] font-black px-12 focus-visible:ring-0"
                />
              </div>

              <Button
                disabled={files.length === 0}
                className="w-full h-16 bg-black text-white font-black uppercase tracking-widest text-[10px] rounded-none hover:bg-primary hover:text-black shadow-[4px_4px_0px_0px_#FF2E63] transition-all disabled:opacity-20"
              >
                Add to Cart <ChevronRight size={14} className="ml-2" />
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
