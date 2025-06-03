import type { ColumnDef } from "@tanstack/react-table";
import type { Table, TableStatus } from "../../../features/tables/type";
import TableIcon from "../../../components/app/TableIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/dropdown-menu";
import { Button } from "../../../components/button";
import { MoreHorizontal, Pencil, Power, ScanQrCode, Trash } from "lucide-react";

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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="none" className="px-2">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ScanQrCode /> Generate Session
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil /> Update
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
              <DropdownMenuItem>
                <Power /> End Session
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash /> Delete Table
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
