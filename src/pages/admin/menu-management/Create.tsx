import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/form";
import { Input } from "../../../components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/select";
import { Textarea } from "../../../components/textarea/textarea";
import { useEffect, useRef } from "react";
import { Button } from "../../../components/button";
import { Switch } from "../../../components/switch";
import { useFetcher, useLoaderData } from "react-router";
import type { Category } from "../../../features/category/type";

const createProductSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  category: z.string(),
  price: z.coerce.number().nonnegative(),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 4000 * 1024, "Image must not exceed 4mb")
    .refine((file) => file.type.startsWith("image"), "Must be of type image")
    .optional(),
  availability: z.boolean(),
});

export default function Create() {
  const categories = useLoaderData<Category[]>();
  const [firstCategory] = categories;

  const focusElement = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      category: firstCategory._id,
      price: 0,
      availability: true,
    },
  });

  const fetcher = useFetcher();

  const onSubmit = form.handleSubmit(
    (values: z.infer<typeof createProductSchema>) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("price", values.price.toString());
      formData.append("availability", values.availability.toString());
      if (values.description)
        formData.append("description", values.description);
      if (values.image) formData.append("image", values.image);

      fetcher.submit(formData, {
        action: "",
        method: "POST",
        encType: "multipart/form-data",
      });
    },
  );

  useEffect(() => {
    if (!focusElement.current) return;

    focusElement.current.focus();
  }, []);

  return (
    <div className="space-y-6">
      <AdminSectionHeading
        title="Create new product"
        description="Fill out all the required information to create a new product."
      />

      <Form {...form}>
        <form
          onSubmit={onSubmit}
          encType="multipart/form-data"
          className="grid items-start gap-4 md:max-w-1/2 md:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-error after:content-['*']">
                  Name
                </FormLabel>
                <FormControl>
                  <Input {...field} ref={focusElement} autoComplete="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="[&>button]:w-full">
                <FormLabel className="after:text-error after:content-['*']">
                  Category
                </FormLabel>
                <Select
                  name={field.name}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Choose category..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        value={category._id}
                        className="capitalize"
                        key={category._id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem className="bg-input/30 flex rounded-xl p-4 shadow-sm">
                <FormControl>
                  <Switch
                    name={field.name}
                    ref={field.ref}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div>
                  <FormLabel>Availability</FormLabel>
                  <FormDescription>
                    Decide whether this product is available by default or not.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-full">
            <Button type="submit" className="w-fit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
