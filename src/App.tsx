import { Outlet } from "react-router";
import { Beef, Clipboard, GlassWater, Menu, Salad } from "lucide-react";
import { Nav, NavItem } from "./components/nav";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { useEffect } from "react";
import { setTableFromLocalStorage } from "./features/tables/slice";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

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
        <NavItem title="orders" Icon={Clipboard} />
        <NavItem title="more" Icon={Menu} />
      </Nav>
    </div>
  );
}
