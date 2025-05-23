import { Outlet } from "react-router";
import {
  Beef,
  CircleSmall,
  Clipboard,
  GlassWater,
  Menu,
  Salad,
} from "lucide-react";
import { Nav, NavItem } from "./components/nav";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./store";
import { useEffect } from "react";
import { setTableFromLocalStorage } from "./features/tables/slice";
import { selectHasOrders } from "./features/orders/slice";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const hasOrders = useSelector(selectHasOrders);

  useEffect(() => {
    const table = localStorage.getItem("table-session");
    if (table) dispatch(setTableFromLocalStorage(table));
  }, [dispatch]);

  return (
    <div className="container mx-auto flex h-dvh flex-col justify-between">
      <div className="overflow-auto p-2">
        <Outlet />
      </div>
      <Nav>
        <NavItem title="grill" Icon={Beef} to="menu/682fbbdf73a89bea93bc03ae" />
        <NavItem
          title="sides"
          Icon={Salad}
          to="menu/682fbd9473a89bea93bc03c7"
        />
        <NavItem
          title="drinks"
          Icon={GlassWater}
          to="menu/68300aa394237aae06484d8f"
        />
        <div className="relative isolate">
          <NavItem title="orders" Icon={Clipboard} to="orders" />
          {hasOrders && (
            <CircleSmall className="fill-primary absolute -top-1.5 -right-0 size-5" />
          )}
        </div>
        <NavItem title="more" Icon={Menu} />
      </Nav>
    </div>
  );
}
