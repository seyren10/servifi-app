import type { RouteObject } from "react-router";

export const adminPromosRoute: RouteObject = {
  path: "promos",
  lazy: {
    Component: async () =>
      (await import("../pages/admin/menu-management/promo-management/Index"))
        .default,
    loader: async () =>
      (await import("../features/promos/loader")).getPromosLoader,
  },
  children: [
    {
      path: "create",
      lazy: {
        Component: async () =>
          (
            await import(
              "../pages/admin/menu-management/promo-management/Create"
            )
          ).default,
        action: async () =>
          (await import("../features/promos/actions")).createPromoAction,
      },
    },
    {
      path: ":promoId",
      lazy: {
        Component: async () =>
          (await import("../pages/admin/menu-management/promo-management/Show"))
            .default,
        loader: async () =>
          (await import("../features/promos/loader")).getPromoLoader,
      },
    },
    {
      path: ":promoId/edit",
      lazy: {
        Component: async () =>
          (await import("../pages/admin/menu-management/promo-management/Edit"))
            .default,
        action: async () =>
          (await import("../features/promos/actions")).updatePromoAction,
        loader: async () =>
          (await import("../features/promos/loader")).getPromoLoader,
      },
    },
    {
      path: ":promoId/delete",
      lazy: {
        action: async () =>
          (await import("../features/promos/actions")).deletePromoAction,
      },
    },
  ],
};
