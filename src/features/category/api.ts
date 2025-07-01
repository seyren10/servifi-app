import { http } from "../../lib/axios";
import type {
  Category,
  CreateCategoryPayload,
  MoveProductsCategoryPayload,
} from "./type";

export const getCategories = async () => {
  const res = await http.get<Category[]>("/api/v1/categories");

  return res.data;
};
export const getCategory = async (categoryId: string) => {
  const res = await http.get<Category>(`/api/v1/categories/${categoryId}`);

  return res.data;
};

export const createCategory = async (payload: CreateCategoryPayload) => {
  const res = await http.post("/api/v1/categories", payload);

  return res.data;
};

export const updateCategory = async (
  categoryId: string,
  payload: CreateCategoryPayload,
) => {
  const res = await http.put(`/api/v1/categories/${categoryId}`, payload);

  return res.data;
};

export const getCategoryProductsCount = async (categoryId: string) => {
  const res = await http.get<number>(
    `/api/v1/categories/${categoryId}/products-count`,
  );

  return res.data;
};

export const moveProductsToCategory = async (
  payload: MoveProductsCategoryPayload,
) => {
  const res = await http.put(
    `/api/v1/categories/from/${payload.from}/to/${[payload.to]}`,
  );
  return res.data;
};

export const deleteCategory = async (categoryId: string) => {
  const res = await http.delete(`/api/v1/categories/${categoryId}`);

  return res.data;
};
