// import { useQuery } from "@tanstack/react-query";
// import { db } from "@/lib/firebase";
// import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// // Product ka structure define kiya hai bina any ke
// export interface DbProduct {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image_url: string;
//   category: string;
//   subcategory?: string;
//   is_featured: boolean;
// }

// export const useProducts = () => {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const querySnapshot = await getDocs(collection(db, "products"));
//       return querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as DbProduct[];
//     },
//   });
// };

// export const useProduct = (id: string | undefined) => {
//   return useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       if (!id) throw new Error("No ID provided");
//       const docRef = doc(db, "products", id);
//       const docSnap = await getDoc(docRef);
      
//       if (docSnap.exists()) {
//         return { id: docSnap.id, ...docSnap.data() } as DbProduct;
//       }
//       throw new Error("Product not found");
//     },
//     enabled: !!id,
//   });
// };

import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, Timestamp } from "firebase/firestore";

// Strictly typed product structure
export interface DbProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  subcategory?: string;
  is_featured: boolean;
  is_active: boolean; // Added from your Firebase screenshot
  badge?: string;     // Added from your Firebase screenshot
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const useProducts = () => {
  return useQuery<DbProduct[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      // Mapping explicitly to avoid 'any'
      return querySnapshot.docs.map((snapshot) => {
        const data = snapshot.data();
        return {
          id: snapshot.id,
          name: data.name || "",
          description: data.description || "",
          price: Number(data.price) || 0,
          image_url: data.image_url || "",
          category: data.category || "",
          subcategory: data.subcategory || "",
          is_featured: !!data.is_featured,
          is_active: !!data.is_active,
          badge: data.badge || "",
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        } as DbProduct;
      });
    },
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery<DbProduct>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error("Product not found");
      }

      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || "",
        description: data.description || "",
        price: Number(data.price) || 0,
        image_url: data.image_url || "",
        category: data.category || "",
        subcategory: data.subcategory || "",
        is_featured: !!data.is_featured,
        is_active: !!data.is_active,
        badge: data.badge || "",
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      } as DbProduct;
    },
    enabled: !!id,
  });
};