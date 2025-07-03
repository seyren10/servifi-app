import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { createPromoValidator } from "../../../../../features/promos/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/form";
import { Input } from "../../../../../components/input";
import { Textarea } from "../../../../../components/textarea/textarea";

import { MultiSelect } from "../../../../../components/multiselect";
import { useEffect, useState, type ReactNode } from "react";

import { getProducts } from "../../../../../features/products/api";
import { Skeleton } from "../../../../../components/skeleton";
import { Button } from "../../../../../components/button";
import { useNavigate } from "react-router";
import { useKeyPress } from "../../../../../hooks/useKeyPress";

type Props = {
  defaultValues?: z.infer<typeof createPromoValidator>;
  onSubmit: (data: z.infer<typeof createPromoValidator>) => void;
  submitRender?: ReactNode;
};

export default function PromoForm({
  defaultValues = {
    title: "",
    description: "",
    restrictedProducts: [],
  },
  onSubmit,
  submitRender = <Button type="submit">Submit</Button>,
}: Props) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(createPromoValidator),
    defaultValues,
  });

  const goBack = () => navigate(-1);
  useKeyPress("Escape", goBack);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="field-required">Title</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="restrictedProducts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restricted Products</FormLabel>

              <FormControl>
                <RestrictedProductInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-x-4">
          {submitRender}
          <Button type="button" variant="outline" onClick={goBack}>
            <span>Cancel </span>
            <span className="text-muted-foreground rounded-md border bg-white px-2 text-xs">
              Esc
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

function RestrictedProductInput(
  props: ControllerRenderProps<z.infer<typeof createPromoValidator>>,
) {
  const [products, setProducts] =
    useState<{ label: string; value: string }[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await getProducts();
      const formatted = res.map((product) => ({
        label: product.name,
        value: product._id,
      }));
      setProducts(formatted);
      setLoading(false);
    };

    fetch();
  }, []);

  if (loading) return <Skeleton className="h-10" />;

  if (!products || !products.length) return <div>Failed to fetch products</div>;

  return (
    <MultiSelect
      options={products}
      selected={props.value as string[]}
      placeholder="Select products..."
      onSelectionChange={(selected) => {
        props.onChange(selected);
        props.onBlur();
      }}
      searchPlaceholder="Search products..."
      emptyMessage="No products found."
      {...props}
    />
  );
}
