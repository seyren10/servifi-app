import { type RouteObject } from "react-router";
import Loader from "../components/app/Loader";
import Error from "../components/app/Error";
import { storeHasUser } from "../store";

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
