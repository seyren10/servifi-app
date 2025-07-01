import { Navigate, Outlet } from "react-router";
import { TabsLink, TabsList } from "../../../components/tabs";

export default function MenuManagement() {
  return (
    <div className="space-y-4">
      <TabsList >
        <TabsLink to="products">Products</TabsLink>
        <TabsLink to="categories">Categories</TabsLink>
        <TabsLink to="promos">Promos</TabsLink>
      </TabsList>

      <section>
        <Outlet />
      </section>
    </div>
  );
}

export function RedirectToProduct() {
  return <Navigate to="products" />;
}
