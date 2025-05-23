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
            return redirect("/menu/682fbbdf73a89bea93bc03ae");
          }
        },
      },
      {
        path: "menu/:id",
        Component: Menu,
        loader: async ({ params }) => {
          const { id } = params;
          if (!id) return;

          const products = await getProductsByCategory(id);

          return { products };
        },
      },
    ],
  },
]);

export default router;
