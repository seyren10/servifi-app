import React from "react";
import { NavLink, type To } from "react-router";

type Props = {
  to: string | To;
  children?: React.ReactNode;
  className?: string;
};

export default function TabsLink({ to, children, className }: Props) {
  return (
    <NavLink
      end
      className={({ isActive }) =>
        `relative px-4 py-2 text-sm font-medium ${isActive ? "tabs-active" : undefined} ${className}`
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}
