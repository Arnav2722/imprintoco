// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   X,
//   Minus,
//   Plus,
//   ShoppingBag,
//   ChevronRight,
//   AlertCircle,
// } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
// import { Button } from "@/components/ui/button";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";

// const Cart = () => {
//   const { items, removeFromCart, updateQuantity, totalPrice, discountAmount } =
//     useCart();
//   const navigate = useNavigate();
//   const [agreed, setAgreed] = useState(false);

//   const MIN_ORDER_VALUE = 249;
//   const isBelowMinimum = totalPrice < MIN_ORDER_VALUE;
//   const amountNeededForMin = MIN_ORDER_VALUE - totalPrice;

//   return (
//     <div className="min-h-screen bg-[#FAF9F6] text-foreground font-body selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-28 md:pt-40 pb-24 px-6 max-w-[1000px] mx-auto">
//         <h1 className="text-[8vw] md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none">
//           THE <span className="text-primary">CART</span>
//         </h1>

//         {items.length === 0 ? (
//           <div className="py-20 text-center border-4 border-dashed border-black/10">
//             <ShoppingBag size={40} className="mx-auto mb-6 opacity-10" />
//             <p className="font-black uppercase tracking-widest text-[10px] md:text-sm opacity-40 mb-8">
//               Your Cart is empty
//             </p>
//             <Button
//               onClick={() => navigate("/shop")}
//               className="bg-black text-white rounded-none px-8 h-14 font-black tracking-widest text-[10px] shadow-[4px_4px_0px_0px_#00D4FF]"
//             >
//               GO TO SHOP
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {/* CART ITEMS */}
//             <div className="bg-white border-2 border-black">
//               {items.map((item, idx) => (
//                 <div
//                   key={`${item.product.id}-${item.selectedSize}`}
//                   className={`p-4 md:p-8 flex gap-4 md:gap-8 ${idx !== items.length - 1 ? "border-b-2 border-black/5" : ""}`}
//                 >
//                   <img
//                     src={item.product.image_url.replace(
//                       "/upload/",
//                       "/upload/w_400,f_auto,q_auto/",
//                     )}
//                     alt=""
//                     className="w-20 h-28 md:w-32 md:h-44 object-cover border-2 border-black flex-shrink-0"
//                   />
//                   <div className="flex-1 flex flex-col justify-between py-1">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="font-black uppercase text-[10px] md:text-base leading-tight mb-2">
//                           {item.product.name}
//                         </h3>
//                         <span className="text-[8px] md:text-[10px] font-black text-primary uppercase">
//                           SIZE: {item.selectedSize}
//                         </span>
//                       </div>
//                       <button
//                         onClick={() =>
//                           removeFromCart(item.product.id, item.selectedSize)
//                         }
//                         className="text-black/20 hover:text-red-500 transition-colors p-1"
//                       >
//                         <X size={16} strokeWidth={4} />
//                       </button>
//                     </div>

//                     <div className="flex justify-between items-end gap-2">
//                       <div className="flex items-center border-2 border-black h-9 md:h-12 bg-white">
//                         <button
//                           onClick={() =>
//                             updateQuantity(
//                               item.product.id,
//                               item.selectedSize,
//                               Math.max(1, item.quantity - 1),
//                             )
//                           }
//                           className="px-2 md:px-4 hover:bg-gray-100 h-full border-r-2 border-black transition-colors"
//                         >
//                           <Minus size={10} strokeWidth={4} />
//                         </button>
//                         <span className="w-8 md:w-12 text-center font-black text-[10px] md:text-sm">
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
//                           className="px-2 md:px-4 hover:bg-gray-100 h-full border-l-2 border-black transition-colors"
//                         >
//                           <Plus size={10} strokeWidth={4} />
//                         </button>
//                       </div>
//                       <span className="font-black text-sm md:text-2xl">
//                         ₹{item.product.price * item.quantity}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* CHECKOUT BOX */}
//             <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
//               {isBelowMinimum && (
//                 <div className="mb-8 p-4 bg-red-50 border-2 border-red-500 flex items-center gap-3 text-red-600">
//                   <AlertCircle size={18} />
//                   <p className="text-[7px] md:text-[10px] font-black uppercase tracking-tight leading-normal">
//                     MIN ORDER IS ₹{MIN_ORDER_VALUE}. ADD ₹{amountNeededForMin}{" "}
//                     MORE.
//                   </p>
//                 </div>
//               )}

//               <div className="flex items-start gap-3 mb-8">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={agreed}
//                   onChange={(e) => setAgreed(e.target.checked)}
//                   className="w-4 h-4 md:w-5 md:h-5 border-2 border-black rounded-none mt-0.5 accent-black"
//                 />
//                 <label
//                   htmlFor="terms"
//                   className="text-[10px] md:text-[15px] font-black uppercase tracking-tight cursor-pointer leading-relaxed"
//                 >
//                   I agree to the{" "}
//                   <Link
//                     to="/terms-conditions"
//                     className="underline text-primary"
//                   >
//                     Terms and Conditions
//                   </Link>
//                 </label>
//               </div>

//               <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-t-2 border-black/5 pt-8 gap-4">
//                 <div className="flex flex-col w-full">
//                   <div className="flex justify-between w-full mb-2">
//                     <span className="text-[12px] md:text-[15px] font-black uppercase text-black/40 tracking-widest">
//                       Subtotal
//                     </span>
//                     <span className="font-black text-sm md:text-xl">
//                       ₹{totalPrice + discountAmount}
//                     </span>
//                   </div>

//                   {discountAmount > 0 && (
//                     <div className="flex justify-between w-full mb-2 text-green-600">
//                       <span className="text-[12px] md:text-[15px] font-black uppercase tracking-widest">
//                         Buy 3 Get 2 Offer
//                       </span>
//                       <span className="font-black text-sm md:text-xl">
//                         -₹{discountAmount}.00
//                       </span>
//                     </div>
//                   )}

//                   <div className="flex flex-col mt-4">
//                     <span className="text-[12px] md:text-[15px] font-black uppercase text-black/40 tracking-widest mb-2">
//                       Total Amount
//                     </span>
//                     <span className="text-3xl md:text-4xl font-black">
//                       ₹{totalPrice}
//                       <span className="text-[14px] md:text-[18px] font-black ml-2">
//                         (Incl. of Taxes)
//                       </span>
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 disabled={!agreed || items.length === 0 || isBelowMinimum}
//                 onClick={() => navigate("/checkout")}
//                 className="w-full h-16 md:h-24 bg-black text-white font-black text-xs md:text-xl uppercase tracking-widest hover:bg-primary hover:text-black transition-all disabled:opacity-20 disabled:cursor-not-allowed group flex items-center justify-center gap-4 shadow-[4px_4px_0px_0px_#00D4FF] md:shadow-[8px_8px_0px_0px_#00D4FF]"
//               >
//                 {isBelowMinimum ? "BELOW MINIMUM" : "CHECKOUT NOW"}
//                 {!isBelowMinimum && (
//                   <ChevronRight
//                     size={20}
//                     className="group-hover:translate-x-2 transition-transform"
//                     strokeWidth={3}
//                   />
//                 )}
//               </button>

//               <button
//                 onClick={() => navigate("/shop")}
//                 className="w-full mt-6 text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors underline underline-offset-4"
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
  const { items, removeFromCart, updateQuantity, totalPrice, discountAmount } =
    useCart();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  // FIX: Minimum order check ab originalTotal (discount se pehle) par depend karega
  const MIN_ORDER_VALUE = 249;
  const originalTotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const isBelowMinimum = originalTotal < MIN_ORDER_VALUE;
  const amountNeededForMin = Math.max(0, MIN_ORDER_VALUE - originalTotal);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-28 md:pt-40 pb-24 px-6 max-w-[1000px] mx-auto">
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
              {/* {isBelowMinimum && (
                <div className="mb-8 p-4 bg-red-50 border-2 border-red-500 flex items-center gap-3 text-red-600">
                  <AlertCircle size={18} />
                  <p className="text-[7px] md:text-[10px] font-black uppercase tracking-tight leading-normal">
                    MIN ORDER IS ₹{MIN_ORDER_VALUE}. ADD ₹{amountNeededForMin}{" "}
                    MORE.
                  </p>
                </div>
              )} */}

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
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full mb-2">
                    <span className="text-[7px] md:text-[9px] font-black uppercase text-black/40 tracking-widest self-center">
                      Subtotal
                    </span>
                    <span className="font-black text-sm md:text-2xl">
                      ₹{originalTotal}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between w-full mb-4 text-green-600">
                      <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest self-center">
                        Buy 3 Get 2 Offer
                      </span>
                      <span className="font-black text-sm md:text-2xl">
                        -₹{discountAmount}.00
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col mt-2 pt-4 border-t border-black/10">
                    <span className="text-[7px] md:text-[9px] font-black uppercase text-black/40 tracking-widest mb-1">
                      Total Amount
                    </span>
                    <span className="text-3xl md:text-4xl font-black">
                      ₹{totalPrice}
                      <span className="text-[12px] md:text-[16px] font-black ml-2 text-black/60">
                        (Incl. of Taxes)
                      </span>
                    </span>
                  </div>
                </div>
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