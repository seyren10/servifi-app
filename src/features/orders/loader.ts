import type { Table } from "../tables/type";
import { getOrderSummary } from "./api";

export default async function OrderSummaryLoader() {
  const table = JSON.parse(
    localStorage.getItem("table-session") ?? "{}",
  ) as Table;

  const orderSummary = await getOrderSummary(table._id);

  return { orderSummary };
}
