import { createContext } from "react";
import type { ToastItemProps } from "./ToastItem";

export { default as Toast } from "./Toast";

export type ToastState = {
  toasts: ToastItemProps[];
};

export type ToastAction = {
  type: "toast/add";
  payload: ToastItemProps;
};

export const toastReducer = (
  state: ToastState,
  action: ToastAction,
): ToastState => {
  switch (action.type) {
    case "toast/add":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };

    default:
      throw new Error("Unknown Toast Action");
  }
};

export const ToastStateContext = createContext<ToastState | undefined>(
  undefined,
);

export const ToastDispatchContext = createContext<
  React.Dispatch<ToastAction> | undefined
>(undefined);
