import { useEffect, useState } from "react";
import { DropdownMenuGroup, DropdownMenuItem } from "../dropdown-menu";
import type { Service } from "../../features/services/type";
import { getServices } from "../../features/services/api";
import type { AxiosError } from "axios";
import { Skeleton } from "../skeleton";
export default function ServicesDropdownGroup({
  onServiceSelect,
}: {
  onServiceSelect?: (serviceId: string) => void;
}) {
  const [services, setServices] = useState<Service[]>();
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const services = await getServices();
        setServices(services);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="space-y-1">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    );

  if (error) return <div>{error.message}</div>;

  return (
    <DropdownMenuGroup>
      {services?.map((service) => (
        <DropdownMenuItem
          key={service._id}
          className="capitalize"
          onSelect={() => onServiceSelect?.(service._id)}
        >
          {service.name}
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  );
}
