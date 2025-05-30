import { http } from "../../lib/axios";
import type { Product } from "./type";

export async function getProductsByCategory(categoryId: string) {
  const res = await http.get<Product[]>(
    `/api/v1/products/category/${categoryId}`,
  );
  return res.data;
}
