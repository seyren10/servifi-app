import type { Product } from "../products/type";

export type OrderState = {
  pendingOrders: PendingOrder[];
  totalBill: number;
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

export type ProductWithQuantity = {
  product: Pick<Product, "_id" | "name">;
  quantity: number;
  total: number;
};
export type OrderSummary = {
  table: string;
  products: ProductWithQuantity[];
  total: number;
};
