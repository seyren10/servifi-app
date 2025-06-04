import type { LoaderFunctionArgs } from "react-router";
import { getTables, getTable as getTableApi } from "./api";

export default async () => {
  const tables = await getTables();

  return tables;
};

export const getTable = async ({ params }: LoaderFunctionArgs) => {
  const { id: tableId } = params;

  if (!tableId) throw new Error("no table id ");
  
  const table = await getTableApi(tableId);

  return table;
};
