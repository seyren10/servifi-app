import { MoreHorizontal, Power, Trash } from "lucide-react";
import EditDropdownItem from "./EditDropdownItem";
import GenerateSessionDropdownItem from "./GenerateSessionDropdownItem";
import type { Table } from "../../../../features/tables/type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/dropdown-menu";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../../../../components/button";
import DeleteConfirmButton from "./DeleteConfirmButton";

type Props = {
  table: Table;
};

export default function TableActions({ table }: Props) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="px-2">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48 bg-white">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuGroup>
            {table.status === "available" && (
              <GenerateSessionDropdownItem tableId={table._id} />
            )}
            <EditDropdownItem tableId={table._id} />
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
            {table.status !== "available" && (
              <DropdownMenuItem>
                <Power /> End Session
              </DropdownMenuItem>
            )}
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Trash className="stroke-error" /> Delete Table
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Deleting this table will delete all of
            related records with it?.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DeleteConfirmButton tableId={table._id}>Yes</DeleteConfirmButton>
          <DialogClose asChild>
            <Button type="button">No, take me back</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
