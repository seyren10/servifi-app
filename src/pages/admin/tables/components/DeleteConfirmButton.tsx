import type { PropsWithChildren } from "react";
import { Button } from "../../../../components/button";
import { useFetcher } from "react-router";
import { LoaderCircle } from "lucide-react";

type Props = PropsWithChildren & {
  tableId: string;
  onDelete?: () => void;
};
export default function DeleteConfirmButton({
  children,
  tableId,
  onDelete,
}: Props) {
  const fetcher = useFetcher();

  const loading = fetcher.state !== "idle";

  const handleDeleteTable = async () => {
    await fetcher.submit(null, {
      action: `${tableId}/delete`,
      method: "DELETE",
    });

    onDelete?.();
  };

  return (
    <Button variant="secondary" onClick={handleDeleteTable}>
      {loading && <LoaderCircle className="animate-spin" />}
      {children}
    </Button>
  );
}
