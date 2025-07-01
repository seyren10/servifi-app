import type { LoaderFunctionArgs } from "react-router";
import { getCategories, getCategory } from "./api";

export default async () => {
  const categories = await getCategories();

  if (categories) return categories;
};

export const getCategoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const { categoryId } = params as { categoryId: string };

  const category = await getCategory(categoryId);

  return category;
};
