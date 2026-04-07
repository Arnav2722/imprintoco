// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/integrations/supabase/client";

// export interface DbProduct {
//   id: string;
//   name: string;
//   price: number;
//   description: string | null;
//   image_url: string | null;
//   category: "stickers" | "posters" | "combo";
//   subcategory: string;
//   badge: string | null;
//   available_sizes: string[];
//   is_active: boolean;
// }

// export const useProducts = (filters?: { category?: string; subcategory?: string }) => {
//   return useQuery({
//     queryKey: ["products", filters],
//     queryFn: async () => {
//       let query = supabase.from("products").select("*").eq("is_active", true);

//       if (filters?.category && filters.category !== "all") {
//         query = query.eq("category", filters.category as any);
//       }
//       if (filters?.subcategory && filters.subcategory !== "all") {
//         query = query.eq("subcategory", filters.subcategory as any);
//       }

//       const { data, error } = await query.order("created_at", { ascending: false });
//       if (error) throw error;
//       return data as DbProduct[];
//     },
//   });
// };

// export const useProduct = (id: string | undefined) => {
//   return useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       if (!id) throw new Error("No product ID");
//       const { data, error } = await supabase
//         .from("products")
//         .select("*")
//         .eq("id", id)
//         .single();
//       if (error) throw error;
//       return data as DbProduct;
//     },
//     enabled: !!id,
//   });
// };



import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// Product ka structure define kiya hai bina any ke
export interface DbProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  subcategory?: string;
  is_featured: boolean;
}

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DbProduct[];
    },
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as DbProduct;
      }
      throw new Error("Product not found");
    },
    enabled: !!id,
  });
};