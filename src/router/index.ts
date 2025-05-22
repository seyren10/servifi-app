import { createBrowserRouter, redirect } from "react-router";
import App from "../App";
import Home from "../Home";
import { getProductsByCategory } from "../features/products/api";
import { lazy } from "react";

const Menu = lazy(() => import("../pages/menu/Menu"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const token = url.searchParams.get("token");

          if (token) {
            localStorage.setItem("token", token);
            return redirect("/menu");
          }
        },
      },
      {
        path: "menu",
        Component: Menu,
        loader: async () => {
          const products = await getProductsByCategory(
            "68131359f423f44e03b71730"
          );

          return { products };
        },
      },
    ],
  },
]);

export default router;
