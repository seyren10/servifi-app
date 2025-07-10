import type { WithTimestamp } from "../../types";

export type Service = WithTimestamp & {
  _id: string;
  name: string;
  description?: string;
};

export type CreateServicePayload = Pick<Service, "name" | "description">;

export type UpdateServicePayload = Partial<CreateServicePayload>;
