// import { useState, useMemo } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/hooks/use-toast";
// import {
//   X,
//   Upload,
//   Ruler,
//   Phone,
//   Zap,
//   Layers,
//   Loader2,
//   ChevronRight,
// } from "lucide-react";

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
//   const [selectedOffer, setSelectedOffer] = useState<string | null>(null); // Offer selection state
//   const [phone, setPhone] = useState("");
//   const [uploading, setUploading] = useState(false);

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
//         SIZE_INFO[selectedSize as ValidSize]?.basePrice + 30 || 0;
//       const freeItems = Math.floor(count / 4);
//       const totalPrice = (count - freeItems) * basePrice;
//       return { count, freeItems, totalPrice, basePrice };
//     } else {
//       const basePrice = selectedSize === "3.5 x 4.2" ? 179 : 249;
//       // Agar offer selected hai toh price multiplier lag jayega
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
//     <div className="min-h-screen bg-[#020202] text-white font-bricolage selection:bg-primary/30">
//       <Navbar />

//       <main className="pt-32 pb-20 px-6 max-w-[1300px] mx-auto">
//         {/* Tab Switcher */}
//         <div className="flex gap-1 bg-white/[0.02] border border-white/5 p-1 mb-16 w-fit mx-auto sm:mx-0">
//           <button
//             onClick={() => {
//               setActiveTab("posters");
//               setFiles([]);
//               setSelectedSize("A4");
//               setSelectedOffer(null);
//             }}
//             className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === "posters" ? "bg-white text-black" : "text-white/40 hover:text-white"}`}
//           >
//             Custom Posters
//           </button>
//           <button
//             onClick={() => {
//               setActiveTab("retro");
//               setFiles([]);
//               setSelectedSize("3.5 x 4.2");
//             }}
//             className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === "retro" ? "bg-white text-black" : "text-white/40 hover:text-white"}`}
//           >
//             Retro Prints
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
//           {/* Left: Preview Section */}
//           <div className="space-y-8">
//             <div className="relative group min-h-[400px] border border-dashed border-white/10 hover:border-primary/40 bg-white/[0.01] flex flex-col items-center justify-center p-12 text-center">
//               <Upload
//                 size={40}
//                 className="text-white/10 group-hover:text-primary mb-6 transition-colors"
//               />
//               <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
//                 {activeTab === "retro"
//                   ? `Select ${printQty} photos for this pack`
//                   : "Upload high-res designs"}
//               </p>
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 accept="image/*"
//               />
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {files.map((f) => (
//                 <div
//                   key={f.id}
//                   className={`relative p-1 bg-white/[0.02] border border-white/5 group ${activeTab === "retro" ? "aspect-[3.5/4.2] bg-white" : "aspect-[2/3]"}`}
//                 >
//                   <img
//                     src={f.preview}
//                     className={`w-full h-full object-cover ${activeTab === "retro" ? "grayscale group-hover:grayscale-0" : ""}`}
//                     alt="Preview"
//                   />
//                   <button
//                     onClick={() => setFiles(files.filter((x) => x.id !== f.id))}
//                     className="absolute -top-2 -right-2 bg-black text-white p-1 hover:text-red-500"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right: Config Section */}
//           <div className="space-y-12">
//             <header className="space-y-4 border-b border-white/5 pb-8">
//               <h1 className="text-5xl font-black uppercase tracking-tighter italic">
//                 {activeTab === "posters" ? "Custom" : "Retro"}{" "}
//                 <span className="text-primary">Studio</span>
//               </h1>
//               <div className="flex items-baseline gap-4">
//                 <span className="text-4xl font-black italic">
//                   ₹{stats.totalPrice}
//                 </span>
//                 {selectedOffer && (
//                   <span className="text-[10px] font-black text-primary uppercase tracking-widest">
//                     Offer Applied
//                   </span>
//                 )}
//               </div>
//             </header>

//             <div className="space-y-10">
//               {/* Dimensions */}
//               <div className="space-y-4">
//                 <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 flex items-center gap-2">
//                   <ChevronRight size={12} className="text-primary" /> Select
//                   Dimensions
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   {activeTab === "posters"
//                     ? (Object.keys(SIZE_INFO) as ValidSize[]).map((s) => (
//                         <button
//                           key={s}
//                           onClick={() => setSelectedSize(s)}
//                           className={`p-5 border text-left transition-all ${selectedSize === s ? "bg-white text-black border-white" : "border-white/10 text-white/40 hover:border-white/30"}`}
//                         >
//                           <p className="text-xs font-black italic">{s}</p>
//                           <p className="text-[8px] uppercase mt-1 opacity-60 font-bold tracking-widest">
//                             {SIZE_INFO[s].dims}
//                           </p>
//                         </button>
//                       ))
//                     : (["3.5 x 4.2", "A6"] as RetroSize[]).map((s) => (
//                         <button
//                           key={s}
//                           onClick={() => setSelectedSize(s)}
//                           className={`p-5 border text-left transition-all ${selectedSize === s ? "bg-white text-black border-white" : "border-white/10 text-white/40 hover:border-white/30"}`}
//                         >
//                           <p className="text-xs font-black italic">{s}</p>
//                         </button>
//                       ))}
//                 </div>
//               </div>

//               {/* Quantity for Retro */}
//               {activeTab === "retro" && (
//                 <div className="space-y-4">
//                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 flex items-center gap-2">
//                     <ChevronRight size={12} className="text-primary" /> Pack
//                     Size (Images per set)
//                   </label>
//                   <div className="grid grid-cols-5 gap-2">
//                     {[10, 20, 30, 40, 50].map((q) => (
//                       <button
//                         key={q}
//                         onClick={() => {
//                           setPrintQty(q as PrintQty);
//                           setFiles([]);
//                         }}
//                         className={`py-3 border text-[11px] font-black transition-all ${printQty === q ? "bg-primary text-black border-primary" : "border-white/10 text-white/40 hover:border-white/30"}`}
//                       >
//                         {q}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* LIVE OFFERS - NOW CLICKABLE */}
//             <div className="space-y-6">
//               <p className="text-[10px] font-black text-primary uppercase flex items-center gap-2 tracking-[0.2em]">
//                 <Zap size={12} fill="currentColor" />{" "}
//                 {activeTab === "posters" ? "Poster Bonus" : "Bulk Combo Deals"}
//               </p>
//               {activeTab === "posters" ? (
//                 <div className="p-6 border border-primary/20 bg-primary/5">
//                   <p className="text-[11px] font-black italic tracking-tight uppercase">
//                     Automatic Unlock: Buy 3, get the 4th free.
//                   </p>
//                   <p className="text-[9px] text-white/40 mt-1 font-bold uppercase tracking-widest leading-relaxed">
//                     Just add posters to your collection. Every 4th unit is on
//                     the house.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   {COMBO_OFFERS.map((o) => (
//                     <button
//                       key={o.id}
//                       onClick={() =>
//                         setSelectedOffer(selectedOffer === o.id ? null : o.id)
//                       } // Toggle selection
//                       className={`relative p-5 border text-left transition-all group ${selectedOffer === o.id ? "border-primary bg-primary/5" : "border-white/5 bg-white/[0.01] hover:border-white/20"}`}
//                     >
//                       {o.bestValue && (
//                         <span className="absolute -top-2 left-4 bg-primary text-[8px] text-black px-2 py-0.5 font-black uppercase italic">
//                           Best Value
//                         </span>
//                       )}
//                       <p
//                         className={`text-[11px] font-black italic transition-colors ${selectedOffer === o.id ? "text-white" : "text-white/60 group-hover:text-white"}`}
//                       >
//                         BUY {o.buy} SETS
//                       </p>
//                       <p className="text-[9px] text-primary mt-1 font-bold tracking-widest">
//                         {o.label}
//                       </p>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Order Action */}
//             <div className="space-y-6">
//               <Input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="WHATSAPP NUMBER"
//                 className="bg-black border-white/10 rounded-none h-20 text-[12px] font-black tracking-[0.3em] focus:border-primary placeholder:text-white/10"
//               />
//               <Button
//                 disabled={files.length === 0}
//                 className="w-full h-24 bg-primary text-black font-black uppercase tracking-[0.5em] text-xs hover:bg-white transition-all shadow-[0_10px_40px_rgba(250,255,0,0.1)]"
//               >
//                 {activeTab === "posters"
//                   ? `Initiate ${stats.count} Posters`
//                   : `Confirm Retro Order`}
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

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  Upload,
  Ruler,
  Zap,
  Loader2,
  ChevronRight,
  Camera,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ValidSize = "A3" | "A4" | "A5" | "13x19";
type RetroSize = "3.5 x 4.2" | "A6";
type PrintQty = 10 | 20 | 30 | 40 | 50;

const SIZE_INFO: Record<ValidSize, { dims: string; basePrice: number }> = {
  A5: { dims: "14.8 x 21 cm", basePrice: 79 },
  A4: { dims: "21 x 29.7 cm", basePrice: 119 },
  A3: { dims: "29.7 x 42 cm", basePrice: 149 },
  "13x19": { dims: "33 x 48.2 cm", basePrice: 169 },
};

const COMBO_OFFERS = [
  { id: "b2g1", buy: 2, get: 1, label: "+1 FREE SET", sets: 3 },
  { id: "b3g2", buy: 3, get: 2, label: "+2 FREE SETS", sets: 5 },
  {
    id: "b4g3",
    buy: 4,
    get: 3,
    label: "+3 FREE SETS",
    sets: 7,
    bestValue: true,
  },
];

const CustomPrints = () => {
  const [activeTab, setActiveTab] = useState<"posters" | "retro">("posters");
  const [files, setFiles] = useState<
    { id: string; file: File; preview: string }[]
  >([]);
  const [selectedSize, setSelectedSize] = useState<ValidSize | RetroSize>("A4");
  const [printQty, setPrintQty] = useState<PrintQty>(10);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        id: Math.random().toString(36).substring(7),
        file: f,
        preview: URL.createObjectURL(f),
      }));
      const limit = activeTab === "retro" ? printQty : 99;
      setFiles((prev) => [...prev, ...newFiles].slice(0, limit));
    }
  };

  const stats = useMemo(() => {
    if (activeTab === "posters") {
      const count = files.length;
      const basePrice =
        (SIZE_INFO[selectedSize as ValidSize]?.basePrice || 0) + 30;
      const freeItems = Math.floor(count / 4);
      const totalPrice = (count - freeItems) * basePrice;
      return { count, freeItems, totalPrice, basePrice };
    } else {
      const basePrice = selectedSize === "3.5 x 4.2" ? 179 : 249;
      const offer = COMBO_OFFERS.find((o) => o.id === selectedOffer);
      const multiplier = offer ? offer.buy : 1;
      return {
        count: files.length,
        totalPrice: basePrice * multiplier,
        basePrice,
      };
    }
  }, [files, selectedSize, activeTab, selectedOffer]);

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-32 pb-32 px-6 max-w-[1400px] mx-auto">
        {/* TAB NAVIGATION - Industrial Switcher */}
        <div className="flex justify-center mb-20">
          <div className="flex bg-white border-4 border-foreground p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => {
                setActiveTab("posters");
                setFiles([]);
                setSelectedSize("A4");
                setSelectedOffer(null);
              }}
              className={`flex items-center gap-3 px-10 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === "posters" ? "bg-foreground text-background shadow-[inset_4px_4px_0px_rgba(0,212,255,1)]" : "hover:bg-muted"}`}
            >
              <ImageIcon size={16} /> Custom Posters
            </button>
            <button
              onClick={() => {
                setActiveTab("retro");
                setFiles([]);
                setSelectedSize("3.5 x 4.2");
              }}
              className={`flex items-center gap-3 px-10 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === "retro" ? "bg-foreground text-background shadow-[inset_4px_4px_0px_rgba(0,212,255,1)]" : "hover:bg-muted"}`}
            >
              <Camera size={16} /> Retro Prints
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* LEFT: UPLOAD & PREVIEW */}
          <div className="space-y-10">
            <div className="relative group aspect-video border-4 border-dashed border-foreground/20 hover:border-primary bg-white flex flex-col items-center justify-center p-12 text-center transition-all cursor-pointer">
              <Upload
                size={48}
                className="text-foreground/10 group-hover:text-primary mb-6 transition-all group-hover:-translate-y-2"
              />
              <h3 className="font-display text-2xl font-black uppercase tracking-tighter">
                {activeTab === "retro"
                  ? `DROP ${printQty} SNAPSHOTS`
                  : "UPLOAD YOUR DESIGNS"}
              </h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mt-2">
                High-res JPG/PNG preferred for peak sharpness
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
              <AnimatePresence>
                {files.map((f) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    key={f.id}
                    className={`relative p-1 bg-white border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] group ${activeTab === "retro" ? "aspect-[3.5/4.2]" : "aspect-[2/3]"}`}
                  >
                    <img
                      src={f.preview}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                    <button
                      onClick={() =>
                        setFiles(files.filter((x) => x.id !== f.id))
                      }
                      className="absolute -top-3 -right-3 bg-accent text-white w-8 h-8 border-2 border-foreground flex items-center justify-center hover:bg-foreground transition-all rotate-12"
                    >
                      <X size={16} strokeWidth={3} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: STUDIO CONFIG */}
          <div className="space-y-12 bg-white border-4 border-foreground p-10 md:p-14 shadow-[16px_16px_0px_0px_rgba(0,212,255,1)]">
            <header className="space-y-4 border-b-4 border-foreground pb-10">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-accent fill-accent" />
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/40">
                  Studio Proc01
                </span>
              </div>
              <h1 className="font-display text-6xl font-black uppercase tracking-tighter italic leading-none">
                CONFIG <span className="text-primary not-italic">BASE.</span>
              </h1>
              <div className="flex items-end justify-between pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">
                    Net Investment
                  </span>
                  <span className="font-display text-6xl font-black italic text-foreground leading-none">
                    ₹{stats.totalPrice}
                  </span>
                </div>
                {selectedOffer && (
                  <div className="bg-accent-lime border-2 border-foreground px-4 py-2 text-[10px] font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    OFFER SECURED
                  </div>
                )}
              </div>
            </header>

            {/* SELECTION GRID */}
            <div className="space-y-10">
              <div className="space-y-6">
                <label className="text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
                  <Ruler size={16} /> Choose Frame Dimensions
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {activeTab === "posters"
                    ? (Object.keys(SIZE_INFO) as ValidSize[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`p-6 border-4 text-left transition-all ${selectedSize === s ? "bg-foreground text-background border-foreground shadow-[inset_4px_4px_0px_rgba(0,212,255,1)]" : "bg-white border-foreground/10 hover:border-foreground"}`}
                        >
                          <p className="text-xl font-black italic uppercase leading-none">
                            {s}
                          </p>
                          <p className="text-[10px] uppercase mt-2 font-bold tracking-widest opacity-60">
                            {SIZE_INFO[s].dims}
                          </p>
                        </button>
                      ))
                    : (["3.5 x 4.2", "A6"] as RetroSize[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`p-6 border-4 text-left transition-all ${selectedSize === s ? "bg-foreground text-background border-foreground shadow-[inset_4px_4px_0px_rgba(0,212,255,1)]" : "bg-white border-foreground/10 hover:border-foreground"}`}
                        >
                          <p className="text-xl font-black italic uppercase leading-none">
                            {s}
                          </p>
                        </button>
                      ))}
                </div>
              </div>

              {activeTab === "retro" && (
                <div className="space-y-6">
                  <label className="text-[11px] font-black uppercase tracking-widest">
                    Set Capacity (Photos per Pack)
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {[10, 20, 30, 40, 50].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setPrintQty(q as PrintQty);
                          setFiles([]);
                        }}
                        className={`py-4 border-2 font-black transition-all ${printQty === q ? "bg-primary text-foreground border-foreground" : "bg-white border-foreground/10 hover:border-foreground"}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* OFFERS AREA */}
              <div className="space-y-6 pt-10 border-t-2 border-foreground/5">
                <p className="text-[11px] font-black text-primary uppercase flex items-center gap-3">
                  <Zap size={16} fill="currentColor" />{" "}
                  {activeTab === "posters"
                    ? "POSTER PROTOCOL"
                    : "BULK DISCOUNTS"}
                </p>
                {activeTab === "posters" ? (
                  <div className="p-8 border-4 border-foreground bg-accent-lime shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-sm font-black italic uppercase">
                      The 4th Element is Free.
                    </p>
                    <p className="text-[10px] text-foreground/60 mt-2 font-bold uppercase leading-tight">
                      Add 4 posters, pay for 3. Automatic system unlock.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {COMBO_OFFERS.map((o) => (
                      <button
                        key={o.id}
                        onClick={() =>
                          setSelectedOffer(selectedOffer === o.id ? null : o.id)
                        }
                        className={`relative p-5 border-4 text-left transition-all ${selectedOffer === o.id ? "bg-foreground text-background border-foreground" : "bg-white border-foreground/10 hover:border-foreground"}`}
                      >
                        {o.bestValue && (
                          <span className="absolute -top-3 right-4 bg-primary text-[8px] text-foreground px-2 py-1 font-black uppercase border-2 border-foreground">
                            BEST VALUE
                          </span>
                        )}
                        <p
                          className={`text-xs font-black uppercase leading-tight ${selectedOffer === o.id ? "text-primary" : ""}`}
                        >
                          BUY {o.buy} SETS
                        </p>
                        <p className="text-[9px] font-bold mt-1 tracking-widest">
                          {o.label}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ACTION CALL */}
              <div className="space-y-6 pt-10 border-t-2 border-foreground/5">
                <div className="relative group">
                  <MessageSquare
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-all"
                    size={20}
                  />
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WHATSAPP NUMBER"
                    className="bg-muted border-4 border-foreground rounded-none h-20 text-sm font-black tracking-[0.3em] px-16 focus-visible:ring-0 focus:bg-white transition-all placeholder:text-foreground/10"
                  />
                </div>
                <Button
                  disabled={files.length === 0}
                  className="w-full h-24 bg-foreground text-background font-black uppercase tracking-[0.4em] text-lg rounded-none hover:bg-primary hover:text-foreground transition-all shadow-[12px_12px_0px_0px_rgba(255,46,99,1)] hover:shadow-none group"
                >
                  {activeTab === "posters"
                    ? `SECURE ${stats.count} POSTERS`
                    : `CONFIRM RETRO PACK`}
                  <ChevronRight
                    size={24}
                    className="ml-4 group-hover:translate-x-2 transition-transform"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomPrints;