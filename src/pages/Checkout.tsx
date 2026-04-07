// import { useEffect } from "react";
// import { useCart } from "@/contexts/CartContext";
// import { Button } from "@/components/ui/button";

// /* ---------------- TYPES ---------------- */

// type RazorpayResponse = {
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
//   razorpay_signature: string;
// };

// type RazorpayOptions = {
//   key: string;
//   amount: number;
//   currency: string;
//   order_id: string;
//   name: string;
//   description: string;
//   handler: (response: RazorpayResponse) => void;
// };

// /* ---------------- GLOBAL ---------------- */

// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => {
//       open: () => void;
//     };
//   }
// }

// /* ---------------- API BASE ---------------- */

// // 🔥 AUTO SWITCH (local vs production)
// const API_BASE =
//   window.location.hostname === "localhost"
//     ? "http://localhost:5000"
//     : "https://imprinto.onrender.com";

// /* ---------------- COMPONENT ---------------- */

// const Checkout = () => {
//   const { items, totalPrice } = useCart();

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const handlePayment = async () => {
//     try {
//       if (!window.Razorpay) {
//         alert("Razorpay not loaded");
//         return;
//       }

//       if (items.length === 0) {
//         alert("Cart is empty");
//         return;
//       }

//       const res = await fetch(`${API_BASE}/create-order`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: totalPrice * 100,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to create order");

//       const data = await res.json();

//       const options: RazorpayOptions = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: data.amount,
//         currency: data.currency,
//         order_id: data.id,
//         name: "Imprinto Co.",
//         description: "Order Payment",

//         handler: async function (response: RazorpayResponse) {
//           try {
//             const verifyRes = await fetch(`${API_BASE}/verify-payment`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(response),
//             });

//             const result = await verifyRes.json();

//             if (result.status === "success") {
//               alert("Payment Successful");
//             } else {
//               alert("Payment verification failed");
//             }
//           } catch (err) {
//             console.error(err);
//             alert("Verification failed");
//           }
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground flex justify-center items-center px-4">
//       <div className="w-full max-w-xl bg-surface-container p-6 rounded-2xl shadow-lg">
//         <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

//         <div className="space-y-3 mb-6">
//           {items.map((item) => (
//             <div key={item.product.id} className="flex justify-between text-sm">
//               <span>
//                 {item.product.name} × {item.quantity}
//               </span>
//               <span>₹{item.product.price * item.quantity}</span>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between font-bold text-lg mb-6">
//           <span>Total</span>
//           <span>₹{totalPrice}</span>
//         </div>

//         <Button className="w-full" size="lg" onClick={handlePayment}>
//           Pay Now
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Package,
  CreditCard,
  Loader2,
  MapPin,
} from "lucide-react";

/* ---------------- TYPES ---------------- */
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  theme: {
    color: string;
  };
}

/* ---------------- GLOBAL ---------------- */
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://imprinto.onrender.com";

const Checkout = () => {
  const { items, totalPrice } = useCart();
  const [processing, setProcessing] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>("");
  const [shippingFee, setShippingFee] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Simple shipping logic based on PIN code
  useEffect(() => {
    if (pincode.length === 6) {
      // Example logic: Free shipping for Delhi NCR (starting with 11, 12, 20)
      const zone = pincode.substring(0, 2);
      if (["11", "12", "20"].includes(zone)) {
        setShippingFee(0);
      } else {
        setShippingFee(49); // Flat rate for rest of India
      }
    } else {
      setShippingFee(0);
    }
  }, [pincode]);

  const finalAmount = totalPrice + shippingFee;

  const handlePayment = async () => {
    if (pincode.length !== 6) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    try {
      if (!window.Razorpay) {
        alert("Payment gateway not loaded.");
        return;
      }

      setProcessing(true);

      const res = await fetch(`${API_BASE}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount * 100,
        }),
      });

      if (!res.ok) throw new Error("Order creation failed");

      const data = await res.json();

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Imprinto Co.",
        description: "Artifact Acquisition",
        handler: async function (response: RazorpayResponse) {
          try {
            const verifyRes = await fetch(`${API_BASE}/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const result = await verifyRes.json();
            if (result.status === "success") {
              alert("Acquisition Successful.");
            } else {
              alert("Verification failed.");
            }
          } catch (err) {
            console.error(err);
          } finally {
            setProcessing(false);
          }
        },
        theme: { color: "#FAFF00" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="border-b border-white/10 pb-6 flex items-center gap-4">
              <Package className="text-primary" size={32} />
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                Acquisition Manifest
              </h1>
            </div>

            {/* Shipping Address Section */}
            <div className="bg-[#0a0a0a] border border-white/5 p-6 space-y-4 rounded-sm">
              <h2 className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase">
                Delivery Point
              </h2>
              <div className="relative max-w-xs">
                <MapPin
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6 DIGIT PIN CODE"
                  value={pincode}
                  onChange={(e) =>
                    setPincode(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full bg-transparent border border-white/10 p-3 pl-10 text-sm outline-none focus:border-primary font-bold tracking-widest uppercase"
                />
              </div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                * Shipping fee is calculated based on your location.
              </p>
            </div>

            <div className="space-y-4">
              {items.map((item, i) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-6 bg-[#0a0a0a] border border-white/5 p-5 group transition-all rounded-sm"
                >
                  <div className="w-20 h-20 bg-gray-900 border border-white/5 overflow-hidden">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold uppercase text-base tracking-tight">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-xl font-black tabular-nums text-white">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28 bg-[#0a0a0a] border border-white/5 p-8 space-y-8 rounded-sm">
              <div className="space-y-3">
                <h2 className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase text-left">
                  Transaction Terminal
                </h2>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
                  <ShieldCheck size={14} className="text-green-500" />
                  Protocol Active
                </div>
              </div>

              <div className="space-y-5 border-y border-white/5 py-6">
                <div className="flex justify-between items-center text-gray-400 uppercase text-[10px] font-black tracking-widest">
                  <span>Artifacts</span>
                  <span className="text-white tabular-nums text-sm font-bold">
                    ₹{totalPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-400 uppercase text-[10px] font-black tracking-widest">
                  <span>Shipping Protocol</span>
                  <span
                    className={
                      shippingFee === 0
                        ? "text-green-500 font-bold text-sm"
                        : "text-white tabular-nums text-sm font-bold"
                    }
                  >
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end gap-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 leading-none">
                  Total
                  <br />
                  Acquisition
                </h3>
                <p className="text-5xl font-black tabular-nums tracking-tighter leading-none text-primary">
                  ₹{finalAmount}
                </p>
              </div>

              <Button
                className="w-full h-16 bg-primary text-black font-black uppercase tracking-tighter text-xl rounded-none hover:bg-white transition-all"
                onClick={handlePayment}
                disabled={processing || items.length === 0}
              >
                {processing ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  "Initialize Acquisition"
                )}
              </Button>

              <p className="text-[9px] text-center text-gray-700 uppercase font-black tracking-widest pt-2">
                Secure acquisition via Razorpay gateway
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;