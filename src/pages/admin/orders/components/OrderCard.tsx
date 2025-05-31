import React, { type ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function OrderCard({ children }: Props) {
  return <ul className="flex flex-wrap gap-4">{children}</ul>;
}

function OrderCardItem({ children }: { children?: ReactNode }) {
  return (
    <li className="border-foreground rounded-xl border p-4 shadow-sm">
      {children}
    </li>
  );
}

OrderCard.OrderCardItem = OrderCardItem;
