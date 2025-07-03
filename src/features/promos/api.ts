import { http } from "../../lib/axios";
import type { CreatePromoPayload, Promo, UpdatePromoPayload } from "./type";

export const getPromos = async () => {
  const res = await http.get<Promo[]>("/api/v1/promos");
  return res.data;
};

export const getPromo = async (promoId: string) => {
  const res = await http.get<Promo>(`/api/v1/promos/${promoId}`);
  return res.data;
};

export const createPromo = async (payload: CreatePromoPayload) => {
  const res = await http.post("/api/v1/promos", payload);
  return res.data;
};
export const updatePromo = async (
  promoId: string,
  payload: UpdatePromoPayload,
) => {
  const res = await http.put(`/api/v1/promos/${promoId}`, payload);
  return res.data;
};

export const deletePromo = async (promoId: string) => {
  const res = await http.delete(`/api/v1/promos/${promoId}`);
  return res.data;
};
