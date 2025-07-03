import { type RouteObject } from "react-router";
import Loader from "../components/app/Loader";
import Error from "../components/app/Error";
import { storeHasUser } from "../store";
import { RedirectToProduct } from "../pages/admin/menu-management/MenuManagement";
import { adminCategoriesRoute } from "./admin-categories";
import { adminProductsRoute } from "./admin-products";
import { adminPromosRoute } from "./admin-promos";

export const adminRoutes: RouteObject = {
  path: "/admin",
  HydrateFallback: Loader,
  ErrorBoundary: Error,
  lazy: {
    Component: async () => (await import("../pages/admin/Admin")).default,
    loader: async () => (await import("../features/admin/loader")).default,
  },
  shouldRevalidate: () => {
    return !storeHasUser();
  },
  children: [
    {
      path: "orders",
      lazy: {
        Component: async () =>
          (await import("../pages/admin/orders/AdminOrder")).default,
        loader: async () =>
          (await import("../features/admin/orders/loader")).default,
      },
      children: [
        {
          path: ":orderId/complete",
          lazy: {
            action: async () =>
              (await import("../features/admin/orders/action"))
                .completeOrderAction,
          },
        },
      ],
    },
    {
      path: "tables",
      lazy: {
        Component: async () =>
          (await import("../pages/admin/tables/AdminTable")).default,
        loader: async () => (await import("../features/tables/loader")).default,
      },
      children: [
        {
          path: ":id",
          children: [
            {
              path: "generate-session",
              lazy: {
                Component: async () =>
                  (await import("../pages/admin/tables/GenerateSession"))
                    .default,
                action: async () =>
                  (await import("../features/tables/action")).default,
              },
            },
            {
              path: "edit",
              lazy: {
                Component: async () =>
                  (await import("../pages/admin/tables/Edit")).default,
                loader: async () =>
                  (await import("../features/tables/loader")).getTable,
                action: async () =>
                  (await import("../features/tables/action")).upsertTable,
              },
            },
            {
              path: "delete",
              lazy: {
                action: async () =>
                  (await import("../features/tables/action")).deleteTable,
              },
            },
            {
              path: "bill-out",
              lazy: {
                action: async () =>
                  (await import("../features/tables/action")).billOut,
              },
            },
          ],
        },
        {
          path: "create",
          lazy: {
            Component: async () =>
              (await import("../pages/admin/tables/Create")).default,
            action: async () =>
              (await import("../features/tables/action")).upsertTable,
          },
        },
        {
          path: "reprint-session",
          lazy: {
            Component: async () =>
              (await import("../pages/admin/tables/ReprintSession")).default,
            loader: async () =>
              (await import("../features/tables/loader")).getCurrentSession,
          },
        },
      ],
    },
    {
      path: "menu-management",
      lazy: {
        Component: async () =>
          (await import("../pages/admin/menu-management/MenuManagement"))
            .default,
      },
      children: [
        {
          index: true,
          Component: RedirectToProduct,
        },
        adminProductsRoute,
        adminCategoriesRoute,
        adminPromosRoute,
      ],
    },
  ],
};

export const authRoutes: RouteObject = {
  path: "/admin/signin",
  HydrateFallback: Loader,
  ErrorBoundary: Error,
  lazy: {
    Component: async () => (await import("../pages/admin/Login")).default,
    action: async () => (await import("../features/admin/auth/action")).default,
  },
};
