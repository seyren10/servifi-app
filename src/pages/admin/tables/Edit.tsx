import { useEffect } from "react";
import { useFetcher, useLoaderData } from "react-router";
import type { ActionResponse } from "../../../types";
import TableForm from "./components/TableForm";
import type { Table } from "../../../features/tables/type";
import { toast } from "sonner";

export default function Edit() {
  const table = useLoaderData<Table>();
  const fetcher = useFetcher();
  const error = fetcher.data as ActionResponse;

  const loading = fetcher.state !== "idle";

  useEffect(() => {
    if (!error) return;

    toast.error("An Error occured", { description: error.message });
  }, [error]);

  return (
    <TableForm
      loading={loading}
      defaultValues={{
        number: table?.number,
        capacity: table?.capacity,
      }}
      onSubmit={(values) => {
        fetcher.submit(
          {
            ...values,
          },
          {
            action: "",
            method: "PUT",
          },
        );
      }}
    />
  );
}
