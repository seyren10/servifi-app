import type { ActionFunctionArgs } from "react-router";
import { createProduct } from "./api";

export default async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const name = formData.get("name")!.toString();
  const category = formData.get("category")!.toString();
  const description = formData.get("description")?.toString();
  const image = formData.get("image") as File | undefined;
  const price = Number(formData.get("price"));
  const availability = Boolean(formData.get("availability"));

  const res = await createProduct({
    availability,
    category,
    image,
    name,
    price,
    description,
  });

  return res;
};
