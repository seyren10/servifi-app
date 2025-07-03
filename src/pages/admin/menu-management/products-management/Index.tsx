import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";
import { Button } from "../../../../components/button";
import { Link, Outlet, useLoaderData, useMatch } from "react-router";
import { Plus } from "lucide-react";
import { DataTable } from "../../../../components/app/DataTable";
import { productColumns } from "./components/columns";
import type { Product } from "../../../../features/products/type";

export default function Index() {
  const products = useLoaderData<Product[]>();
  const match = useMatch("/admin/menu-management/products");

  if (!match) return <Outlet />;

  return (
    <section className="space-y-6">
      <AdminSectionHeading
        title="Product management"
        description="All products related operations like adding, editing or deleting. You can also mark a product as unavailable."
      ></AdminSectionHeading>

      <section className="space-y-4 rounded-xl border p-4 shadow-sm">
        <Button asChild>
          <Link to="create">
            <Plus />
            New Product
          </Link>
        </Button>
        <DataTable
          data={products}
          columns={productColumns}
          filterPlaceholder="Search products..."
        />
      </section>
    </section>
  );
}
