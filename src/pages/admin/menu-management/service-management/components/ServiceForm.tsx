import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../../../../../components/form";
import { Input } from "../../../../../components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createServiceSchema } from "../../../../../features/services/validators";
import type { z } from "zod";
import { Button } from "../../../../../components/button";
import { useKeyPress } from "../../../../../hooks/useKeyPress";
import { useNavigate } from "react-router";
import type { ReactNode } from "react";
import { Textarea } from "../../../../../components/textarea/textarea";

type Props = {
  onSubmit: (data: z.infer<typeof createServiceSchema>) => void;
  defaultValues?: z.infer<typeof createServiceSchema>;
  submitRender?: ReactNode;
};

export default function ServiceForm({
  onSubmit,
  defaultValues,
  submitRender = <Button type="submit">Create</Button>,
}: Props) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  useKeyPress("Escape", goBack);

  const form = useForm({
    resolver: zodResolver(createServiceSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="field-required">Name</FormLabel>
              <FormControl>
                <Input {...field} autoFocus />
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
