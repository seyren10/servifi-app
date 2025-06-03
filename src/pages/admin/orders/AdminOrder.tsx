import { useLoaderData, useRevalidator } from "react-router";
import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import OrderCard from "./components/OrderCard";
import type { Order } from "../../../features/admin/orders/type";
import { useSocket } from "../../../hooks/useSocket";
import { useEffect } from "react";
import { PackageOpen } from "lucide-react";

export default function AdminOrder() {
  const loadedOrders = useLoaderData<Order[]>();
  const revalidator = useRevalidator();
  const { on, off } = useSocket({
    url: import.meta.env.VITE_API_BASE_URL,
  });

  useEffect(() => {
    on("order-created", async () => {
      await revalidator.revalidate();
    });

    return () => {
      off("order-created");
    };
  }, [off, on, revalidator]);
  return (
    <div className="space-y-4">
      <AdminSectionHeading
        title="Orders"
        description="List of pending order from different tables. Upcoming order will be displayed here in realtime."
      />

      {!loadedOrders.length ? (
        <div className="border-foreground grid min-h-[30rem] place-content-center gap-2 rounded-xl border border-dashed">
          <PackageOpen className="stroke-foreground mx-auto" />
          <p className="text-muted-foreground text-center text-sm">
            No orders found.
            <br />
            Orders will be displayed here as they are created.
          </p>
        </div>
      ) : (
        <div>
          <OrderCard
            orders={loadedOrders}
            renderItem={(order) => (
              <OrderCard.Item order={order} key={order._id} />
            )}
          ></OrderCard>
        </div>
      )}
    </div>
  );
}
