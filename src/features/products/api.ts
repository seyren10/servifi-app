import { http } from "../../lib/axios";
import type { Product } from "./type";

export async function getProductsByCategory(categoryId: string) {
  try {
    const token = localStorage.getItem("token");

    const res = await http.get<Product[]>(
      `/api/v1/products/category/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
