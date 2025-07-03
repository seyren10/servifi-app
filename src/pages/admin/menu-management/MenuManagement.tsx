import { Navigate, Outlet, useNavigation } from "react-router";
import { TabsLink, TabsList } from "../../../components/tabs";
import { LoaderCircle } from "lucide-react";

export default function MenuManagement() {
  const navigation = useNavigation();

  const isFetching = navigation.state !== "idle";
  return (
    <div className="space-y-4">
      <TabsList>
        <TabsLink to="products">Products</TabsLink>
        <TabsLink to="categories">Categories</TabsLink>
        <TabsLink to="promos">Promos</TabsLink>
      </TabsList>

      <section>
        {isFetching ? (
          <div className="grid min-h-[30rem] place-content-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          <Outlet />
        )}
      </section>
    </div>
  );
}

export function RedirectToProduct() {
  return <Navigate to="products" />;
}
