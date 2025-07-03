import type { LoaderFunctionArgs } from "react-router";
import { getPromo, getPromos } from "./api";

export const getPromosLoader = async () => {
  const promos = await getPromos();

  return promos;
};

export const getPromoLoader = async ({ params }: LoaderFunctionArgs) => {
  const promoId = params.promoId;
  if (!promoId) throw new Error("Promo ID is required");

  const promo = await getPromo(promoId);

  return promo;
};
