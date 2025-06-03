import { getTables } from "./api";

export default async () => {
  const tables = await getTables();

  return tables;
};
