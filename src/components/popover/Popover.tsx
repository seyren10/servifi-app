import { useState, type ReactNode } from "react";
import { PopoverContext, PopoverDispatchContext } from ".";

type Props = {
  children?: ReactNode;
};

export default function Popover({ children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <PopoverContext.Provider value={{ open }}>
      <PopoverDispatchContext.Provider value={{ setOpen }}>
        <div>{children}</div>;
      </PopoverDispatchContext.Provider>
    </PopoverContext.Provider>
  );
}
