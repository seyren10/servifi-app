import type { z } from "zod";
import type { createServiceSchema } from "../../../../features/services/validators";
import ServiceForm from "./components/ServiceForm";
import { useFetcher } from "react-router";
import { toast } from "sonner";
import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";

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
    <div className="max-w-lg space-y-6">
      <AdminSectionHeading
        title="Create Service"
        description="Fill out all the required information to create a new service"
      />
      <ServiceForm
        defaultValues={{
          name: "",
          description: "",
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
}
