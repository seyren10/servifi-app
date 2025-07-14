import { type ActionFunctionArgs } from "react-router";
import { completeOngoingService, createOngoingService } from "./api";
import { AxiosError } from "axios";

export const createOngoingServiceAction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  const service = formData.get("serviceId") as string;
  const table = formData.get("tableId") as string;

  try {
    await createOngoingService({
      service,
      table,
    });
  } catch (error) {
    return {
      ok: false,
      error: error as AxiosError<{ message: string }> | null,
      message: "You already requested a similar service, please try again later.",
    };
  }

  return {
    ok: true,
    message: "Your request has been sent successfully.",
    error: null,
  };
};

export const completeOngoingServiceAction = async ({
  params,
}: ActionFunctionArgs) => {
  const { id: ongoingServiceId } = params;
  if (!ongoingServiceId)
    throw new Error("No ongoing service id found in params");

  await completeOngoingService(ongoingServiceId);
};
