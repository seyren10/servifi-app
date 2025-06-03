import { billOutTable } from "../tables/api";
import type { Table } from "../tables/type";

export default async () => {
  const table = JSON.parse(
    localStorage.getItem("table-session") || "{}",
  ) as Table;

  if (!table) {
    throw new Error("Table not found");
  }

  const res = await billOutTable(table._id);
  //clear local storage
  localStorage.clear();

  return res;
};
