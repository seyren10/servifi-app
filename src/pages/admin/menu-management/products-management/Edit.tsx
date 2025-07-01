import type { z } from "zod";
import type { Category } from "../../../../features/category/type";
import type { Product } from "../../../../features/products/type";
import AdminSectionHeading from "../../../../components/app/AdminSectionHeading";
import ProductForm, { productSchema } from "./components/ProductForm";
import { useFetcher, useLoaderData, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getCategories } from "../../../../features/category/api";
import { Button } from "../../../../components/button";
import { useKeyPress } from "../../../../hooks/useKeyPress";

export default function Edit() {
  const product = useLoaderData<Product>();
  const [categories, setCategories] = useState<Category[]>();
  const navigate = useNavigate();
  const fetcher = useFetcher();

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
      method: "PUT",
      encType: "multipart/form-data",
    });
  };

  const goBack = () => {
    navigate(-1);
  };
  useKeyPress("escape", goBack);

  useEffect(() => {
    (async () => {
      const res = await getCategories();
      setCategories(res);
    })();
  }, []);

  if (!categories) return null;

  return (
    <div className="space-y-6">
      <AdminSectionHeading
        title="Edit this product"
        description="Fill out all the necessary changes and save when done."
      />

      <ProductForm
        onSubmit={onSubmit}
        categories={categories}
        defaultValues={{
          availability: product.availability,
          category: (product.category as Category)._id,
          description: product.description,
          name: product.name,
          price: product.price,
        }}
        submitSlot={
          <div className="space-x-2">
            <Button type="submit">Save changes</Button>
            <Button type="button" variant="outline" onClick={goBack}>
              <span>Cancel </span>
              <span className="text-muted-foreground rounded-md border bg-white px-2 text-xs">
                Esc
              </span>
            </Button>
          </div>
        }
      />
    </div>
  );
}
