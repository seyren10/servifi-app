import { type ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  icon?: ReactNode;
};

const DashboardCard = ({ title, icon, value }: Props) => {
  return (
    <div className="relative isolate rounded-xl border p-4">
      <p className="text-muted-foreground text-sm capitalize">{title}</p>
      <p className="text-primary text-4xl font-bold">{value}</p>
      <div className="[&>svg]:stroke-primary/50 absolute top-4 right-4">
        {icon}
      </div>
    </div>
  );
};

export { DashboardCard };
