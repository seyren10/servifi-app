import { Outlet, useMatch } from "react-router";
import { TabsLink, TabsList } from "../../components/tabs";
import PendingOrderCheckout from "./components/PendingOrderCheckout";
import CompletedOrderCheckout from "./components/CompletedOrderCheckout";

export default function Order() {
  const path = useMatch("/orders");
  return (
    <div>
      <div className="sticky top-0 space-y-2 bg-white">
        <div className="px-4 py-2">
          {path ? <PendingOrderCheckout /> : <CompletedOrderCheckout />}
        </div>

        <TabsList className="">
          <TabsLink to="" className="grow text-center">
            Pending Orders
          </TabsLink>
          <TabsLink to="completed" className="grow text-center">
            Completed Orders
          </TabsLink>
        </TabsList>
      </div>

      <section className="p-4">
        <Outlet />
      </section>
    </div>
  );
}
