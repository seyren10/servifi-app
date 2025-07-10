import type { ColumnDef } from "@tanstack/react-table";
import type { Service } from "../../../../../features/services/type";
import { Actions } from "./Actions";

export const serviceDataTableColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Service Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    id: "actions",
    cell: ({ row }) => <Actions service={row.original} />,
  },
];
