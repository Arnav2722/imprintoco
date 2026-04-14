// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { ChevronDown } from "lucide-react";
// import { useState } from "react";

// interface FAQItem {
//   q: string;
//   a: string;
// }

// const FAQ_DATA: FAQItem[] = [
//   {
//     q: "How long does shipping take?",
//     a: "Orders are processed within 48 hours and typically reach you in 5-7 business days across India.",
//   },
//   {
//     q: "Are the posters waterproof?",
//     a: "Our posters are printed on high-quality matte paper. Our stickers, however, are 100% waterproof vinyl.",
//   },
//   {
//     q: "Can I cancel my order?",
//     a: "Since we print on demand, cancellations are only possible within 2 hours of placing the order.",
//   },
// ];

// const FAQs = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggle = (idx: number) => {
//     setOpenIndex(openIndex === idx ? null : idx);
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white font-bricolage transition-colors duration-500">
//       <Navbar />
//       <main className="pt-40 pb-20 px-6 max-w-[900px] mx-auto">
//         <h1 className="text-6xl font-black uppercase tracking-tighter italic mb-16">
//           Help <span className="text-primary">Center</span>
//         </h1>

//         <div className="space-y-4">
//           {FAQ_DATA.map((item, i) => (
//             <div
//               key={i}
//               className="border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]"
//             >
//               <button
//                 onClick={() => toggle(i)}
//                 className="w-full p-8 flex justify-between items-center text-left transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
//               >
//                 <span className="text-[12px] font-black uppercase tracking-widest italic">
//                   {item.q}
//                 </span>
//                 <ChevronDown
//                   className={`transition-transform duration-300 ${openIndex === i ? "rotate-180 text-primary" : ""}`}
//                 />
//               </button>
//               {openIndex === i && (
//                 <div className="px-8 pb-8 text-black/50 dark:text-white/50 text-sm leading-relaxed uppercase font-bold tracking-tight">
//                   {item.a}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default FAQs;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, HelpCircle, Zap, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    q: "How long does shipping take?",
    a: "Orders are processed within 48 hours. Dispatch typically reaches your location in 5-7 business days across India. Tracking IDs are issued via WhatsApp and Email once secure.",
  },
  {
    q: "Are the posters waterproof?",
    a: "Our posters are printed on heavyweight 250gsm matte paper (Archival quality). While they resist humidity, our stickers are the ones featuring 100% waterproof vandal-proof vinyl.",
  },
  {
    q: "Can I cancel my order?",
    a: "Since every piece is printed on demand specifically for you, cancellations are only accepted within a 2-hour window after the order protocol is initiated.",
  },
  {
    q: "Do you accept custom designs?",
    a: "Yes. Navigate to the 'Custom Studio' in our menu to upload your personal designs for professional grade printing.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-48 pb-32 px-6 max-w-[1000px] mx-auto">
        {/* HEADER SECTION */}
        <header className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <Zap size={16} className="text-accent fill-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/40">
                Knowledge Base
              </span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
              HELP <span className="text-primary not-italic">CENTER.</span>
            </h1>
          </div>
          <div className="bg-white border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1 max-w-[240px] mx-auto md:mx-0">
            <p className="text-[10px] font-black uppercase leading-tight text-foreground/60">
              Direct protocols for logistics, quality standards, and order
              procurement.
            </p>
          </div>
        </header>

        {/* FAQ ACCORDION */}
        <div className="space-y-6">
          {FAQ_DATA.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`border-4 transition-all duration-300 ${
                  isOpen
                    ? "border-foreground bg-white shadow-[10px_10px_0px_0px_rgba(0,212,255,1)]"
                    : "border-foreground/10 bg-white/50 hover:border-foreground/30"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full p-8 flex justify-between items-center text-left group"
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`text-xl font-black italic transition-colors ${isOpen ? "text-primary" : "text-foreground/20"}`}
                    >
                      0{i + 1}
                    </span>
                    <span className="text-sm md:text-lg font-black uppercase tracking-tight leading-none">
                      {item.q}
                    </span>
                  </div>
                  <div
                    className={`w-10 h-10 border-2 border-foreground flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-foreground text-background" : "bg-transparent text-foreground/20"}`}
                  >
                    <ChevronDown
                      size={20}
                      strokeWidth={3}
                      className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-10 ml-0 md:ml-16 border-l-4 border-primary/20 md:pl-8 mx-8 mb-4">
                        <p className="text-foreground/60 text-base md:text-lg font-bold uppercase leading-snug tracking-tight">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* SUPPORT FOOTER */}
        <div className="mt-24 p-12 bg-accent-lime border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center">
          <h3 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">
            STILL CONFUSED?
          </h3>
          <p className="text-[11px] font-black uppercase tracking-widest text-foreground/60 mb-8">
            Direct human support is available 10AM - 7PM
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-4 bg-foreground text-background px-10 py-5 font-black uppercase text-xs tracking-[0.2em] hover:bg-primary hover:text-foreground transition-all shadow-[6px_6px_0px_0px_rgba(255,46,99,1)] hover:shadow-none"
          >
            CONTACT PROTOCOL <HelpCircle size={18} />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;