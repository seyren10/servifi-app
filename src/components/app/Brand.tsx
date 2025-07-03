import { ChefHat } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function Brand({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        "inline-flex items-center gap-2 text-lg font-medium",
        className,
      )}
    >
      <div className="bg-primary rounded-lg p-1 text-white">
        <ChefHat />
      </div>
      <span className="hidden md:inline">Servifi</span>
    </div>
  );
}
