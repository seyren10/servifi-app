import { type ReactNode } from "react";
import type { Order } from "../../../../features/admin/orders/type";
import { Image } from "../../../../components/image";
import { Button } from "../../../../components/button";
import { Check } from "lucide-react";

import { useFetcher } from "react-router";

type Props = {
  orders: Order[];
  renderItem: (order: Order) => ReactNode;
};

export default function OrderCard({ orders, renderItem }: Props) {
  return (
    <ul className="flex flex-wrap items-start gap-4">
      {orders.map((order) => renderItem(order))}
    </ul>
  );
}

type OrderCardItemProps = {
  order: Order;
};
function OrderCardItem({ order }: OrderCardItemProps) {
  const fetcher = useFetcher();

  const loading = fetcher.state !== "idle";

  const handleOrderCompleted = async () => {
    await fetcher.submit(null, {
      action: `${order._id}/complete`,
      method: "patch",
    });


  };

  return (
    <li className="border-foreground basis-[20rem] space-y-2 rounded-xl border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-medium uppercase">
          TABLE # <span className="text-primary">{order.table.number}</span>
        </h3>
        <Button size="sm" onClick={handleOrderCompleted} loading={loading}>
          <Check /> Complete
        </Button>
      </div>

      <div role="separator" className="bg-foreground h-px"></div>

      <ul className="space-y-2">
        {order.products.map((product) => (
          <li
            className="flex items-center justify-between gap-2"
            key={product.product._id}
          >
            <div className="size-10">
              <Image
                src={`${import.meta.env.VITE_API_BASE_URL}/${product.product.imageUrl}`}
                alt={product.product.name}
              />
            </div>
            <span>{product.product.name}</span>
            <strong className="text-sm font-medium">
              x {product.quantity}
            </strong>
          </li>
        ))}
      </ul>
    </li>
  );
}

OrderCard.Item = OrderCardItem;
