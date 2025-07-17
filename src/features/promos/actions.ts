import { redirect, type ActionFunctionArgs } from "react-router";
import { createPromo, deletePromo, updatePromo } from "./api";
import type { CreatePromoPayload, UpdatePromoPayload } from "./type";

export const createPromoAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | undefined;
  const restrictedProducts = formData
    .get("restrictedProducts")
    ?.toString()
    .split(",");

  const payload: CreatePromoPayload = {
    title,
  };
  if (restrictedProducts?.length && restrictedProducts.every((p) => p.trim()))
    payload.restrictedProducts = restrictedProducts;
  if (description) payload.description = description;

  await createPromo(payload);

  return redirect("../");
};

export const updatePromoAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const { promoId } = params;
  if (!promoId) throw new Error("No Promo Id found in params");

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | undefined;
  const restrictedProducts = formData
    .get("restrictedProducts")
    ?.toString()
    .split(",");

  const payload: UpdatePromoPayload = {
    title,
  };

  if (restrictedProducts?.length && restrictedProducts.every((p) => p.trim()))
    payload.restrictedProducts = restrictedProducts;
  if (description) payload.description = description;

  await updatePromo(promoId, payload);

  return redirect("../");
};

export const deletePromoAction = async ({ params }: ActionFunctionArgs) => {
  const { promoId } = params;
  if (!promoId) throw new Error("No Promo Id found in params");

  await deletePromo(promoId);
};
