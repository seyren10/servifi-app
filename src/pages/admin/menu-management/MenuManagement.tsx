import { useLoaderData } from "react-router";
import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import { DataTable } from "../../../components/app/DataTable";
import type { Product } from "../../../features/products/type";
import { productColumns } from "./columns";
import { Button } from "../../../components/button";

export default function MenuManagement() {
  const products = useLoaderData<Product[]>();

  return (
    <div className="space-y-4">
      <AdminSectionHeading
        title="Menu Management"
        description="CRUD menu and category"
      ></AdminSectionHeading>

      <section className="rounded-xl border p-4 shadow-sm space-y-4">
        <Button>Add Product</Button>
        <DataTable
          data={products}
          columns={productColumns}
          filterPlaceholder="Search products..."
        />
      </section>
    </div>
  );
}
