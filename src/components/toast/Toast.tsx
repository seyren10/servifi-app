import { useToastState } from ".";
import ToastItem from "./ToastItem";

type Props = {
  duration?: number;
  anchor?: "top" | "bottom";
};
export default function Toast({ anchor = "bottom", duration = 3000 }: Props) {
  const state = useToastState();
  const { toasts } = state;

  return (
    <div
      className="pointer-events-none absolute left-1/2 flex w-full -translate-x-1/2 flex-col gap-2 p-4"
      style={{ [anchor]: "4.5rem" }}
    >
      {toasts.map((toast) => (
        <ToastItem
          duration={toast.duration || duration}
          {...toast}
          key={toast.id}
        />
      ))}
    </div>
  );
}
