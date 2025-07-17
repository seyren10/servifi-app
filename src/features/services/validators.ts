import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().trim().nonempty("Required"),
  description: z.string().optional(),
});
