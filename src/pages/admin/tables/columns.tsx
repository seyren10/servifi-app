import type { ColumnDef } from "@tanstack/react-table";
import type { Table, TableStatus } from "../../../features/tables/type";
import TableIcon from "../../../components/app/TableIcon";

import TableActions from "./components/TableActions";

export const columns: ColumnDef<Table>[] = [
  {
    accessorKey: "number",
    header: "Table Number",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const tableStatus = getValue() as TableStatus;
      return (
        <div className="flex w-fit items-center gap-2 rounded-full px-2">
          <TableIcon type={tableStatus} />
          <span>{tableStatus}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const table = row.original;
      return <TableActions table={table} />;
    },
  },
];
