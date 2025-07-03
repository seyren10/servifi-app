import {
  Link,
  Outlet,
  useLoaderData,
  useMatch,
  useRevalidator,
} from "react-router";
import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import { DataTable } from "../../../components/app/DataTable";
import { columns } from "./columns";
import type { Table } from "../../../features/tables/type";
import { Plus } from "lucide-react";
import { useSocket } from "../../../hooks/useSocket";
import { useToastDispatch } from "../../../components/toast";
import { useEffect } from "react";

export default function AdminTable() {
  const tables = useLoaderData<Table[]>();
  const match = useMatch("/admin/tables");
  const revalidator = useRevalidator();
  const toast = useToastDispatch();
  const { on } = useSocket({
    url: import.meta.env.VITE_API_BASE_URL,
  });

  useEffect(() => {
    on("table-update", async (data: { message: string }) => {
      toast({
        type: "toast/add",
        payload: {
          title: "Updated receive.",
          description: data.message,
        },
      });
      await revalidator.revalidate();
    });
  }, [on, revalidator, toast]);

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
        <Plus /> New Table
      </Link>

      <DataTable columns={columns} data={tables} className="max-w-xl" />
    </div>
  );
}
