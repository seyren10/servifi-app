import type { z } from "zod";
import type { createPromoValidator } from "../../../../features/promos/validators";
import { useFetcher, useLoaderData } from "react-router";
import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";
import PromoForm from "./components/PromoForm";
import type { Promo } from "../../../../features/promos/type";
import type { Product } from "../../../../features/products/type";

export default function Edit() {
  const promo = useLoaderData() as Promo;
  const transPromo = {
    ...promo,
    restrictedProducts: promo.restrictedProducts?.map(
      (p) => (p as Product)._id,
    ) as string[],
  };

  const fetcher = useFetcher();
  const handleSubmit = (data: z.infer<typeof createPromoValidator>) => {
    fetcher.submit(data, {
      action: "",
      method: "PUT",
    });
  };
  
  return (
    <div className="space-y-6">
      <AdminSectionHeading
        title="Create new Promo"
        description="Fill out all the required information to create a new Promo"
      />
      <PromoForm onSubmit={handleSubmit} defaultValues={transPromo} />
    </div>
  );
}
