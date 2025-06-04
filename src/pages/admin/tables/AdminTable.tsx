import {
  Link,
  Outlet,
  useActionData,
  useLoaderData,
  useMatch,
} from "react-router";
import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import { DataTable } from "../../../components/app/DataTable";
import { columns } from "./columns";
import type { Table } from "../../../features/tables/type";
import { Plus } from "lucide-react";

export default function AdminTable() {
  const tables = useLoaderData<Table[]>();
  const match = useMatch("/admin/tables");

  if (!match) return <Outlet />;

  return (
    <div className="container mx-auto space-y-4">
      <AdminSectionHeading
        title="Table Management"
        description="Add, edit, or delete tables. You can also manually end an active table session in this section."
      />

      <Link
        to="create"
        className="bg-primary hover:bg-primary/90 inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white [&_svg]:size-4"
      >
        <Plus /> Create new Table
      </Link>

      <DataTable columns={columns} data={tables} className="max-w-xl" />
    </div>
  );
}
