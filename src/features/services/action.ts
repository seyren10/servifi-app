import { redirect, type ActionFunctionArgs } from "react-router";
import { createService, deleteService } from "./api";
import { updateService } from "./api";

export const deleteServiceAction = async ({ params }: ActionFunctionArgs) => {
  const { id: serviceId } = params;
  if (!serviceId) throw new Error("No service id found in params");

  await deleteService(serviceId);
  console.log("deleted");
};

export const createServiceAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description")?.toString();

  await createService({ name, description });
  return redirect("../");
};

export const updateServiceAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const { id: serviceId } = params;
  if (!serviceId) throw new Error("No service id found in params");

  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description")?.toString();

  await updateService(serviceId, { name, description });

  return redirect("../");
};
