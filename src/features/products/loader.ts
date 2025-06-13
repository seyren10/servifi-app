import type { LoaderFunctionArgs } from "react-router";
import { getProducts, getProductsByCategoryId } from "./api";

export async function productsLoader(args: LoaderFunctionArgs) {
  const { id } = args.params;
  if (!id) return null;

  const products = await getProductsByCategoryId(id);

  return { products };
}

export const adminProductsLoader = async (args: LoaderFunctionArgs) => {
  const products = await getProducts();

  return products;
};
