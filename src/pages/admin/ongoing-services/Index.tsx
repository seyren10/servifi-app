import { useFetcher, useLoaderData, useRevalidator } from "react-router";
import AdminSectionHeading from "../../../components/app/AdminSectionHeading";
import {
  OngoingServiceCard,
  OngoingServiceCardEmpty,
  OngoingServiceCardItem,
} from "./components/OngoingServiceCard";
import type { OngoingService } from "../../../features/ongoing-service/type";
import { useSocket } from "../../../hooks/useSocket";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Index() {
  const fetcher = useFetcher();
  const ongoingServices = useLoaderData<OngoingService[]>();
  const revalidator = useRevalidator();

  const { on } = useSocket({
    url: import.meta.env.VITE_API_BASE_URL,
  });

  useEffect(() => {
    on("ongoing-service-created", (data: { message: string }) => {
      toast.info("New service added", {
        description: data.message,
      });
      revalidator.revalidate();
    });
  }, []);

  const handleCompleteOngoingService = (ongoingServiceId: string) => {
    fetcher.submit(null, {
      action: `${ongoingServiceId}/complete`,
      method: "PUT",
    });
  };

  return (
    <div className="space-y-6">
      <AdminSectionHeading
        title="Services"
        description="Manage and configure service offerings"
      />

      <main>
        {ongoingServices.length ? (
          <OngoingServiceCard>
            {ongoingServices.map((service) => (
              <OngoingServiceCardItem
                onGoingService={service}
                onSelect={handleCompleteOngoingService}
                key={service._id}
              />
            ))}
          </OngoingServiceCard>
        ) : (
          <OngoingServiceCardEmpty />
        )}
      </main>
    </div>
  );
}
