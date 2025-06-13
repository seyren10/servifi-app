import { http } from "../../lib/axios";
import type { Product } from "./type";

export async function getProductsByCategoryId(categoryId: string) {
  const res = await http.get<Product[]>(
    `/api/v1/products/category/${categoryId}`,
  );
  return res.data;
}

export async function getProducts() {
  const res = await http.get<Product[]>(`/api/v1/products`);
  return res.data;
}
