import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RefreshCw, ShieldAlert, CheckCircle, Zap } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-body">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-10 max-w-[1000px] mx-auto">
        <header className="mb-16 border-b-4 border-black pb-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-primary fill-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Resolution Protocol
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
            RETURNS <span className="text-primary not-italic">& REFUNDS.</span>
          </h1>
        </header>

        <div className="space-y-12">
          <div className="bg-primary/10 border-2 border-black p-6 font-black uppercase text-sm italic">
            Note: Our products are printed on demand. We do not offer returns
            for "Change of Mind."
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-black uppercase flex items-center gap-3">
              <ShieldAlert size={24} /> Damaged Artifacts
            </h2>
            <p className="font-bold opacity-70 uppercase text-sm leading-relaxed">
              If your print arrives damaged or defective, we will issue a
              replacement at no extra cost. You must provide an unboxing video
              and high-resolution images within 48 hours of delivery.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black uppercase flex items-center gap-3">
              <RefreshCw size={24} /> Refund Process
            </h2>
            <p className="font-bold opacity-70 uppercase text-sm leading-relaxed">
              Approved refunds are processed to the original payment method
              within 7-10 business hours. Shipping costs are non-refundable.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
