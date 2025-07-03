import type { WithTimestamp } from "../../types";
import type { Category } from "../category/type";

export type Product = WithTimestamp & {
  _id: string;
  name: string;
  description?: string;
  category: string | Category;
  price: number;
  imageUrl?: string;
  availability: boolean;
};

export type CreateProductPayload = Pick<
  Product,
  "name" | "price" | "description" | "category" | "availability"
> & {
  image?: File;
};

export type UpdateProductPayload = Partial<CreateProductPayload>;
