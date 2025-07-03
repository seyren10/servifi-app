import type { ColumnDef } from "@tanstack/react-table";
import type { Promo } from "../../../../../features/promos/type";
import { Link } from "react-router";
import { Button } from "../../../../../components/button";
import Actions from "./Actions";

export const promoDataTableColumns: ColumnDef<Promo>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => (
      <em title={getValue() as string}>{getValue() as string}</em>
    ),
  },
  {
    accessorKey: "restrictedProducts",
    header: "Restricted Products",
    cell: ({ row }) => {
      const promoId = row.original._id;

      return (
        <Button asChild variant="link" size="sm">
          <Link to={`${promoId}`}>View</Link>
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const promo = row.original;

      return <Actions promo={promo} />;
    },
  },
];
