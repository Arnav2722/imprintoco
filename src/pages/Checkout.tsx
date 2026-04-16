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
//   PartyPopper,
//   ArrowRight,
//   Info,
//   Zap,
//   Plus,
//   Minus,
//   Trash2,
// } from "lucide-react";

// /* ---------------- STRICT TYPES ---------------- */
// interface RazorpayResponse {
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
//   razorpay_signature: string;
// }

// interface RazorpayInstanceOptions {
//   key: string;
//   amount: number;
//   currency: string;
//   order_id: string;
//   name: string;
//   description: string;
//   handler: (response: RazorpayResponse) => void;
//   prefill: { name: string; email: string; contact: string };
//   theme: { color: string };
// }

// interface RazorpayInstance {
//   open: () => void;
// }

// interface RazorpayConstructor {
//   new (options: RazorpayInstanceOptions): RazorpayInstance;
// }

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
//   const { items, totalPrice, clearCart, updateQuantity, removeFromCart } =
//     useCart();
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
//       navigate("/profile");
//       return;
//     }
//     if (pincode.length !== 6) return;
//     if (items.length === 0) return;

//     try {
//       if (!window.Razorpay) return;
//       setProcessing(true);

//       const res = await fetch(`${API_BASE}/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: Math.round(finalAmount * 100) }),
//       });

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
//           }
//           setProcessing(false);
//         },
//         theme: { color: "#00D4FF" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err: unknown) {
//       console.error("Payment Error", err);
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground selection:bg-primary">
//       <Navbar />

//       <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
//         <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 items-start">
//           {/* LEFT: LOGISTICS */}
//           <div className="flex-1 space-y-10 w-full">
//             <div className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <Zap size={16} className="text-accent fill-accent" />
//                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
//                   Step 01
//                 </span>
//               </div>
//               <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
//                 LOGISTICS.
//               </h1>
//             </div>

//             <div className="bg-white border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-[9px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2">
//                     <MapPin size={14} className="text-primary" /> Delivery
//                     Pincode
//                   </label>
//                   <input
//                     type="text"
//                     maxLength={6}
//                     placeholder="6-DIGIT CODE"
//                     value={pincode}
//                     onChange={(e) =>
//                       setPincode(e.target.value.replace(/\D/g, ""))
//                     }
//                     className="w-full bg-transparent border-b-2 border-foreground/10 py-3 text-xl font-black tracking-widest outline-none focus:border-primary transition-all placeholder:text-foreground/5"
//                   />
//                   {pincode.length === 6 && (
//                     <div
//                       className={`inline-flex items-center gap-2 px-3 py-1 mt-3 text-[9px] font-black uppercase border-2 ${shippingFee === 0 ? "bg-accent-lime border-foreground" : "bg-primary border-foreground"}`}
//                     >
//                       <Info size={12} />
//                       {shippingFee === 0
//                         ? "Free Delhi/NCR Delivery"
//                         : `Shipping: ₹${shippingFee}`}
//                     </div>
//                   )}
//                 </div>

//                 <div className="pt-6 border-t border-foreground/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="flex gap-3 items-center">
//                     <ShieldCheck className="text-green-500" size={16} />
//                     <p className="text-[9px] font-black uppercase text-foreground/40">
//                       Secure Payment
//                     </p>
//                   </div>
//                   <div className="flex gap-3 items-center">
//                     <Package className="text-primary" size={16} />
//                     <p className="text-[9px] font-black uppercase text-foreground/40">
//                       Tube Packaging
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: MANIFEST WITH QUANTITY CONTROLS */}
//           <div className="lg:flex-[1.5] w-full">
//             <div className="bg-white border-4 border-foreground p-10 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,212,255,1)]">
//               <div className="flex items-end justify-between mb-10 pb-6 border-b-4 border-foreground">
//                 <h2 className="font-display text-5xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">
//                   MANIFEST
//                 </h2>
//                 <span className="font-display text-2xl font-black text-primary italic">
//                   ({items.length})
//                 </span>
//               </div>

//               <div className="space-y-10 mb-12">
//                 {items.length === 0 ? (
//                   <p className="font-black uppercase text-foreground/20 text-center py-10 tracking-widest">
//                     Cart is Empty
//                   </p>
//                 ) : (
//                   items.map((item) => (
//                     <div
//                       key={`${item.product.id}-${item.selectedSize}`}
//                       className="flex gap-8 group"
//                     >
//                       <div className="w-24 h-32 bg-muted border-2 border-foreground flex-shrink-0 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//                         <img
//                           src={item.product.image_url}
//                           className="w-full h-full object-cover"
//                           alt={item.product.name}
//                         />
//                       </div>
//                       <div className="flex-1 flex flex-col justify-between py-1">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h3 className="font-display text-xl md:text-2xl font-black uppercase tracking-tight leading-none mb-2">
//                               {item.product.name}
//                             </h3>
//                             <span className="bg-foreground text-background px-2 py-0.5 text-[10px] font-black uppercase">
//                               Size: {item.selectedSize}
//                             </span>
//                           </div>
//                           <button
//                             onClick={() =>
//                               removeFromCart(item.product.id, item.selectedSize)
//                             }
//                             className="text-foreground/20 hover:text-accent transition-colors"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>

//                         <div className="flex justify-between items-end">
//                           {/* NEW QUANTITY TOGGLES */}
//                           <div className="flex items-center border-2 border-foreground bg-white overflow-hidden h-10">
//                             <button
//                               onClick={() =>
//                                 updateQuantity(
//                                   item.product.id,
//                                   item.selectedSize,
//                                   Math.max(1, item.quantity - 1),
//                                 )
//                               }
//                               className="px-3 h-full hover:bg-muted border-r-2 border-foreground transition-colors"
//                             >
//                               <Minus size={12} strokeWidth={4} />
//                             </button>
//                             <span className="w-10 text-center text-xs font-black">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() =>
//                                 updateQuantity(
//                                   item.product.id,
//                                   item.selectedSize,
//                                   item.quantity + 1,
//                                 )
//                               }
//                               className="px-3 h-full hover:bg-muted border-l-2 border-foreground transition-colors"
//                             >
//                               <Plus size={12} strokeWidth={4} />
//                             </button>
//                           </div>
//                           <span className="font-display text-3xl font-black text-foreground tracking-tighter">
//                             ₹{item.product.price * item.quantity}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               <div className="flex gap-0 mb-10">
//                 <input
//                   type="text"
//                   placeholder="PROMO CODE"
//                   value={coupon}
//                   onChange={(e) => setCoupon(e.target.value)}
//                   className="flex-1 bg-muted border-2 border-r-0 border-foreground px-6 text-sm font-black uppercase outline-none focus:bg-white transition-all"
//                 />
//                 <button
//                   onClick={applyCoupon}
//                   className="bg-foreground text-background px-8 py-4 font-black text-xs uppercase hover:bg-primary hover:text-foreground transition-all border-2 border-foreground"
//                 >
//                   APPLY
//                 </button>
//               </div>

//               <div className="space-y-5 pt-8 border-t-4 border-foreground">
//                 <div className="flex justify-between text-sm font-black text-foreground/40 uppercase tracking-widest">
//                   <span>Subtotal</span>
//                   <span className="text-foreground">₹{totalPrice}</span>
//                 </div>
//                 <div className="flex justify-between text-sm font-black text-foreground/40 uppercase tracking-widest">
//                   <span>Logistics</span>
//                   <span
//                     className={
//                       shippingFee === 0 && pincode.length === 6
//                         ? "text-green-500"
//                         : "text-foreground"
//                     }
//                   >
//                     {pincode.length === 6
//                       ? shippingFee === 0
//                         ? "FREE"
//                         : `₹${shippingFee}`
//                       : "TBD"}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-end pt-6">
//                   <div className="flex flex-col">
//                     <span className="text-xs font-black uppercase text-primary italic leading-none mb-1">
//                       Final Dues
//                     </span>
//                     <span className="text-xs font-black uppercase text-foreground/30 leading-none">
//                       Net Payable
//                     </span>
//                   </div>
//                   <span className="font-display text-7xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.8]">
//                     ₹{finalAmount}
//                   </span>
//                 </div>
//               </div>

//               <Button
//                 onClick={handlePayment}
//                 disabled={processing || items.length === 0}
//                 className="w-full h-24 bg-foreground text-background font-black uppercase tracking-[0.2em] rounded-none hover:bg-primary hover:text-foreground transition-all mt-12 text-lg shadow-[12px_12px_0px_0px_rgba(255,46,99,1)] hover:shadow-none"
//               >
//                 {processing ? (
//                   <Loader2 className="animate-spin" size={32} />
//                 ) : (
//                   "FINALIZE PURCHASE"
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
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
  ChevronRight,
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

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-4 border-foreground p-12 text-center shadow-[20px_20px_0px_0px_#00D4FF] max-w-md w-full"
        >
          <PartyPopper size={64} className="mx-auto text-primary mb-6" />
          <h1 className="font-display text-4xl font-black uppercase mb-4 tracking-tighter">
            SUCCESS.
          </h1>
          <p className="font-bold uppercase text-[10px] tracking-widest text-foreground/40 mb-8 leading-relaxed">
            Transmission Received. Your artifacts are entering the processing
            phase.
          </p>
          <Button
            onClick={() => navigate("/profile")}
            className="w-full h-14 bg-foreground text-background font-black uppercase rounded-none hover:bg-primary hover:text-foreground"
          >
            VIEW ORDERS
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary">
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: LOGISTICS SECTION */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-accent fill-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
                  Step 01
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
                LOGISTICS.
              </h1>
            </div>

            <div className="bg-white border-4 border-foreground p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={14} className="text-primary" /> Delivery Pincode
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6-DIGIT CODE"
                  value={pincode}
                  onChange={(e) =>
                    setPincode(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full bg-transparent border-b-4 border-foreground/10 py-4 text-3xl font-black tracking-widest outline-none focus:border-primary transition-all placeholder:text-foreground/5"
                />
                {pincode.length === 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`inline-flex items-center gap-2 px-4 py-2 mt-4 text-[10px] font-black uppercase border-2 ${shippingFee === 0 ? "bg-accent-lime border-foreground" : "bg-primary border-foreground"}`}
                  >
                    <Info size={14} />
                    {shippingFee === 0
                      ? "Free Delhi/NCR Delivery"
                      : `Shipping Fee: ₹${shippingFee}`}
                  </motion.div>
                )}
              </div>

              <div className="pt-8 border-t-2 border-foreground/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4 items-center p-4 bg-foreground/5 border-2 border-transparent hover:border-foreground transition-all">
                  <ShieldCheck className="text-green-500" size={24} />
                  <div>
                    <p className="text-[10px] font-black uppercase">
                      Secure Payment
                    </p>
                    <p className="text-[8px] font-bold opacity-40 uppercase">
                      Encrypted Terminal
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center p-4 bg-foreground/5 border-2 border-transparent hover:border-foreground transition-all">
                  <Package className="text-primary" size={24} />
                  <div>
                    <p className="text-[10px] font-black uppercase">
                      Tube Packaging
                    </p>
                    <p className="text-[8px] font-bold opacity-40 uppercase">
                      Damage-Free Archive
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: MANIFEST SUMMARY (Sidebar) */}
          <div className="lg:col-span-5 w-full">
            <div className="lg:sticky lg:top-32 space-y-6">
              {/* Header */}
              <div className="bg-black text-white p-6 border-x-4 border-t-4 border-black flex justify-between items-center">
                <h2 className="font-display text-3xl font-black uppercase italic tracking-tighter">
                  MANIFEST
                </h2>
                <span className="bg-primary text-black px-3 py-1 text-xs font-black">
                  ({items.length})
                </span>
              </div>

              {/* Items List */}
              <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[12px_12px_0px_0px_#00D4FF] space-y-8">
                <div className="max-h-[350px] overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                  {items.length === 0 ? (
                    <p className="text-center py-10 font-black uppercase opacity-20 italic">
                      Archive Empty
                    </p>
                  ) : (
                    items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}`}
                        className="flex gap-6 group border-b-2 border-black/5 pb-6 last:border-0 last:pb-0"
                      >
                        <div className="w-20 h-28 bg-muted border-2 border-black flex-shrink-0 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <img
                            src={item.product.image_url}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-black uppercase text-xs leading-tight mb-1">
                                {item.product.name}
                              </h3>
                              <span className="text-[9px] font-black bg-primary px-2 py-0.5 uppercase">
                                {item.selectedSize}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.product.id,
                                  item.selectedSize,
                                )
                              }
                              className="text-black/20 hover:text-accent transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center border-2 border-black h-8 bg-white overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.selectedSize,
                                    Math.max(1, item.quantity - 1),
                                  )
                                }
                                className="px-2 h-full border-r-2 border-black hover:bg-muted"
                              >
                                <Minus size={10} strokeWidth={4} />
                              </button>
                              <span className="w-8 text-center text-[10px] font-black">
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
                                className="px-2 h-full border-l-2 border-black hover:bg-muted"
                              >
                                <Plus size={10} strokeWidth={4} />
                              </button>
                            </div>
                            <span className="font-black text-lg italic">
                              ₹{item.product.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Promo Code */}
                <div className="flex h-12 border-2 border-black">
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 px-4 text-xs font-black uppercase outline-none bg-foreground/5 focus:bg-white transition-all"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-black text-white px-6 font-black text-[10px] uppercase hover:bg-primary hover:text-black transition-all border-l-2 border-black"
                  >
                    APPLY
                  </button>
                </div>

                {/* Totals */}
                <div className="space-y-4 pt-6 border-t-4 border-black">
                  <div className="flex justify-between text-[10px] font-black uppercase opacity-40">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase opacity-40">
                    <span>Logistics</span>
                    <span
                      className={
                        shippingFee === 0 && pincode.length === 6
                          ? "text-green-500"
                          : ""
                      }
                    >
                      {pincode.length === 6
                        ? shippingFee === 0
                          ? "FREE"
                          : `₹${shippingFee}`
                        : "TBD"}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[10px] font-black uppercase text-accent-lime">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-end pt-4 border-t-2 border-black/10">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-primary italic leading-none mb-1">
                        Final Dues
                      </span>
                      <span className="text-[10px] font-black uppercase opacity-30 leading-none">
                        Net Payable
                      </span>
                    </div>
                    <span className="font-display text-6xl font-black italic tracking-tighter leading-[0.8]">
                      ₹{finalAmount}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={
                    processing || items.length === 0 || pincode.length !== 6
                  }
                  className="w-full h-20 bg-black text-white rounded-none font-black text-sm uppercase tracking-[0.4em] hover:bg-primary hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(255,46,99,1)] hover:shadow-none active:translate-x-1 active:translate-y-1 group"
                >
                  {processing ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "FINALIZE PURCHASE"
                  )}
                  {!processing && (
                    <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;