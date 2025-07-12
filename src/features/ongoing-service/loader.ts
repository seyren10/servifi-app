import { getOngoingServices } from "./api";
import type { getOngoingServiceQueryParams } from "./type";

export const getOngoingServicesLoader = async (
  params?: getOngoingServiceQueryParams,
) => {
  return await getOngoingServices(params);
};
