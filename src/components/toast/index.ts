import { createContext, useContext } from "react";
import type { ToastItemProps } from "./ToastItem";

export { default as Toast } from "./Toast";

export type ToastState = {
  toasts: ToastItemProps[];
};

export type ToastAction =
  | {
      type: "toast/add";
      payload: Omit<ToastItemProps, "id">;
    }
  | {
      type: "toast/remove";
      payload: string;
    };

export const toastReducer = (
  state: ToastState,
  action: ToastAction,
): ToastState => {
  switch (action.type) {
    case "toast/add":
      return {
        ...state,
        toasts: [
          ...state.toasts,
          { ...action.payload, id: Math.random().toString() },
        ],
      };
    case "toast/remove": {
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };
    }

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

export const useToastState = () => {
  const context = useContext(ToastStateContext);
  if (context === undefined) {
    throw new Error(
      "useToastState must be used within a ToastStateContextProvider",
    );
  }
  return context;
};

export const useToastDispatch = () => {
  const context = useContext(ToastDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useToastDispatch must be used within a ToastDispatchContextProvider",
    );
  }
  return context;
};
