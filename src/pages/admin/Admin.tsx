import { Outlet, useLoaderData } from "react-router";
import type { User } from "../../features/admin/auth/type";
import {
  Clipboard,
  HandPlatter,
  LayoutDashboard,
  LineChart,
  Square,
  Utensils,
} from "lucide-react";
import AdminSideNav, {
  AdminSideNavItem,
  AdminSideNavList,
} from "./components/AdminSideNav";
import Brand from "../../components/app/Brand";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../../features/admin/slice";
import { Toaster } from "sonner";

export default function Admin() {
  const loadedUser = useLoaderData<User>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadedUser) dispatch(setUser(loadedUser));
  }, [dispatch, loadedUser]);

  return (
    <div className="h-dvh p-2">
      <div className="grid h-full grid-cols-[min-content_1fr] gap-2">
        <AdminSideNav>
          <Brand />
          <div role="separator" className="bg-foreground h-px"></div>
          <AdminSideNavList>
            <AdminSideNavItem Icon={LayoutDashboard} to="">
              Dashboard
            </AdminSideNavItem>
            <AdminSideNavItem Icon={Square} to="./tables">
              Table Management
            </AdminSideNavItem>
            <AdminSideNavItem Icon={Clipboard} to="./orders">
              Orders
            </AdminSideNavItem>
            <AdminSideNavItem Icon={HandPlatter} to="./services">
              Services
            </AdminSideNavItem>
            <AdminSideNavItem Icon={Utensils} to="./menu-management">
              Menu Management
            </AdminSideNavItem>
            <AdminSideNavItem Icon={LineChart} to="./reports">
              Reports
            </AdminSideNavItem>
          </AdminSideNavList>
        </AdminSideNav>

        <main className="h-full overflow-y-auto">
          <section className="container mx-auto mt-10 p-4">
            <Outlet />
          </section>
        </main>
      </div>

      <Toaster />
    </div>
  );
}
