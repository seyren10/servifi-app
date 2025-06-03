import { useLoaderData } from "react-router";
import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import { DataTable } from "../../../components/app/DataTable";
import { columns } from "./columns";
import type { Table } from "../../../features/tables/type";

export default function AdminTable() {
  const tables = useLoaderData<Table[]>();

  return (
    <div className="container mx-auto space-y-4">
      <AdminSectionHeading
        title="Table Management"
        description="Add, edit, or delete tables. You can also manually end an active table session in this section."
      />

      <DataTable columns={columns} data={tables} className="max-w-xl" />
    </div>
  );
}
