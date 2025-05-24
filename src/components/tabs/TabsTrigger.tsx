import type React from "react";

import { useTabsContext } from ".";

type Props = {
  value: string;
  children: React.ReactNode;
};

export default function TabsTrigger({ value, children }: Props) {
  const { value: active, setValue } = useTabsContext();
  const isActive = value === active;

  return (
    <button
      className={`relative grow px-4 py-2 text-sm font-medium ${isActive ? "tabs-active" : undefined}`}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
}
