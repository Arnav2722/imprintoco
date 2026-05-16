import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[1050] cursor-pointer"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l-4 border-foreground z-[1100] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.1)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-8 border-b-2 border-foreground/5 bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="font-display text-xl font-black tracking-tighter uppercase text-foreground">
                  Obsession List{" "}
                  <span className="text-primary">({totalItems})</span>
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-foreground/40 hover:text-primary transition-all duration-300 hover:rotate-90"
                aria-label="Close Cart"
              >
                <X size={28} strokeWidth={3} />
              </button>
            </div>

            {/* Items Section */}
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar bg-[#FAF9F6]">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-2">
                    <ShoppingBag size={32} className="text-foreground/20" />
                  </div>
                  <p className="text-foreground/40 font-display text-sm font-black uppercase tracking-[0.2em]">
                    The list is empty.
                  </p>
                  <Button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-foreground text-background font-black text-xs tracking-widest px-10 h-14 rounded-none hover:bg-primary hover:text-foreground transition-all"
                  >
                    GO SHOPPING
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  {items.map((item) => (
                    <motion.div
                      layout
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-6 group"
                    >
                      {/* Product Image */}
                      <div className="w-28 h-36 bg-white flex-shrink-0 overflow-hidden border-2 border-foreground/5 shadow-sm group-hover:shadow-md transition-all duration-500">
                        {item.product.image_url && (
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-display text-sm font-black tracking-tight uppercase text-foreground leading-tight flex-1 group-hover:text-primary transition-colors">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.product.id,
                                  item.selectedSize,
                                )
                              }
                              className="text-foreground/20 hover:text-accent transition-colors ml-4"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-accent-lime px-2 py-0.5 text-[9px] font-black uppercase text-foreground">
                              {item.selectedSize}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Toggles */}
                          <div className="flex items-center border-2 border-foreground bg-white">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                              className="px-3 py-1.5 text-foreground hover:bg-muted transition-colors border-r-2 border-foreground"
                            >
                              <Minus size={12} strokeWidth={3} />
                            </button>

                            <span className="w-10 text-center font-display text-sm font-black text-foreground">
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
                              className="px-3 py-1.5 text-foreground hover:bg-muted transition-colors border-l-2 border-foreground"
                            >
                              <Plus size={12} strokeWidth={3} />
                            </button>
                          </div>

                          <span className="font-display text-lg font-black text-foreground tracking-tighter">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Footer */}
            {items.length > 0 && (
              <div className="p-8 bg-white border-t-4 border-foreground">
                <div className="flex justify-between items-end mb-8">
                  <div className="flex flex-col">
                    <span className="font-display text-[10px] font-black tracking-[0.3em] uppercase text-foreground/30">
                      Subtotal
                    </span>
                    <span className="font-display text-4xl font-black text-foreground tracking-tighter">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-accent">
                      + Shipping Charges
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full h-20 rounded-none bg-foreground text-background font-black uppercase tracking-widest text-sm hover:bg-primary hover:text-foreground transition-all shadow-[10px_10px_0px_0px_rgba(0,212,255,1)] hover:shadow-none"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/checkout");
                  }}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
