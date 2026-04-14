// import { useLocation, Link } from "react-router-dom";
// import { useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";
// import { AlertTriangle, ArrowLeft, Search } from "lucide-react";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error(
//       "404 ERROR: UNAUTHORIZED PATH ACCESS ATTEMPTED:",
//       location.pathname,
//     );
//   }, [location.pathname]);

//   return (
//     <div className="min-h-screen bg-[#050505] text-white font-bricolage overflow-hidden">
//       <Navbar />

//       <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-20">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="relative bg-[#0a0a0a] border border-white/5 p-10 md:p-16 text-left max-w-2xl w-full rounded-sm"
//         >
//           <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

//           <div className="relative z-10 space-y-8">
//             <div className="flex items-center gap-5 border-b border-white/10 pb-8">
//               <AlertTriangle
//                 className="text-primary"
//                 size={48}
//                 strokeWidth={2}
//               />
//               <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none">
//                 404
//               </h1>
//             </div>

//             <div className="space-y-4">
//               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
//                 Signal Lost. <br /> Path De-synchronized.
//               </h2>
//               <p className="text-gray-500 text-[11px] font-bold tracking-[0.2em] uppercase leading-relaxed max-w-md">
//                 The artifact you are looking for at{" "}
//                 <span className="text-primary">{location.pathname}</span> has
//                 been moved, archived, or never existed in this vault.
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <Link
//                 to="/"
//                 className="flex items-center justify-center gap-3 bg-white text-black font-black uppercase tracking-widest text-[11px] h-14 px-10 rounded-none transition-all hover:bg-primary"
//               >
//                 <ArrowLeft size={16} /> Return to Terminal
//               </Link>

//               <Link
//                 to="/shop"
//                 className="flex items-center justify-center gap-3 border border-white/10 text-white font-black uppercase tracking-widest text-[11px] h-14 px-10 rounded-none transition-all hover:bg-white hover:text-black"
//               >
//                 <Search size={16} /> Browse Collection
//               </Link>
//             </div>
//           </div>

//           <div className="absolute bottom-4 right-4 flex gap-2">
//             <div className="w-1 h-1 bg-white/20"></div>
//             <div className="w-8 h-1 bg-white/20"></div>
//           </div>
//         </motion.div>

//         <div className="absolute bottom-20 left-10 pointer-events-none opacity-5 hidden lg:block">
//           <p className="text-[120px] font-black uppercase tracking-tighter leading-none select-none">
//             Restricted
//             <br />
//             Access
//           </p>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default NotFound;

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, Search, Zap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 ERROR: UNAUTHORIZED PATH ACCESS ATTEMPTED:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black overflow-hidden">
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-20 relative">
        {/* Background Graphic Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-full text-center">
          <h2 className="text-[30vw] font-black uppercase italic leading-none select-none">
            LOST
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white border-4 border-foreground p-10 md:p-16 text-left max-w-2xl w-full shadow-[20px_20px_0px_0px_rgba(0,212,255,1)] z-10"
        >
          <div className="space-y-10 relative z-10">
            {/* Error Header */}
            <div className="flex items-center gap-6 border-b-4 border-foreground/5 pb-10">
              <div className="w-20 h-20 bg-accent flex items-center justify-center rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <AlertTriangle
                  className="text-white"
                  size={40}
                  strokeWidth={3}
                />
              </div>
              <h1 className="font-display text-8xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">
                404
              </h1>
            </div>

            {/* Error Message */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-primary fill-primary" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/40">
                  Signal Terminated
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
                PATH <br />{" "}
                <span className="text-primary italic">DE-SYNCHED.</span>
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg font-bold uppercase leading-tight tracking-tight max-w-md">
                The artifact you are looking for at{" "}
                <span className="text-foreground border-b-2 border-primary">
                  {location.pathname}
                </span>{" "}
                has been moved, archived, or never existed in the current drop.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-4 bg-foreground text-background font-black uppercase tracking-widest text-xs h-16 px-10 rounded-none transition-all hover:bg-primary hover:text-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
              >
                <ArrowLeft size={18} strokeWidth={3} /> RETURN HOME
              </Link>

              <Link
                to="/shop"
                className="flex-1 flex items-center justify-center gap-4 border-4 border-foreground bg-white text-foreground font-black uppercase tracking-widest text-xs h-16 px-10 rounded-none transition-all hover:bg-accent-lime shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
              >
                <Search size={18} strokeWidth={3} /> THE SHOP
              </Link>
            </div>
          </div>

          {/* Industrial Detail Decoration */}
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <div className="flex gap-1 flex-col items-end">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`h-1 bg-foreground w-${(i + 1) * 4}`} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Floating Restriction Label */}
        <div className="mt-12 opacity-10 hidden lg:block">
          <p className="text-xl font-black uppercase tracking-[1em] text-foreground">
            RESTRICTED ACCESS
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;