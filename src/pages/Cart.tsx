// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   X,
//   Minus,
//   Plus,
//   ShoppingBag,
//   Zap,
//   ChevronRight,
//   AlertCircle,
// } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
// import { Button } from "@/components/ui/button";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";

// const Cart = () => {
//   const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
//   const navigate = useNavigate();
//   const [agreed, setAgreed] = useState(false);

//   // --- LOGIC: MINIMUM ORDER VALUE ---
//   const MIN_ORDER_VALUE = 249;
//   const isBelowMinimum = totalPrice < MIN_ORDER_VALUE;
//   const amountNeededForMin = MIN_ORDER_VALUE - totalPrice;

//   // Example dynamic offer logic
//   const freeShippingThreshold = 500;
//   const remainingForOffer = Math.max(0, freeShippingThreshold - totalPrice);
//   const progressPercent = Math.min(
//     100,
//     (totalPrice / freeShippingThreshold) * 100,
//   );

//   return (
//     <div className="min-h-screen bg-[#FAF9F6] text-foreground font-body selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-32 pb-24 px-6 max-w-[1000px] mx-auto">
//         {/* PROGRESS BOX */}
//         <div className="bg-white border-2 border-black p-6 mb-10 text-center relative overflow-hidden">
//           <p className="text-[11px] font-black uppercase tracking-widest mb-4">
//             {remainingForOffer > 0
//               ? `YOU'RE ₹${remainingForOffer} AWAY FROM A FREE BOOKMARK`
//               : "YOU'VE UNLOCKED THE FREE GIFT! 🎉"}
//           </p>
//           <div className="w-full bg-gray-100 h-2 border border-black relative">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${progressPercent}%` }}
//               className="absolute top-0 left-0 h-full bg-primary"
//             />
//             <div className="absolute top-[-8px] left-[30%] w-4 h-4 bg-white border-2 border-black rounded-full" />
//             <div className="absolute top-[-8px] left-[70%] w-4 h-4 bg-white border-2 border-black rounded-full" />
//           </div>
//           <div className="flex justify-between mt-2 text-[8px] font-bold uppercase opacity-40">
//             <span>Free Bookmark</span>
//             <span>Free 2 Poster 🎁 x1</span>
//             <span>Free 100 Glue Dots</span>
//           </div>
//         </div>

//         <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic">
//           THE <span className="text-primary not-italic">Cart</span>
//         </h1>

//         {items.length === 0 ? (
//           <div className="py-20 text-center border-4 border-dashed border-black/10">
//             <ShoppingBag size={48} className="mx-auto mb-4 opacity-10" />
//             <p className="font-black uppercase tracking-widest text-sm opacity-40 mb-8">
//               Your Cart is empty
//             </p>
//             <Button
//               onClick={() => navigate("/shop")}
//               className="bg-black text-white rounded-none px-10 h-14 font-black tracking-widest text-xs"
//             >
//               GO TO SHOP
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {/* CART ITEMS */}
//             <div className="bg-white border-2 border-black">
//               {items.map((item, idx) => (
//                 <div
//                   key={`${item.product.id}-${item.selectedSize}`}
//                   className={`p-6 flex gap-6 ${idx !== items.length - 1 ? "border-b-2 border-black/5" : ""}`}
//                 >
//                   <img
//                     src={item.product.image_url.replace(
//                       "/upload/",
//                       "/upload/w_400,f_auto,q_auto/",
//                     )}
//                     alt=""
//                     className="w-24 h-32 object-cover border-2 border-black"
//                   />
//                   <div className="flex-1 flex flex-col justify-between">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="font-black uppercase text-sm leading-tight mb-1">
//                           {item.product.name}
//                         </h3>
//                         <span className="text-[10px] font-bold text-primary">
//                           {item.selectedSize}
//                         </span>
//                       </div>
//                       <button
//                         onClick={() =>
//                           removeFromCart(item.product.id, item.selectedSize)
//                         }
//                         className="text-black/20 hover:text-red-500 transition-colors"
//                       >
//                         <X size={18} strokeWidth={3} />
//                       </button>
//                     </div>

//                     <div className="flex justify-between items-end">
//                       <div className="flex items-center border-2 border-black h-10">
//                         <button
//                           onClick={() =>
//                             updateQuantity(
//                               item.product.id,
//                               item.selectedSize,
//                               Math.max(1, item.quantity - 1),
//                             )
//                           }
//                           className="px-3 hover:bg-gray-100 h-full border-r-2 border-black transition-colors"
//                         >
//                           <Minus size={12} strokeWidth={3} />
//                         </button>
//                         <span className="w-10 text-center font-black text-xs">
//                           {item.quantity}
//                         </span>
//                         <button
//                           onClick={() =>
//                             updateQuantity(
//                               item.product.id,
//                               item.selectedSize,
//                               item.quantity + 1,
//                             )
//                           }
//                           className="px-3 hover:bg-gray-100 h-full border-l-2 border-black transition-colors"
//                         >
//                           <Plus size={12} strokeWidth={3} />
//                         </button>
//                       </div>
//                       <span className="font-black text-lg">
//                         ₹{item.product.price * item.quantity}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* CHECKOUT BOX */}
//             <div className="mt-12 bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
//               {/* MINIMUM ORDER WARNING */}
//               {isBelowMinimum && (
//                 <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 flex items-center gap-3 text-red-600">
//                   <AlertCircle size={20} />
//                   <p className="text-[10px] font-black uppercase tracking-tight">
//                     MINIMUM ORDER VALUE IS ₹{MIN_ORDER_VALUE}. ADD ₹
//                     {amountNeededForMin} MORE TO PROCEED.
//                   </p>
//                 </div>
//               )}

//               <div className="flex items-center gap-2 mb-6">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={agreed}
//                   onChange={(e) => setAgreed(e.target.checked)}
//                   className="w-4 h-4 border-2 border-black rounded-none checked:bg-primary accent-black"
//                 />
//                 <label
//                   htmlFor="terms"
//                   className="text-[10px] font-black uppercase tracking-tight cursor-pointer"
//                 >
//                   I agree to all{" "}
//                   <Link
//                     to="/terms-conditions"
//                     className="underline text-primary"
//                   >
//                     Terms and Conditions
//                   </Link>
//                   .
//                 </label>
//               </div>

//               <div className="flex justify-between items-end mb-8 border-t-2 border-black/5 pt-6">
//                 <div className="flex flex-col">
//                   <span className="text-[10px] font-black uppercase text-black/40 tracking-widest">
//                     Total Cart Price
//                   </span>
//                   <span className="text-4xl font-black italic">
//                     ₹{totalPrice}
//                   </span>
//                 </div>
//                 <div className="text-right pb-1">
//                   <p className="text-[10px] font-black text-accent uppercase italic">
//                     Exclusive of Taxes & Shipping
//                   </p>
//                 </div>
//               </div>

//               <button
//                 disabled={!agreed || items.length === 0 || isBelowMinimum}
//                 onClick={() => navigate("/checkout")}
//                 className="w-full h-20 bg-black text-white font-black text-lg uppercase tracking-[0.4em] hover:bg-primary hover:text-black transition-all disabled:opacity-20 disabled:cursor-not-allowed group flex items-center justify-center gap-4"
//               >
//                 {isBelowMinimum ? "BELOW MINIMUM" : "PROCEED TO CHECKOUT"}
//                 {!isBelowMinimum && (
//                   <ChevronRight className="group-hover:translate-x-2 transition-transform" />
//                 )}
//               </button>

//               <button
//                 onClick={() => navigate("/shop")}
//                 className="w-full mt-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-colors underline underline-offset-4"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Cart;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const MIN_ORDER_VALUE = 249;
  const isBelowMinimum = totalPrice < MIN_ORDER_VALUE;
  const amountNeededForMin = MIN_ORDER_VALUE - totalPrice;

  const freeShippingThreshold = 500;
  const remainingForOffer = Math.max(0, freeShippingThreshold - totalPrice);
  const progressPercent = Math.min(
    100,
    (totalPrice / freeShippingThreshold) * 100,
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-28 md:pt-40 pb-24 px-6 max-w-[1000px] mx-auto">
        {/* PROGRESS BOX */}
        {/* <div className="bg-white border-2 border-black p-5 md:p-8 mb-10 text-center relative overflow-hidden">
          <p className="text-[7px] md:text-[10px] font-black uppercase tracking-widest mb-4 leading-relaxed">
            {remainingForOffer > 0
              ? `YOU ARE ₹${remainingForOffer} AWAY FROM A FREE GIFT`
              : "FREE GIFT UNLOCKED"}
          </p>
          <div className="w-full bg-gray-100 h-2 border-2 border-black relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="absolute top-0 left-0 h-full bg-primary"
            />
          </div>
          <div className="flex justify-between mt-3 text-[6px] md:text-[8px] font-black uppercase opacity-40">
            <span>Bookmark</span>
            <span>2x Poster</span>
            <span>Glue Dots</span>
          </div>
        </div> */}

        <h1 className="text-[8vw] md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none">
          THE <span className="text-primary">CART</span>
        </h1>

        {items.length === 0 ? (
          <div className="py-20 text-center border-4 border-dashed border-black/10">
            <ShoppingBag size={40} className="mx-auto mb-6 opacity-10" />
            <p className="font-black uppercase tracking-widest text-[10px] md:text-sm opacity-40 mb-8">
              Your Cart is empty
            </p>
            <Button
              onClick={() => navigate("/shop")}
              className="bg-black text-white rounded-none px-8 h-14 font-black tracking-widest text-[10px] shadow-[4px_4px_0px_0px_#00D4FF]"
            >
              GO TO SHOP
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* CART ITEMS */}
            <div className="bg-white border-2 border-black">
              {items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className={`p-4 md:p-8 flex gap-4 md:gap-8 ${idx !== items.length - 1 ? "border-b-2 border-black/5" : ""}`}
                >
                  <img
                    src={item.product.image_url.replace(
                      "/upload/",
                      "/upload/w_400,f_auto,q_auto/",
                    )}
                    alt=""
                    className="w-20 h-28 md:w-32 md:h-44 object-cover border-2 border-black flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black uppercase text-[10px] md:text-base leading-tight mb-2">
                          {item.product.name}
                        </h3>
                        <span className="text-[8px] md:text-[10px] font-black text-primary uppercase">
                          SIZE: {item.selectedSize}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedSize)
                        }
                        className="text-black/20 hover:text-red-500 transition-colors p-1"
                      >
                        <X size={16} strokeWidth={4} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end gap-2">
                      <div className="flex items-center border-2 border-black h-9 md:h-12 bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="px-2 md:px-4 hover:bg-gray-100 h-full border-r-2 border-black transition-colors"
                        >
                          <Minus size={10} strokeWidth={4} />
                        </button>
                        <span className="w-8 md:w-12 text-center font-black text-[10px] md:text-sm">
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
                          className="px-2 md:px-4 hover:bg-gray-100 h-full border-l-2 border-black transition-colors"
                        >
                          <Plus size={10} strokeWidth={4} />
                        </button>
                      </div>
                      <span className="font-black text-sm md:text-2xl">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CHECKOUT BOX */}
            <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {isBelowMinimum && (
                <div className="mb-8 p-4 bg-red-50 border-2 border-red-500 flex items-center gap-3 text-red-600">
                  <AlertCircle size={18} />
                  <p className="text-[7px] md:text-[10px] font-black uppercase tracking-tight leading-normal">
                    MIN ORDER IS ₹{MIN_ORDER_VALUE}. ADD ₹{amountNeededForMin}{" "}
                    MORE.
                  </p>
                </div>
              )}

              <div className="flex items-start gap-3 mb-8">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 md:w-5 md:h-5 border-2 border-black rounded-none mt-0.5 accent-black"
                />
                <label
                  htmlFor="terms"
                  className="text-[7px] md:text-[10px] font-black uppercase tracking-tight cursor-pointer leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms-conditions"
                    className="underline text-primary"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-t-2 border-black/5 pt-8 gap-4">
                <div className="flex flex-col">
                  <span className="text-[7px] md:text-[10px] font-black uppercase text-black/40 tracking-widest mb-2">
                    Total Amount
                  </span>
                  <span className="text-3xl md:text-4xl font-black">
                    ₹{totalPrice}
                    <span className="text-[14px] md:text-[18px] font-black">
                      {/* <span className="text-xl md:text-xl font-black"> */}
                      (Incl. of Taxes)
                    </span>
                  </span>
                </div>
                <p className="text-[7px] md:text-[9px] font-black text-accent uppercase">
                  + Shipping calculated at checkout
                </p>
              </div>

              <button
                disabled={!agreed || items.length === 0 || isBelowMinimum}
                onClick={() => navigate("/checkout")}
                className="w-full h-16 md:h-24 bg-black text-white font-black text-xs md:text-xl uppercase tracking-widest hover:bg-primary hover:text-black transition-all disabled:opacity-20 disabled:cursor-not-allowed group flex items-center justify-center gap-4 shadow-[4px_4px_0px_0px_#00D4FF] md:shadow-[8px_8px_0px_0px_#00D4FF]"
              >
                {isBelowMinimum ? "BELOW MINIMUM" : "CHECKOUT NOW"}
                {!isBelowMinimum && (
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform"
                    strokeWidth={3}
                  />
                )}
              </button>

              <button
                onClick={() => navigate("/shop")}
                className="w-full mt-6 text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors underline underline-offset-4"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
