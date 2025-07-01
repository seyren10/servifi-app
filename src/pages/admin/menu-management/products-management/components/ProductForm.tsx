import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../../../components/select";
import { Button } from "../../../../../components/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../../../../../components/form";
import { Input } from "../../../../../components/input";
import { Textarea } from "../../../../../components/textarea/textarea";
import { Switch } from "../../../../../components/switch";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, type ReactNode } from "react";
import type { Category } from "../../../../../features/category/type";

type Props = {
  defaultValues: Partial<z.infer<typeof productSchema>>;
  onSubmit: (values: z.infer<typeof productSchema>) => void;
  categories: Category[];
  submitSlot?: ReactNode;
};

export const productSchema = z.object({
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

export default function ProductForm({
  defaultValues,
  onSubmit,
  categories,
  submitSlot: Submit = (
    <Button type="submit" className="w-fit">
      Submit
    </Button>
  ),
}: Props) {
  const focusElement = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!focusElement.current) return;

    focusElement.current.focus();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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

        <div className="col-span-full">{Submit}</div>
      </form>
    </Form>
  );
}
