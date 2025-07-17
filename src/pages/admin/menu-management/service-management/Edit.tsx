import { useLoaderData, useFetcher } from "react-router";
import type { z } from "zod";
import type { Service } from "../../../../features/services/type";
import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";
import { Button } from "../../../../components/button";
import ServiceForm from "./components/ServiceForm";
import type { createServiceSchema } from "../../../../features/services/validators";
import { toast } from "sonner";

export default function Edit() {
  const service = useLoaderData<Service>();

  const fetcher = useFetcher();
  const handleSubmit = async (values: z.infer<typeof createServiceSchema>) => {
    await fetcher.submit(values, {
      action: "",
      method: "PUT",
    });

    toast.success(`Service updated successfully!`);
  };

  return (
    <div className="max-w-lg space-y-6">
      <AdminSectionHeading
        title="Edit Service"
        description="Fill out all the necessary changes and save when done."
      />

      <ServiceForm
        onSubmit={handleSubmit}
        defaultValues={service}
        submitRender={<Button type="submit">Save</Button>}
      />
    </div>
  );
}
