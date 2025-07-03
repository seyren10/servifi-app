import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../components/dropdown-menu";
import { Button } from "../../../../../components/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import type { Promo } from "../../../../../features/promos/type";
import { Form, Link } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/dialog";

type Props = {
  promo: Promo;
};
export default function Actions({ promo }: Props) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to={`${promo._id}/edit`}>
                <Pencil />
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Trash className="stroke-error" />
                Delete
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete this
            promo?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>No, take me back</Button>
          <Form
            navigate={false}
            action={`${promo._id}/delete`}
            method="DELETE"
          >
            <Button variant="secondary">Yes, delete</Button>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
