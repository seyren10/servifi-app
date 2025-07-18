import type { LoaderFunctionArgs } from "react-router";
import {
  getProducts,
  getProductsByCategoryId,
  getProduct as getProductApi,
} from "./api";

export async function productsLoader(args: LoaderFunctionArgs) {
  const { id } = args.params;
  if (!id) return null;

  const products = await getProductsByCategoryId(id);

  return { products };
}

export const getProduct = async (args: LoaderFunctionArgs) => {
  const { productId } = args.params;

  if (!productId) return;

  const product = await getProductApi(productId);

  return product;
};

export const adminProductsLoader = async () => {
  const products = await getProducts();

  return products;
};
