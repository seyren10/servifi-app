import type { TableStatus } from "../../features/tables/type";
import { Banknote, CheckCircle, Clock, XCircle } from "lucide-react";

type Props = {
  type?: TableStatus;
};

export default function TableIcon({ type = "available" }: Props) {
  switch (type) {
    case "available":
      return <CheckCircle className="size-4 stroke-lime-500" />;
    case "occupied":
      return <XCircle className="stroke-error size-4" />;
    case "reserved":
      return <Clock className="stroke-warning size-4" />;
    case "billout":
      return <Banknote className="stroke-primary size-4" />;
    default:
      throw new Error(`Unknown table status: ${type}`);
  }
}
