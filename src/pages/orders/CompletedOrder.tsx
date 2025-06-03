import { useLoaderData, useRevalidator } from "react-router";
import type { OrderSummary } from "../../features/orders/type";
import CompletedOrderList from "./components/CompletedOrderList";
import { PackageOpen } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBill } from "../../features/orders/slice";
import { useSocket } from "../../hooks/useSocket";
import { selectTable } from "../../features/tables/slice";

export default function CompletedOrder() {
  const { orderSummary } = useLoaderData<{
    orderSummary?: OrderSummary;
  }>();
  const { products, total } = orderSummary || {};
  const table = useSelector(selectTable);
  const { emit, on, off } = useSocket({
    url: import.meta.env.VITE_API_BASE_URL,
  });
  const revalidator = useRevalidator();

  const dispatch = useDispatch();

  useEffect(() => {
    if (total) dispatch(setBill(total));
    else dispatch(setBill(0));
  }, [dispatch, total]);

  useEffect(() => {
    if (!table) return;

    emit("join-room", table._id);

    on("order-completed", async () => {
      await revalidator.revalidate();
    });

    return () => {
      emit("leave-room", table._id);
      off("order-completed");
    };
  }, [emit, off, on, revalidator, table]);

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
