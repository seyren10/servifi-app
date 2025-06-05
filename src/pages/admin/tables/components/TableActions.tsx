import {
  LoaderCircle,
  MoreHorizontal,
  Power,
  Printer,
  Trash,
} from "lucide-react";
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
import {
  useEffect,
  useState,
  type ComponentType,
  type PropsWithChildren,
} from "react";
import { Label } from "../../../../components/label";
import { Switch } from "../../../../components/switch";
import { useFetcher, useSubmit } from "react-router";
import { getOrderSummary } from "../../../../features/orders/api";
import type { OrderSummary } from "../../../../features/orders/type";
import CompletedOrderList from "../../../orders/components/CompletedOrderList";

type Props = {
  table: Table;
};

export default function TableActions({ table }: Props) {
  const [open, setOpen] = useState(false);
  const [Content, setContent] =
    useState<ComponentType<DialogContentProps> | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            {table.status !== "available" && (
              <>
                <ReprintSessionDropdownItem table={table} />

                <DropdownMenuItem
                  onSelect={() => [
                    setContent(() => EndSessionDialogContent),
                    setOpen(true),
                  ]}
                >
                  <Power /> End Session
                </DropdownMenuItem>
              </>
            )}

            <EditDropdownItem tableId={table._id} />
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>

            <DropdownMenuItem
              onSelect={() => {
                setContent(() => DeleteTableDialogContent);
                setOpen(true);
              }}
            >
              <Trash className="stroke-error" /> Delete Table
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {!!Content && (
        <Content {...{ table: table, onDelete: () => setOpen(false) }} />
      )}
    </Dialog>
  );
}

type DialogContentProps = {
  table: Table;
  onDelete?: () => void;
};

function DeleteTableDialogContent({ table, onDelete }: DialogContentProps) {
  return (
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Delete Table # {table.number}</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Deleting this table will delete all of
          related records with it?.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DeleteConfirmButton tableId={table._id} onDelete={onDelete}>
          Yes
        </DeleteConfirmButton>
        <DialogClose asChild>
          <Button type="button">No, take me back</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

function EndSessionDialogContent({ table, onDelete }: DialogContentProps) {
  const [includeRecord, setIncludeRecord] = useState(true);

  const [summary, setSummary] = useState<OrderSummary>();
  const [loading, setLoading] = useState(false);
  const { _id: tableId } = table;

  useEffect(() => {
    const getSummary = async () => {
      setLoading(true);
      const res = await getOrderSummary(tableId);

      setSummary(res);
      setLoading(false);
    };

    getSummary();
  }, [tableId]);

  return (
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Table # {table.number} Bill</DialogTitle>
        <DialogDescription>
          Please review this transaction before proceeding.
        </DialogDescription>
        <div>
          {loading ? (
            <div className="bg-muted min-h-[10rem] animate-pulse rounded-xl"></div>
          ) : (
            !!summary && <CompletedOrderList orderSummary={summary} />
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Total</span>
            <span className="font-medium">P{summary?.total.toFixed(2)}</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Switch
              id="includerecords"
              checked={includeRecord}
              onCheckedChange={setIncludeRecord}
            />
            <Label htmlFor="includerecords">Record the above transaction</Label>
          </div>
        </div>
      </DialogHeader>
      <DialogFooter>
        <EndSessionConfirmButton
          table={table}
          onDelete={onDelete}
          includeRecord={includeRecord}
        >
          Billout
        </EndSessionConfirmButton>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

function EndSessionConfirmButton({
  table,
  onDelete,
  includeRecord,
  children,
}: DialogContentProps &
  PropsWithChildren & {
    includeRecord: boolean;
  }) {
  const fetcher = useFetcher();
  const loading = fetcher.state !== "idle";

  const handleEndSession = async () => {
    await fetcher.submit(
      { includeRecord },
      {
        action: `${table._id}/bill-out`,
        method: "DELETE",
      },
    );

    onDelete?.();
  };

  return (
    <Button onClick={handleEndSession}>
      {loading && <LoaderCircle className="animate-spin" />}
      {children}
    </Button>
  );
}

function ReprintSessionDropdownItem({ table }: { table: Table }) {
  const submit = useSubmit();

  const handleSelect = () => {
    const params: { activeSession?: string } = {};
    if (table.activeSession) params.activeSession = table.activeSession;

    submit(params, {
      action: "reprint-session",
      method: "GET",
    });
  };
  return (
    <DropdownMenuItem onSelect={handleSelect}>
      <Printer /> Reprint Session
    </DropdownMenuItem>
  );
}
