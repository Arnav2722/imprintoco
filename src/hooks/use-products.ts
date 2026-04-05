import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DbProduct {
  id: string;
  name: string;
  price: number;
  description: string | null;
  image_url: string | null;
  category: "stickers" | "posters" | "combo";
  subcategory: string;
  badge: string | null;
  available_sizes: string[];
  is_active: boolean;
}

export const useProducts = (filters?: { category?: string; subcategory?: string }) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      let query = supabase.from("products").select("*").eq("is_active", true);

      if (filters?.category && filters.category !== "all") {
        query = query.eq("category", filters.category);
      }
      if (filters?.subcategory && filters.subcategory !== "all") {
        query = query.eq("subcategory", filters.subcategory);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data as DbProduct[];
    },
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("No product ID");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as DbProduct;
    },
    enabled: !!id,
  });
};
