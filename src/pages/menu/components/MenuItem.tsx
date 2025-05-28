import { ShoppingCart } from "lucide-react";
import type { Product } from "../../../features/products/type";
import { useDispatch } from "react-redux";
import { addPendingOrder } from "../../../features/orders/slice";
import { useToastDispatch } from "../../../components/toast";

type Props = {
  product: Product;
};

export default function MenuItem({ product }: Props) {
  const dispatch = useDispatch();
  const toast = useToastDispatch();

  function handleAddToOrder() {
    dispatch(addPendingOrder({ product, quantity: 1 }));
    toast({
      type: "toast/add",
      payload: {
        title: "Added to Order",
        description: `${product.name} has been added to your order.`,
        type: "success",
      },
    });
  }
  return (
    <li className="grid grid-cols-[6rem_auto_auto] items-center gap-4 rounded-lg p-2">
      <div className="bg-foreground relative isolate aspect-square overflow-hidden rounded-md">
        {product.imageUrl && (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/${product.imageUrl}`}
            alt={product.name}
            className={`text-xs ${!product.availability && "grayscale"}`}
          />
        )}
        {!product.availability && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 px-1 text-xs font-medium tracking-wide whitespace-nowrap text-white">
            Not Available
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between gap-1">
        <p className="font-medium capitalize">{product.name}</p>
        <em className="text-muted-foreground line-clamp-2 text-xs">
          {product.description ? product.description : "No Description"}
        </em>

        <p className="text-muted-foreground text-sm font-bold">
          {product.price ? (
            `P${product.price.toFixed(2)}`
          ) : (
            <span className="rounded-full bg-lime-200 px-2 py-0.5 text-xs font-normal text-lime-600">
              free
            </span>
          )}
        </p>
      </div>

      {product.availability && (
        <button
          className="border-primary hover:bg-primary ml-auto rounded-full border p-2 duration-300"
          onClick={handleAddToOrder}
        >
          <ShoppingCart className="stroke-primary size-4 hover:stroke-white" />
        </button>
      )}
    </li>
  );
}
