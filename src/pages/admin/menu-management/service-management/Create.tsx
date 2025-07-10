import type { z } from "zod";
import type { createServiceSchema } from "../../../../features/services/validators";
import ServiceForm from "./components/ServiceForm";
import { useFetcher } from "react-router";
import { toast } from "sonner";

export default function Create() {
  const fetcher = useFetcher();
  const onSubmit = async (data: z.infer<typeof createServiceSchema>) => {
    await fetcher.submit(data, {
      action: "",
      method: "POST",
    });

    toast.success("Service created successfully");
  };

  return (
    <ServiceForm
      defaultValues={{
        name: "",
        description: "",
      }}
      onSubmit={onSubmit}
    />
  );
}
