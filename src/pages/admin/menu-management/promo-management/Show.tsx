import { useLoaderData } from "react-router";
import type { Promo } from "../../../../features/promos/type";
import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";
import type { Product } from "../../../../features/products/type";

export default function Show() {
  const promo = useLoaderData() as Promo;

  const hasPromoRestrictedProducts =
    promo.restrictedProducts && promo.restrictedProducts.length > 0;
  return (
    <section className="space-y-4">
      <AdminSectionHeading
        title={promo.title}
        description={promo.description}
      />

      <main className="space-y-2">
        <h2 className="font-medium">Restricted Products</h2>
        <ul className="flex flex-wrap gap-2">
          {hasPromoRestrictedProducts ? (
            promo.restrictedProducts!.map((p) => {
              const product = p as Product;

              return (
                <li key={product._id} className="rounded-xl border px-4 py-1">
                  <span>{product.name}</span>
                </li>
              );
            })
          ) : (
            <li>None</li>
          )}
        </ul>
      </main>
    </section>
  );
}
