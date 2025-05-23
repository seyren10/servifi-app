import type { LoaderFunctionArgs } from "react-router";
import { getProductsByCategory } from "./api";

export async function productsLoader(args: LoaderFunctionArgs) {
  const { id } = args.params;
  if (!id) return null;

  const products = await getProductsByCategory(id);

  return { products };
}
