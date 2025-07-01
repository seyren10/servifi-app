import type { ColumnDef } from "@tanstack/react-table";
import type {
  Category,
  CategoryIconType,
} from "../../../../../features/category/type";
import CategoryIcon from "../../../../../components/app/CategoryIcon";
import ActionDropdown from "./ActionDropdown";
export const categoryDataTableColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ getValue }) => {
      const name = getValue() as CategoryIconType;

      return (
        <span className="inline-flex items-center gap-2">
          <CategoryIcon name={name} className="stroke-primary size-4" />
          <span>{name}</span>
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return <ActionDropdown category={category}/>;
    },
  },
];
