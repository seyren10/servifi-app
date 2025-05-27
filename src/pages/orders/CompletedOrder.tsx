import { useLoaderData } from "react-router";
import type { OrderSummary } from "../../features/orders/type";
import CompletedOrderList from "./components/CompletedOrderList";
import { PackageOpen } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBill } from "../../features/orders/slice";

export default function CompletedOrder() {
  const { orderSummary } = useLoaderData<{
    orderSummary?: OrderSummary;
  }>();
  const { products, total } = orderSummary || {};

  const dispatch = useDispatch();

  useEffect(() => {
    if (total) dispatch(setBill(total));
  }, [dispatch, total]);

  if (!orderSummary || !products?.length) {
    return (
      <div className="grid h-[20rem] place-content-center space-y-4 text-center">
        <PackageOpen className="stroke-foreground mx-auto" />
        <p className="text-muted-foreground text-sm">
          You have no completed orders yet.
        </p>
      </div>
    );
  } else
    return (
      <div>
        <CompletedOrderList orderSummary={orderSummary} />
      </div>
    );
}
