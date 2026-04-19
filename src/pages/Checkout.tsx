import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Package,
  Loader2,
  MapPin,
  PartyPopper,
  Zap,
  Minus,
  Plus,
  Trash2,
  ChevronRight,
  Truck,
  Lock,
} from "lucide-react";

/* ---------------- RAZORPAY TYPES ---------------- */
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

const Checkout = (): JSX.Element => {
  const { items, totalPrice, clearCart, updateQuantity, removeFromCart } =
    useCart();
  const { userData } = useAuth();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [shippingFee, setShippingFee] = useState<number>(0);

  // 1. Load Razorpay Script
  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // 2. Shipping Logic
  useEffect(() => {
    if (pincode.length === 6) {
      const zone = pincode.substring(0, 2);
      setShippingFee(["11", "12", "20", "30"].includes(zone) ? 0 : 49);
    }
  }, [pincode]);

  const finalAmount = totalPrice + shippingFee;

  const saveOrderToFirestore = async (paymentId: string) => {
    if (!userData) return;
    try {
      await addDoc(collection(db, "orders"), {
        customerName: userData.name || "Customer",
        email: userData.email || "",
        phone: userData.mobile || "",
        address: address,
        pincode: pincode,
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          size: item.selectedSize || "Standard",
        })),
        totalAmount: finalAmount,
        shippingFee: shippingFee,
        paymentId: paymentId,
        status: "pending",
        createdAt: Timestamp.now(),
      });
      clearCart();
      setShowSuccess(true);
    } catch (err: unknown) {
      console.error("Firestore Save Error:", err);
    }
  };

  const handlePayment = async () => {
    if (
      !userData?.email ||
      !userData?.mobile ||
      !address ||
      pincode.length !== 6
    ) {
      alert("Address aur Profile details check karein!");
      return;
    }

    try {
      setProcessing(true);

      // A. Create Order in Backend
      const res = await fetch(`${API_BASE}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(finalAmount * 100) }),
      });

      if (!res.ok) throw new Error("Backend connection failed");
      const orderData = await res.json();

      // B. Razorpay Options
      const options: RazorpayInstanceOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        name: "Imprinto Co.",
        description: "Purchasing Artwork",
        prefill: {
          name: userData.name || "Legend",
          email: userData.email,
          contact: userData.mobile,
        },
        handler: async function (response: RazorpayResponse) {
          // C. Verify Payment
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

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay is loading... please wait 2 seconds and try again.");
      }
    } catch (err) {
      console.error("Payment Process Error:", err);
      alert("Payment start nahi ho saki. Console check karein.");
    } finally {
      setProcessing(false);
    }
  };

  if (showSuccess)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-4 border-foreground p-12 shadow-[20px_20px_0px_0px_#00D4FF] max-w-md w-full text-center font-body"
        >
          <PartyPopper size={64} className="mx-auto text-primary mb-6" />
          <h1 className="text-4xl font-black uppercase italic">SUCCESS.</h1>
          <p className="text-[10px] font-black uppercase text-foreground/40 mt-4 mb-8">
            Haul confirmed. Transmission successful.
          </p>
          <Button
            onClick={() => navigate("/profile")}
            className="w-full h-16 bg-foreground text-background font-black uppercase rounded-none hover:bg-primary"
          >
            MY ORDERS
          </Button>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: SUMMARY (Mobile Order-1) */}
          <div className="w-full lg:col-span-7 space-y-10 order-1">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-accent fill-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                  Step 01 // Review
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
                THE SUMMARY.
              </h1>
            </div>

            <div className="bg-white border-4 border-black p-4 md:p-10 shadow-[12px_12px_0px_0px_#00D4FF]">
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 md:gap-6 border-b-2 border-black/5 pb-6 last:border-0"
                  >
                    <div className="w-20 h-28 md:w-24 md:h-32 border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <img
                        src={item.product.image_url}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-black uppercase text-[11px] md:text-lg leading-tight">
                            {item.product.name}
                          </h3>
                          <span className="text-[9px] font-black bg-primary px-2 py-0.5 uppercase mt-1 inline-block">
                            {item.selectedSize}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedSize)
                          }
                          className="text-black/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border-2 border-black h-8 overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className="px-2 border-r-2 border-black hover:bg-muted"
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
                            className="px-2 border-l-2 border-black hover:bg-muted"
                          >
                            <Plus size={10} strokeWidth={4} />
                          </button>
                        </div>
                        <span className="font-black text-xl italic">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:grid grid-cols-3 gap-4">
              <div className="border-2 border-foreground/10 bg-white p-5 text-center gap-2 flex flex-col items-center">
                <ShieldCheck className="text-green-500" size={28} />
                <p className="text-[9px] font-black uppercase">
                  Secure Terminal
                </p>
              </div>
              <div className="border-2 border-foreground/10 bg-white p-5 text-center gap-2 flex flex-col items-center">
                <Package className="text-primary" size={28} />
                <p className="text-[9px] font-black uppercase">Safe Packing</p>
              </div>
              <div className="border-2 border-foreground/10 bg-white p-5 text-center gap-2 flex flex-col items-center">
                <Truck className="text-accent" size={28} />
                <p className="text-[9px] font-black uppercase">Fast Transit</p>
              </div>
            </div>
          </div>

          {/* RIGHT: ADDRESS (Mobile Order-2) */}
          <div className="w-full lg:col-span-5 lg:sticky lg:top-32 space-y-6 order-2">
            <div className="bg-black text-white p-6 border-x-4 border-t-4 border-black">
              <h2 className="font-display text-3xl font-black uppercase italic tracking-tighter leading-none">
                SHIPPING
              </h2>
            </div>

            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} className="text-primary" /> Pincode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="110001"
                    value={pincode}
                    onChange={(e) =>
                      setPincode(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full bg-transparent border-b-4 border-foreground py-2 text-3xl font-black outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">
                    Street Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value.toUpperCase())}
                    placeholder="HOUSE NO, AREA, LANDMARK"
                    className="w-full h-24 bg-muted border-2 border-foreground/10 p-4 text-[11px] font-black uppercase outline-none focus:border-primary transition-all resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t-4 border-black">
                <div className="flex justify-between text-[11px] font-black uppercase opacity-40">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase opacity-40">
                  <span>Shipping</span>
                  <span
                    className={
                      shippingFee === 0 && pincode.length === 6
                        ? "text-green-500 font-black"
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
                <div className="flex justify-between items-end pt-4 border-t-2 border-black/10">
                  <span className="text-[12px] font-black uppercase text-primary italic">
                    To Pay
                  </span>
                  <span className="text-5xl font-black italic tracking-tighter leading-none">
                    ₹{finalAmount}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={
                  processing ||
                  items.length === 0 ||
                  pincode.length !== 6 ||
                  !address
                }
                className="w-full h-16 bg-black text-white rounded-none font-black text-sm uppercase tracking-[0.3em] hover:bg-primary hover:text-black transition-all shadow-[6px_6px_0px_0px_#FF2E63] active:translate-x-1 active:translate-y-1"
              >
                {processing ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "EXECUTE PAYMENT"
                )}
                {!processing && <ChevronRight className="ml-2" />}
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

// Have to add Delhivery API to this
// API will be connected via backend, and will be triggered when order is created in Firestore
// It will return a tracking ID which will be saved in the order document in Firestore
// This tracking ID can then be used to track the order status and update it in Firestore accordingly
