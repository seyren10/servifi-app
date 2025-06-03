import type { Order } from "../../../features/admin/orders/type";
import { useLoaderData, useRevalidator } from "react-router";
import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import OrderCard from "./components/OrderCard";
import { useSocket } from "../../../hooks/useSocket";
import { useEffect } from "react";
import { PackageOpen } from "lucide-react";
import { useToastDispatch } from "../../../components/toast";

export default function AdminOrder() {
  const loadedOrders = useLoaderData<Order[]>();
  const revalidator = useRevalidator();
  const { on, off } = useSocket({
    url: import.meta.env.VITE_API_BASE_URL,
  });
  const toast = useToastDispatch();

  useEffect(() => {
    on("order-created", async () => {
      await revalidator.revalidate();

      toast({
        type: "toast/add",
        payload: {
          title: "A new order has arrived.",
          type: "info",
        },
      });
    });

    return () => {
      off("order-created");
    };
  }, [off, on, revalidator, toast]);

  return (
    <div className="space-y-4">
      <AdminSectionHeading
        title="Orders"
        description="List of pending order from different tables. Upcoming order will be displayed here in realtime."
      />

      {!loadedOrders.length ? (
        <div className="border-foreground grid min-h-[30rem] place-content-center rounded-xl border border-dashed text-center">
          <PackageOpen className="stroke-foreground mx-auto" />
          <h3 className="mt-4 font-medium">No orders found</h3>
          <p className="text-muted-foreground text-sm">
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
