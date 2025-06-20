import { useState, type PropsWithChildren } from "react";
import type { Product } from "../../../../features/products/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/dropdown-menu";
import { MoreHorizontal, Pencil, ToggleLeft, Trash } from "lucide-react";
import { Button } from "../../../../components/button";
import { Link, useFetcher } from "react-router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/dialog";

type Props = PropsWithChildren & {
  product: Product;
};

export default function ActionDropdown({ product }: Props) {
  const fetcher = useFetcher();
  const [dialog, setDialog] = useState(false);

  const handleToggleSelect = () => {
    fetcher.submit(null, {
      action: `${product._id}/toggle-availability/${product.availability}`,
      method: "PUT",
    });
  };

  const handleDeleteConfirm = async () => {
    await fetcher.submit(null, {
      action: `${product._id}/delete`,
      method: "DELETE",
    });
    setDialog(false);
  };
  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={handleToggleSelect}>
              <ToggleLeft /> Toggle Availability
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`${product._id}/edit`}>
                <Pencil /> Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Trash className="stroke-error" /> Delete
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>This action cannot be undone.</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button>No, let's go back</Button>
          </DialogClose>
          <Button variant="secondary" onClick={handleDeleteConfirm}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
