import { Link, Outlet, useLoaderData, useMatch } from "react-router";
import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import { DataTable } from "../../../components/app/DataTable";
import type { Product } from "../../../features/products/type";
import { productColumns } from "./columns";
import { Button } from "../../../components/button";
import { Plus } from "lucide-react";

export default function MenuManagement() {
  const products = useLoaderData<Product[]>();
  const match = useMatch("/admin/menu-management");

  if (!match) return <Outlet />;

  return (
    <div className="space-y-4">
      <AdminSectionHeading
        title="Menu Management"
        description="CRUD menu and category"
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
    </div>
  );
}
