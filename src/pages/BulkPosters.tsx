// import React, { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const BulkPosters = () => {
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => setLoading(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white font-bricolage transition-colors duration-500">
//       <Navbar />
//       <main className="pt-48 pb-20 px-6 max-w-[800px] mx-auto text-center">
//         <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">
//           // Wholesale Protocol
//         </span>
//         <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none mb-10">
//           Bulk <span className="text-primary">Supply.</span>
//         </h1>
//         <p className="text-black/50 dark:text-white/50 text-lg mb-16 leading-relaxed uppercase font-bold tracking-tight">
//           Planning a cafe, a studio, or a retail shop? We provide massive
//           discounts on bulk poster and sticker orders.
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6 text-left border border-black/5 dark:border-white/5 p-10 bg-black/[0.01] dark:bg-white/[0.01]"
//         >
//           <div className="grid md:grid-cols-2 gap-6">
//             <Input
//               required
//               placeholder="FULL NAME"
//               className="rounded-none bg-transparent border-black/10 dark:border-white/10 h-16 text-[10px] font-black tracking-widest"
//             />
//             <Input
//               required
//               type="email"
//               placeholder="BUSINESS EMAIL"
//               className="rounded-none bg-transparent border-black/10 dark:border-white/10 h-16 text-[10px] font-black tracking-widest"
//             />
//           </div>
//           <Input
//             required
//             placeholder="QUANTITY NEEDED (E.G. 100+)"
//             className="rounded-none bg-transparent border-black/10 dark:border-white/10 h-16 text-[10px] font-black tracking-widest"
//           />
//           <textarea
//             required
//             className="w-full bg-transparent border border-black/10 dark:border-white/10 p-6 min-h-[200px] text-[10px] font-black tracking-widest uppercase outline-none focus:border-primary"
//             placeholder="TELL US ABOUT YOUR PROJECT..."
//           ></textarea>
//           <Button
//             disabled={loading}
//             className="w-full h-20 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-primary dark:hover:bg-primary transition-all"
//           >
//             {loading ? "Processing..." : "Request Quote"}
//           </Button>
//         </form>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default BulkPosters;

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Box, Zap, Send, Building2 } from "lucide-react";

const BulkPosters = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-48 pb-32 px-6 max-w-[900px] mx-auto text-center">
        {/* TOP BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent-lime border-2 border-foreground mb-8 rotate-[-1deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <Building2 size={14} className="text-foreground" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
            B2B & RETAIL PROTOCOL
          </span>
        </motion.div>

        {/* HEADING */}
        <h1 className="font-display text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8] mb-12">
          BULK <span className="text-primary not-italic">SUPPLY.</span>
        </h1>

        <p className="text-foreground/60 text-lg md:text-xl mb-20 leading-tight uppercase font-bold tracking-tight max-w-2xl mx-auto">
          Scale your space. Whether it's a cafe, studio, or retail shop, we
          provide
          <span className="text-foreground"> high-volume artifacts </span> with
          massive tiered discounts.
        </p>

        {/* FORM SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          {/* Decorative Background Element */}
          <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none rotate-12">
            <Box size={200} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative z-10 space-y-8 text-left border-4 border-foreground p-8 md:p-16 bg-white shadow-[20px_20px_0px_0px_rgba(0,212,255,1)]"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">
                  Identity
                </label>
                <Input
                  required
                  placeholder="FULL NAME / BRAND"
                  className="rounded-none bg-transparent border-x-0 border-t-0 border-b-2 border-foreground/10 h-14 text-xs font-black tracking-widest focus-visible:ring-0 focus-visible:border-primary transition-all px-0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">
                  Communication
                </label>
                <Input
                  required
                  type="email"
                  placeholder="BUSINESS EMAIL"
                  className="rounded-none bg-transparent border-x-0 border-t-0 border-b-2 border-foreground/10 h-14 text-xs font-black tracking-widest focus-visible:ring-0 focus-visible:border-primary transition-all px-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">
                Volume Requirement
              </label>
              <Input
                required
                placeholder="ESTIMATED QUANTITY (E.G. 250+ PIECES)"
                className="rounded-none bg-transparent border-x-0 border-t-0 border-b-2 border-foreground/10 h-14 text-xs font-black tracking-widest focus-visible:ring-0 focus-visible:border-primary transition-all px-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">
                Project Brief
              </label>
              <textarea
                required
                className="w-full bg-foreground/5 border-2 border-foreground p-6 min-h-[180px] text-xs font-black tracking-widest uppercase outline-none focus:border-primary transition-all placeholder:text-foreground/20"
                placeholder="TELL US ABOUT THE SPACE OR PROJECT..."
              ></textarea>
            </div>

            <Button
              disabled={loading}
              className="w-full h-20 bg-foreground text-background font-black uppercase tracking-[0.4em] text-sm hover:bg-primary hover:text-foreground transition-all rounded-none flex items-center justify-center gap-4 group"
            >
              {loading ? (
                "CALCULATING..."
              ) : (
                <>
                  REQUEST QUOTATION{" "}
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 opacity-30">
                <Zap size={14} className="fill-current" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                  Priority Processing
                </span>
              </div>
              <div className="flex items-center gap-2 opacity-30">
                <Zap size={14} className="fill-current" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                  Tiered Pricing
                </span>
              </div>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default BulkPosters;