import { useLoaderData } from "react-router";
import type { getTransactionReportLoader } from "../../../features/reports/loader";
import { DashboardCard } from "./components/DashboardCard";
import { HandCoins, PhilippinePeso, Scroll } from "lucide-react";
import DashboardChart from "./components/DashboardChart";

export default function Dashboard() {
  const { topProducts, totalQuantity, totalReceipts, totalRevenue } =
    useLoaderData<Awaited<ReturnType<typeof getTransactionReportLoader>>>();
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      <DashboardCard
        title="sales"
        value={totalRevenue.toLocaleString("en-PH", {
          style: "currency",
          currency: "PHP",
        })}
        icon={<PhilippinePeso className="size-4" />}
      />
      <DashboardCard
        title="receipts"
        value={totalReceipts}
        icon={<Scroll className="size-4" />}
      />
      <DashboardCard
        title="Qualtity Sold"
        value={totalQuantity}
        icon={<HandCoins className="size-4" />}
      />

      <div className="col-span-full max-w-sm rounded-xl border p-2">
        <DashboardChart topProducts={topProducts} />
        <h4 className="text-center font-medium">Top Products</h4>
      </div>
    </div>
  );
}
