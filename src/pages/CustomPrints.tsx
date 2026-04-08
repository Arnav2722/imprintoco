// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { db } from "@/lib/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
// import { Loader2, Upload, Ruler, Phone, CheckCircle2 } from "lucide-react";

// type ValidSize = "A3" | "A4" | "A5" | "13x19";

// const SIZE_INFO: Record<ValidSize, string> = {
//   A5: "14.8 x 21 cm",
//   A4: "21 x 29.7 cm",
//   A3: "29.7 x 42 cm",
//   "13x19": "33 x 48.2 cm",
// };

// const CustomPrints = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [selectedSize, setSelectedSize] = useState<ValidSize>("A4");
//   const [phone, setPhone] = useState("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);
//       setPreviewUrl(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleCustomOrder = async () => {
//     if (!file || !phone) {
//       toast({
//         variant: "destructive",
//         title: "Missing Info",
//         description: "Upload design and enter phone number.",
//       });
//       return;
//     }

//     setUploading(true);

//     try {
//       // 1. Cloudinary Upload (Replace with your details)
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "imprinto_custom"); // Apna preset yahan daalo

//       const cloudRes = await fetch(
//         `https://api.cloudinary.com/v1_1/dyjj0t5gk/image/upload`, // Apna cloud name yahan daalo
//         { method: "POST", body: formData },
//       );
//       const cloudData = await cloudRes.json();

//       if (cloudData.secure_url) {
//         // 2. Firestore Entry
//         await addDoc(collection(db, "custom_orders"), {
//           designUrl: cloudData.secure_url,
//           size: selectedSize,
//           dimensions: SIZE_INFO[selectedSize],
//           contact: phone,
//           status: "pending",
//           timestamp: serverTimestamp(),
//         });

//         toast({
//           title: "Order Logged",
//           description: "We will contact you shortly.",
//         });
//         setFile(null);
//         setPreviewUrl(null);
//         setPhone("");
//       }
//     } catch (err) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Upload failed.",
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
//             Custom <span className="text-primary">Prints</span>
//           </h1>
//           <p className="text-gray-500 text-[11px] font-black tracking-[0.3em] uppercase max-w-xl">
//             Upload your vision. We provide the premium matte finish.
//           </p>
//         </header>

//         <div className="grid lg:grid-cols-2 gap-20">
//           {/* LEFT: UPLOAD AREA */}
//           <div className="space-y-6">
//             <div
//               className={`relative aspect-square border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 bg-[#0a0a0a] ${
//                 previewUrl
//                   ? "border-primary/40"
//                   : "border-white/5 hover:border-white/20"
//               }`}
//             >
//               {previewUrl ? (
//                 <img
//                   src={previewUrl}
//                   className="w-full h-full object-contain"
//                   alt="Preview"
//                 />
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
//             {previewUrl && (
//               <button
//                 onClick={() => {
//                   setFile(null);
//                   setPreviewUrl(null);
//                 }}
//                 className="text-[10px] text-red-500 font-black uppercase tracking-widest"
//               >
//                 Remove Image
//               </button>
//             )}
//           </div>

//           {/* RIGHT: CONFIGURATION */}
//           <div className="space-y-12">
//             <div>
//               <h3 className="text-[11px] text-gray-700 font-black uppercase mb-6 tracking-widest flex items-center gap-2">
//                 <Ruler size={14} className="text-primary" /> Select Dimensions
//               </h3>
//               <div className="grid grid-cols-2 gap-3">
//                 {(["A5", "A4", "A3", "13x19"] as ValidSize[]).map((s) => (
//                   <button
//                     key={s}
//                     onClick={() => setSelectedSize(s)}
//                     className={`flex flex-col items-center py-4 border transition-all ${
//                       selectedSize === s
//                         ? "bg-white text-black border-white"
//                         : "border-white/5 text-gray-500 hover:border-white/20"
//                     }`}
//                   >
//                     <span className="text-[12px] font-black">{s}</span>
//                     <span className="text-[9px] opacity-60 font-bold">
//                       ({SIZE_INFO[s]})
//                     </span>
//                   </button>
//                 ))}
//               </div>
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
//                 className="bg-black border-white/10 rounded-none h-14 text-[12px] font-black uppercase tracking-widest focus:border-primary"
//               />
//             </div>

//             <Button
//               onClick={handleCustomOrder}
//               disabled={uploading}
//               className="w-full h-20 rounded-none bg-primary text-black font-black uppercase tracking-[0.4em] text-[12px] hover:bg-white transition-all shadow-[0_0_30px_rgba(0,229,255,0.1)]"
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
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Upload, Ruler, Phone, X, Zap } from "lucide-react";

type ValidSize = "A3" | "A4" | "A5" | "13x19";

const SIZE_INFO: Record<ValidSize, { dims: string; basePrice: number }> = {
  A5: { dims: "14.8 x 21 cm", basePrice: 79 },
  A4: { dims: "21 x 29.7 cm", basePrice: 119 },
  A3: { dims: "29.7 x 42 cm", basePrice: 149 },
  "13x19": { dims: "33 x 48.2 cm", basePrice: 169 },
};

const CustomPrints = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ValidSize>("A4");
  const [phone, setPhone] = useState("");

  // ✅ Pricing Logic: Base + 30 Premium
  const customPrice = useMemo(
    () => SIZE_INFO[selectedSize].basePrice + 30,
    [selectedSize],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleCustomOrder = async () => {
    if (!file || !phone || phone.length < 10) {
      toast({
        variant: "destructive",
        title: "Missing Details",
        description: "Please upload a design and enter a valid phone number.",
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "imprinto_custom");

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/dyjj0t5gk/image/upload`,
        { method: "POST", body: formData },
      );

      const cloudData = await cloudRes.json();

      if (!cloudData.secure_url) {
        throw new Error("Upload failed");
      }

      await addDoc(collection(db, "custom_orders"), {
        designUrl: cloudData.secure_url,
        size: selectedSize,
        dimensions: SIZE_INFO[selectedSize].dims,
        contact: phone,
        price: customPrice,
        status: "pending",
        timestamp: serverTimestamp(),
      });

      toast({
        title: "Order Logged",
        description: "Design received. Check your phone for confirmation.",
      });

      setFile(null);
      setPreviewUrl(null);
      setPhone("");
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: "Ensure Cloudinary preset is 'Unsigned'.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
        <header className="mb-16 border-b border-white/5 pb-12">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Custom <span className="text-primary text-glow">Prints</span>
          </h1>
          <p className="text-gray-500 text-[11px] font-black tracking-[0.3em] uppercase">
            Exclusive service for personalized designs.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-6">
            <div
              className={`relative aspect-square border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 bg-[#0a0a0a] ${previewUrl ? "border-primary/40" : "border-white/5 hover:border-white/20"}`}
            >
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    className="w-full h-full object-contain"
                    alt="Preview"
                  />
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreviewUrl(null);
                    }}
                    className="absolute top-4 right-4 bg-black/50 p-2 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Upload size={40} className="text-gray-800" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                    Select Design (JPG/PNG)
                  </p>
                </div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-[11px] text-gray-700 font-black uppercase mb-6 tracking-widest flex items-center gap-2">
                <Ruler size={14} className="text-primary" /> Select Dimensions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(SIZE_INFO).map(([s, info]) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s as ValidSize)}
                    className={`flex flex-col items-center py-5 border transition-all ${selectedSize === s ? "bg-white text-black border-white" : "border-white/5 text-gray-500"}`}
                  >
                    <span className="text-[13px] font-black">{s}</span>
                    <span className="text-[9px] opacity-60 font-bold">
                      ({info.dims})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 bg-primary/5 border border-primary/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Custom Price
                </span>
                <span className="text-3xl font-black">₹{customPrice}</span>
              </div>
              <p className="text-[9px] text-primary/60 font-bold uppercase tracking-widest flex items-center gap-2">
                <Zap size={10} /> Includes premium design handling fee
              </p>
            </div>

            <div>
              <h3 className="text-[11px] text-gray-700 font-black uppercase mb-6 tracking-widest flex items-center gap-2">
                <Phone size={14} className="text-primary" /> Contact Protocol
              </h3>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="YOUR PHONE NUMBER"
                className="bg-black border-white/10 rounded-none h-16 text-[12px] font-black tracking-widest focus:border-primary"
              />
            </div>

            <Button
              onClick={handleCustomOrder}
              disabled={uploading}
              className="w-full h-20 rounded-none bg-primary text-black font-black uppercase tracking-[0.4em] text-[13px] hover:bg-white transition-all shadow-xl"
            >
              {uploading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Initiate Custom Order"
              )}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomPrints;
