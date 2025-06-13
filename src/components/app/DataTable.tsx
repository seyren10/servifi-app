import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table";
import { Button } from "../button";
import { useEffect, useState, type InputHTMLAttributes } from "react";
import { Input } from "../input";
import { Search } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useDebounce } from "@uidotdev/usehooks";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  filterPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  filterPlaceholder,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "auto",
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <div className={twMerge("space-y-4", className)}>
      <div className="relative isolate flex items-center">
        <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2" />
        <DebouncedInput
          placeholder={filterPlaceholder}
          value={globalFilter ?? ""}
          onChangeDebounced={(val) => {
            setGlobalFilter(val);
          }}
          className="max-w-sm pl-7"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const DebouncedInput = ({
  placeholder,
  className,
  value: initialValue = "",
  onChange,
  onChangeDebounced,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  onChangeDebounced?: (value: string) => void;
}) => {
  const [localValue, setLocalValue] = useState(initialValue);
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    if (onChangeDebounced) onChangeDebounced(debouncedValue as string);
  }, [debouncedValue, onChangeDebounced]);

  useEffect(() => {
    setLocalValue(initialValue as string);
  }, [initialValue]);

  return (
    <Input
      placeholder={placeholder}
      className={className}
      value={localValue}
      onChange={(e) => {
        setLocalValue(e.target.value);
        onChange?.(e);
      }}
      {...rest}
    />
  );
};
