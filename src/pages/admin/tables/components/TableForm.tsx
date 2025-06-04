import { Button } from "../../../../components/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../../../../components/form";
import { Input } from "../../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  number: z.coerce.number().nonnegative(),
  capacity: z.coerce.number().nonnegative().positive(),
});

type Props = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: z.infer<typeof formSchema>;
  loading?: boolean;
};

export default function TableForm({
  onSubmit,
  defaultValues = {
    capacity: 0,
    number: 0,
  },
  loading,
}: Props) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid items-start gap-2 md:max-w-1/2 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Table Number</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Tells how many people this table can accomodate.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={!!Object.keys(form.formState.errors).length || loading}
          >
            {loading && <LoaderCircle className="animate-spin" />}
            Create table
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-fit"
            disabled={loading}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
