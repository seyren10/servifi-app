import { useEffect } from "react";
import SemanticIcon from "../SemanticIcon";

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
}: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Logic to remove the toast after duration
      console.log(`Toast with title "${title}" will be removed`);
    }, 3000); // Default duration of 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);
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
