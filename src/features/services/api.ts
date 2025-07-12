import { http } from "../../lib/axios";
import type {
  Service,
  CreateServicePayload,
  UpdateServicePayload,
} from "./type";

export const getServices = async () => {
  const res = await http.get<Service[]>("/api/v1/services");
  return res.data;
};

export const getService = async (id: string) => {
  const res = await http.get<Service>(`/api/v1/services/${id}`);

  return res.data;
};

export const createService = async (payload: CreateServicePayload) => {
  const res = await http.post<Service>("/api/v1/services", payload);

  return res.data;
};

export const updateService = async (
  id: string,
  payload: UpdateServicePayload,
) => {
  const res = await http.put<Service>(`/api/v1/services/${id}`, payload);

  return res.data;
};

export const deleteService = async (id: string) => {
  await http.delete(`/api/v1/services/${id}`);
};

