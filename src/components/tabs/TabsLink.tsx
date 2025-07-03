import React from "react";

import { NavLink, useHref, useLocation, type To } from "react-router";

type Props = {
  to: string | To;
  children?: React.ReactNode;
  className?: string;
  match?: "exact" | "include";
};

export default function TabsLink({
  to,
  children,
  className,
  match = "include",
}: Props) {
  const location = useLocation();
  const toValue = useHref(
    (typeof to === "object" ? to.pathname : to) as string,
  );

  const isActive =
    match === "exact"
      ? location.pathname === toValue
      : location.pathname.includes(toValue);

  return (
    <NavLink
      end
      className={() =>
        `relative px-4 py-2 text-sm font-medium ${isActive ? "tabs-active" : undefined} ${className}`
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}
