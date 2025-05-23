import { NavLink, Outlet } from "react-router";

export default function Order() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Orders</h1>

      <NavLink to="">Pending Orders</NavLink>
      <NavLink to="completed">Completed Orders</NavLink>
      <Outlet />
    </div>
  );
}
