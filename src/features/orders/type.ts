import type { Product } from "../products/type";

export type OrderState = {
  pendingOrders: PendingOrder[];
};

export type PendingOrder = {
  product: Product;
  quantity: number;
};

export type CreateOrderPayload = {
  table: string;
  products: {
    product: string;
    quantity: number;
  }[];
};
