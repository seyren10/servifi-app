import { Link, Outlet, useLoaderData, useMatch } from "react-router";
import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";
import { Button } from "../../../../components/button";
import { Plus } from "lucide-react";
import { DataTable } from "../../../../components/app/DataTable";
import type { Promo } from "../../../../features/promos/type";
import { promoDataTableColumns } from "./components/columns";

export default function Index() {
  const promos = useLoaderData<Promo[]>();
  const isChild = !useMatch("admin/menu-management/promos");

  if (isChild) return <Outlet />;

  return (
    <section className="space-y-6">
      <AdminSectionHeading
        title="Promo Management"
        description="Manage promotional content and offers for your application."
      ></AdminSectionHeading>

      <main className="space-y-4 rounded-xl border p-4 shadow-sm">
        <Button asChild>
          <Link to="create">
            <Plus />
            New Promo
          </Link>
        </Button>
        <DataTable
          data={promos}
          columns={promoDataTableColumns}
          filterPlaceholder="Search promos..."
        />
      </main>
    </section>
  );
}
