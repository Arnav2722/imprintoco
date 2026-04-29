// import { useEffect, useState } from "react";
// import { useCart } from "@/contexts/CartContext";
// import { useAuth } from "@/contexts/AuthContext";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";
// import { db } from "@/lib/firebase";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { Loader2, PartyPopper, Lock, ChevronRight, Info } from "lucide-react";

// /* ---------------- RAZORPAY STRICT TYPES ---------------- */
// interface RazorpayResponse {
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
//   razorpay_signature: string;
// }

// interface RazorpayOptions {
//   key: string;
//   amount: number;
//   currency: string;
//   order_id: string;
//   name: string;
//   description: string;
//   prefill: {
//     name: string;
//     email: string;
//     contact: string;
//   };
//   handler: (response: RazorpayResponse) => Promise<void>;
//   theme: {
//     color: string;
//   };
// }

// interface RazorpayInstance {
//   open: () => void;
// }

// interface RazorpayConstructor {
//   new (options: RazorpayOptions): RazorpayInstance;
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

// const Checkout = (): JSX.Element => {
//   const { items, totalPrice, clearCart } = useCart();
//   const { userData } = useAuth();
//   const navigate = useNavigate();

//   const [processing, setProcessing] = useState<boolean>(false);
//   const [showSuccess, setShowSuccess] = useState<boolean>(false);

//   // Input States
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [phone, setPhone] = useState("");

//   const [shippingMethod, setShippingMethod] = useState<"prepaid" | "cod">(
//     "prepaid",
//   );
//   const [shippingFee, setShippingFee] = useState<number>(0);

//   // Prefill from Auth
//   useEffect(() => {
//     if (userData) {
//       setEmail(userData.email || "");
//       setPhone(userData.mobile || "");
//       const nameParts = userData.name?.split(" ") || ["", ""];
//       setFirstName(nameParts[0]);
//       setLastName(nameParts.slice(1).join(" "));
//     }
//   }, [userData]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   useEffect(() => {
//     setShippingFee(shippingMethod === "cod" ? 129 : 45);
//   }, [shippingMethod]);

//   const finalAmount = totalPrice + shippingFee;

//   const saveOrderToFirestore = async (paymentId: string = "COD_ORDER") => {
//     try {
//       const shipRes = await fetch(`${API_BASE}/create-order`, {
//       // const shipRes = await fetch(`${API_BASE}/create-shipment`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           customerName: `${firstName} ${lastName}`,
//           address,
//           pincode,
//           phone,
//           orderId: paymentId.slice(-8),
//           totalAmount: finalAmount,
//         }),
//       });

//       const shipData = await shipRes.json();
//       const finalTrackingId = shipData.success
//         ? shipData.trackingId
//         : "PENDING_API";

//       await addDoc(collection(db, "orders"), {
//         customerName: `${firstName} ${lastName}`,
//         email,
//         phone,
//         address,
//         pincode,
//         city,
//         items: items.map((item) => ({
//           name: item.product.name,
//           quantity: item.quantity,
//           price: item.product.price,
//           size: item.selectedSize || "Standard",
//         })),
//         totalAmount: finalAmount,
//         shippingFee,
//         paymentMethod: shippingMethod,
//         paymentId,
//         trackingId: finalTrackingId,
//         status: "processing",
//         createdAt: Timestamp.now(),
//       });

//       clearCart();
//       setShowSuccess(true);
//     } catch (err: unknown) {
//       console.error("Firestore Save Error:", err);
//     }
//   };

//   const handlePayment = async () => {
//     if (!email || !phone || !address || pincode.length !== 6 || !firstName) {
//       alert("Please fill all required fields correctly!");
//       return;
//     }

//     setProcessing(true);

//     if (shippingMethod === "cod") {
//       await saveOrderToFirestore();
//       setProcessing(false);
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE}/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: Math.round(finalAmount * 100) }),
//       });

//       const orderData = await res.json();

//       const options: RazorpayOptions = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         order_id: orderData.id,
//         name: "Imprinto Co.",
//         description: "Art Terminal Checkout",
//         prefill: {
//           name: `${firstName} ${lastName}`,
//           email,
//           contact: phone,
//         },
//         handler: async (response: RazorpayResponse) => {
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

//       if (window.Razorpay) {
//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   if (showSuccess)
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center p-6">
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="bg-white border-4 border-foreground p-10 shadow-[10px_10px_0px_0px_#00D4FF] max-w-md w-full text-center"
//         >
//           <PartyPopper size={48} className="mx-auto text-primary mb-6" />
//           <h1 className="font-display text-2xl font-black uppercase">
//             ORDER SECURED
//           </h1>
//           <p className="text-[10px] font-black uppercase text-foreground/40 mt-4 mb-8">
//             Transmission complete.
//           </p>
//           <button
//             onClick={() => navigate("/profile")}
//             className="w-full h-14 bg-foreground text-background font-black uppercase text-[10px] shadow-[4px_4px_0px_0px_#00D4FF] hover:bg-primary transition-all"
//           >
//             MY ORDERS
//           </button>
//         </motion.div>
//       </div>
//     );

//   const inputClass =
//     "w-full bg-white border-2 border-foreground/10 p-4 text-[10px] font-black uppercase outline-none focus:border-primary transition-all";

//   return (
//     <div className="min-h-screen bg-white text-foreground selection:bg-primary selection:text-black">
//       <Navbar />
//       <main className="pt-24 md:pt-32 pb-24">
//         <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
//           <div className="lg:col-span-7 space-y-12">
//             <section className="space-y-6">
//               <h2 className="font-display text-lg md:text-xl font-black uppercase">
//                 Contact
//               </h2>
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 className={inputClass}
//               />
//             </section>

//             <section className="space-y-6">
//               <h2 className="font-display text-lg md:text-xl font-black uppercase">
//                 Delivery
//               </h2>
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     placeholder="First name"
//                     className={inputClass}
//                   />
//                   <input
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     placeholder="Last name"
//                     className={inputClass}
//                   />
//                 </div>
//                 <input
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value.toUpperCase())}
//                   placeholder="Address (House No, Street, Area)"
//                   className={inputClass}
//                 />
//                 <div className="grid grid-cols-3 gap-4">
//                   <input
//                     value={city}
//                     onChange={(e) => setCity(e.target.value.toUpperCase())}
//                     placeholder="City"
//                     className={inputClass}
//                   />
//                   <select className={inputClass}>
//                     <option>Rajasthan</option>
//                   </select>
//                   <input
//                     maxLength={6}
//                     value={pincode}
//                     onChange={(e) =>
//                       setPincode(e.target.value.replace(/\D/g, ""))
//                     }
//                     placeholder="PIN code"
//                     className={inputClass}
//                   />
//                 </div>
//                 <div className="relative">
//                   <input
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     placeholder="Phone Number"
//                     className={inputClass}
//                   />
//                   <Info
//                     size={14}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/20"
//                   />
//                 </div>
//               </div>
//             </section>

//             <section className="space-y-6">
//               <h2 className="font-display text-lg md:text-xl font-black uppercase">
//                 Shipping method
//               </h2>
//               <div className="border-2 border-foreground/10 overflow-hidden">
//                 <label
//                   onClick={() => setShippingMethod("prepaid")}
//                   className={`flex items-center justify-between p-5 cursor-pointer transition-all ${shippingMethod === "prepaid" ? "bg-primary/5" : "bg-white"}`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <div
//                       className={`w-5 h-5 border-2 border-black rounded-full flex items-center justify-center ${shippingMethod === "prepaid" ? "bg-black" : "bg-white"}`}
//                     >
//                       {shippingMethod === "prepaid" && (
//                         <div className="w-1.5 h-1.5 bg-white rounded-full" />
//                       )}
//                     </div>
//                     <div>
//                       <p className="text-[10px] font-black uppercase">
//                         Prepaid Shipping
//                       </p>
//                       <p className="text-[8px] font-black text-foreground/40 uppercase mt-1">
//                         Express 5-7 Days
//                       </p>
//                     </div>
//                   </div>
//                   <span className="text-[10px] font-black uppercase text-green-600">
//                     ₹45.00
//                   </span>
//                 </label>
//                 <label
//                   onClick={() => setShippingMethod("cod")}
//                   className={`flex items-center justify-between p-5 cursor-pointer transition-all border-t-2 border-foreground/5 ${shippingMethod === "cod" ? "bg-primary/5" : "bg-white"}`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <div
//                       className={`w-5 h-5 border-2 border-black rounded-full flex items-center justify-center ${shippingMethod === "cod" ? "bg-black" : "bg-white"}`}
//                     >
//                       {shippingMethod === "cod" && (
//                         <div className="w-1.5 h-1.5 bg-white rounded-full" />
//                       )}
//                     </div>
//                     <div>
//                       <p className="text-[10px] font-black uppercase">
//                         Cash on Delivery
//                       </p>
//                       <p className="text-[8px] font-black text-foreground/40 uppercase mt-1">
//                         Standard 7-10 Days
//                       </p>
//                     </div>
//                   </div>
//                   <span className="text-[10px] font-black uppercase">
//                     ₹129.00
//                   </span>
//                 </label>
//               </div>
//             </section>

//             <div className="pt-6">
//               <button
//                 onClick={handlePayment}
//                 disabled={
//                   processing ||
//                   items.length === 0 ||
//                   pincode.length !== 6 ||
//                   !address ||
//                   !firstName
//                 }
//                 className="w-full h-16 bg-black text-white font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-[6px_6px_0px_0px_#00D4FF] flex items-center justify-center gap-4 disabled:opacity-50"
//               >
//                 {processing ? <Loader2 className="animate-spin" /> : "PAY NOW"}
//                 {!processing && <ChevronRight size={16} />}
//               </button>
//             </div>
//           </div>

//           <div className="lg:col-span-5">
//             <div className="lg:sticky lg:top-32 bg-[#F9F9F9] border-2 border-foreground/5 p-6 md:p-8 space-y-8">
//               <h2 className="font-display text-lg font-black uppercase border-b-2 border-foreground/5 pb-4">
//                 Order Summary
//               </h2>
//               <div className="max-h-[400px] overflow-y-auto space-y-6 pr-2">
//                 {items.map((item) => (
//                   <div
//                     key={`${item.product.id}-${item.selectedSize}`}
//                     className="flex gap-4 items-center"
//                   >
//                     <div className="relative">
//                       <div className="w-16 h-20 border-2 border-foreground overflow-hidden bg-white">
//                         <img
//                           src={item.product.image_url}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">
//                         {item.quantity}
//                       </span>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-[9px] font-black uppercase leading-tight">
//                         {item.product.name}
//                       </h3>
//                       <p className="text-[8px] font-black text-foreground/40 uppercase mt-1">
//                         {item.selectedSize}
//                       </p>
//                     </div>
//                     <span className="text-[10px] font-black">
//                       ₹{item.product.price * item.quantity}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="space-y-4 pt-6 border-t-2 border-foreground/5 text-[10px] font-black uppercase">
//                 <div className="flex justify-between opacity-60">
//                   <span>Subtotal</span>
//                   <span>₹{totalPrice}</span>
//                 </div>
//                 <div className="flex justify-between opacity-60">
//                   <span>Shipping</span>
//                   <span>
//                     {shippingFee === 0 ? "FREE" : `₹${shippingFee}.00`}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-end pt-6 border-t-2 border-foreground/10">
//                   <span className="font-display text-base">Total</span>
//                   <div className="text-right">
//                     <span className="text-[8px] block opacity-40 mb-1">
//                       INR
//                     </span>
//                     <span className="text-3xl tracking-tighter">
//                       ₹{finalAmount}.00
//                     </span>
//                   </div>
//                 </div>
//               </div>
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Loader2, PartyPopper, ChevronRight, Info } from "lucide-react";

/* ---------------- RAZORPAY TYPES ---------------- */
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
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  handler: (response: RazorpayResponse) => Promise<void>;
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
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
  const { items, totalPrice, clearCart } = useCart();
  const { userData } = useAuth();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Input States
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Raj.");
  const [phone, setPhone] = useState("");

  const [shippingMethod, setShippingMethod] = useState<"prepaid" | "cod">(
    "prepaid",
  );
  const [shippingFee, setShippingFee] = useState<number>(45);

  // Prefill from Auth
  useEffect(() => {
    if (userData) {
      setEmail(userData.email || "");
      setPhone(userData.mobile || "");
      const nameParts = userData.name?.split(" ") || ["", ""];
      setFirstName(nameParts[0]);
      setLastName(nameParts.slice(1).join(" "));
    }
  }, [userData]);

  // Load Razorpay Script
  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    setShippingFee(shippingMethod === "cod" ? 129 : 45);
  }, [shippingMethod]);

  const finalAmount = totalPrice + shippingFee;

  // ✅ LOGIC: Firestore save logic
  const saveOrderToFirestore = async (
    paymentId: string = "COD_ORDER",
    trackingId: string = "12345678",
    customOrderId?: string,
  ) => {
    try {
      const itemsFormatted = items
        .map(
          (i) =>
            `${i.quantity} x ${i.product.name} ${i.selectedSize || "Standard"}`,
        )
        .join(", ");

      const orderData = {
        address: address,
        city: city,
        state: state,
        pincode: pincode,
        phone: phone,
        customerName: `${firstName} ${lastName}`,
        email: email,
        items: itemsFormatted,
        orderId:
          customOrderId || `POST-${Math.floor(100 + Math.random() * 900)}`,
        totalAmount: Number(finalAmount),
        trackingId: trackingId,
        status: "processing",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await addDoc(collection(db, "orders"), orderData);
      clearCart();
      setShowSuccess(true);
    } catch (err: unknown) {
      console.error("Firestore Save Error:", err);
      alert("Error saving order. Please contact support.");
    }
  };

  // ✅ DELHIIVERY BOOKING HELPER
  const bookShipment = async (orderId: string, mode: string) => {
    try {
      const shipRes = await fetch(`${API_BASE}/api/create-shipment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${firstName} ${lastName}`,
          address: `${address}, ${city}`,
          pincode,
          phone,
          orderId: orderId,
          totalAmount: Number(finalAmount), // 🔴 Explicit Number for Delhivery
          paymentMode: mode, // 🔴 Always "COD" or "Prepaid"
        }),
      });
      const shipData = await shipRes.json();
      return shipData.trackingId || "PENDING";
    } catch (error) {
      console.error("Shipping Booking Error:", error);
      return "BOOKING_FAILED";
    }
  };

  // ✅ MAIN PAYMENT HANDLER
  const handlePayment = async () => {
    if (
      !email ||
      !phone ||
      !address ||
      !city ||
      pincode.length !== 6 ||
      !firstName
    ) {
      alert("Please fill all required fields correctly!");
      return;
    }

    setProcessing(true);

    if (shippingMethod === "cod") {
      const generatedId = `POST-${Date.now().toString().slice(-4)}`;
      const tId = await bookShipment(generatedId, "COD"); // 🔴 Capital COD
      await saveOrderToFirestore("COD_ORDER", tId, generatedId);
      setProcessing(false);
      return;
    }

    // 🔵 PREPAID FLOW
    try {
      const amountInPaise = Math.round(finalAmount * 100);

      const res = await fetch(`${API_BASE}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise }),
      });

      if (!res.ok) throw new Error("Order creation failed");
      const orderData = await res.json();

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        name: "Imprinto Co.",
        description: "Art Terminal Checkout",
        prefill: {
          name: `${firstName} ${lastName}`,
          email,
          contact: phone,
        },
        handler: async (response: RazorpayResponse) => {
          setProcessing(true);
          const verifyRes = await fetch(`${API_BASE}/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const result = await verifyRes.json();
          if (result.status === "success") {
            const tId = await bookShipment(
              response.razorpay_order_id,
              "Prepaid",
            ); // 🔴 Capital Prepaid
            await saveOrderToFirestore(
              response.razorpay_payment_id,
              tId,
              `POST-${response.razorpay_order_id.slice(-4)}`,
            );
          } else {
            alert("Payment Verification Failed!");
          }
          setProcessing(false);
        },
        theme: { color: "#00D4FF" },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error(err);
      alert("Payment Error. Check server.");
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
          className="bg-white border-4 border-foreground p-10 shadow-[10px_10px_0px_0px_#00D4FF] max-w-md w-full text-center"
        >
          <PartyPopper size={48} className="mx-auto text-primary mb-6" />
          <h1 className="font-display text-2xl font-black uppercase text-black">
            ORDER SECURED
          </h1>
          <p className="text-[10px] font-black uppercase text-foreground/40 mt-4 mb-8">
            Transmission complete.
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="w-full h-14 bg-foreground text-background font-black uppercase text-[10px] shadow-[4px_4px_0px_0px_#00D4FF] hover:bg-primary transition-all"
          >
            MY ORDERS
          </button>
        </motion.div>
      </div>
    );

  const inputClass =
    "w-full bg-white border-2 border-foreground/10 p-4 text-[10px] font-black uppercase outline-none focus:border-primary transition-all text-black";

  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <main className="pt-24 md:pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-12">
            <section className="space-y-6">
              <h2 className="font-display text-lg md:text-xl font-black uppercase text-black">
                Contact
              </h2>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={inputClass}
              />
            </section>

            <section className="space-y-6">
              <h2 className="font-display text-lg md:text-xl font-black uppercase text-black">
                Delivery
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className={inputClass}
                  />
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className={inputClass}
                  />
                </div>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value.toUpperCase())}
                  placeholder="Address (House No, Street, Area)"
                  className={inputClass}
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value.toUpperCase())}
                    placeholder="City"
                    className={inputClass}
                  />
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Raj.">Rajasthan</option>
                    <option value="DL">Delhi</option>
                    <option value="MH">Maharashtra</option>
                    <option value="UP">Uttar Pradesh</option>
                  </select>
                  <input
                    maxLength={6}
                    value={pincode}
                    onChange={(e) =>
                      setPincode(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="PIN code"
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className={inputClass}
                  />
                  <Info
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/20"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-display text-lg md:text-xl font-black uppercase text-black">
                Shipping method
              </h2>
              <div className="border-2 border-foreground/10 overflow-hidden">
                <label
                  onClick={() => setShippingMethod("prepaid")}
                  className={`flex items-center justify-between p-5 cursor-pointer transition-all ${shippingMethod === "prepaid" ? "bg-primary/10" : "bg-white"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 border-2 border-black rounded-full flex items-center justify-center ${shippingMethod === "prepaid" ? "bg-black" : "bg-white"}`}
                    >
                      {shippingMethod === "prepaid" && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-black">
                        Prepaid Shipping
                      </p>
                      <p className="text-[8px] font-black text-foreground/40 uppercase mt-1">
                        Express 5-7 Days
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-green-600">
                    ₹45.00
                  </span>
                </label>
                <label
                  onClick={() => setShippingMethod("cod")}
                  className={`flex items-center justify-between p-5 cursor-pointer transition-all border-t-2 border-foreground/5 ${shippingMethod === "cod" ? "bg-primary/10" : "bg-white"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 border-2 border-black rounded-full flex items-center justify-center ${shippingMethod === "cod" ? "bg-black" : "bg-white"}`}
                    >
                      {shippingMethod === "cod" && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-black">
                        Cash on Delivery
                      </p>
                      <p className="text-[8px] font-black text-foreground/40 uppercase mt-1">
                        Standard 7-10 Days
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-black">
                    ₹129.00
                  </span>
                </label>
              </div>
            </section>

            <div className="pt-6">
              <button
                onClick={handlePayment}
                disabled={
                  processing ||
                  items.length === 0 ||
                  pincode.length !== 6 ||
                  !address ||
                  !firstName
                }
                className="w-full h-16 bg-black text-white font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-[6px_6px_0px_0px_#00D4FF] flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {processing ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "COMPLETE ORDER"
                )}
                {!processing && <ChevronRight size={16} />}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 bg-[#F9F9F9] border-2 border-foreground/5 p-6 md:p-8 space-y-8">
              <h2 className="font-display text-lg font-black uppercase border-b-2 border-foreground/5 pb-4 text-black">
                Order Summary
              </h2>
              <div className="max-h-[400px] overflow-y-auto space-y-6 pr-2">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 items-center"
                  >
                    <div className="relative">
                      <div className="w-16 h-20 border-2 border-foreground overflow-hidden bg-white">
                        <img
                          src={item.product.image_url}
                          className="w-full h-full object-cover"
                          alt={item.product.name}
                        />
                      </div>
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[9px] font-black uppercase leading-tight text-black">
                        {item.product.name}
                      </h3>
                      <p className="text-[8px] font-black text-foreground/40 uppercase mt-1">
                        {item.selectedSize}
                      </p>
                    </div>
                    <span className="text-[10px] font-black text-black">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t-2 border-foreground/5 text-[10px] font-black uppercase">
                <div className="flex justify-between opacity-60 text-black">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between opacity-60 text-black">
                  <span>Shipping</span>
                  <span>₹{shippingFee}.00</span>
                </div>
                <div className="flex justify-between items-end pt-6 border-t-2 border-foreground/10 text-black">
                  <span className="font-display text-base">Total</span>
                  <div className="text-right">
                    <span className="text-[8px] block opacity-40 mb-1">
                      INR
                    </span>
                    <span className="text-3xl tracking-tighter">
                      ₹{finalAmount}.00
                    </span>
                  </div>
                </div>
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