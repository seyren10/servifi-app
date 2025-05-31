import { type ComponentType, type ReactNode, type SVGProps } from "react";
import { NavLink, type To } from "react-router";

type Props = {
  children?: ReactNode;
};

export default function AdminSideNav({ children }: Props) {
  return (
    <aside className="space-y-4 rounded-xl bg-gray-50 p-4">{children}</aside>
  );
}

export function AdminSideNavList({ children }: { children: ReactNode }) {
  return (
    <ul className="flex flex-col items-center gap-4 md:items-start">
      {children}
    </ul>
  );
}

type AdminSideNavItemProps = {
  children?: ReactNode;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  to: string | To;
};
export function AdminSideNavItem({
  children,
  Icon,
  to,
}: AdminSideNavItemProps) {
  return (
    <li className="">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${isActive ? "text-primary" : "text-muted-foreground"} flex items-center gap-2 text-sm`
        }
        end
      >
        {Icon && <Icon className="size-5" />}
        <span className="hidden font-medium whitespace-nowrap md:inline">
          {children}
        </span>
      </NavLink>
    </li>
  );
}
