import React, { type ReactNode } from "react";
import { useElementSize } from "../../hooks/useElementSize";

type Props = {
  children?: ReactNode;
};

export default function PopoverTrigger({ children }: Props) {
  const [ref, rect] = useElementSize<HTMLButtonElement>();

  return <button ref={ref}>{children}</button>;
}
