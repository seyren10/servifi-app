import { useDispatch } from "react-redux";
import { NumberInput } from "../../../components/number_input";
import type { PendingOrder } from "../../../features/orders/type";
import {
  decreaseQty,
  increaseQty,
  setQty,
} from "../../../features/orders/slice";
import { Image } from "../../../components/image";
import { cloudinary } from "../../../services/cloudinary/cloudinary";

type Props = {
  pendingOrder: PendingOrder;
};

export default function PendingOrderCard({ pendingOrder }: Props) {
  const dispatch = useDispatch();
  const { product, quantity } = pendingOrder;
  const imageUrl = cloudinary.image(product.imageUrl).toURL();

  function handleIncrease() {
    dispatch(increaseQty(pendingOrder));
  }

  function handleDecrease() {
    dispatch(decreaseQty(pendingOrder));
  }

  function handleSetValue(value: number) {
    dispatch(
      setQty({
        product: pendingOrder.product,
        quantity: value,
      }),
    );
  }
  return (
    <li className="flex items-center justify-between">
      <div className="inline-flex items-center gap-2">
        <Image src={imageUrl} alt={product.name} className="size-10"></Image>
        <div>
          <p className="font-medium">{product.name}</p>
          <span className="text-muted-foreground text-xs tracking-wider">
            P{(product.price * quantity).toFixed(2)} @ P
            {product.price.toFixed(2)}
          </span>
        </div>
      </div>

      <NumberInput
        value={quantity}
        setValue={handleSetValue}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
    </li>
  );
}
