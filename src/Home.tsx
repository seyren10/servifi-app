import { Beef, GlassWater, HandPlatter, Salad } from "lucide-react";
import { Nav, NavItem } from "./components/nav";

export default function Home() {
  return (
    <div>
      Welcome to Servifi
      <Nav>
        <NavItem title="grill" Icon={Beef} />
        <NavItem title="sides" Icon={Salad} />
        <NavItem title="drinks" Icon={GlassWater} />
        <NavItem title="services" Icon={HandPlatter} />
      </Nav>
    </div>
  );
}
