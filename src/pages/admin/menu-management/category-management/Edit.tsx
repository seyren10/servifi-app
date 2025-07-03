import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";
import { Button } from "../../../../components/button";
import type { Category } from "../../../../features/category/type";
import CategoryForm, { createCategorySchema } from "./components/CategoryForm";
import { useFetcher, useLoaderData } from "react-router";
import type { z } from "zod";

export default function Edit() {
  const category = useLoaderData<Category>();

  const fetcher = useFetcher();
  const handleSubmit = (values: z.infer<typeof createCategorySchema>) => {
    fetcher.submit(values, {
      action: "",
      method: "PUT",
    });
  };

  return (
    <div className="space-y-6">
      <AdminSectionHeading
        title="Edit Category"
        description="Fill out all the necessary changes and save when done."
      />

      <CategoryForm
        onSubmit={handleSubmit}
        defaultValues={category}
        submitRender={<Button type="submit">Save</Button>}
      />
    </div>
  );
}
