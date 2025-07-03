import type { RouteObject } from "react-router";

export const adminCategoriesRoute: RouteObject = {
  path: "categories",
  lazy: {
    Component: async () =>
      (await import("../pages/admin/menu-management/category-management/Index"))
        .default,
    loader: async () => (await import("../features/category/loader")).default,
  },
  children: [
    {
      path: "create",
      lazy: {
        Component: async () =>
          (
            await import(
              "../pages/admin/menu-management/category-management/Create"
            )
          ).default,
        action: async () =>
          (await import("../features/category/action")).createCategoryAction,
      },
    },
    {
      path: ":categoryId",
      children: [
        {
          path: "edit",
          lazy: {
            Component: async () =>
              (
                await import(
                  "../pages/admin/menu-management/category-management/Edit"
                )
              ).default,
            loader: async () =>
              (await import("../features/category/loader")).getCategoryLoader,
            action: async () =>
              (await import("../features/category/action"))
                .updateCategoryAction,
          },
        },
      ],
    },
  ],
};
