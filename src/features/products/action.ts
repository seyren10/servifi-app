import { redirect, type ActionFunctionArgs } from "react-router";
import {
  createProduct,
  deleteProduct,
  updateProduct as updateProductApi,
} from "./api";

export default async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const name = formData.get("name")!.toString();
  const category = formData.get("category")!.toString();
  const description = formData.get("description")?.toString();
  const image = formData.get("image") as File | undefined;
  const price = Number(formData.get("price"));
  const availability = formData.get("availability") === "true";

  await createProduct({
    availability,
    category,
    image,
    name,
    price,
    description,
  });

  return redirect("../");
};

export const updateProduct = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { productId } = params as { productId: string };

  const name = formData.get("name")!.toString();
  const category = formData.get("category")!.toString();
  const description = formData.get("description")?.toString();
  const image = formData.get("image") as File | undefined;
  const price = Number(formData.get("price"));
  const availability = formData.get("availability") === "true";

  await updateProductApi(productId, {
    availability,
    category,
    image,
    name,
    price,
    description,
  });

  return redirect("/admin/menu-management");
};

export const toggleAvailabilityAction = async ({
  params,
}: ActionFunctionArgs) => {
  const { productId, availability } = params as {
    productId?: string;
    availability?: string;
  };

  await updateProductApi(productId!, {
    availability: availability && availability === "true" ? false : true,
  });

  return {
    ok: true,
    message: "product toggled",
  };
};

export const deleteProductAction = async ({ params }: ActionFunctionArgs) => {
  const { productId } = params as { productId?: string };

  if (!productId) throw new Error("Not product id present in url params");

  await deleteProduct(productId);

  return {
    ok: true,
    message: "product successfully deleted",
  };
};
