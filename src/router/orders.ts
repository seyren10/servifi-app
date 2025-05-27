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
      lazy: async () => {
        const [{ default: Component }, { default: loader }] = await Promise.all(
          [
            import("../pages/orders/CompletedOrder"),
            import("../features/orders/loader"),
          ],
        );

        return {
          Component,
          loader,
        };
      },
      shouldRevalidate: ({ currentUrl, nextUrl }) => {
        return currentUrl.pathname !== nextUrl.pathname;
      },
    },
  ],
};
