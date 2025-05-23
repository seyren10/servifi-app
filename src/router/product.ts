import type { RouteObject } from "react-router";

export const productRoutes: RouteObject = {
  path: "menu/:id",
  lazy: async () => {
    const [{ default: Component }, { productsLoader }] = await Promise.all([
      import("../pages/menu/Menu"),
      import("../features/products/loader"),
    ]);

    return {
      Component,
      loader: productsLoader,
    };
  },
  shouldRevalidate: function ({ currentUrl, nextUrl }) {
    return currentUrl.pathname !== nextUrl.pathname;
  },
};
