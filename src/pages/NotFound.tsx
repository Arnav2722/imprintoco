// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error("404 Error: User attempted to access non-existent route:", location.pathname);
//   }, [location.pathname]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-muted">
//       <div className="text-center">
//         <h1 className="mb-4 text-4xl font-bold">404</h1>
//         <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
//         <a href="/" className="text-primary underline hover:text-primary/90">
//           Return to Home
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NotFound;

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 ERROR: UNAUTHORIZED PATH ACCESS ATTEMPTED:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage overflow-hidden">
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-[#0a0a0a] border border-white/5 p-10 md:p-16 text-left max-w-2xl w-full rounded-sm"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-5 border-b border-white/10 pb-8">
              <AlertTriangle
                className="text-primary"
                size={48}
                strokeWidth={2}
              />
              <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                404
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                Signal Lost. <br /> Path De-synchronized.
              </h2>
              <p className="text-gray-500 text-[11px] font-bold tracking-[0.2em] uppercase leading-relaxed max-w-md">
                The artifact you are looking for at{" "}
                <span className="text-primary">{location.pathname}</span> has
                been moved, archived, or never existed in this vault.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/"
                className="flex items-center justify-center gap-3 bg-white text-black font-black uppercase tracking-widest text-[11px] h-14 px-10 rounded-none transition-all hover:bg-primary"
              >
                <ArrowLeft size={16} /> Return to Terminal
              </Link>

              <Link
                to="/shop"
                className="flex items-center justify-center gap-3 border border-white/10 text-white font-black uppercase tracking-widest text-[11px] h-14 px-10 rounded-none transition-all hover:bg-white hover:text-black"
              >
                <Search size={16} /> Browse Collection
              </Link>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="w-1 h-1 bg-white/20"></div>
            <div className="w-8 h-1 bg-white/20"></div>
          </div>
        </motion.div>

        <div className="absolute bottom-20 left-10 pointer-events-none opacity-5 hidden lg:block">
          <p className="text-[120px] font-black uppercase tracking-tighter leading-none select-none">
            Restricted
            <br />
            Access
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;