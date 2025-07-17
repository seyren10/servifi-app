import type { ActionFunctionArgs } from "react-router";
import { downloadTransactionReport } from "./api";
import type { DownloadTransactionReportQueryParams } from "./type";

export const downlaodTransactionReportAction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  const params = Object.fromEntries(
    formData,
  ) as DownloadTransactionReportQueryParams;
  await downloadTransactionReport(params);
};
