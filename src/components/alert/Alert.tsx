import { type ReactNode } from "react";
import SemanticIcon from "../app/SemanticIcon";
import type { SemanticType } from "../../types";

type Props = {
  type: SemanticType;
  className?: string;
  children?: ReactNode;
};

export default function Alert({ type, className, children }: Props) {
  return (
    <div
      className={`flex gap-2 rounded-xl border semantic-border-${type} p-3 ${className}`}
    >
      <SemanticIcon type={type} />
      <p className="text-sm font-medium">{children}</p>
    </div>
  );
}
