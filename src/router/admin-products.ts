import type { RouteObject } from "react-router";

export const adminProductsRoute: RouteObject = {
  path: "products",
  lazy: {
    Component: async () =>
      (await import("../pages/admin/menu-management/products-management/Index"))
        .default,
    loader: async () =>
      (await import("../features/products/loader")).adminProductsLoader,
  },
  children: [
    {
      path: "create",
      lazy: {
        Component: async () =>
          (
            await import(
              "../pages/admin/menu-management/products-management/Create"
            )
          ).default,
        loader: async () =>
          (await import("../features/category/loader")).default,
        action: async () =>
          (await import("../features/products/action")).default,
      },
    },
    {
      path: ":productId",
      children: [
        {
          path: "edit",
          lazy: {
            Component: async () =>
              (
                await import(
                  "../pages/admin/menu-management/products-management/Edit"
                )
              ).default,
            loader: async () =>
              (await import("../features/products/loader")).getProduct,
            action: async () =>
              (await import("../features/products/action")).updateProduct,
          },
        },
        {
          path: "toggle-availability/:availability",
          lazy: {
            action: async () =>
              (await import("../features/products/action"))
                .toggleAvailabilityAction,
          },
        },
        {
          path: "delete",
          lazy: {
            action: async () =>
              (await import("../features/products/action")).deleteProductAction,
          },
        },
      ],
    },
  ],
};
