import type { ProductWithQuantity } from "../../orders/type";
import type { Product } from "../../products/type";
import type { Table } from "../../tables/type";

export type Order = {
  _id: string;
  table: Table;
  products: (Omit<ProductWithQuantity, "product"> & { product: Product })[];
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};
