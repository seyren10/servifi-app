import { http } from "../../lib/axios";
import type { CreateProductPayload, Product } from "./type";

export const getProductsByCategoryId = async (categoryId: string) => {
  const res = await http.get<Product[]>(
    `/api/v1/products/category/${categoryId}`,
  );
  return res.data;
};

export const getProducts = async () => {
  const res = await http.get<Product[]>(`/api/v1/products`);
  return res.data;
};

export const createProduct = async (payload: CreateProductPayload) => {
  const res = await http.post("/api/v1/products", payload);

  return res.data;
};
