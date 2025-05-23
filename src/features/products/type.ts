export type Product = {
  _id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  imageUrl?: string;
  availability: boolean;
  updatedAt: string;
  createdAt: string;
};
