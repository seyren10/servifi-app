import { Button } from "../../../components/button";
import { useSelector } from "react-redux";
import { selectTotalBill } from "../../../features/orders/slice";
import { Scroll } from "lucide-react";
import { useState } from "react";
import CompletedOrderBilloutConfirm from "./CompletedOrderBilloutConfirm";

export default function CompletedOrderCheckout() {
  const totalBill = useSelector(selectTotalBill);
  const [showBilloutConfirm, setShowBilloutConfirm] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-muted-foreground text-xs">Total Bill:</h1>
        <p className="flex items-center gap-2">
          <strong> P{totalBill.toLocaleString("ph")}</strong>
        </p>
      </div>
      <Button onClick={() => setShowBilloutConfirm(true)}>
        <Scroll />
        Bill Out
      </Button>

      {showBilloutConfirm && (
        <CompletedOrderBilloutConfirm
          onClose={() => setShowBilloutConfirm(false)}
        />
      )}
    </div>
  );
}
