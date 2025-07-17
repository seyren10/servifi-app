export type DownloadTransactionReportQueryParams = Partial<{
  startDate: string;
  endDate: string;
  top: number;
}>;

export type Report = {
  totalRevenue: number;
  totalQuantity: number;
  totalReceipts: number;
  topProducts: TopProduct[];
};

export type TopProduct = {
  _id: string;
  quantity: number;
  productId: string;
  productName: string;
};
