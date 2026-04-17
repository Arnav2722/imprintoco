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
    icon: Box,
  },
  {
    question: "How do I order my own custom design?",
    answer:
      "Simple. Navigate to the 'Custom' tab in our menu. Upload your high-resolution artwork, select your size, and we will handle the precision printing and delivery.",
    icon: Paintbrush,
  },
  {
    question: "What is the typical delivery timeline?",
    answer:
      "Procurement and shipping usually take 5-7 business days, depending on your delivery zone. You will receive a tracking ID as soon as it's dispatched.",
    icon: Truck,
  },
  {
    question: "How can I track my status?",
    answer:
      "Every order is tracked. Once secured, you will receive automated WhatsApp and Email notifications with your unique tracking ID and real-time status updates.",
    icon: MapPin,
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-32 bg-background selection:bg-primary selection:text-black border-t-2 border-foreground/5">
      <div className="max-w-[1000px] mx-auto px-5 md:px-10">
        {/* HEADER */}
        <div className="mb-12 md:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 md:mb-6"
          >
            <HelpCircle size={16} className="text-accent" />
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-foreground/40">
              Information Hub
            </span>
          </motion.div>
          <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-foreground">
            FAQ
          </h2>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-4 md:space-y-6">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const Icon = faq.icon;
            return (
              <motion.div
                key={i}
                initial={false}
                className={`border-2 md:border-4 transition-all duration-500 ${
                  isOpen
                    ? "border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,212,255,1)] md:shadow-[12px_12px_0px_0px_rgba(0,212,255,1)]"
                    : "border-foreground/10 bg-white/50 hover:border-foreground/30 shadow-none"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-6 md:p-10 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4 md:gap-8">
                    <div
                      className={`transition-all duration-500 shrink-0 ${
                        isOpen ? "text-primary scale-110" : "text-foreground/20"
                      }`}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <span className="font-display text-base md:text-2xl font-black uppercase tracking-tight text-foreground transition-colors leading-[1.1]">
                      {faq.question}
                    </span>
                  </div>
                  <div className="ml-4 md:ml-6 flex-shrink-0">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 border-foreground transition-all duration-500 ${
                        isOpen ? "bg-primary" : "bg-transparent"
                      }`}
                    >
                      {isOpen ? (
                        <Minus
                          className="w-5 h-5 md:w-6 md:h-6 text-foreground"
                          strokeWidth={3}
                        />
                      ) : (
                        <Plus
                          className="w-5 h-5 md:w-6 md:h-6 text-foreground/20 group-hover:text-foreground transition-colors"
                          strokeWidth={3}
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
                      <div className="px-6 md:px-10 pb-8 md:pb-10">
                        <div className="ml-0 md:ml-14 pl-4 md:pl-8 border-l-2 md:border-l-4 border-accent">
                          <p className="text-foreground/60 text-sm md:text-lg font-bold uppercase leading-tight max-w-2xl">
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
        <div className="mt-16 md:mt-24 text-center">
          <div className="p-8 md:p-10 bg-accent-lime border-2 md:border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] inline-block w-full sm:w-auto">
            <p className="text-[10px] md:text-xs font-black text-foreground uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4">
              Need direct assistance?
            </p>
            <a
              href="/contact"
              className="font-display text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground border-b-2 md:border-b-4 border-foreground hover:text-primary hover:border-primary transition-all inline-block"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;