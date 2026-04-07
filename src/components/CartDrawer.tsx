// import { X, Minus, Plus, Trash2 } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// const CartDrawer = () => {
//   const {
//     items,
//     isCartOpen,
//     setIsCartOpen,
//     removeFromCart,
//     updateQuantity,
//     totalPrice,
//     totalItems,
//   } = useCart();

//   const navigate = useNavigate();

//   if (!isCartOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
//         onClick={() => setIsCartOpen(false)}
//       />

//       {/* Drawer */}
//       <div
//         className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-container z-50 flex flex-col"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-6">
//           <h2 className="font-display text-lg tracking-widest uppercase">
//             Cart ({totalItems})
//           </h2>
//           <button
//             onClick={() => setIsCartOpen(false)}
//             className="text-muted-foreground hover:text-foreground transition-colors"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Items */}
//         <div className="flex-1 overflow-y-auto px-6">
//           {items.length === 0 ? (
//             <p className="text-muted-foreground font-body text-sm text-center py-20">
//               Your cart is empty.
//             </p>
//           ) : (
//             <div className="flex flex-col gap-4">
//               {items.map((item) => (
//                 <div
//                   key={`${item.product.id}-${item.selectedSize || ""}`}
//                   className="flex gap-4 bg-surface-low p-4"
//                 >
//                   <div className="w-20 h-20 bg-surface-highest flex-shrink-0 overflow-hidden">
//                     {item.product.image_url && (
//                       <img
//                         src={item.product.image_url}
//                         alt={item.product.name}
//                         className="w-full h-full object-cover"
//                       />
//                     )}
//                   </div>

//                   <div className="flex-1">
//                     <h3 className="font-display text-xs tracking-wider uppercase">
//                       {item.product.name}
//                     </h3>

//                     {item.selectedSize && (
//                       <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">
//                         Size: {item.selectedSize}
//                       </p>
//                     )}

//                     <p className="font-display text-sm font-bold text-primary mt-1">
//                       ₹{item.product.price}
//                     </p>

//                     <div className="flex items-center gap-3 mt-2">
//                       <button
//                         onClick={() =>
//                           updateQuantity(item.product.id, item.quantity - 1)
//                         }
//                         className="text-muted-foreground hover:text-foreground"
//                       >
//                         <Minus size={14} />
//                       </button>

//                       <span className="font-display text-xs">
//                         {item.quantity}
//                       </span>

//                       <button
//                         onClick={() =>
//                           updateQuantity(item.product.id, item.quantity + 1)
//                         }
//                         className="text-muted-foreground hover:text-foreground"
//                       >
//                         <Plus size={14} />
//                       </button>

//                       <button
//                         onClick={() => removeFromCart(item.product.id)}
//                         className="ml-auto text-muted-foreground hover:text-destructive"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {items.length > 0 && (
//           <div className="p-6 border-t border-surface-highest">
//             <div className="flex justify-between mb-4">
//               <span className="font-display text-xs tracking-widest uppercase text-muted-foreground">
//                 Total
//               </span>
//               <span className="font-display text-lg font-bold text-primary">
//                 ₹{totalPrice}
//               </span>
//             </div>

//             <Button
//               variant="cta"
//               size="xl"
//               className="w-full"
//               onClick={() => {
//                 setIsCartOpen(false);
//                 navigate("/checkout");
//               }}
//             >
//               CHECKOUT
//             </Button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartDrawer;

import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay - Z-index high enough to cover Navbar */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1050] cursor-pointer"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/5 z-[1100] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Added relative z-10 for button priority */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/5 bg-[#0a0a0a]">
          <h2 className="font-sans text-lg font-black tracking-widest uppercase text-white">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 -mr-2 text-gray-400 hover:text-white transition-all duration-200 cursor-pointer hover:rotate-90"
            aria-label="Close Cart"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Items Section */}
        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <p className="text-gray-500 font-sans text-[10px] font-black uppercase tracking-[0.3em]">
                Empty like my soul.
              </p>
              <Button
                onClick={() => setIsCartOpen(false)}
                variant="outline"
                className="border-white/10 text-white font-black text-[10px] tracking-widest px-8 rounded-none"
              >
                Go Shop
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-8 py-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 group"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-[#111] flex-shrink-0 overflow-hidden border border-white/5">
                    {item.product.image_url && (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-sans text-[11px] font-black tracking-wider uppercase text-white leading-tight flex-1">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedSize)
                          }
                          className="text-gray-600 hover:text-red-500 transition-colors ml-2"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="font-sans text-[9px] tracking-[0.2em] text-primary font-black uppercase mt-1">
                        Size: {item.selectedSize}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Toggles - Fixed Arguments */}
                      <div className="flex items-center border border-white/10 bg-black">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="p-2 text-gray-500 hover:text-white transition-colors border-r border-white/10"
                        >
                          <Minus size={10} />
                        </button>

                        <span className="w-8 text-center font-sans text-[11px] font-black text-white">
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
                          className="p-2 text-gray-500 hover:text-white transition-colors border-l border-white/10"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      <span className="font-sans text-[11px] font-black text-white tracking-widest">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Footer */}
        {items.length > 0 && (
          <div className="p-8 bg-[#0a0a0a] border-t border-white/5">
            <div className="flex justify-between items-center mb-8">
              <span className="font-sans text-[10px] font-black tracking-[0.4em] uppercase text-gray-500">
                Subtotal
              </span>
              <span className="font-sans text-2xl font-black text-primary tabular-nums">
                ₹{totalPrice}
              </span>
            </div>

            <Button
              className="w-full h-16 rounded-none bg-primary text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white transition-all shadow-[0_0_30px_rgba(0,229,255,0.15)]"
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
              }}
            >
              Checkout Now
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;