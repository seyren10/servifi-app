import { useSelector } from "react-redux";
import {
  selectHasOrders,
  selectTotalPrice,
} from "../../../features/orders/slice";
import { selectTable } from "../../../features/tables/slice";
import { Scroll } from "lucide-react";
import { Button } from "../../../components/button";

type Props = {};

export default function PendingOrderCheckout({}: Props) {
  const table = useSelector(selectTable);
  const hasOrders = useSelector(selectHasOrders);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className="flex items-center justify-between">
      <div className="inline-flex items-center gap-2">
        <Scroll className="stroke-primary" />
        <div>
          <h1 className="">Table # {table?.number}</h1>
          <p className="flex items-center gap-2">
            <strong> P{totalPrice.toLocaleString('ph')}</strong>
          </p>
        </div>
      </div>
      {hasOrders && <Button>Checkout</Button>}
    </div>
  );
}