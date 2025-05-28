import type {
  OrderSummary,
  ProductWithQuantity,
} from "../../../features/orders/type";

type Props = {
  orderSummary: OrderSummary;
};

export default function CompletedOrderList({ orderSummary }: Props) {
  return (
    <ul className="space-y-2">
      {orderSummary.products.map((po) => {
        return <CompletedOrderItem orderSummary={po} key={po._id} />;
      })}
    </ul>
  );
}

export function CompletedOrderItem({
  orderSummary,
}: {
  orderSummary: ProductWithQuantity;
}) {
  const { product, quantity } = orderSummary;
  return (
    <li className="flex justify-between text-sm">
      <p>{product.name}</p>
      <span className="text-muted-foreground text-xs">x {quantity}</span>
    </li>
  );
}
