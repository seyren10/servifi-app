import { createContext, useContext } from "react";

export { default as Popover } from "./Popover";
export { default as PopoverTrigger } from "./PopoverTrigger";
export { default as PopoverContent } from "./PopoverContent";

export type PopoverState = {
  open: boolean;
  triggerRect?: DOMRect;
};

export type PopoverDispatch = {
  setOpen: (open: boolean) => void;
  setTriggerRect?: (rect: DOMRect) => void;
};

export const PopoverContext = createContext<PopoverState | undefined>(
  undefined,
);

export const PopoverDispatchContext = createContext<
  PopoverDispatch | undefined
>(undefined);

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);

  if (!context)
    throw new Error("usePopoverContext should be use within PopoverContext");

  return context;
};

export const usePopoverDispatchContext = () => {
  const context = useContext(PopoverDispatchContext);

  if (!context)
    throw new Error(
      "usePopoverDispatchContext should be use within PopoverDispatchContext",
    );

  return context;
};
