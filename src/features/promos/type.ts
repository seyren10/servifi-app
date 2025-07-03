import type { WithTimestamp } from "../../types";
import type { Product } from "../products/type";

export type Promo = WithTimestamp & {
  _id: string;
  title: string;
  description?: string;
  restrictedProducts?: string[] | Product[];
};

export type CreatePromoPayload = Omit<Promo, "_id" | "createdAt" | "updatedAt">;
export type UpdatePromoPayload = Partial<CreatePromoPayload>;
