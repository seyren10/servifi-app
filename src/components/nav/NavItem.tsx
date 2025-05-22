import { Asterisk } from "lucide-react";
import React from "react";
import { NavLink, type To } from "react-router";

type Props = {
  title: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  to?: string | To;
};
export default function NavItem({ title, Icon = Asterisk, to }: Props) {
  const baseClasses =
    "inline-flex flex-col gap-1 items-center text-xs capitalize text-black";

  if (!to) {
    return (
      <li aria-disabled="true">
        <span className={`${baseClasses} cursor-default`}>
          <Icon />
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
        <Icon />
        <p>{title}</p>
      </NavLink>
    </li>
  );
}
