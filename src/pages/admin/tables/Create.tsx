import { useEffect } from "react";
import { useFetcher } from "react-router";
import type { ActionResponse } from "../../../types";
import { useToastDispatch } from "../../../components/toast";
import TableForm from "./components/TableForm";

export default function Create() {
  const fetcher = useFetcher();
  const error = fetcher.data as ActionResponse;
  const toast = useToastDispatch();

  const loading = fetcher.state !== "idle";

  useEffect(() => {
    if (!error) return;

    toast({
      type: "toast/add",
      payload: {
        title: "An Error occured",
        description: error.message,
        type: "error",
      },
    });
  }, [error, toast]);

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
