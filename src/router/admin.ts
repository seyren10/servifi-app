import { type RouteObject } from "react-router";
import Loader from "../components/app/Loader";
import Error from "../components/app/Error";

export const adminRoutes: RouteObject = {
  path: "/admin",
  HydrateFallback: Loader,
  ErrorBoundary: Error,
  lazy: {
    Component: async () => (await import("../pages/admin/Admin")).default,
    loader: async () => (await import("../features/admin/loader")).default,
  },
  shouldRevalidate: ({ currentUrl, nextUrl }) => {
    return currentUrl.pathname !== nextUrl.pathname;
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
