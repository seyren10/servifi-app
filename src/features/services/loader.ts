import type { LoaderFunctionArgs } from "react-router";
import { getService, getServices } from "./api";

export const getServicesLoader = async () => {
  const services = await getServices();

  return services;
};

export const getServiceLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id: seriviceId } = params;
  if (!seriviceId) throw new Error("Service ID is required");

  const service = await getService(seriviceId);

  return service;
};
