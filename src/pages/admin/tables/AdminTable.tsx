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
import { createContext, useEffect } from "react";
import { toast } from "sonner";
import type { Promo } from "../../../features/promos/type";

type AdminTableContextValue = {
  promos: Promo[];
};
export const AdminTableContext = createContext<AdminTableContextValue>(
  {} as AdminTableContextValue,
);

export default function AdminTable() {
  const [tables, promos] = useLoaderData<[Table[], Promo[]]>();

  const match = useMatch("/admin/tables");
  const revalidator = useRevalidator();

  const { on } = useSocket({
    url: import.meta.env.VITE_API_BASE_URL,
  });

  useEffect(() => {
    on("table-update", async (data: { message: string }) => {
      toast("Updated receive.", {
        description: data.message,
      });
      await revalidator.revalidate();
    });
  }, [on, revalidator]);

  if (!match) return <Outlet />;

  return (
    <AdminTableContext.Provider value={{ promos }}>
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
    </AdminTableContext.Provider>
  );
}
