import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Zap,
  MessageSquare,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission
    console.log("Transmission Sent:", formData);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-28 md:pt-40 pb-20 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* HEADER */}
        <header className="mb-12 md:mb-20 border-b-4 border-black pb-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-primary fill-primary" />
            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em]">
              Communication Protocol
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8]">
            GET IN <span className="text-primary not-italic">TOUCH.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* CONTACT INFO - LEFT SIDE */}
          <div className="lg:col-span-5 space-y-12">
            <section className="space-y-8">
              <div className="bg-black text-white p-6 md:p-8 border-4 border-primary shadow-[10px_10px_0px_0px_#000]">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                  <MessageSquare className="text-primary" /> Direct Support
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary p-2 text-black">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-40">
                        Email Protocol
                      </p>
                      <p className="font-bold text-lg">support@imprinto.co</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary p-2 text-black">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-40">
                        Hotline
                      </p>
                      <p className="font-bold text-lg">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-black p-6 bg-white">
                  <Clock className="mb-3 text-primary" size={20} />
                  <h4 className="font-black uppercase text-xs mb-1 tracking-widest">
                    Active Hours
                  </h4>
                  <p className="text-sm font-bold opacity-60 uppercase leading-tight">
                    MON — SAT <br /> 10:00 — 19:00 IST
                  </p>
                </div>
                <div className="border-2 border-black p-6 bg-white">
                  <MapPin className="mb-3 text-primary" size={20} />
                  <h4 className="font-black uppercase text-xs mb-1 tracking-widest">
                    HQ Location
                  </h4>
                  <p className="text-sm font-bold opacity-60 uppercase leading-tight">
                    Jaipur, Rajasthan <br /> India — 302001
                  </p>
                </div>
              </div>
            </section>

            {/* B2B CALLOUT */}
            <div className="border-4 border-black p-8 bg-primary/10">
              <h3 className="text-xl font-black uppercase tracking-tight mb-2 italic">
                Corporate & B2B
              </h3>
              <p className="text-xs font-bold uppercase opacity-60 mb-6 leading-relaxed">
                Need bulk posters for your office, cafe, or studio? Our B2B
                protocol offers custom rates and early access to drops.
              </p>
              <button className="w-full bg-black text-white font-black uppercase py-4 tracking-widest text-xs hover:bg-primary hover:text-black transition-all shadow-[6px_6px_0px_0px_#00D4FF]">
                Request B2B Catalog
              </button>
            </div>
          </div>

          {/* CONTACT FORM - RIGHT SIDE */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_0px_#000]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                    Identity
                  </label>
                  <input
                    type="text"
                    placeholder="YOUR NAME"
                    required
                    className="w-full border-2 border-black p-4 font-bold outline-none focus:bg-primary/5 transition-colors"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="EMAIL@PROTOCOL.COM"
                    required
                    className="w-full border-2 border-black p-4 font-bold outline-none focus:bg-primary/5 transition-colors"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  Subject Sector
                </label>
                <select
                  className="w-full border-2 border-black p-4 font-bold outline-none appearance-none bg-white focus:bg-primary/5 transition-colors"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                >
                  <option>General Inquiry</option>
                  <option>Order Tracking</option>
                  <option>Bulk / B2B Order</option>
                  <option>Product Feedback</option>
                  <option>Artist Collaboration</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  Log Your Message
                </label>
                <textarea
                  placeholder="TRANSMIT YOUR MESSAGE HERE..."
                  rows={6}
                  required
                  className="w-full border-2 border-black p-4 font-bold outline-none focus:bg-primary/5 transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="group relative w-full bg-black text-white p-6 font-black uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-primary hover:text-black"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Send Transmission <Send size={18} />
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "tween" }}
                />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
