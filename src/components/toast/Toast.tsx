import { useEffect, useReducer } from "react";
import { toastReducer } from ".";
import ToastItem from "./ToastItem";

type Props = {
  duration?: number;
  anchor?: "top" | "bottom";
};
export default function Toast({ anchor = "bottom", duration = 3000 }: Props) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });
  const { toasts } = state;

  useEffect(() => {
    dispatch({
      type: "toast/add",
      payload: {
        id: "1",
        title: "Welcome to the app!",
        description: "Enhoy your day mother ffffffffffffffffff",
      },
    });
  }, []);

  return (
    <div
      className="absolute left-1/2 flex w-full -translate-x-1/2 flex-col gap-2 p-4"
      style={{ [anchor]: "4.5rem" }}
    >
      {toasts.map((toast) => (
        <ToastItem duration={duration} {...toast} />
      ))}
    </div>
  );
}
