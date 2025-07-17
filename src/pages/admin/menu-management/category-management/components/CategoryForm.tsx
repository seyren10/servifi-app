import { type ReactNode } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/form";
import { useForm } from "react-hook-form";
import {
  categoryIcons,
  type CategoryIconType,
} from "../../../../../features/category/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../../components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/select";
import CategoryIcon from "../../../../../components/app/CategoryIcon";
import { Button } from "../../../../../components/button";
import { useNavigate } from "react-router";
import { useKeyPress } from "../../../../../hooks/useKeyPress";

type Props = {
  onSubmit: (values: z.infer<typeof createCategorySchema>) => void;
  defaultValues?: Partial<z.infer<typeof createCategorySchema>>;
  submitRender?: ReactNode;
};

export const createCategorySchema = z.object({
  name: z.string().nonempty(),
  icon: z
    .custom<CategoryIconType>()
    .refine((e) => e && e.trim(), "Required")
    .refine((e) => categoryIcons.includes(e), "Invalid icon type"),
});

export default function CategoryForm({
  onSubmit,
  submitRender = <Button type="submit">Create</Button>,
  defaultValues,
}: Props) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: defaultValues,
  });

  const goBack = () => {
    navigate(-1);
  };

  useKeyPress("escape", goBack);
  return (
    <Form {...form}>
      <form
        className="max-w-md space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => {
            return (
              <FormItem className="[&>button]:w-full">
                <FormLabel>Icon</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  name={field.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon..." />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {categoryIcons.map((cI) => (
                      <SelectItem value={cI} key={cI}>
                        <CategoryIcon name={cI} /> {cI}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
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
