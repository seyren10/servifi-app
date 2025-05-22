import { Outlet } from "react-router";
import { Beef, GlassWater, HandPlatter, Menu, Salad } from "lucide-react";
import { Nav, NavItem } from "./components/nav";

export default function App() {
  return (
    <div className="container mx-auto h-screen flex flex-col justify-between">
      <div className="overflow-auto p-2">
        <Outlet />
      </div>
      <Nav>
        <NavItem title="grill" Icon={Beef} to="menu" />
        <NavItem title="sides" Icon={Salad} />
        <NavItem title="drinks" Icon={GlassWater} />
        <NavItem title="services" Icon={HandPlatter} />
        <NavItem title="more" Icon={Menu} />
      </Nav>
    </div>
  );
}
