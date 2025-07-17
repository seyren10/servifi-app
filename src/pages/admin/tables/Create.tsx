import { useEffect } from "react";
import { useFetcher } from "react-router";
import type { ActionResponse } from "../../../types";
import TableForm from "./components/TableForm";
import { toast } from "sonner";

export default function Create() {
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
      onSubmit={(values) => {
        fetcher.submit(
          {
            ...values,
          },
          {
            action: "",
            method: "POST",
          },
        );
      }}
    />
  );
}
