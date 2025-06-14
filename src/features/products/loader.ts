import type { LoaderFunctionArgs } from "react-router";
import { getProducts, getProductsByCategoryId } from "./api";
import { getCategories as getCategoriesApi } from "../category/api";

export async function productsLoader(args: LoaderFunctionArgs) {
  const { id } = args.params;
  if (!id) return null;

  const products = await getProductsByCategoryId(id);

  return { products };
}

export const adminProductsLoader = async () => {
  const products = await getProducts();

  return products;
};

export const getCategories = async () => {
  const categories = await getCategoriesApi();

  if (categories) return categories;
};
