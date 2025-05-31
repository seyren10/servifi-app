import type { ProductWithQuantity } from "../../orders/type";
import type { Product } from "../../products/type";

export type Order = {
  _id: string;
  table: string;
  products: ProductWithQuantity["quantity" | "total"] & { product: Product }[];
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};
