import { useLoaderData } from "react-router";
import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import OrderCard from "./components/OrderCard";
import type { Order } from "../../../features/admin/orders/type";

export default function AdminOrder() {
  const loadedOrders = useLoaderData<Order[]>();

  return (
    <div className="space-y-4">
      <AdminSectionHeading
        title="Orders"
        description="List of pending order from different tables. Upcoming order will be displayed here in realtime."
      />

      <div>
        <OrderCard
          orders={loadedOrders}
          renderItem={(order) => (
            <OrderCard.Item order={order} key={order._id} />
          )}
        ></OrderCard>
      </div>
    </div>
  );
}
