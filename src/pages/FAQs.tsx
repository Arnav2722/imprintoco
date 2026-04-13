import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    q: "How long does shipping take?",
    a: "Orders are processed within 48 hours and typically reach you in 5-7 business days across India.",
  },
  {
    q: "Are the posters waterproof?",
    a: "Our posters are printed on high-quality matte paper. Our stickers, however, are 100% waterproof vinyl.",
  },
  {
    q: "Can I cancel my order?",
    a: "Since we print on demand, cancellations are only possible within 2 hours of placing the order.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white font-bricolage transition-colors duration-500">
      <Navbar />
      <main className="pt-40 pb-20 px-6 max-w-[900px] mx-auto">
        <h1 className="text-6xl font-black uppercase tracking-tighter italic mb-16">
          Help <span className="text-primary">Center</span>
        </h1>

        <div className="space-y-4">
          {FAQ_DATA.map((item, i) => (
            <div
              key={i}
              className="border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full p-8 flex justify-between items-center text-left transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
              >
                <span className="text-[12px] font-black uppercase tracking-widest italic">
                  {item.q}
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${openIndex === i ? "rotate-180 text-primary" : ""}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-8 pb-8 text-black/50 dark:text-white/50 text-sm leading-relaxed uppercase font-bold tracking-tight">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
