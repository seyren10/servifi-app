import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import type { SemanticType } from "../../types";

type Props = {
  type: SemanticType;
  className?: string;
};

export default function SemanticIcon({ type, className }: Props) {
  switch (type) {
    case "success":
      return <CheckCircle className={`stroke-primary size-4 ${className}`} />;
    case "error":
      return <XCircle className={`size-4 stroke-rose-500 ${className}`} />;
    case "info":
      return <Info className={`stroke-primary size-4 ${className}`} />;
    case "warning":
      return (
        <AlertTriangle className={`size-4 stroke-amber-500 ${className}`} />
      );
    default:
      return null;
  }
}
