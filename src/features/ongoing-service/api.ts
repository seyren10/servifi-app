import { http } from "../../lib/axios";
import type {
  CreateOngoingServicePayload,
  getOngoingServiceQueryParams,
  OngoingService,
} from "./type";

export const getOngoingServices = async (
  params?: getOngoingServiceQueryParams,
) => {
  const res = await http.get<OngoingService>("/api/v1/ongoing-services", {
    params,
  });

  return res.data;
};

export const createOngoingService = async (
  payload: CreateOngoingServicePayload,
) => {
  const res = await http.post<OngoingService>(
    "/api/v1/ongoing-services",
    payload,
  );

  return res.data;
};

export const completeOngoingService = async (ongoingServiceId: string) => {
  await http.delete<OngoingService>(
    `/api/v1/ongoing-services/${ongoingServiceId}`,
  );
};
