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
  _id: string;
  product: Pick<Product, "_id" | "name">;
  quantity: number;
};
export type OrderSummary = {
  products: ProductWithQuantity[];
  total: number;
};
