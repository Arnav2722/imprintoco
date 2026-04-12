// import { createContext, useContext, useState, ReactNode } from "react";
// import { DbProduct } from "@/hooks/use-products";

// interface CartItem {
//   product: DbProduct;
//   quantity: number;
//   selectedSize?: string;
// }

// interface CartContextType {
//   items: CartItem[];
//   // Yahan quantity argument add kiya hai
//   addToCart: (product: DbProduct, size?: string, quantity?: number) => void;
//   removeFromCart: (productId: string, size?: string) => void;
//   updateQuantity: (
//     productId: string,
//     size: string | undefined,
//     quantity: number,
//   ) => void;
//   clearCart: () => void;
//   totalItems: number;
//   totalPrice: number;
//   isCartOpen: boolean;
//   setIsCartOpen: (open: boolean) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const addToCart = (
//     product: DbProduct,
//     size?: string,
//     quantity: number = 1,
//   ) => {
//     setItems((prev) => {
//       const existing = prev.find(
//         (i) => i.product.id === product.id && i.selectedSize === size,
//       );

//       if (existing) {
//         return prev.map((i) =>
//           i.product.id === product.id && i.selectedSize === size
//             ? { ...i, quantity: i.quantity + quantity }
//             : i,
//         );
//       }
//       return [...prev, { product, quantity, selectedSize: size }];
//     });
//     setIsCartOpen(true);
//   };

//   const removeFromCart = (productId: string, size?: string) => {
//     setItems((prev) =>
//       prev.filter(
//         (i) => !(i.product.id === productId && i.selectedSize === size),
//       ),
//     );
//   };

//   const updateQuantity = (
//     productId: string,
//     size: string | undefined,
//     quantity: number,
//   ) => {
//     if (quantity <= 0) {
//       removeFromCart(productId, size);
//       return;
//     }
//     setItems((prev) =>
//       prev.map((i) =>
//         i.product.id === productId && i.selectedSize === size
//           ? { ...i, quantity }
//           : i,
//       ),
//     );
//   };

//   const clearCart = () => setItems([]);

//   const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
//   const totalPrice = items.reduce(
//     (sum, i) => sum + i.product.price * i.quantity,
//     0,
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         totalItems,
//         totalPrice,
//         isCartOpen,
//         setIsCartOpen,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within a CartProvider");
//   return context;
// };

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { DbProduct } from "@/hooks/use-products";

interface CartItem {
  product: DbProduct;
  quantity: number;
  selectedSize?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: DbProduct, size?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (
    productId: string,
    size: string | undefined,
    quantity: number,
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initial state localstorage se uthayega
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("imprinto_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Jab bhi items change honge, localstorage update hoga
  useEffect(() => {
    localStorage.setItem("imprinto_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (
    product: DbProduct,
    size?: string,
    quantity: number = 1,
  ) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedSize === size,
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedSize === size
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { product, quantity, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.selectedSize === size),
      ),
    );
  };

  const updateQuantity = (
    productId: string,
    size: string | undefined,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.selectedSize === size
          ? { ...i, quantity }
          : i,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("imprinto_cart");
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};