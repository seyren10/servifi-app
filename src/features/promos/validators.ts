import { z } from "zod";

export const createPromoValidator = z.object({
  title: z.string().nonempty("Required"),
  description: z.string().optional(),
  restrictedProducts: z.array(z.string()).optional(),
});
