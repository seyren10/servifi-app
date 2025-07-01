import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "../../../../../features/products/type";
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import { Image } from "../../../../../components/image";
import ActionDropdown from "./ActionDropdown";
import { Button } from "../../../../../components/button";
import { cloudinary } from "../../../../../services/cloudinary/cloudinary";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "imageUrl",
    enableGlobalFilter: false,
    header: "",
    cell: ({ getValue }) => {
      const imageUrl = cloudinary.image(getValue() as string).toURL();

      return <Image src={imageUrl} className="size-10" />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category.name",
    enableGlobalFilter: false,
    header: "Category",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <em className="line-clamp-2 max-w-sm truncate" title={value}>
          {value}
        </em>
      );
    },
  },
  {
    accessorKey: "availability",
    enableGlobalFilter: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Availability
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return (
        <span className="bg-foreground flex w-fit items-center gap-2 rounded-full px-2">
          {!value ? (
            <XCircle className="stroke-error size-4" />
          ) : (
            <CheckCircle className="size-4 stroke-lime-500" />
          )}
          {value ? "Available" : "Not Available"}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) =>
      `${(getValue() as number).toLocaleString("en-PH", { currency: "PHP", style: "currency" })}`,
  },
  {
    id: "action",
    cell: ({ row }) => {
      const product = row.original;

      return <ActionDropdown product={product} />;
    },
  },
];
