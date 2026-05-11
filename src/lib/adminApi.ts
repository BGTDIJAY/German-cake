import { supabase } from "@/integrations/supabase/client";

export interface CakeProduct {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  /** Map of "0.5 kg" → 650, "1 kg" → 1200, etc. May be empty for legacy cakes. */
  sizePrices: Record<string, number>;
  createdAt: string;
}

function rowToCake(row: any): CakeProduct {
  const sp =
    row.size_prices && typeof row.size_prices === "object" && !Array.isArray(row.size_prices)
      ? Object.fromEntries(
          Object.entries(row.size_prices as Record<string, unknown>).map(([k, v]) => [k, Number(v)])
        )
      : {};
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    size: row.size,
    category: row.category,
    subcategory: row.subcategory ?? "",
    description: row.description ?? "",
    image: row.image_url ?? "",
    sizePrices: sp,
    createdAt: row.created_at,
  };
}

export async function fetchCakes(): Promise<CakeProduct[]> {
  const { data, error } = await supabase
    .from("cakes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(rowToCake);
}

export async function addCake(
  cake: Omit<CakeProduct, "id" | "createdAt">,
  userId: string
): Promise<CakeProduct> {
  const { data, error } = await supabase
    .from("cakes")
    .insert({
      name: cake.name,
      price: cake.price,
      size: cake.size,
      category: cake.category,
      subcategory: cake.subcategory || null,
      description: cake.description || null,
      image_url: cake.image,
      size_prices:
        cake.sizePrices && Object.keys(cake.sizePrices).length > 0 ? cake.sizePrices : null,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return rowToCake(data);
}

export async function updateCake(
  id: string,
  updates: Partial<Omit<CakeProduct, "id" | "createdAt">>
): Promise<CakeProduct> {
  const { data, error } = await supabase
    .from("cakes")
    .update({
      ...(updates.name !== undefined && { name: updates.name }),
      ...(updates.price !== undefined && { price: updates.price }),
      ...(updates.size !== undefined && { size: updates.size }),
      ...(updates.category !== undefined && { category: updates.category }),
      ...(updates.subcategory !== undefined && { subcategory: updates.subcategory || null }),
      ...(updates.description !== undefined && { description: updates.description || null }),
      ...(updates.image !== undefined && { image_url: updates.image }),
      ...(updates.sizePrices !== undefined && {
        size_prices:
          updates.sizePrices && Object.keys(updates.sizePrices).length > 0
            ? updates.sizePrices
            : null,
      }),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return rowToCake(data);
}

export async function deleteCake(id: string): Promise<void> {
  const { error } = await supabase.from("cakes").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadCakeImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("cake-images")
    .upload(path, file, { contentType: file.type });

  if (error) throw error;

  const { data } = supabase.storage.from("cake-images").getPublicUrl(path);
  return data.publicUrl;
}
