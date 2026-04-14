// import React, { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Trash2, Camera } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const PACK_SIZES: number[] = [10, 20, 30, 50];

// interface RetroImage {
//   id: string;
//   url: string;
// }

// const RetroStudio = () => {
//   const [qty, setQty] = useState<number>(10);
//   const [images, setImages] = useState<RetroImage[]>([]);

//   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;

//     const uploaded = Array.from(e.target.files).map((file) => ({
//       id: Math.random().toString(36).substring(7),
//       url: URL.createObjectURL(file),
//     }));

//     setImages((prev) => [...prev, ...uploaded].slice(0, qty));
//   };

//   const removeImage = (id: string) => {
//     setImages((prev) => prev.filter((img) => img.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white font-bricolage transition-colors duration-500">
//       <Navbar />
//       <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
//         <div className="grid lg:grid-cols-2 gap-20">
//           <div className="space-y-8">
//             <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
//               Retro <span className="text-primary">Studio</span>
//             </h1>
//             <div className="aspect-[4/5] bg-black/[0.03] dark:bg-white/[0.02] border border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center p-10 text-center relative group">
//               <Camera
//                 size={48}
//                 className="text-black/10 dark:text-white/10 mb-6 group-hover:text-primary transition-colors"
//               />
//               <p className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40">
//                 Upload {qty} memories to print
//               </p>
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleUpload}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 accept="image/*"
//               />
//             </div>

//             <div className="grid grid-cols-4 gap-4">
//               {images.map((img) => (
//                 <div
//                   key={img.id}
//                   className="aspect-square bg-white p-1 shadow-xl relative group border border-black/5"
//                 >
//                   <img
//                     src={img.url}
//                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
//                     alt="Retro Preview"
//                   />
//                   <button
//                     onClick={() => removeImage(img.id)}
//                     className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <Trash2 size={10} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-12">
//             <div className="space-y-6">
//               <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
//                 Select Pack Size
//               </label>
//               <div className="grid grid-cols-4 gap-4">
//                 {PACK_SIZES.map((s) => (
//                   <button
//                     key={s}
//                     onClick={() => {
//                       setQty(s);
//                       setImages([]);
//                     }}
//                     className={`py-4 border font-black transition-all ${qty === s ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white" : "border-black/10 dark:border-white/10 hover:border-primary"}`}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="p-10 bg-black/[0.02] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 space-y-6">
//               <div className="flex justify-between items-center">
//                 <span className="text-xs font-black uppercase tracking-widest">
//                   Selected Pack
//                 </span>
//                 <span className="text-2xl font-black italic">{qty} Prints</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-xs font-black uppercase tracking-widest text-primary">
//                   Price
//                 </span>
//                 <span className="text-4xl font-black italic">
//                   ₹{qty === 10 ? 199 : qty === 20 ? 349 : 799}
//                 </span>
//               </div>
//             </div>

//             <Button className="w-full h-20 bg-primary text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-black hover:text-white transition-all">
//               Initiate Production
//             </Button>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default RetroStudio;

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, Camera, Zap, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const PACK_SIZES: number[] = [10, 20, 30, 50];

interface RetroImage {
  id: string;
  url: string;
}

const RetroStudio = () => {
  const [qty, setQty] = useState<number>(10);
  const [images, setImages] = useState<RetroImage[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const uploaded = Array.from(e.target.files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...uploaded].slice(0, qty));
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-40 pb-32 px-6 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* LEFT: UPLOAD TERMINAL */}
          <div className="space-y-12">
            <header className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-accent fill-accent" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/40">
                  Studio Proc02
                </span>
              </div>
              <h1 className="font-display text-7xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
                RETRO <span className="text-primary not-italic">STUDIO.</span>
              </h1>
            </header>

            <div className="aspect-[4/5] bg-white border-4 border-dashed border-foreground/20 hover:border-primary flex flex-col items-center justify-center p-12 text-center relative group transition-all cursor-pointer shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]">
              <Camera
                size={64}
                strokeWidth={1.5}
                className="text-foreground/10 group-hover:text-primary mb-8 transition-all group-hover:-translate-y-2"
              />
              <h3 className="font-display text-2xl font-black uppercase tracking-tighter mb-2">
                MOUNT ASSETS
              </h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                UPLOAD {qty} SNAPSHOTS FOR THIS BATCH
              </p>
              <input
                type="file"
                multiple
                onChange={handleUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>

            <div className="grid grid-cols-4 gap-6">
              <AnimatePresence>
                {images.map((img) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    key={img.id}
                    className="aspect-square bg-white p-1.5 border-2 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] relative group"
                  >
                    <img
                      src={img.url}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      alt="Retro Preview"
                    />
                    <button
                      onClick={() => removeImage(img.id)}
                      className="absolute -top-3 -right-3 bg-accent text-white w-8 h-8 border-2 border-foreground flex items-center justify-center rotate-12 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                    >
                      <Trash2 size={14} strokeWidth={3} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: CONFIGURATION BASE */}
          <div className="space-y-12 bg-white border-4 border-foreground p-10 md:p-14 shadow-[20px_20px_0px_0px_rgba(0,212,255,1)]">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Package size={20} className="text-primary" />
                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground/40">
                  Select Batch Quantity
                </label>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {PACK_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setQty(s);
                      setImages([]);
                    }}
                    className={`py-6 border-4 font-black transition-all text-lg italic ${
                      qty === s
                        ? "bg-foreground text-background border-foreground shadow-[inset_4px_4px_0px_rgba(0,212,255,1)]"
                        : "bg-white border-foreground/5 text-foreground/20 hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-10 bg-muted border-4 border-foreground space-y-8 rotate-[-1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center border-b-2 border-foreground/10 pb-6">
                <span className="text-[11px] font-black uppercase tracking-widest text-foreground/40">
                  Current Manifest
                </span>
                <span className="text-3xl font-black italic uppercase tracking-tighter">
                  {qty} PRINTS
                </span>
              </div>

              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase tracking-widest text-primary mb-1">
                    Procurement Cost
                  </span>
                  <span className="font-display text-7xl font-black italic leading-none">
                    ₹
                    {qty === 10
                      ? 199
                      : qty === 20
                        ? 349
                        : qty === 30
                          ? 499
                          : 799}
                  </span>
                </div>
                <div className="bg-accent-lime border-2 border-foreground px-3 py-1 text-[10px] font-black uppercase">
                  Bulk Applied
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full h-24 bg-foreground text-background font-black uppercase tracking-[0.4em] text-lg rounded-none hover:bg-primary hover:text-foreground transition-all shadow-[12px_12px_0px_0px_rgba(255,46,99,1)] hover:shadow-none group active:translate-x-1 active:translate-y-1">
                INITIATE PRODUCTION{" "}
                <ArrowRight
                  size={24}
                  className="ml-4 group-hover:translate-x-2 transition-transform"
                />
              </Button>
              <p className="text-center mt-6 text-[10px] font-black uppercase tracking-widest text-foreground/20">
                System check: {images.length}/{qty} Assets Loaded
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RetroStudio;