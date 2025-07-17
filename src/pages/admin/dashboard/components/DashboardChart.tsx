import React from "react";
import { DataTable } from "../../../../components/app/DataTable";
import type { TopProduct } from "../../../../features/reports/type";

type Props = {
  topProducts: TopProduct[];
  className?: string;
};

export default function DashboardChart({ className, topProducts }: Props) {
  return (
    <div className={className}>
      <DataTable
        data={topProducts}
        columns={[
          {
            accessorKey: "productName",
            header: "Product Name",
          },
          {
            accessorKey: "quantity",
            header: "Quantity",
          },
        ]}
        disabledSearch
        disabledPagination
      ></DataTable>
    </div>
  );
}
