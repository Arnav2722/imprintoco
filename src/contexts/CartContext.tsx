// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";
// import { DbProduct } from "@/hooks/use-products";
// import { db } from "@/lib/firebase";
// import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";

// interface CartItem {
//   product: DbProduct;
//   quantity: number;
//   selectedSize?: string;
// }

// interface CustomerData {
//   customerName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface CartContextType {
//   items: CartItem[];
//   addToCart: (product: DbProduct, size?: string, quantity?: number) => void;
//   removeFromCart: (productId: string, size?: string) => void;
//   updateQuantity: (
//     productId: string,
//     size: string | undefined,
//     quantity: number,
//   ) => void;
//   clearCart: () => void;
//   processCheckout: (customerData: CustomerData) => Promise<string>;
//   totalItems: number;
//   totalPrice: number;
//   isCartOpen: boolean;
//   setIsCartOpen: (open: boolean) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [items, setItems] = useState<CartItem[]>(() => {
//     const savedCart = localStorage.getItem("imprinto_cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   useEffect(() => {
//     localStorage.setItem("imprinto_cart", JSON.stringify(items));
//   }, [items]);

//   const addToCart = (
//     product: DbProduct,
//     size?: string,
//     quantity: number = 1,
//   ): void => {
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

//   const removeFromCart = (productId: string, size?: string): void => {
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
//   ): void => {
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

//   const clearCart = (): void => {
//     setItems([]);
//     localStorage.removeItem("imprinto_cart");
//   };

//   const processCheckout = async (
//     customerData: CustomerData,
//   ): Promise<string> => {
//     const ordersRef = collection(db, "orders");
//     const snapshot = await getDocs(ordersRef);
//     const orderNumber: number = 1000 + snapshot.size + 1;
//     const generatedId: string = `IMP-${orderNumber}`;

//     const orderPayload = {
//       ...customerData,
//       orderId: generatedId,
//       items: items
//         .map(
//           (i) =>
//             `${i.quantity} x ${i.product.name} (${i.selectedSize || "Standard"})`,
//         )
//         .join(", "),
//       totalAmount: items.reduce(
//         (sum, i) => sum + i.product.price * i.quantity,
//         0,
//       ),
//       status: "pending",
//       createdAt: Timestamp.now(),
//       updatedAt: Timestamp.now(),
//     };

//     await addDoc(ordersRef, orderPayload);
//     clearCart();
//     return generatedId;
//   };

//   const totalItems: number = items.reduce((sum, i) => sum + i.quantity, 0);
//   const totalPrice: number = items.reduce(
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
//         processCheckout,
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
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";

interface CartItem {
  product: DbProduct;
  quantity: number;
  selectedSize?: string;
}

interface CustomerData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
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
  processCheckout: (customerData: CustomerData) => Promise<string>;
  totalItems: number;
  totalPrice: number;
  discountAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

// Logic bahar nikaal diya for Fast Refresh
const calculateTotals = (items: CartItem[]) => {
  const groups: { [key: string]: DbProduct[] } = {};
  items.forEach((item) => {
    const size = item.selectedSize || "Standard";
    if (!groups[size]) groups[size] = [];
    for (let j = 0; j < item.quantity; j++) groups[size].push(item.product);
  });

  let total = 0;
  let discountAmount = 0;

  Object.keys(groups).forEach((size) => {
    const products = groups[size];
    if (products.length >= 5) {
      products.sort((a, b) => a.price - b.price);
      discountAmount += products
        .slice(0, 2)
        .reduce((sum, item) => sum + item.price, 0);
      total += products.slice(2).reduce((sum, item) => sum + item.price, 0);
    } else {
      total += products.reduce((sum, item) => sum + item.price, 0);
    }
  });
  return { total, discountAmount };
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("imprinto_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("imprinto_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (
    product: DbProduct,
    size?: string,
    quantity: number = 1,
  ): void => {
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

  const removeFromCart = (productId: string, size?: string): void => {
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
  ): void => {
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

  const clearCart = (): void => {
    setItems([]);
    localStorage.removeItem("imprinto_cart");
  };

  const processCheckout = async (
    customerData: CustomerData,
  ): Promise<string> => {
    const ordersRef = collection(db, "orders");
    const snapshot = await getDocs(ordersRef);
    const orderNumber: number = 1000 + snapshot.size + 1;
    const generatedId: string = `IMP-${orderNumber}`;
    const { total, discountAmount } = calculateTotals(items);

    const orderPayload = {
      ...customerData,
      orderId: generatedId,
      items: items
        .map(
          (i) =>
            `${i.quantity} x ${i.product.name} (${i.selectedSize || "Standard"})`,
        )
        .join(", "),
      totalAmount: total,
      discount: discountAmount,
      status: "pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await addDoc(ordersRef, orderPayload);
    clearCart();
    return generatedId;
  };

  const { total, discountAmount } = calculateTotals(items);
  const totalItems: number = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        processCheckout,
        totalItems,
        totalPrice: total,
        discountAmount,
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