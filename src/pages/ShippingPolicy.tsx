import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, Clock, AlertTriangle, Zap } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-body selection:bg-primary selection:text-black">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-10 max-w-[1000px] mx-auto">
        <header className="mb-16 border-b-4 border-black pb-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-primary fill-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Logistics Protocol
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
            SHIPPING{" "}
            <span className="text-primary not-italic">& CANCELLATION.</span>
          </h1>
        </header>

        <div className="space-y-12">
          <section className="border-l-4 border-black pl-8 space-y-4">
            <h2 className="text-2xl font-black uppercase flex items-center gap-3">
              <Truck size={24} /> Dispatch Timeline
            </h2>
            <p className="font-bold leading-relaxed opacity-70 uppercase text-sm">
              All orders are processed within 24-48 business hours. Custom
              prints and studio configurations may require an additional 24
              hours for quality inspection. We do not ship on Sundays or
              National Holidays.
            </p>
          </section>

          <section className="border-l-4 border-black pl-8 space-y-4">
            <h2 className="text-2xl font-black uppercase flex items-center gap-3">
              <Clock size={24} /> Delivery Estimates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-black p-6">
                <h4 className="font-black text-xs uppercase mb-2">
                  Metro Cities
                </h4>
                <p className="text-xl font-black italic text-primary">
                  3 — 5 DAYS
                </p>
              </div>
              <div className="bg-white border-2 border-black p-6">
                <h4 className="font-black text-xs uppercase mb-2">
                  Rest of India
                </h4>
                <p className="text-xl font-black italic text-primary">
                  5 — 8 DAYS
                </p>
              </div>
            </div>
          </section>

          <section className="bg-black text-white p-8 border-4 border-primary">
            <h2 className="text-2xl font-black uppercase flex items-center gap-3 mb-4">
              <AlertTriangle className="text-primary" size={24} /> Cancellation
              Policy
            </h2>
            <p className="font-bold leading-relaxed uppercase text-sm opacity-80">
              Orders can only be cancelled within 12 hours of placement. Once an
              order enters the "Printing" or "Packaging" phase, cancellation is
              not possible. To request a cancellation, transmit an email to{" "}
              <span className="text-primary italic">
                support@imprinto.store
              </span>{" "}
              immediately.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
