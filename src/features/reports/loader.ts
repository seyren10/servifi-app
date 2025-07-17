import { getTransactionReport } from "./api";

export const getTransactionReportLoader = async () => {
  const reports = await getTransactionReport();
  return reports;
};
