// import { useState, useMemo } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { db } from "@/lib/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
// import { Loader2, Upload, Ruler, Phone, X, Zap } from "lucide-react";

// type ValidSize = "A3" | "A4" | "A5" | "13x19";

// const SIZE_INFO: Record<ValidSize, { dims: string; basePrice: number }> = {
//   A5: { dims: "14.8 x 21 cm", basePrice: 79 },
//   A4: { dims: "21 x 29.7 cm", basePrice: 119 },
//   A3: { dims: "29.7 x 42 cm", basePrice: 149 },
//   "13x19": { dims: "33 x 48.2 cm", basePrice: 169 },
// };

// const CustomPrints = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [selectedSize, setSelectedSize] = useState<ValidSize>("A4");
//   const [phone, setPhone] = useState("");

//   // ✅ Pricing Logic: Base + 30 Premium
//   const customPrice = useMemo(
//     () => SIZE_INFO[selectedSize].basePrice + 30,
//     [selectedSize],
//   );

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);
//       setPreviewUrl(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleCustomOrder = async () => {
//     if (!file || !phone || phone.length < 10) {
//       toast({
//         variant: "destructive",
//         title: "Missing Details",
//         description: "Please upload a design and enter a valid phone number.",
//       });
//       return;
//     }

//     setUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "imprinto_custom");

//       const cloudRes = await fetch(
//         `https://api.cloudinary.com/v1_1/dyjj0t5gk/image/upload`,
//         { method: "POST", body: formData },
//       );

//       const cloudData = await cloudRes.json();

//       if (!cloudData.secure_url) {
//         throw new Error("Upload failed");
//       }

//       await addDoc(collection(db, "custom_orders"), {
//         designUrl: cloudData.secure_url,
//         size: selectedSize,
//         dimensions: SIZE_INFO[selectedSize].dims,
//         contact: phone,
//         price: customPrice,
//         status: "pending",
//         timestamp: serverTimestamp(),
//       });

//       toast({
//         title: "Order Logged",
//         description: "Design received. Check your phone for confirmation.",
//       });

//       setFile(null);
//       setPreviewUrl(null);
//       setPhone("");
//     } catch (err) {
//       console.error(err);
//       toast({
//         variant: "destructive",
//         title: "Order Failed",
//         description: "Ensure Cloudinary preset is 'Unsigned'.",
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-white font-bricolage">
//       <Navbar />
//       <main className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
//         <header className="mb-16 border-b border-white/5 pb-12">
//           <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
//             Custom <span className="text-primary text-glow">Prints</span>
//           </h1>
//           <p className="text-gray-500 text-[11px] font-black tracking-[0.3em] uppercase">
//             Exclusive service for personalized designs.
//           </p>
//         </header>

//         <div className="grid lg:grid-cols-2 gap-20">
//           <div className="space-y-6">
//             <div
//               className={`relative aspect-square border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 bg-[#0a0a0a] ${previewUrl ? "border-primary/40" : "border-white/5 hover:border-white/20"}`}
//             >
//               {previewUrl ? (
//                 <>
//                   <img
//                     src={previewUrl}
//                     className="w-full h-full object-contain"
//                     alt="Preview"
//                   />
//                   <button
//                     onClick={() => {
//                       setFile(null);
//                       setPreviewUrl(null);
//                     }}
//                     className="absolute top-4 right-4 bg-black/50 p-2 hover:text-red-500"
//                   >
//                     <X size={20} />
//                   </button>
//                 </>
//               ) : (
//                 <div className="flex flex-col items-center gap-4">
//                   <Upload size={40} className="text-gray-800" />
//                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
//                     Select Design (JPG/PNG)
//                   </p>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 accept="image/*"
//               />
//             </div>
//           </div>

//           <div className="space-y-12">
//             <div>
//               <h3 className="text-[11px] text-gray-700 font-black uppercase mb-6 tracking-widest flex items-center gap-2">
//                 <Ruler size={14} className="text-primary" /> Select Dimensions
//               </h3>
//               <div className="grid grid-cols-2 gap-3">
//                 {Object.entries(SIZE_INFO).map(([s, info]) => (
//                   <button
//                     key={s}
//                     onClick={() => setSelectedSize(s as ValidSize)}
//                     className={`flex flex-col items-center py-5 border transition-all ${selectedSize === s ? "bg-white text-black border-white" : "border-white/5 text-gray-500"}`}
//                   >
//                     <span className="text-[13px] font-black">{s}</span>
//                     <span className="text-[9px] opacity-60 font-bold">
//                       ({info.dims})
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="p-8 bg-primary/5 border border-primary/10 space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
//                   Custom Price
//                 </span>
//                 <span className="text-3xl font-black">₹{customPrice}</span>
//               </div>
//               <p className="text-[9px] text-primary/60 font-bold uppercase tracking-widest flex items-center gap-2">
//                 <Zap size={10} /> Includes premium design handling fee
//               </p>
//             </div>

//             <div>
//               <h3 className="text-[11px] text-gray-700 font-black uppercase mb-6 tracking-widest flex items-center gap-2">
//                 <Phone size={14} className="text-primary" /> Contact Protocol
//               </h3>
//               <Input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="YOUR PHONE NUMBER"
//                 className="bg-black border-white/10 rounded-none h-16 text-[12px] font-black tracking-widest focus:border-primary"
//               />
//             </div>

//             <Button
//               onClick={handleCustomOrder}
//               disabled={uploading}
//               className="w-full h-20 rounded-none bg-primary text-black font-black uppercase tracking-[0.4em] text-[13px] hover:bg-white transition-all shadow-xl"
//             >
//               {uploading ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 "Initiate Custom Order"
//               )}
//             </Button>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default CustomPrints;

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  X,
  Upload,
  Ruler,
  Phone,
  Zap,
  Layers,
  Loader2,
  ChevronRight,
} from "lucide-react";

type ValidSize = "A3" | "A4" | "A5" | "13x19";
type RetroSize = "3.5 x 4.2" | "A6";
type PrintQty = 10 | 20 | 30 | 40 | 50;

const SIZE_INFO: Record<ValidSize, { dims: string; basePrice: number }> = {
  A5: { dims: "14.8 x 21 cm", basePrice: 79 },
  A4: { dims: "21 x 29.7 cm", basePrice: 119 },
  A3: { dims: "29.7 x 42 cm", basePrice: 149 },
  "13x19": { dims: "33 x 48.2 cm", basePrice: 169 },
};

const COMBO_OFFERS = [
  { id: "b2g1", buy: 2, get: 1, label: "+1 FREE SET", sets: 3 },
  { id: "b3g2", buy: 3, get: 2, label: "+2 FREE SETS", sets: 5 },
  {
    id: "b4g3",
    buy: 4,
    get: 3,
    label: "+3 FREE SETS",
    sets: 7,
    bestValue: true,
  },
];

const CustomPrints = () => {
  const [activeTab, setActiveTab] = useState<"posters" | "retro">("posters");
  const [files, setFiles] = useState<
    { id: string; file: File; preview: string }[]
  >([]);
  const [selectedSize, setSelectedSize] = useState<ValidSize | RetroSize>("A4");
  const [printQty, setPrintQty] = useState<PrintQty>(10);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null); // Offer selection state
  const [phone, setPhone] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        id: Math.random().toString(36).substring(7),
        file: f,
        preview: URL.createObjectURL(f),
      }));

      const limit = activeTab === "retro" ? printQty : 99;
      setFiles((prev) => [...prev, ...newFiles].slice(0, limit));
    }
  };

  const stats = useMemo(() => {
    if (activeTab === "posters") {
      const count = files.length;
      const basePrice =
        SIZE_INFO[selectedSize as ValidSize]?.basePrice + 30 || 0;
      const freeItems = Math.floor(count / 4);
      const totalPrice = (count - freeItems) * basePrice;
      return { count, freeItems, totalPrice, basePrice };
    } else {
      const basePrice = selectedSize === "3.5 x 4.2" ? 179 : 249;
      // Agar offer selected hai toh price multiplier lag jayega
      const offer = COMBO_OFFERS.find((o) => o.id === selectedOffer);
      const multiplier = offer ? offer.buy : 1;
      return {
        count: files.length,
        totalPrice: basePrice * multiplier,
        basePrice,
      };
    }
  }, [files, selectedSize, activeTab, selectedOffer]);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-bricolage selection:bg-primary/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-[1300px] mx-auto">
        {/* Tab Switcher */}
        <div className="flex gap-1 bg-white/[0.02] border border-white/5 p-1 mb-16 w-fit mx-auto sm:mx-0">
          <button
            onClick={() => {
              setActiveTab("posters");
              setFiles([]);
              setSelectedSize("A4");
              setSelectedOffer(null);
            }}
            className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === "posters" ? "bg-white text-black" : "text-white/40 hover:text-white"}`}
          >
            Custom Posters
          </button>
          <button
            onClick={() => {
              setActiveTab("retro");
              setFiles([]);
              setSelectedSize("3.5 x 4.2");
            }}
            className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === "retro" ? "bg-white text-black" : "text-white/40 hover:text-white"}`}
          >
            Retro Prints
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Preview Section */}
          <div className="space-y-8">
            <div className="relative group min-h-[400px] border border-dashed border-white/10 hover:border-primary/40 bg-white/[0.01] flex flex-col items-center justify-center p-12 text-center">
              <Upload
                size={40}
                className="text-white/10 group-hover:text-primary mb-6 transition-colors"
              />
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
                {activeTab === "retro"
                  ? `Select ${printQty} photos for this pack`
                  : "Upload high-res designs"}
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {files.map((f) => (
                <div
                  key={f.id}
                  className={`relative p-1 bg-white/[0.02] border border-white/5 group ${activeTab === "retro" ? "aspect-[3.5/4.2] bg-white" : "aspect-[2/3]"}`}
                >
                  <img
                    src={f.preview}
                    className={`w-full h-full object-cover ${activeTab === "retro" ? "grayscale group-hover:grayscale-0" : ""}`}
                    alt="Preview"
                  />
                  <button
                    onClick={() => setFiles(files.filter((x) => x.id !== f.id))}
                    className="absolute -top-2 -right-2 bg-black text-white p-1 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Config Section */}
          <div className="space-y-12">
            <header className="space-y-4 border-b border-white/5 pb-8">
              <h1 className="text-5xl font-black uppercase tracking-tighter italic">
                {activeTab === "posters" ? "Custom" : "Retro"}{" "}
                <span className="text-primary">Studio</span>
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black italic">
                  ₹{stats.totalPrice}
                </span>
                {selectedOffer && (
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                    Offer Applied
                  </span>
                )}
              </div>
            </header>

            <div className="space-y-10">
              {/* Dimensions */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 flex items-center gap-2">
                  <ChevronRight size={12} className="text-primary" /> Select
                  Dimensions
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {activeTab === "posters"
                    ? (Object.keys(SIZE_INFO) as ValidSize[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`p-5 border text-left transition-all ${selectedSize === s ? "bg-white text-black border-white" : "border-white/10 text-white/40 hover:border-white/30"}`}
                        >
                          <p className="text-xs font-black italic">{s}</p>
                          <p className="text-[8px] uppercase mt-1 opacity-60 font-bold tracking-widest">
                            {SIZE_INFO[s].dims}
                          </p>
                        </button>
                      ))
                    : (["3.5 x 4.2", "A6"] as RetroSize[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`p-5 border text-left transition-all ${selectedSize === s ? "bg-white text-black border-white" : "border-white/10 text-white/40 hover:border-white/30"}`}
                        >
                          <p className="text-xs font-black italic">{s}</p>
                        </button>
                      ))}
                </div>
              </div>

              {/* Quantity for Retro */}
              {activeTab === "retro" && (
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 flex items-center gap-2">
                    <ChevronRight size={12} className="text-primary" /> Pack
                    Size (Images per set)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[10, 20, 30, 40, 50].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setPrintQty(q as PrintQty);
                          setFiles([]);
                        }}
                        className={`py-3 border text-[11px] font-black transition-all ${printQty === q ? "bg-primary text-black border-primary" : "border-white/10 text-white/40 hover:border-white/30"}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* LIVE OFFERS - NOW CLICKABLE */}
            <div className="space-y-6">
              <p className="text-[10px] font-black text-primary uppercase flex items-center gap-2 tracking-[0.2em]">
                <Zap size={12} fill="currentColor" />{" "}
                {activeTab === "posters" ? "Poster Bonus" : "Bulk Combo Deals"}
              </p>
              {activeTab === "posters" ? (
                <div className="p-6 border border-primary/20 bg-primary/5">
                  <p className="text-[11px] font-black italic tracking-tight uppercase">
                    Automatic Unlock: Buy 3, get the 4th free.
                  </p>
                  <p className="text-[9px] text-white/40 mt-1 font-bold uppercase tracking-widest leading-relaxed">
                    Just add posters to your collection. Every 4th unit is on
                    the house.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {COMBO_OFFERS.map((o) => (
                    <button
                      key={o.id}
                      onClick={() =>
                        setSelectedOffer(selectedOffer === o.id ? null : o.id)
                      } // Toggle selection
                      className={`relative p-5 border text-left transition-all group ${selectedOffer === o.id ? "border-primary bg-primary/5" : "border-white/5 bg-white/[0.01] hover:border-white/20"}`}
                    >
                      {o.bestValue && (
                        <span className="absolute -top-2 left-4 bg-primary text-[8px] text-black px-2 py-0.5 font-black uppercase italic">
                          Best Value
                        </span>
                      )}
                      <p
                        className={`text-[11px] font-black italic transition-colors ${selectedOffer === o.id ? "text-white" : "text-white/60 group-hover:text-white"}`}
                      >
                        BUY {o.buy} SETS
                      </p>
                      <p className="text-[9px] text-primary mt-1 font-bold tracking-widest">
                        {o.label}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Order Action */}
            <div className="space-y-6">
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WHATSAPP NUMBER"
                className="bg-black border-white/10 rounded-none h-20 text-[12px] font-black tracking-[0.3em] focus:border-primary placeholder:text-white/10"
              />
              <Button
                disabled={files.length === 0}
                className="w-full h-24 bg-primary text-black font-black uppercase tracking-[0.5em] text-xs hover:bg-white transition-all shadow-[0_10px_40px_rgba(250,255,0,0.1)]"
              >
                {activeTab === "posters"
                  ? `Initiate ${stats.count} Posters`
                  : `Confirm Retro Order`}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomPrints;
