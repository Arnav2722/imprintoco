// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Minus, Box, Paintbrush, Truck, MapPin } from "lucide-react";

// const faqs = [
//   {
//     question: "Is bulk ordering possible for outlets?",
//     answer:
//       "Yes. We cater to bulk requirements for businesses and commercial outlets. Drop us a message on WhatsApp for custom rates and logistical assistance.",
//     icon: <Box size={18} />,
//   },
//   {
//     question: "How do I order my own custom design?",
//     answer:
//       "Simple. Navigate to the 'Custom' tab in our menu. Upload your high-resolution artwork, select your size, and we will handle the precision printing and delivery.",
//     icon: <Paintbrush size={18} />,
//   },
//   {
//     question: "What is the typical delivery timeline?",
//     answer:
//       "Procurement and shipping usually take 5-7 business days, depending on your delivery zone. You will receive a tracking ID as soon as it's dispatched.",
//     icon: <Truck size={18} />,
//   },
//   {
//     question: "How can I track my procurement status?",
//     answer:
//       "Every order is tracked. Once secured, you will receive automated WhatsApp and Email notifications with your unique tracking ID and real-time status updates.",
//     icon: <MapPin size={18} />,
//   },
// ];

// const FAQSection = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   return (
//     <section className="py-24 bg-[#050505] selection:bg-primary selection:text-black">
//       <div className="max-w-[900px] mx-auto px-6">
//         {/* HEADER */}
//         <div className="mb-16 text-left">
//           <div className="flex items-center gap-2 mb-4">
//             <div className="w-10 h-[2px] bg-primary" />
//             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
//               Intelligence
//             </span>
//           </div>
//           <h2 className="font-bricolage text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
//             FAQ<span className="text-white/20">S</span>
//           </h2>
//         </div>

//         {/* ACCORDION LIST */}
//         <div className="space-y-4">
//           {faqs.map((faq, i) => (
//             <div
//               key={i}
//               className="border border-white/5 bg-[#080808] overflow-hidden transition-all duration-300 hover:border-white/10"
//             >
//               <button
//                 onClick={() => setOpenIndex(openIndex === i ? null : i)}
//                 className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
//               >
//                 <div className="flex items-center gap-6">
//                   <div
//                     className={`transition-colors duration-300 ${openIndex === i ? "text-primary" : "text-gray-600"}`}
//                   >
//                     {faq.icon}
//                   </div>
//                   <span className="font-bricolage text-sm md:text-lg font-black uppercase tracking-tight text-white/90 group-hover:text-white transition-colors">
//                     {faq.question}
//                   </span>
//                 </div>
//                 <div className="ml-4 flex-shrink-0">
//                   {openIndex === i ? (
//                     <Minus size={20} className="text-primary" />
//                   ) : (
//                     <Plus
//                       size={20}
//                       className="text-gray-600 group-hover:text-white transition-colors"
//                     />
//                   )}
//                 </div>
//               </button>

//               <AnimatePresence>
//                 {openIndex === i && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                   >
//                     <div className="px-6 md:px-8 pb-8 ml-0 md:ml-12">
//                       <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed max-w-2xl border-l border-primary/30 pl-6">
//                         {faq.answer}
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>

//         {/* BOTTOM CONTACT */}
//         <div className="mt-16 text-center">
//           <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
//             Still have questions?{" "}
//             <a
//               href="/contact"
//               className="text-primary hover:underline underline-offset-4 ml-2"
//             >
//               Contact Support
//             </a>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQSection;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Box,
  Paintbrush,
  Truck,
  MapPin,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    question: "Is bulk ordering possible for outlets?",
    answer:
      "Yes. We cater to bulk requirements for businesses and commercial outlets. Drop us a message on WhatsApp for custom rates and logistical assistance.",
    icon: <Box size={22} />,
  },
  {
    question: "How do I order my own custom design?",
    answer:
      "Simple. Navigate to the 'Custom' tab in our menu. Upload your high-resolution artwork, select your size, and we will handle the precision printing and delivery.",
    icon: <Paintbrush size={22} />,
  },
  {
    question: "What is the typical delivery timeline?",
    answer:
      "Procurement and shipping usually take 5-7 business days, depending on your delivery zone. You will receive a tracking ID as soon as it's dispatched.",
    icon: <Truck size={22} />,
  },
  {
    question: "How can I track my status?",
    answer:
      "Every order is tracked. Once secured, you will receive automated WhatsApp and Email notifications with your unique tracking ID and real-time status updates.",
    icon: <MapPin size={22} />,
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-background selection:bg-primary selection:text-black border-t-2 border-foreground/5">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* HEADER */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <HelpCircle size={16} className="text-accent" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/40">
              Intelligence Base
            </span>
          </motion.div>
          <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-foreground">
            FAQ<span className="text-primary italic">S</span>
          </h2>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-6">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={false}
                className={`border-4 transition-all duration-500 ${
                  isOpen
                    ? "border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(0,212,255,1)]"
                    : "border-foreground/10 bg-white/50 hover:border-foreground/30 shadow-none"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-8 md:p-10 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-8">
                    <div
                      className={`transition-all duration-500 ${
                        isOpen ? "text-primary scale-110" : "text-foreground/20"
                      }`}
                    >
                      {faq.icon}
                    </div>
                    <span className="font-display text-lg md:text-2xl font-black uppercase tracking-tight text-foreground transition-colors leading-none">
                      {faq.question}
                    </span>
                  </div>
                  <div className="ml-6 flex-shrink-0">
                    <div
                      className={`w-12 h-12 flex items-center justify-center border-2 border-foreground transition-all duration-500 ${isOpen ? "bg-primary" : "bg-transparent"}`}
                    >
                      {isOpen ? (
                        <Minus
                          size={24}
                          strokeWidth={3}
                          className="text-foreground"
                        />
                      ) : (
                        <Plus
                          size={24}
                          strokeWidth={3}
                          className="text-foreground/20 group-hover:text-foreground transition-colors"
                        />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="px-8 md:px-10 pb-10">
                        <div className="ml-0 md:ml-14 pl-0 md:pl-8 border-l-4 border-accent">
                          <p className="text-foreground/60 text-base md:text-lg font-bold uppercase leading-tight max-w-2xl">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CONTACT */}
        <div className="mt-24 text-center">
          <div className="p-10 bg-accent-lime border-4 border-foreground shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] inline-block">
            <p className="text-xs font-black text-foreground uppercase tracking-[0.3em] mb-4">
              Still have questions?
            </p>
            <a
              href="/contact"
              className="font-display text-2xl font-black uppercase tracking-tighter text-foreground border-b-4 border-foreground hover:text-primary hover:border-primary transition-all"
            >
              Contact Support Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;