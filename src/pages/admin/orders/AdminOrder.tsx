import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import OrderCard from "./components/OrderCard";

export default function AdminOrder() {
  return (
    <div className="space-y-4">
      <AdminSectionHeading
        title="Orders"
        description="List of pending order from different tables. Upcoming order will be displayed here in realtime."
      />

      <div>
        <OrderCard>
          <OrderCard.OrderCardItem>
            Mofo hesoyam bagubix chitty chitty bang bang
          </OrderCard.OrderCardItem>
          <OrderCard.OrderCardItem>
            Mofo hesoyam bagubix chitty chitty bang bang
          </OrderCard.OrderCardItem>
          <OrderCard.OrderCardItem>
            Mofo hesoyam bagubix chitty chitty bang bang
          </OrderCard.OrderCardItem>
          <OrderCard.OrderCardItem>
            Mofo hesoyam bagubix chitty chitty bang bang
          </OrderCard.OrderCardItem>
          <OrderCard.OrderCardItem>
            Mofo hesoyam bagubix chitty chitty bang bang
          </OrderCard.OrderCardItem>
          <OrderCard.OrderCardItem>
            Mofo hesoyam bagubix chitty chitty bang bang
          </OrderCard.OrderCardItem>
          <OrderCard.OrderCardItem>
            Mofo hesoyam bagubix chitty chitty bang bang
          </OrderCard.OrderCardItem>
          <OrderCard.OrderCardItem>
            Mofo hesoyam bagubix chitty chitty bang bang
          </OrderCard.OrderCardItem>
          <OrderCard.OrderCardItem>
            Mofo hesoyam bagubix chitty chitty bang bang
          </OrderCard.OrderCardItem>
          <OrderCard.OrderCardItem>
            Mofo hesoyam bagubix chitty chitty bang bang
          </OrderCard.OrderCardItem>
          <OrderCard.OrderCardItem>
            Mofo hesoyam bagubix chitty chitty bang bang
          </OrderCard.OrderCardItem>
        </OrderCard>
      </div>
    </div>
  );
}
