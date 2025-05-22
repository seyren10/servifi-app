import { Gift } from "lucide-react";
import type { Product } from "../../../features/products/type";

type Props = {
  product: Product;
};

export default function MenuItem({ product }: Props) {
  return (
    <li className="flex border border-foreground p-2 shadow-sm rounded-lg gap-2 justify-between">
      <div className="flex flex-col justify-between">
        <p className="font-medium capitalize">{product.name}</p>
        <em className="text-muted-foreground line-clamp-2 text-xs">
          {product.description}
        </em>
        {product.price ? (
          <p className="text-sm font-bold text-muted-foreground">
            {`P${product.price.toFixed(2)}`}
          </p>
        ) : (
          <p className="flex items-center gap-1 text-sm text-primary">
            <Gift className="size-4" /> <strong>FREE</strong>
          </p>
        )}
      </div>
      <div>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="size-16 rounded-md bg-foreground"></div>
        )}
      </div>
    </li>
  );
}
