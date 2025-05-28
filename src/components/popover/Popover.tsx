import { useState, type ReactNode } from "react";
import { PopoverContext, PopoverDispatchContext } from ".";

type Props = {
  children?: ReactNode;
};

export default function Popover({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect>();

  return (
    <PopoverContext.Provider value={{ open, triggerRect: rect }}>
      <PopoverDispatchContext.Provider
        value={{ setOpen, setTriggerRect: setRect }}
      >
        <div>{children}</div>
      </PopoverDispatchContext.Provider>
    </PopoverContext.Provider>
  );
}
