import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import { z } from "zod";
import { useFetcher, useLoaderData } from "react-router";

import ProductForm, { productSchema } from "./components/ProductForm";
import type { Category } from "../../../features/category/type";

export default function Create() {
  const fetcher = useFetcher();
  const categories = useLoaderData<Category[]>();

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("price", values.price.toString());
    formData.append("availability", values.availability.toString());
    if (values.description) formData.append("description", values.description);
    if (values.image) formData.append("image", values.image);

    fetcher.submit(formData, {
      action: "",
      method: "POST",
      encType: "multipart/form-data",
    });
  };

  return (
    <div className="space-y-6">
      <AdminSectionHeading
        title="Create new product"
        description="Fill out all the required information to create a new product."
      />

      <ProductForm
        onSubmit={onSubmit}
        categories={categories}
        defaultValues={{
          availability: true,
          description: "",
          name: "",
          price: 0,
          category: categories[0]._id,
        }}
      />
    </div>
  );
}
