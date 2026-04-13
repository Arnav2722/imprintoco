import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const PACK_SIZES: number[] = [10, 20, 30, 50];

interface RetroImage {
  id: string;
  url: string;
}

const RetroStudio = () => {
  const [qty, setQty] = useState<number>(10);
  const [images, setImages] = useState<RetroImage[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const uploaded = Array.from(e.target.files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...uploaded].slice(0, qty));
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white font-bricolage transition-colors duration-500">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
              Retro <span className="text-primary">Studio</span>
            </h1>
            <div className="aspect-[4/5] bg-black/[0.03] dark:bg-white/[0.02] border border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center p-10 text-center relative group">
              <Camera
                size={48}
                className="text-black/10 dark:text-white/10 mb-6 group-hover:text-primary transition-colors"
              />
              <p className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40">
                Upload {qty} memories to print
              </p>
              <input
                type="file"
                multiple
                onChange={handleUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="aspect-square bg-white p-1 shadow-xl relative group border border-black/5"
                >
                  <img
                    src={img.url}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    alt="Retro Preview"
                  />
                  <button
                    onClick={() => removeImage(img.id)}
                    className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                Select Pack Size
              </label>
              <div className="grid grid-cols-4 gap-4">
                {PACK_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setQty(s);
                      setImages([]);
                    }}
                    className={`py-4 border font-black transition-all ${qty === s ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white" : "border-black/10 dark:border-white/10 hover:border-primary"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-10 bg-black/[0.02] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest">
                  Selected Pack
                </span>
                <span className="text-2xl font-black italic">{qty} Prints</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                  Price
                </span>
                <span className="text-4xl font-black italic">
                  ₹{qty === 10 ? 199 : qty === 20 ? 349 : 799}
                </span>
              </div>
            </div>

            <Button className="w-full h-20 bg-primary text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-black hover:text-white transition-all">
              Initiate Production
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RetroStudio;
