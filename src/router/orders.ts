import type { RouteObject } from "react-router";

export const orderRoutes: RouteObject = {
  path: "orders",
  lazy: async () => {
    const [{ default: Component }] = await Promise.all([
      import("../pages/orders/Order"),
    ]);
    return {
      Component,
    };
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const [{ default: Component }] = await Promise.all([
          import("../pages/orders/PendingOrder"),
        ]);

        return {
          Component,
        };
      },
    },
    {
      path: "completed",
      lazy: {
        Component: async () =>
          (await import("../pages/orders/CompletedOrder")).default,
        loader: async () => (await import("../features/orders/loader")).default,
        action: async () => (await import("../features/orders/action")).default,
      },
    },
  ],
};
