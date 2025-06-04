import type { PropsWithChildren } from "react";
import { Button } from "../../../../components/button";
import { useFetcher } from "react-router";

type Props = PropsWithChildren & {
  tableId: string;
};
export default function DeleteConfirmButton({ children, tableId }: Props) {
  const fetcher = useFetcher();

  const handleDeleteTable = async () => {
    await fetcher.submit(null, {
      action: `${tableId}/delete`,
      method: "DELETE",
    });
  };
  
  return (
    <Button variant="secondary" onClick={handleDeleteTable}>
      {children}
    </Button>
  );
}
