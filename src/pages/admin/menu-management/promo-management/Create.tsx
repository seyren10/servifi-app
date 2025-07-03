import type { z } from "zod";
import PromoForm from "./components/PromoForm";
import type { createPromoValidator } from "../../../../features/promos/validators";
import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";
import { useFetcher } from "react-router";

export default function Create() {
  const fetcher = useFetcher();
  const handleSubmit = (data: z.infer<typeof createPromoValidator>) => {
    fetcher.submit(data, {
      action: "",
      method: "POST",
    });
  };
  return (
    <div className="space-y-6">
      <AdminSectionHeading
        title="Create new Promo"
        description="Fill out all the required information to create a new Promo"
      />
      <PromoForm onSubmit={handleSubmit} />
    </div>
  );
}
