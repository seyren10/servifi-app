import { createBrowserRouter, redirect } from "react-router";
import App from "../App";
import Home from "../Home";
import { getTableSession } from "../features/tables/api";
import Loader from "../components/app/Loader";
import { orderRoutes } from "./orders";
import { productRoutes } from "./product";
import Error from "../components/app/Error";
import { adminRoutes, authRoutes } from "./admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    HydrateFallback: Loader,
    ErrorBoundary: Error,
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

            return redirect("/menu/682fbbdf73a89bea93bc03ae");
          }
        },
      },
      productRoutes,
      orderRoutes,
    ],
  },
  adminRoutes,
  authRoutes,
]);

export default router;
