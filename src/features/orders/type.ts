import type { Product } from "../products/type";

export type OrderState = {
  pendingOrders: PendingOrder[];
};

export type PendingOrder = {
  product: Product;
  quantity: number;
};
