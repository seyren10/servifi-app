import { http } from "../../lib/axios";
import type { Table } from "./type";

export async function getTableSession() {
  const res = await http.get<Table>("/api/v1/tables/get-session");

  return res.data;
}

export const billOutTable = async (tableId: string) => {
  const res = await http.post(`/api/v1/tables/${tableId}/bill-out`);

  return res.data;
};
