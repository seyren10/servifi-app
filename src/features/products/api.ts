import { http } from "../../lib/axios";
import type {
  CreateProductPayload,
  Product,
  UpdateProductPayload,
} from "./type";

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

export const getProduct = async (productId: string) => {
  const res = await http.get<Product>(`/api/v1/products/${productId}`);
  return res.data;
};

export const createProduct = async (payload: CreateProductPayload) => {
  const res = await http.post("/api/v1/products", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateProduct = async (
  productId: string,
  payload: UpdateProductPayload,
) => {
  const res = await http.put(`/api/v1/products/${productId}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteProduct = async (productId: string) => {
  const res = await http.delete(`/api/v1/products/${productId}`);

  return res.data;
};
