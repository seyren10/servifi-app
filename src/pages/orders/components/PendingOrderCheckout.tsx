import { useDispatch, useSelector } from "react-redux";
import {
  clearPendingOrders,
  selectHasOrders,
  selectTotalPrice,
} from "../../../features/orders/slice";
import { Button } from "../../../components/button";
import type { CreateOrderPayload } from "../../../features/orders/type";
import { selectTable } from "../../../features/tables/slice";
import type { RootState } from "../../../store";
import { useState } from "react";
import { createOrder } from "../../../features/orders/api";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export default function PendingOrderCheckout() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const hasOrders = useSelector(selectHasOrders);
  const pendingOrders = useSelector(
    (state: RootState) => state.orders.pendingOrders,
  );
  const table = useSelector(selectTable);
  const totalPrice = useSelector(selectTotalPrice);

  async function handleOrderCheckout() {
    if (!table) return;

    const payload: CreateOrderPayload = {
      table: table._id,
      products: pendingOrders.map((po) => {
        return {
          product: po.product._id,
          quantity: po.quantity,
        };
      }),
    };

    setLoading(true);
    await createOrder(payload);
    setLoading(false);

    dispatch(clearPendingOrders());
    toast.info("Order Sent", {
      description: "Your order has been sent to the kitchen.",
      duration: 5000,
    });
  }
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-muted-foreground text-xs">Total Price:</h1>
        <p className="flex items-center gap-2">
          <strong> P{totalPrice.toLocaleString("ph")}</strong>
        </p>
      </div>
      {hasOrders && (
        <Button onClick={handleOrderCheckout} loading={loading}>
          Checkout
        </Button>
      )}
    </div>
  );
}
