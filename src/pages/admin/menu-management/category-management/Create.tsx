import { useFetcher } from "react-router";
import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";
import CategoryForm, { createCategorySchema } from "./components/CategoryForm";
import type { z } from "zod";

export default function Create() {
  const fetcher = useFetcher();
  const handleSubmit = (values: z.infer<typeof createCategorySchema>) => {
    fetcher.submit(values, {
      action: "",
      method: "POST",
    });
  };

  return (
    <div className="space-y-6">
      <AdminSectionHeading
        title="Create new Category"
        description="Fill out all the required information to create a new category."
      />

      <CategoryForm
        onSubmit={handleSubmit}
        defaultValues={{
          icon: "apple",
          name: "",
        }}
      />
    </div>
  );
}
