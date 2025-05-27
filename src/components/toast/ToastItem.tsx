import { useEffect } from "react";
import SemanticIcon from "../SemanticIcon";
import { useToastDispatch } from ".";

export type ToastItemProps = {
  id: string;
  title: string;
  type?: "success" | "error" | "info" | "warning";
  description?: string;
  duration?: number;
};

export default function ToastItem({
  title,
  description,
  type = "info",
  id,
  duration,
}: ToastItemProps) {
  const dispatch = useToastDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Logic to remove the toast after duration
      dispatch({ type: "toast/remove", payload: id });
    }, duration);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [dispatch, id, duration]);

  return (
    <div className="border-foreground mx-auto flex w-fit gap-2 rounded-xl border bg-white p-4 text-sm shadow-sm">
      <SemanticIcon type={type} />
      <div>
        <h4 className="font-medium">{title}</h4>
        {!!description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </div>
    </div>
  );
}
