import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import {
  generateSession,
  createTable as createTableApi,
  updateTable as updateTableApi,
  deleteTable as deleteTableApi,
} from "./api";
import type { AxiosError } from "axios";
import type { ActionResponse } from "../../types";

export default async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) throw new Error("No table id");

  const res = await generateSession(id);

  return res;
};

export const upsertTable = async ({
  request,
  params,
}: ActionFunctionArgs): Promise<ActionResponse | Response> => {
  try {
    const formData = await request.formData();
    const number = +formData.get("number")!;
    const capacity = +formData.get("capacity")!;

    if (request.method === "POST")
      await createTableApi({
        number,
        capacity,
      });
    else if (request.method === "PUT") {
      const { id: tableId } = params;
      if (!tableId) throw new Error("No Table Id found in params");

      await updateTableApi(tableId, { number, capacity });
    }

    return redirect("/admin/tables");
  } catch (err) {
    const axiosError = err as AxiosError<{ message: string }>;

    if (axiosError.response?.status === 422)
      return {
        ok: false,
        message: axiosError.response?.data.message,
      };

    throw axiosError;
  }
};

export const deleteTable = async ({ params }: ActionFunctionArgs) => {
  const { id: tableId } = params;
  if (!tableId) throw new Error("No table id found in params");

  const res = await deleteTableApi(tableId);

  return res;
};
