import React, { type PropsWithChildren } from "react";
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

type Props = PropsWithChildren & {
  product: Product;
};

export default function ActionDropdown({ product }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ToggleLeft /> Toggle Availability
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil /> Edit
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Trash className="stroke-error" /> Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
