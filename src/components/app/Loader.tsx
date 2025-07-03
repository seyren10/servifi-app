import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="absolute inset-0 grid place-content-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
