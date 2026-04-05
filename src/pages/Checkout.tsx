// import { useEffect } from "react";

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
//   name: string;
//   description: string;
//   order_id: string;
//   handler: (response: RazorpayResponse) => void;
//   theme: {
//     color: string;
//   };
// };

// /* ---------------- GLOBAL ---------------- */

// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => {
//       open: () => void;
//     };
//   }
// }

// /* ---------------- COMPONENT ---------------- */

// const Checkout = () => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const handlePayment = async () => {
//     try {
//       // ✅ Check if Razorpay loaded
//       if (!window.Razorpay) {
//         alert("Razorpay SDK not loaded. Please refresh.");
//         return;
//       }

//       // 🔴 Replace with your backend endpoint
//       const res = await fetch("http://localhost:5000/create-order", {
//         method: "POST",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to create order");
//       }

//       const data = await res.json();

//       const options: RazorpayOptions = {
//         key: "rzp_live_SZm9imJ5s81iYE", // 🔴 replace with actual key
//         amount: data.amount,
//         currency: data.currency,
//         name: "Imprinto Co.",
//         description: "Order Payment",
//         order_id: data.id,

//         handler: async function (response: RazorpayResponse) {
//           try {
//             await fetch("http://localhost:5000/verify-payment", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(response),
//             });

//             alert("Payment Successful");
//           } catch (err) {
//             console.error("Verification failed", err);
//             alert("Payment verification failed");
//           }
//         },

//         theme: {
//           color: "#000000",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed. Check console.");
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Checkout</h1>
//       <button onClick={handlePayment}>Pay Now</button>
//     </div>
//   );
// };

// export default Checkout;

import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

/* ---------------- TYPES ---------------- */

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
};

/* ---------------- GLOBAL ---------------- */

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

/* ---------------- COMPONENT ---------------- */

const Checkout = () => {
  const { items, totalPrice } = useCart();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay not loaded");
        return;
      }

      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice * 100,
        }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const data = await res.json();

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Imprinto Co.",
        description: "Order Payment",

        handler: async function (response: RazorpayResponse) {
          await fetch("http://localhost:5000/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          alert("Payment Successful");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-surface-container p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>₹{item.product.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <Button className="w-full" size="lg" onClick={handlePayment}>
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
