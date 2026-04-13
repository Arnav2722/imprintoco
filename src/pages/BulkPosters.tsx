import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BulkPosters = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white font-bricolage transition-colors duration-500">
      <Navbar />
      <main className="pt-48 pb-20 px-6 max-w-[800px] mx-auto text-center">
        <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">
          // Wholesale Protocol
        </span>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none mb-10">
          Bulk <span className="text-primary">Supply.</span>
        </h1>
        <p className="text-black/50 dark:text-white/50 text-lg mb-16 leading-relaxed uppercase font-bold tracking-tight">
          Planning a cafe, a studio, or a retail shop? We provide massive
          discounts on bulk poster and sticker orders.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-left border border-black/5 dark:border-white/5 p-10 bg-black/[0.01] dark:bg-white/[0.01]"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              required
              placeholder="FULL NAME"
              className="rounded-none bg-transparent border-black/10 dark:border-white/10 h-16 text-[10px] font-black tracking-widest"
            />
            <Input
              required
              type="email"
              placeholder="BUSINESS EMAIL"
              className="rounded-none bg-transparent border-black/10 dark:border-white/10 h-16 text-[10px] font-black tracking-widest"
            />
          </div>
          <Input
            required
            placeholder="QUANTITY NEEDED (E.G. 100+)"
            className="rounded-none bg-transparent border-black/10 dark:border-white/10 h-16 text-[10px] font-black tracking-widest"
          />
          <textarea
            required
            className="w-full bg-transparent border border-black/10 dark:border-white/10 p-6 min-h-[200px] text-[10px] font-black tracking-widest uppercase outline-none focus:border-primary"
            placeholder="TELL US ABOUT YOUR PROJECT..."
          ></textarea>
          <Button
            disabled={loading}
            className="w-full h-20 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-primary dark:hover:bg-primary transition-all"
          >
            {loading ? "Processing..." : "Request Quote"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default BulkPosters;
