import { Link, useLoaderData } from "react-router";
import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";
import { Button } from "../../../../components/button";
import { Plus } from "lucide-react";
import { DataTable } from "../../../../components/app/DataTable";
import type { Service } from "../../../../features/services/type";
import { serviceDataTableColumns } from "./components/columns";

export default function Index() {
  const services = useLoaderData<Service[]>();
  return (
    <div className="space-y-6">
      <AdminSectionHeading
        title="Services"
        description="Manage and configure service offerings"
      />

      <main className="space-y-4 rounded-xl border p-4 shadow-sm">
        <Button asChild>
          <Link to="create">
            <Plus />
            New Service
          </Link>
        </Button>
        <DataTable
          data={services}
          columns={serviceDataTableColumns}
          filterPlaceholder="Search Services."
        />
      </main>
    </div>
  );
}
