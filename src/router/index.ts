import { createBrowserRouter, redirect } from "react-router";
import App from "../App";
import Home from "../Home";
import { getTableSession } from "../features/tables/api";
import Loader from "../components/Loader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    HydrateFallback: Loader,
    children: [
      {
        index: true,
        Component: Home,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const token = url.searchParams.get("token");

          if (token) {
            localStorage.setItem("token", token);
            const table = await getTableSession();

            if (table)
              localStorage.setItem("table-session", JSON.stringify(table));

            return redirect("/menu/682fbbdf73a89bea93bc03ae");
          }
        },
      },
      {
        path: "menu/:id",
        lazy: async () => {
          const [{ default: Component }, { productsLoader }] =
            await Promise.all([
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
      },
    ],
  },
]);

export default router;
