import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import PendingOrderCard from "./components/PendingOrderCard";

type Props = {};

export default function PendingOrder({}: Props) {
  const pendingOrders = useSelector(
    (state: RootState) => state.orders.pendingOrders,
  );

  return (
    <div>
      <ul className="space-y-2">
        {pendingOrders.map((pendingOrder) => {
          return (
            <PendingOrderCard
              pendingOrder={pendingOrder}
              key={pendingOrder.product._id}
            ></PendingOrderCard>
          );
        })}
      </ul>
    </div>
  );
}
