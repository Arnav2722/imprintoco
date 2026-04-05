// import { X, Minus, Plus, Trash2 } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// const CartDrawer = () => {
//   const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
//   const navigate = useNavigate();

//   if (!isCartOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={() => setIsCartOpen(false)} />
//       <div className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-container z-50 flex flex-col">
//         <div className="flex items-center justify-between p-6">
//           <h2 className="font-display text-lg tracking-widest uppercase">Cart ({totalItems})</h2>
//           <button onClick={() => setIsCartOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto px-6">
//           {items.length === 0 ? (
//             <p className="text-muted-foreground font-body text-sm text-center py-20">Your cart is empty.</p>
//           ) : (
//             <div className="flex flex-col gap-4">
//               {items.map((item) => (
//                 <div key={`${item.product.id}-${item.selectedSize || ""}`} className="flex gap-4 bg-surface-low p-4">
//                   <div className="w-20 h-20 bg-surface-highest flex-shrink-0 overflow-hidden">
//                     {item.product.image_url ? (
//                       <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
//                     ) : null}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-display text-xs tracking-wider uppercase">{item.product.name}</h3>
//                     {item.selectedSize && (
//                       <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">
//                         Size: {item.selectedSize}
//                       </p>
//                     )}
//                     <p className="font-display text-sm font-bold text-primary mt-1">₹{item.product.price}</p>
//                     <div className="flex items-center gap-3 mt-2">
//                       <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-muted-foreground hover:text-foreground">
//                         <Minus size={14} />
//                       </button>
//                       <span className="font-display text-xs">{item.quantity}</span>
//                       <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-muted-foreground hover:text-foreground">
//                         <Plus size={14} />
//                       </button>
//                       <button onClick={() => removeFromCart(item.product.id)} className="ml-auto text-muted-foreground hover:text-destructive">
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {items.length > 0 && (
//           <div className="p-6 border-t border-surface-highest">
//             <div className="flex justify-between mb-4">
//               <span className="font-display text-xs tracking-widest uppercase text-muted-foreground">Total</span>
//               <span className="font-display text-lg font-bold text-primary">₹{totalPrice}</span>
//             </div>
//             <Button variant="cta" size="xl" className="w-full" onClick={() => { setIsCartOpen(false); navigate("/checkout"); }}>
//               CHECKOUT
//             </Button>
//             <p className="text-muted-foreground text-[10px] font-body text-center mt-2">
//               Razorpay payment integration coming soon
//             </p>
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
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-container z-50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="font-display text-lg tracking-widest uppercase">
            Cart ({totalItems})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <p className="text-muted-foreground font-body text-sm text-center py-20">
              Your cart is empty.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || ""}`}
                  className="flex gap-4 bg-surface-low p-4"
                >
                  <div className="w-20 h-20 bg-surface-highest flex-shrink-0 overflow-hidden">
                    {item.product.image_url && (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-xs tracking-wider uppercase">
                      {item.product.name}
                    </h3>

                    {item.selectedSize && (
                      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">
                        Size: {item.selectedSize}
                      </p>
                    )}

                    <p className="font-display text-sm font-bold text-primary mt-1">
                      ₹{item.product.price}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="font-display text-xs">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Plus size={14} />
                      </button>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-surface-highest">
            <div className="flex justify-between mb-4">
              <span className="font-display text-xs tracking-widest uppercase text-muted-foreground">
                Total
              </span>
              <span className="font-display text-lg font-bold text-primary">
                ₹{totalPrice}
              </span>
            </div>

            <Button
              variant="cta"
              size="xl"
              className="w-full"
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
              }}
            >
              CHECKOUT
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;