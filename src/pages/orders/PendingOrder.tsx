import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import PendingOrderCard from "./components/PendingOrderCard";
import { PackageOpen } from "lucide-react";

export default function PendingOrder() {
  const pendingOrders = useSelector(
    (state: RootState) => state.orders.pendingOrders,
  );

  if (!pendingOrders.length)
    return (
      <div className="grid h-[20rem] place-content-center space-y-4 text-center">
        <PackageOpen className="stroke-foreground mx-auto" />
        <p className="text-muted-foreground text-sm">
          You have no pending orders. Once you place an order, it will appear
          here.
        </p>
      </div>
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
