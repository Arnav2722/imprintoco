// import { useEffect, useState } from "react";
// import { useCart } from "@/contexts/CartContext";
// import { useAuth } from "@/contexts/AuthContext";
// import { Button } from "@/components/ui/button";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion, AnimatePresence } from "framer-motion";
// import { db } from "@/lib/firebase";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import {
//   ShieldCheck,
//   Package,
//   Loader2,
//   MapPin,
//   Tag,
//   CheckCircle2,
//   PartyPopper,
//   ArrowRight,
//   Info,
// } from "lucide-react";

// /* ---------------- STRICT TYPES - NO ANY ---------------- */
// interface RazorpayResponse {
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
//   razorpay_signature: string;
// }

// // Razorpay ke internal options type (Official declaration na ho toh manually karte hain)
// interface RazorpayInstanceOptions {
//   key: string;
//   amount: number;
//   currency: string;
//   order_id: string;
//   name: string;
//   description: string;
//   handler: (response: RazorpayResponse) => void;
//   prefill: {
//     name: string;
//     email: string;
//     contact: string;
//   };
//   notes?: Record<string, string>;
//   theme: { color: string };
// }

// interface RazorpayConstructor {
//   new (options: RazorpayInstanceOptions): {
//     open: () => void;
//   };
// }

// // Global window object par Razorpay define karte hain strict tarike se
// declare global {
//   interface Window {
//     Razorpay?: RazorpayConstructor;
//   }
// }

// const API_BASE =
//   window.location.hostname === "localhost"
//     ? "http://localhost:5000"
//     : "https://imprinto.onrender.com";

// const Checkout = () => {
//   const { items, totalPrice, clearCart } = useCart();
//   const { userData } = useAuth();
//   const navigate = useNavigate();

//   const [processing, setProcessing] = useState<boolean>(false);
//   const [showSuccess, setShowSuccess] = useState<boolean>(false);
//   const [pincode, setPincode] = useState<string>("");
//   const [shippingFee, setShippingFee] = useState<number>(0);
//   const [coupon, setCoupon] = useState<string>("");
//   const [discount, setDiscount] = useState<number>(0);
//   const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     if (!window.Razorpay) {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

//   // Shipping Logic
//   useEffect(() => {
//     if (pincode.length === 6) {
//       const zone = pincode.substring(0, 2);
//       if (["11", "12", "20"].includes(zone)) {
//         setShippingFee(0);
//       } else {
//         setShippingFee(49);
//       }
//     } else {
//       setShippingFee(0);
//     }
//   }, [pincode]);

//   const applyCoupon = () => {
//     if (coupon.toUpperCase() === "OFFER10") {
//       setDiscount(totalPrice * 0.1);
//       setIsCouponApplied(true);
//     } else {
//       alert("Invalid Coupon");
//       setDiscount(0);
//       setIsCouponApplied(false);
//     }
//   };

//   const finalAmount = totalPrice + shippingFee - discount;

//   const saveOrderToFirestore = async (paymentId: string) => {
//     if (!userData) return;
//     try {
//       await addDoc(collection(db, "orders"), {
//         customerName: userData.name || "Legend",
//         email: userData.email || "",
//         phone: userData.mobile || "",
//         items: items.map((item) => ({
//           name: item.product.name,
//           quantity: item.quantity,
//           price: item.product.price,
//           size: item.selectedSize || "Standard",
//         })),
//         totalAmount: finalAmount,
//         discount: discount,
//         shippingFee: shippingFee,
//         pincode: pincode,
//         paymentId: paymentId,
//         status: "pending",
//         createdAt: Timestamp.now(),
//       });
//       clearCart();
//       setShowSuccess(true);
//     } catch (err: unknown) {
//       console.error("Order Save Error:", err);
//     }
//   };

//   const handlePayment = async () => {
//     if (!userData || !userData.email || !userData.mobile) {
//       alert("Please update your profile with Email and Mobile number first.");
//       navigate("/profile");
//       return;
//     }

//     if (pincode.length !== 6) {
//       alert("Please enter a valid 6-digit Pincode.");
//       return;
//     }

//     try {
//       if (!window.Razorpay) {
//         alert("Payment gateway not loaded. Please try again.");
//         return;
//       }

//       setProcessing(true);

//       const res = await fetch(`${API_BASE}/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: Math.round(finalAmount * 100) }),
//       });

//       if (!res.ok) throw new Error("Order creation failed");
//       const data = await res.json();

//       const options: RazorpayInstanceOptions = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: data.amount,
//         currency: data.currency,
//         order_id: data.id,
//         name: "Imprinto Co.",
//         description: "Artifact Procurement",
//         prefill: {
//           name: userData.name || "Legend",
//           email: userData.email || "",
//           contact: userData.mobile || "",
//         },
//         handler: async function (response: RazorpayResponse) {
//           const verifyRes = await fetch(`${API_BASE}/verify-payment`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(response),
//           });
//           const result = await verifyRes.json();
//           if (result.status === "success") {
//             await saveOrderToFirestore(response.razorpay_payment_id);
//           } else {
//             alert("Payment verification failed.");
//           }
//           setProcessing(false);
//         },
//         theme: { color: "#FAFF00" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err: unknown) {
//       console.error("Payment Error:", err);
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-white font-bricolage selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-24 pb-20 px-4 md:px-10 lg:px-20">
//         <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 mt-10">
//           {/* LEFT: Shipping & Pincode */}
//           <div className="flex-[3] space-y-8 bg-[#080808] border border-white/5 p-6 md:p-10 rounded-sm relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

//             <div className="space-y-4">
//               <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
//                 Checkout Protocol
//               </h1>
//               <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
//                 Fill details to complete procurement
//               </p>
//             </div>

//             <div className="pt-8 space-y-6">
//               <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 space-y-6 rounded-sm">
//                 <div className="space-y-1">
//                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
//                     <MapPin size={14} className="text-primary" /> Delivery Zone
//                   </label>
//                   <input
//                     type="text"
//                     maxLength={6}
//                     placeholder="ENTER 6 DIGIT PINCODE *"
//                     value={pincode}
//                     onChange={(e) =>
//                       setPincode(e.target.value.replace(/\D/g, ""))
//                     }
//                     className="w-full bg-black border border-white/10 p-4 text-sm font-bold tracking-widest outline-none focus:border-primary uppercase placeholder:text-gray-800"
//                   />
//                   {pincode.length === 6 && (
//                     <p
//                       className={`text-[10px] font-bold uppercase mt-2 flex items-center gap-1.5 ${shippingFee === 0 ? "text-green-500" : "text-primary"}`}
//                     >
//                       <Info size={12} />
//                       {shippingFee === 0
//                         ? "Delhi/NCR: Standard Delivery (Free)"
//                         : `Rest of India: Standard Delivery (₹${shippingFee})`}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Order Summary & Coupon (Minimal Shopify style) */}
//           <div className="flex-[2]">
//             <div className="sticky top-28 bg-[#080808] border border-white/5 p-8 space-y-8 rounded-sm">
//               <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4">
//                 Manifest Summary
//               </h2>

//               <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//                 {items.map((item) => (
//                   <div
//                     key={`${item.product.id}-${item.selectedSize}`}
//                     className="flex gap-4 items-center bg-[#0a0a0a] border border-white/10 p-4 rounded-sm"
//                   >
//                     <img
//                       src={item.product.image_url}
//                       className="w-16 h-20 object-cover"
//                       alt={item.product.name}
//                     />
//                     <div className="flex-1 space-y-1">
//                       <h3 className="text-[11px] font-black uppercase tracking-tight break-words">
//                         {item.product.name}
//                       </h3>
//                       <p className="text-[10px] text-gray-500 uppercase">
//                         Size: {item.selectedSize || "Standard"}
//                       </p>
//                       <div className="flex justify-between items-end pt-3">
//                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                           Qty: {item.quantity}
//                         </p>
//                         <p className="text-lg font-black italic text-primary">
//                           ₹{item.product.price * item.quantity}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Coupon Section */}
//               <div className="space-y-4 pt-6 border-t border-white/10">
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     placeholder="ENTER PROMO CODE"
//                     value={coupon}
//                     onChange={(e) => setCoupon(e.target.value)}
//                     className="flex-1 bg-black border border-white/10 p-4 text-xs font-bold outline-none focus:border-primary uppercase placeholder:text-gray-800"
//                   />
//                   <Button
//                     onClick={applyCoupon}
//                     className="bg-white text-black hover:bg-primary rounded-none h-auto px-6 text-[10px] font-black"
//                   >
//                     APPLY
//                   </Button>
//                 </div>
//                 {isCouponApplied && (
//                   <p className="text-[10px] text-green-500 font-bold uppercase flex items-center gap-1.5 animate-in fade-in">
//                     <CheckCircle2 size={12} /> Protocol Applied (10% Off)
//                   </p>
//                 )}
//               </div>

//               {/* Summary Calculations */}
//               <div className="space-y-4 pt-6 border-t border-white/10 selection:bg-black selection:text-white">
//                 <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase">
//                   <span>Subtotal ({items.length} artifacts)</span>
//                   <span className="text-white">₹{totalPrice}</span>
//                 </div>
//                 <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase">
//                   <span>Shipping Fee</span>
//                   <span
//                     className={
//                       shippingFee === 0 && pincode.length === 6
//                         ? "text-green-500"
//                         : "text-white"
//                     }
//                   >
//                     {pincode.length === 6
//                       ? shippingFee === 0
//                         ? "FREE"
//                         : `₹${shippingFee}`
//                       : "TBD"}
//                   </span>
//                 </div>
//                 {discount > 0 && (
//                   <div className="flex justify-between text-[10px] font-black text-green-500 uppercase">
//                     <span>Discount (OFFER10)</span>
//                     <span>- ₹{discount}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between items-end pt-5">
//                   <span className="text-xs font-black uppercase text-gray-500 leading-none">
//                     Net Total
//                   </span>
//                   <span className="text-5xl font-black italic text-primary leading-none tracking-tighter">
//                     ₹{finalAmount}
//                   </span>
//                 </div>
//               </div>

//               <Button
//                 onClick={handlePayment}
//                 disabled={processing || items.length === 0}
//                 className="w-full h-16 bg-primary text-black font-black uppercase rounded-none hover:bg-white transition-all shadow-lg text-[12px] group"
//               >
//                 {processing ? (
//                   <Loader2 className="animate-spin" size={24} />
//                 ) : (
//                   "Finalize Procurement"
//                 )}
//               </Button>

//               <div className="flex items-center justify-center gap-2 text-[8px] font-bold text-gray-700 uppercase tracking-widest pt-3">
//                 <ShieldCheck size={12} className="text-green-500" /> Protocol
//                 secured by Razorpay
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* ✅ SUCCESS POP-UP (OVERLAY) */}
//       <AnimatePresence>
//         {showSuccess && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/98 z-[200] flex items-center justify-center p-6 backdrop-blur-xl"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               className="bg-[#080808] border border-primary/20 p-10 max-w-md w-full text-center space-y-10 relative overflow-hidden"
//             >
//               <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
//               <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />

//               <div className="flex justify-center">
//                 <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-pulse border border-primary/20">
//                   <PartyPopper size={48} />
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
//                   Procurement Complete!
//                 </h2>
//                 <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
//                   The Imprinto artifacts are being secured for immediate
//                   dispatch.
//                 </p>
//               </div>

//               <div className="bg-white/[0.02] border border-white/5 p-5 rounded-sm space-y-3">
//                 <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest text-left">
//                   Next Phases
//                 </p>
//                 <ul className="text-left text-[11px] font-bold space-y-2.5 text-white/90 uppercase tracking-tight">
//                   <li className="flex gap-2.5 items-center">
//                     <span className="text-primary font-black">01</span> Confirm
//                     email receipt within 5 mins.
//                   </li>
//                   <li className="flex gap-2.5 items-center">
//                     <span className="text-primary font-black">02</span> Track
//                     dispatch in member portal.
//                   </li>
//                 </ul>
//               </div>

//               <Button
//                 onClick={() => navigate("/profile")}
//                 className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest text-[10px] rounded-none hover:bg-white transition-all group"
//               >
//                 Access My Orders{" "}
//                 <ArrowRight
//                   size={16}
//                   className="ml-2 group-hover:translate-x-1 transition-transform"
//                 />
//               </Button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <Footer />
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 3px; }
//         .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { bg: rgba(255,255,255,0.05); border-radius: 2px; }
//       `}</style>
//     </div>
//   );
// };

// export default Checkout;

import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Package,
  Loader2,
  MapPin,
  PartyPopper,
  ArrowRight,
  Info,
  Zap,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

/* ---------------- STRICT TYPES ---------------- */
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstanceOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayConstructor {
  new (options: RazorpayInstanceOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://imprinto.onrender.com";

const Checkout = () => {
  const { items, totalPrice, clearCart, updateQuantity, removeFromCart } =
    useCart();
  const { userData } = useAuth();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>("");
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (pincode.length === 6) {
      const zone = pincode.substring(0, 2);
      if (["11", "12", "20"].includes(zone)) {
        setShippingFee(0);
      } else {
        setShippingFee(49);
      }
    } else {
      setShippingFee(0);
    }
  }, [pincode]);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "OFFER10") {
      setDiscount(totalPrice * 0.1);
      setIsCouponApplied(true);
    } else {
      setDiscount(0);
      setIsCouponApplied(false);
    }
  };

  const finalAmount = totalPrice + shippingFee - discount;

  const saveOrderToFirestore = async (paymentId: string) => {
    if (!userData) return;
    try {
      await addDoc(collection(db, "orders"), {
        customerName: userData.name || "Legend",
        email: userData.email || "",
        phone: userData.mobile || "",
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          size: item.selectedSize || "Standard",
        })),
        totalAmount: finalAmount,
        discount: discount,
        shippingFee: shippingFee,
        pincode: pincode,
        paymentId: paymentId,
        status: "pending",
        createdAt: Timestamp.now(),
      });
      clearCart();
      setShowSuccess(true);
    } catch (err: unknown) {
      console.error("Order Save Error:", err);
    }
  };

  const handlePayment = async () => {
    if (!userData || !userData.email || !userData.mobile) {
      navigate("/profile");
      return;
    }
    if (pincode.length !== 6) return;
    if (items.length === 0) return;

    try {
      if (!window.Razorpay) return;
      setProcessing(true);

      const res = await fetch(`${API_BASE}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(finalAmount * 100) }),
      });

      const data = await res.json();

      const options: RazorpayInstanceOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Imprinto Co.",
        description: "Artifact Procurement",
        prefill: {
          name: userData.name || "Legend",
          email: userData.email || "",
          contact: userData.mobile || "",
        },
        handler: async function (response: RazorpayResponse) {
          const verifyRes = await fetch(`${API_BASE}/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const result = await verifyRes.json();
          if (result.status === "success") {
            await saveOrderToFirestore(response.razorpay_payment_id);
          }
          setProcessing(false);
        },
        theme: { color: "#00D4FF" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      console.error("Payment Error", err);
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary">
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 items-start">
          {/* LEFT: LOGISTICS */}
          <div className="flex-1 space-y-10 w-full">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-accent fill-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
                  Step 01
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                LOGISTICS.
              </h1>
            </div>

            <div className="bg-white border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} className="text-primary" /> Delivery
                    Pincode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="6-DIGIT CODE"
                    value={pincode}
                    onChange={(e) =>
                      setPincode(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full bg-transparent border-b-2 border-foreground/10 py-3 text-xl font-black tracking-widest outline-none focus:border-primary transition-all placeholder:text-foreground/5"
                  />
                  {pincode.length === 6 && (
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 mt-3 text-[9px] font-black uppercase border-2 ${shippingFee === 0 ? "bg-accent-lime border-foreground" : "bg-primary border-foreground"}`}
                    >
                      <Info size={12} />
                      {shippingFee === 0
                        ? "Free Delhi/NCR Delivery"
                        : `Shipping: ₹${shippingFee}`}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-foreground/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-3 items-center">
                    <ShieldCheck className="text-green-500" size={16} />
                    <p className="text-[9px] font-black uppercase text-foreground/40">
                      Secure Payment
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Package className="text-primary" size={16} />
                    <p className="text-[9px] font-black uppercase text-foreground/40">
                      Tube Packaging
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: MANIFEST WITH QUANTITY CONTROLS */}
          <div className="lg:flex-[1.5] w-full">
            <div className="bg-white border-4 border-foreground p-10 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,212,255,1)]">
              <div className="flex items-end justify-between mb-10 pb-6 border-b-4 border-foreground">
                <h2 className="font-display text-5xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">
                  MANIFEST
                </h2>
                <span className="font-display text-2xl font-black text-primary italic">
                  ({items.length})
                </span>
              </div>

              <div className="space-y-10 mb-12">
                {items.length === 0 ? (
                  <p className="font-black uppercase text-foreground/20 text-center py-10 tracking-widest">
                    Cart is Empty
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-8 group"
                    >
                      <div className="w-24 h-32 bg-muted border-2 border-foreground flex-shrink-0 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <img
                          src={item.product.image_url}
                          className="w-full h-full object-cover"
                          alt={item.product.name}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-display text-xl md:text-2xl font-black uppercase tracking-tight leading-none mb-2">
                              {item.product.name}
                            </h3>
                            <span className="bg-foreground text-background px-2 py-0.5 text-[10px] font-black uppercase">
                              Size: {item.selectedSize}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              removeFromCart(item.product.id, item.selectedSize)
                            }
                            className="text-foreground/20 hover:text-accent transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex justify-between items-end">
                          {/* NEW QUANTITY TOGGLES */}
                          <div className="flex items-center border-2 border-foreground bg-white overflow-hidden h-10">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                              className="px-3 h-full hover:bg-muted border-r-2 border-foreground transition-colors"
                            >
                              <Minus size={12} strokeWidth={4} />
                            </button>
                            <span className="w-10 text-center text-xs font-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.quantity + 1,
                                )
                              }
                              className="px-3 h-full hover:bg-muted border-l-2 border-foreground transition-colors"
                            >
                              <Plus size={12} strokeWidth={4} />
                            </button>
                          </div>
                          <span className="font-display text-3xl font-black text-foreground tracking-tighter">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-0 mb-10">
                <input
                  type="text"
                  placeholder="PROMO CODE"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 bg-muted border-2 border-r-0 border-foreground px-6 text-sm font-black uppercase outline-none focus:bg-white transition-all"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-foreground text-background px-8 py-4 font-black text-xs uppercase hover:bg-primary hover:text-foreground transition-all border-2 border-foreground"
                >
                  APPLY
                </button>
              </div>

              <div className="space-y-5 pt-8 border-t-4 border-foreground">
                <div className="flex justify-between text-sm font-black text-foreground/40 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-foreground">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-foreground/40 uppercase tracking-widest">
                  <span>Logistics</span>
                  <span
                    className={
                      shippingFee === 0 && pincode.length === 6
                        ? "text-green-500"
                        : "text-foreground"
                    }
                  >
                    {pincode.length === 6
                      ? shippingFee === 0
                        ? "FREE"
                        : `₹${shippingFee}`
                      : "TBD"}
                  </span>
                </div>

                <div className="flex justify-between items-end pt-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase text-primary italic leading-none mb-1">
                      Final Dues
                    </span>
                    <span className="text-xs font-black uppercase text-foreground/30 leading-none">
                      Net Payable
                    </span>
                  </div>
                  <span className="font-display text-7xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.8]">
                    ₹{finalAmount}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={processing || items.length === 0}
                className="w-full h-24 bg-foreground text-background font-black uppercase tracking-[0.2em] rounded-none hover:bg-primary hover:text-foreground transition-all mt-12 text-lg shadow-[12px_12px_0px_0px_rgba(255,46,99,1)] hover:shadow-none"
              >
                {processing ? (
                  <Loader2 className="animate-spin" size={32} />
                ) : (
                  "FINALIZE PURCHASE"
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;