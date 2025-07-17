import { Link, useFetcher } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../components/dropdown-menu";
import { Button } from "../../../../../components/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/dialog";
import type { Service } from "../../../../../features/services/type";
import { useState } from "react";
import { toast } from "sonner";

export function Actions({ service }: { service: Service }) {
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const [dialog, setDialog] = useState(false);

  async function handleDelete() {
    await fetcher.submit(null, {
      action: `${service._id}/delete`,
      method: "DELETE",
    });

    toast.success("Service deleted successfully");
    setDialog(false);
  }

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link to={`${service._id}/edit`}>
              <Pencil /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Trash className="stroke-destructive" /> Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Service</DialogTitle>
          <DialogClose aria-label="Close" />
        </DialogHeader>
        <DialogDescription className="space-y-2">
          This action cannot be undone. Are you sure?
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
