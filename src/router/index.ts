import { createBrowserRouter, redirect } from "react-router";
import App from "../App";
import Home from "../Home";
import { getTableSession } from "../features/tables/api";
import Loader from "../components/app/Loader";
import { orderRoutes } from "./orders";
import { productRoutes } from "./product";
import Error from "../components/app/Error";
import { adminRoutes, authRoutes } from "./admin";

import { loader as AppLoader } from "../App";
import { getCategories } from "../features/category/api";
import { ongoingServiceRoutes } from "./ongoing-service";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    HydrateFallback: Loader,
    ErrorBoundary: Error,
    loader: AppLoader,
    children: [
      {
        index: true,
        Component: Home,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const token = url.searchParams.get("token");

          if (token) {
            localStorage.setItem("token", token);

            const table = await getTableSession().catch((err) => {
              localStorage.removeItem("table-session");
              localStorage.removeItem("token");
              throw err;
            });

            if (table)
              localStorage.setItem("table-session", JSON.stringify(table));

            const [firstCategory] = await getCategories();
            return redirect(`/menu/${firstCategory._id}`);
          }
        },
      },
      ongoingServiceRoutes,
      productRoutes,
      orderRoutes,
    ],
  },
  adminRoutes,
  authRoutes,
]);

export default router;
