import type { RouteObject } from "react-router";

export const adminServicesRoute: RouteObject = {
  path: "services",
  children: [
    {
      index: true,
      lazy: {
        Component: async () =>
          (
            await import(
              "../pages/admin/menu-management/service-management/Index"
            )
          ).default,
        loader: async () =>
          (await import("../features/services/loader")).getServicesLoader,
      },
    },
    {
      path: "create",
      lazy: {
        Component: async () =>
          (
            await import(
              "../pages/admin/menu-management/service-management/Create"
            )
          ).default,
        action: async () =>
          (await import("../features/services/action")).createServiceAction,
      },
    },
    {
      path: ":id/edit",
      lazy: {
        Component: async () =>
          (
            await import(
              "../pages/admin/menu-management/service-management/Edit"
            )
          ).default,
        loader: async () =>
          (await import("../features/services/loader")).getServiceLoader,
        action: async () =>
          (await import("../features/services/action")).updateServiceAction,
      },
    },
    {
      path: ":id/delete",
      lazy: {
        action: async () =>
          (await import("../features/services/action")).deleteServiceAction,
      },
    },
  ],
};
