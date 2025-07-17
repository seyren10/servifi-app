import { LoaderCircle, Shuffle } from "lucide-react";
import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/select";
import { Label } from "../../../components/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/input";
import { format } from "date-fns";
import { Button } from "../../../components/button";
import { useFetcher } from "react-router";
const downloadReportSchema = z.object({
  reportType: z.enum(["transaction"]),
  startDate: z.string().date(),
  endDate: z.string().date(),
});

export default function Index() {
  const fetcher = useFetcher();
  const submitting = fetcher.state !== "idle";
  const today = format(new Date(), "yyyy-MM-dd");

  const formSchema = useForm<z.infer<typeof downloadReportSchema>>({
    resolver: zodResolver(downloadReportSchema),
    defaultValues: {
      reportType: "transaction",
      startDate: today,
      endDate: today,
    },
  });

  const onSubmit = async (data: z.infer<typeof downloadReportSchema>) => {
    fetcher.submit(data, {
      action: "",
      method: "POST",
    });
  };

  return (
    <div className="space-y-6">
      <AdminSectionHeading
        title="Reports"
        description="Choose a date range to view sales reports."
      />

      <div>
        <Form {...formSchema}>
          <form
            className="space-y-4"
            onSubmit={formSchema.handleSubmit(onSubmit)}
          >
            <FormField
              control={formSchema.control}
              name="reportType"
              render={({ field }) => (
                <FormItem>
                  <Label>Report Type</Label>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a report" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="transaction">
                          <Shuffle />
                          Transaction
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formSchema.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="w-fit">
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formSchema.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="w-fit">
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={submitting}>
              {submitting && <LoaderCircle className="animate-spin" />}
              Download
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
