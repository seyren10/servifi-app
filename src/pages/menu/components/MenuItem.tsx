import { ShoppingCart } from "lucide-react";
import type { Product } from "../../../features/products/type";

type Props = {
  product: Product;
};

export default function MenuItem({ product }: Props) {
  return (
    <li className="grid grid-cols-[6rem_auto_auto] items-center gap-4 rounded-lg p-2">
      <div className="bg-foreground aspect-square overflow-hidden rounded-md">
        {product.imageUrl && (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/${product.imageUrl}`}
            alt={product.name}
            className="text-xs"
          />
        )}
      </div>

      <div className="flex flex-col justify-between gap-1">
        <p className="font-medium capitalize">{product.name}</p>
        <em className="text-muted-foreground line-clamp-2 text-xs">
          {product.description ? product.description : "No Description"}
        </em>

        <p className="text-muted-foreground text-sm font-bold">
          {product.price ? `P${product.price.toFixed(2)}` : "Free"}
        </p>
      </div>

      <button className="border-primary hover:bg-primary ml-auto rounded-full border p-2 duration-300">
        <ShoppingCart className="stroke-primary size-4 hover:stroke-white" />
      </button>
    </li>
  );
}
