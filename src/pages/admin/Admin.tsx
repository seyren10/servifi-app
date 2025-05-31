import { Outlet, useLoaderData } from "react-router";
import type { User } from "../../features/admin/auth/type";
import { AdminContext } from "../../features/admin/context";
import {
  Clipboard,
  Columns3,
  HandPlatter,
  LineChart,
  Utensils,
} from "lucide-react";
import AdminSideNav, {
  AdminSideNavItem,
  AdminSideNavList,
} from "./components/AdminSideNav";
import Brand from "../../components/app/Brand";

export default function Admin() {
  const loadedUser = useLoaderData<User>();

  return (
    <AdminContext.Provider value={loadedUser}>
      <div className="h-dvh p-2">
        <div className="grid h-full grid-cols-[min-content_1fr] gap-2">
          <AdminSideNav>
            <Brand />
            <div role="separator" className="bg-foreground h-px"></div>
            <AdminSideNavList>
              <AdminSideNavItem Icon={Columns3} to="">
                Dashboard
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
            <section className="container mx-auto mt-10">
              <Outlet />
            </section>
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}
