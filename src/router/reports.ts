import type { RouteObject } from "react-router";

export const reportRoutes: RouteObject = {
  path: "reports",
  children: [
    {
      index: true,
      lazy: {
        Component: async () =>
          (await import("../pages/admin/reports/Index")).default,
        action: async () =>
          (await import("../features/reports/actions"))
            .downlaodTransactionReportAction,
      },
    },
  ],
};
