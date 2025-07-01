import { Link, Outlet, useLoaderData, useMatch } from "react-router";
import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";
import { DataTable } from "../../../../components/app/DataTable";
import type { Category } from "../../../../features/category/type";
import { categoryDataTableColumns } from "./components/columns";
import { Button } from "../../../../components/button";
import { Plus } from "lucide-react";

export default function Index() {
  const categories = useLoaderData<Category[]>();
  const match = useMatch("/admin/menu-management/categories");

  if (!match) return <Outlet />;

  return (
    <main className="space-y-6">
      <AdminSectionHeading
        title="category management"
        description="Add edit or delete categories."
      />
      <section className="space-y-4 rounded-xl border p-4 shadow-sm">
        <Button asChild>
          <Link to="create">
            <Plus />
            New Category
          </Link>
        </Button>
        <DataTable
          data={categories}
          columns={categoryDataTableColumns}
          filterPlaceholder="Search Category..."
        />
      </section>
    </main>
  );
}
