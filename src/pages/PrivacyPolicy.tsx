import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock, Eye, ShieldCheck, Zap } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-body">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-10 max-w-[1000px] mx-auto">
        <header className="mb-16 border-b-4 border-black pb-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-primary fill-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Data Integrity
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
            PRIVACY <span className="text-primary not-italic">PROTOCOL.</span>
          </h1>
          <p className="mt-4 font-black uppercase text-xs opacity-40 italic text-right">
            Last Updated: 11 June 2025
          </p>
        </header>

        <div className="prose prose-sm max-w-none space-y-8 font-bold uppercase text-[12px] leading-loose opacity-70">
          <p>
            IMPRINTO CO. operates this store to provide you with a curated
            shopping experience. This Privacy Policy describes how we collect
            and use your personal information when you visit or make a purchase.
          </p>

          <section className="space-y-4">
            <h3 className="text-black text-xl font-black">
              1. Information Collection
            </h3>
            <p>
              We collect contact details (Name, Address, Email), Financial
              information (processed securely via encrypted gateways), and
              device information for site optimization.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-black text-xl font-black">2. Use of Data</h3>
            <p>
              Information is used to fulfill orders, facilitate shipping, and
              detect fraudulent activity. We do not sell your personal data to
              third-party brokers.
            </p>
          </section>

          <section className="space-y-4 text-black bg-white border-2 border-black p-6 italic">
            For data requests or deletion, transmit an email to
            support@imprinto.store
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
