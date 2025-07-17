import type { Service } from "../services/type";
import type { Table } from "../tables/type";

export type OngoingService = {
  _id: string;
  table: string | Table;
  service: string | Service;
  completed: boolean;
};
export type CreateOngoingServicePayload = {
  table: string;
  service: string;
};

export type getOngoingServiceQueryParams = Partial<{
  completed: boolean;
}>;
