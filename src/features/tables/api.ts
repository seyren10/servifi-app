import { http } from "../../lib/axios";
import type { Table } from "./type";

export async function getTableSession() {
  try {
    const token = localStorage.getItem("token");

    const res = await http.get<Table>("/api/v1/tables/get-session", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
