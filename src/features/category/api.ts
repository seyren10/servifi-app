import { http } from "../../lib/axios";
import type { Category } from "./type";

export const getCategories = async () => {
  const res = await http.get<Category[]>("/api/v1/categories");

  return res.data;
};
