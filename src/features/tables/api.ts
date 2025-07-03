import { http } from "../../lib/axios";
import type { TableBillOutParams, Table, TablePayload } from "./type";

export async function getTableSession() {
  const res = await http.get<Table>("/api/v1/tables/get-session");

  return res.data;
}

export const requestBillOutTable = async (tableId: string) => {
  const res = await http.patch(`/api/v1/tables/${tableId}/request-bill-out`);

  return res.data;
};

export const billoutTable = async (
  tableId: string,
  params?: Partial<TableBillOutParams>,
) => {
  const res = await http.delete(`/api/v1/tables/${tableId}/bill-out`, {
    params,
  });

  return res.data;
};

export const getTables = async () => {
  const res = await http.get<Table[]>("/api/v1/tables");

  return res.data;
};

export const getTable = async (tableId: string) => {
  const res = await http.get<Table>(`/api/v1/tables/${tableId}`);

  return res.data;
};

export const generateSession = async (tableId: string) => {
  const res = await http.post<{ url: string }>(
    `/api/v1/tables/${tableId}/generate-session`,
  );
  return res.data.url;
};

export const createTable = async (payload: TablePayload) => {
  const res = await http.post("/api/v1/tables", payload);
  return res.data;
};

export const updateTable = async (tableId: string, payload: TablePayload) => {
  const res = await http.put(`/api/v1/tables/${tableId}`, payload);
  return res.data;
};

export const deleteTable = async (tableId: string) => {
  const res = await http.delete(`/api/v1/tables/${tableId}`);

  return res.data;
};
