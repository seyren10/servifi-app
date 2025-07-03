import { Asterisk } from "lucide-react";
import { type ReactElement } from "react";
import { NavLink, type To } from "react-router";

type Props = {
  title: string;
  icon?: ReactElement<SVGSVGElement>;
  to?: string | To;
};
export default function NavItem({ title, icon = <Asterisk />, to }: Props) {
  const baseClasses =
    "inline-flex flex-col gap-1 items-center text-xs capitalize text-black";

  if (!to) {
    return (
      <li aria-disabled="true">
        <span className={`${baseClasses} cursor-default`}>
          {icon}
          <p>{title}</p>
        </span>
      </li>
    );
  }

  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${baseClasses} ${isActive && "text-primary"}`
        }
      >
        {icon}
        <p>{title}</p>
      </NavLink>
    </li>
  );
}
