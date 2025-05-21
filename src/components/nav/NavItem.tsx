import { Asterisk } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  Icon?: React.ElementType;
};

export default function NavItem({ title, Icon = Asterisk }: Props) {
  return (
    <div className="inline-flex flex-col gap-1 items-center">
      <Icon />
      <p className="text-xs capitalize">{title}</p>
    </div>
  );
}
