import { ChefHat } from "lucide-react";

export default function Brand() {
  return (
    <div className="inline-flex items-center gap-2 text-lg font-medium">
      <div className="bg-primary rounded-lg p-1 text-white">
        <ChefHat />
      </div>
      <span className="hidden md:inline">Servifi</span>
    </div>
  );
}
