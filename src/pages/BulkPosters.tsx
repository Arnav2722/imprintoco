// import React, { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
// import { Box, Zap, Send, Building2 } from "lucide-react";

// const BulkPosters = () => {
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => setLoading(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-48 pb-32 px-6 max-w-[900px] mx-auto text-center">
//         {/* TOP BADGE */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="inline-flex items-center gap-2 px-4 py-2 bg-accent-lime border-2 border-foreground mb-8 rotate-[-1deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
//         >
//           <Building2 size={14} className="text-foreground" />
//           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
//             B2B & RETAIL PROTOCOL
//           </span>
//         </motion.div>

//         {/* HEADING */}
//         <h1 className="font-display text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8] mb-12">
//           BULK <span className="text-primary not-italic">SUPPLY.</span>
//         </h1>

//         <p className="text-foreground/60 text-lg md:text-xl mb-20 leading-tight uppercase font-bold tracking-tight max-w-2xl mx-auto">
//           Scale your space. Whether it's a cafe, studio, or retail shop, we
//           provide
//           <span className="text-foreground"> high-volume artifacts </span> with
//           massive tiered discounts.
//         </p>

//         {/* FORM SECTION */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="relative"
//         >
//           {/* Decorative Background Element */}
//           <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none rotate-12">
//             <Box size={200} />
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="relative z-10 space-y-8 text-left border-4 border-foreground p-8 md:p-16 bg-white shadow-[20px_20px_0px_0px_rgba(0,212,255,1)]"
//           >
//             <div className="grid md:grid-cols-2 gap-8">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">
//                   Identity
//                 </label>
//                 <Input
//                   required
//                   placeholder="FULL NAME / BRAND"
//                   className="rounded-none bg-transparent border-x-0 border-t-0 border-b-2 border-foreground/10 h-14 text-xs font-black tracking-widest focus-visible:ring-0 focus-visible:border-primary transition-all px-0"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">
//                   Communication
//                 </label>
//                 <Input
//                   required
//                   type="email"
//                   placeholder="BUSINESS EMAIL"
//                   className="rounded-none bg-transparent border-x-0 border-t-0 border-b-2 border-foreground/10 h-14 text-xs font-black tracking-widest focus-visible:ring-0 focus-visible:border-primary transition-all px-0"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">
//                 Volume Requirement
//               </label>
//               <Input
//                 required
//                 placeholder="ESTIMATED QUANTITY (E.G. 250+ PIECES)"
//                 className="rounded-none bg-transparent border-x-0 border-t-0 border-b-2 border-foreground/10 h-14 text-xs font-black tracking-widest focus-visible:ring-0 focus-visible:border-primary transition-all px-0"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">
//                 Project Brief
//               </label>
//               <textarea
//                 required
//                 className="w-full bg-foreground/5 border-2 border-foreground p-6 min-h-[180px] text-xs font-black tracking-widest uppercase outline-none focus:border-primary transition-all placeholder:text-foreground/20"
//                 placeholder="TELL US ABOUT THE SPACE OR PROJECT..."
//               ></textarea>
//             </div>

//             <Button
//               disabled={loading}
//               className="w-full h-20 bg-foreground text-background font-black uppercase tracking-[0.4em] text-sm hover:bg-primary hover:text-foreground transition-all rounded-none flex items-center justify-center gap-4 group"
//             >
//               {loading ? (
//                 "CALCULATING..."
//               ) : (
//                 <>
//                   REQUEST QUOTATION{" "}
//                   <Send
//                     size={18}
//                     className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
//                   />
//                 </>
//               )}
//             </Button>

//             <div className="flex items-center justify-center gap-6 pt-4">
//               <div className="flex items-center gap-2 opacity-30">
//                 <Zap size={14} className="fill-current" />
//                 <span className="text-[9px] font-black uppercase tracking-[0.2em]">
//                   Priority Processing
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 opacity-30">
//                 <Zap size={14} className="fill-current" />
//                 <span className="text-[9px] font-black uppercase tracking-[0.2em]">
//                   Tiered Pricing
//                 </span>
//               </div>
//             </div>
//           </form>
//         </motion.div>
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

      <main className="pt-32 md:pt-48 pb-20 md:pb-32 px-6 max-w-[900px] mx-auto text-center">
        {/* TOP BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-accent-lime border-2 border-foreground mb-8 md:mb-10 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          <Building2 size={14} className="text-foreground" />
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-foreground">
            B2B Services
          </span>
        </motion.div>

        {/* HEADING */}
        <h1 className="font-display text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[1.1] mb-10">
          BULK <span className="text-primary">SUPPLY</span>
        </h1>

        <p className="text-foreground/60 text-[9px] md:text-base mb-16 md:mb-20 leading-relaxed uppercase font-black tracking-tight max-w-2xl mx-auto">
          Scale your space. Whether it is a cafe, studio, or retail shop, we
          provide{" "}
          <span className="text-foreground"> high volume products. </span>
          {/* with discounts. */}
        </p>

        {/* FORM SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          {/* Decorative Background Element */}
          <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none rotate-12 hidden md:block">
            <Box size={200} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative z-10 space-y-6 md:space-y-8 text-left border-2 md:border-4 border-foreground p-6 md:p-16 bg-white shadow-[10px_10px_0px_0px_rgba(0,212,255,1)] md:shadow-[20px_20px_0px_0px_rgba(0,212,255,1)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-foreground/40 ml-1">
                  NAME
                </label>
                <Input
                  required
                  placeholder="NAME OF YOUR BRAND"
                  className="rounded-none bg-transparent border-x-0 border-t-0 border-b-2 border-foreground/10 h-12 md:h-14 text-[10px] md:text-xs font-black tracking-widest focus-visible:ring-0 focus-visible:border-primary transition-all px-0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-foreground/40 ml-1">
                  EMAIL ID
                </label>
                <Input
                  required
                  type="email"
                  placeholder="EMAIL "
                  className="rounded-none bg-transparent border-x-0 border-t-0 border-b-2 border-foreground/10 h-12 md:h-14 text-[10px] md:text-xs font-black tracking-widest focus-visible:ring-0 focus-visible:border-primary transition-all px-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-foreground/40 ml-1">
                Volume Requirement
              </label>
              <Input
                required
                placeholder="QUANTITY (E.G. 250+)"
                className="rounded-none bg-transparent border-x-0 border-t-0 border-b-2 border-foreground/10 h-12 md:h-14 text-[10px] md:text-xs font-black tracking-widest focus-visible:ring-0 focus-visible:border-primary transition-all px-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-foreground/40 ml-1">
                Write your message
              </label>
              <textarea
                required
                className="w-full bg-foreground/5 border-2 border-foreground p-4 md:p-6 min-h-[150px] text-[10px] md:text-xs font-black tracking-widest uppercase outline-none focus:border-primary transition-all placeholder:text-foreground/20"
                placeholder="TELL US ABOUT THE PROJECT..."
              ></textarea>
            </div>

            <Button
              disabled={loading}
              className="w-full h-14 md:h-20 bg-foreground text-background font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-primary hover:text-foreground transition-all rounded-none flex items-center justify-center gap-3 md:gap-4 group shadow-[4px_4px_0px_0px_rgba(0,212,255,1)]"
            >
              {loading ? (
                "CALCULATING..."
              ) : (
                <>
                  REQUEST QUOTATION{" "}
                  <Send
                    size={16}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </>
              )}
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-2">
              <div className="flex items-center gap-2 opacity-30">
                <Zap size={12} className="fill-current" />
                <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest">
                  Priority
                </span>
              </div>
              <div className="flex items-center gap-2 opacity-30">
                <Zap size={12} className="fill-current" />
                <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest">
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
