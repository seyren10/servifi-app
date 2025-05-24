import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function TabsList({ children, className }: Props) {
  return (
    <div
      className={`after:bg-foreground relative isolate flex after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 ${className}`}
    >
      {children}
    </div>
  );
}
