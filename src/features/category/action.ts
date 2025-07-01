import { redirect, type ActionFunctionArgs } from "react-router";
import type { CategoryIconType } from "./type";
import { createCategory, updateCategory } from "./api";

export const createCategoryAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const icon = formData.get("icon") as CategoryIconType;

  if (!name || !icon) throw new Error("Name and icon are required");

  await createCategory({
    icon,
    name,
  });

  return redirect("../");
};

export const updateCategoryAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const { categoryId } = params as { categoryId: string };
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const icon = formData.get("icon") as CategoryIconType;

  if (!name || !icon) throw new Error("Name and icon are required");

  await updateCategory(categoryId, {
    icon,
    name,
  });

  return redirect("../../");
};
