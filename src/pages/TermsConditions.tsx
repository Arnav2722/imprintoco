import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Gavel, Scale, Zap } from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-body">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-10 max-w-[1000px] mx-auto">
        <header className="mb-16 border-b-4 border-black pb-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-primary fill-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Legal Framework
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
            TERMS OF <span className="text-primary not-italic">SERVICE.</span>
          </h1>
        </header>

        <div className="space-y-12 font-bold uppercase text-[12px] leading-relaxed opacity-70">
          <section className="space-y-4">
            <h2 className="text-black text-2xl font-black flex items-center gap-3">
              <Scale size={24} /> Service Usage
            </h2>
            <p>
              By accessing IMPRINTO CO., you agree to be bound by these terms.
              We reserve the right to refuse service to anyone for any reason at
              any time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-black text-2xl font-black flex items-center gap-3">
              <Gavel size={24} /> Intellectual Property
            </h2>
            <p>
              All content including designs, logos, and code are the property of
              IMPRINTO CO. Unauthorized reproduction of our artifacts will
              result in legal escalation.
            </p>
          </section>

          <section className="bg-black text-white p-8 border-4 border-primary">
            <h3 className="text-primary font-black text-xl mb-4">
              JURISDICTION
            </h3>
            <p>
              These terms are governed by the laws of Jaipur, Rajasthan, India.
              Any disputes will be resolved within the courts of Jaipur.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;
