import { http } from "../../lib/axios";
import type { DownloadTransactionReportQueryParams, Report } from "./type";

export const downloadTransactionReport = async (
  params?: DownloadTransactionReportQueryParams,
) => {
  const response = await http.get("/api/v1/reports/download-transaction", {
    params,
    responseType: "blob",
  });

  // Create a download link:
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;

  // Optional: use content-disposition filename or hardcode it
  link.setAttribute("download", "report.csv");

  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const getTransactionReport = async () => {
  const res = await http.get<Report>("/api/v1/reports", {
    params: {
      top: 10,
    },
  });
  return res.data;
};
