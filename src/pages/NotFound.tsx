// import { useLocation, Link } from "react-router-dom";
// import { useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";
// import { AlertTriangle, ArrowLeft, Search, Zap } from "lucide-react";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error(
//       "404 ERROR: UNAUTHORIZED PATH ACCESS ATTEMPTED:",
//       location.pathname,
//     );
//   }, [location.pathname]);

//   return (
//     <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black overflow-hidden">
//       <Navbar />

//       <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-20 relative">
//         {/* Background Graphic Accent */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-full text-center">
//           <h2 className="text-[30vw] font-black uppercase italic leading-none select-none">
//             LOST
//           </h2>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative bg-white border-4 border-foreground p-10 md:p-16 text-left max-w-2xl w-full shadow-[20px_20px_0px_0px_rgba(0,212,255,1)] z-10"
//         >
//           <div className="space-y-10 relative z-10">
//             {/* Error Header */}
//             <div className="flex items-center gap-6 border-b-4 border-foreground/5 pb-10">
//               <div className="w-20 h-20 bg-accent flex items-center justify-center rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//                 <AlertTriangle
//                   className="text-white"
//                   size={40}
//                   strokeWidth={3}
//                 />
//               </div>
//               <h1 className="font-display text-8xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">
//                 404
//               </h1>
//             </div>

//             {/* Error Message */}
//             <div className="space-y-6">
//               <div className="flex items-center gap-2">
//                 <Zap size={16} className="text-primary fill-primary" />
//                 <span className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/40">
//                   Signal Terminated
//                 </span>
//               </div>
//               <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
//                 PATH <br />{" "}
//                 <span className="text-primary italic">DE-SYNCHED.</span>
//               </h2>
//               <p className="text-foreground/60 text-sm md:text-lg font-bold uppercase leading-tight tracking-tight max-w-md">
//                 The artifact you are looking for at{" "}
//                 <span className="text-foreground border-b-2 border-primary">
//                   {location.pathname}
//                 </span>{" "}
//                 has been moved, archived, or never existed in the current drop.
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row gap-6 pt-6">
//               <Link
//                 to="/"
//                 className="flex-1 flex items-center justify-center gap-4 bg-foreground text-background font-black uppercase tracking-widest text-xs h-16 px-10 rounded-none transition-all hover:bg-primary hover:text-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
//               >
//                 <ArrowLeft size={18} strokeWidth={3} /> RETURN HOME
//               </Link>

//               <Link
//                 to="/shop"
//                 className="flex-1 flex items-center justify-center gap-4 border-4 border-foreground bg-white text-foreground font-black uppercase tracking-widest text-xs h-16 px-10 rounded-none transition-all hover:bg-accent-lime shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
//               >
//                 <Search size={18} strokeWidth={3} /> THE SHOP
//               </Link>
//             </div>
//           </div>

//           {/* Industrial Detail Decoration */}
//           <div className="absolute top-0 right-0 p-4 opacity-10">
//             <div className="flex gap-1 flex-col items-end">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className={`h-1 bg-foreground w-${(i + 1) * 4}`} />
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* Floating Restriction Label */}
//         <div className="mt-12 opacity-10 hidden lg:block">
//           <p className="text-xl font-black uppercase tracking-[1em] text-foreground">
//             RESTRICTED ACCESS
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
import { Home, AlertCircle, ShoppingBag } from "lucide-react";

const NotFound = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404 Error: Page not found at", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-black font-body flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-24 px-6 relative max-w-[1200px] mx-auto w-full">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center w-full relative z-10">
          <div className="md:col-span-5 text-center md:text-left flex flex-col items-center md:items-start border-b-4 md:border-b-0 md:border-r-4 border-black pb-12 md:pb-0 md:pr-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <h1 className="font-display text-[22vw] md:text-[9rem] font-black uppercase tracking-tighter leading-none text-black">
                404
              </h1>
              {/* This is the stick/indicator - fixed position */}
              <div className="hidden md:block absolute -bottom-10 left-0 w-1 h-20 bg-black opacity-20" />
            </motion.div>

            <div className="flex items-center gap-2 mt-8 md:mt-16 opacity-30">
              <AlertCircle size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Page Not Found
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-7 space-y-10"
          >
            <div className="space-y-4">
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
                LOOKS LIKE YOU'RE{" "}
                <span className="text-primary italic">LOST.</span>
              </h2>
              <p className="text-black/60 text-sm md:text-lg font-bold uppercase leading-snug max-w-lg">
                The product or page you are looking for at{" "}
                <span className="text-black border-b-2 border-primary">
                  {location.pathname}
                </span>{" "}
                doesn't exist or has been moved to a new collection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-3 bg-black text-white font-black uppercase tracking-widest text-[10px] h-14 shadow-[4px_4px_0px_0px_#00D4FF] hover:shadow-none transition-all"
              >
                <Home size={16} /> Back to Home
              </Link>

              <Link
                to="/shop"
                className="flex-1 flex items-center justify-center gap-3 border-4 border-black bg-white text-black font-black uppercase tracking-widest text-[10px] h-14 hover:bg-black/5 transition-all"
              >
                <ShoppingBag size={16} /> Browse Posters
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 right-10 opacity-10 hidden lg:block text-right">
          <div className="flex gap-1 flex-col items-end">
            <div className="h-1 bg-black w-20" />
            <div className="h-1 bg-black w-10" />
            <p className="text-[8px] font-black mt-2">SYS_ERROR_404</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;