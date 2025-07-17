import { type PropsWithChildren } from "react";
import type { OngoingService } from "../../../../features/ongoing-service/type";
import type { Table } from "../../../../features/tables/type";
import type { Service } from "../../../../features/services/type";
import { Button } from "../../../../components/button";
import { Check, HandPlatter } from "lucide-react";

type Props = PropsWithChildren;

function OngoingServiceCard({ children }: Props) {
  return <ul className="flex flex-wrap items-center gap-4">{children}</ul>;
}

function OngoingServiceCardItem({
  onGoingService,
  onSelect,
}: {
  onGoingService: OngoingService;
  onSelect?: (ongoingServiceId: string) => void;
}) {
  const table = onGoingService.table as Table;
  const service = onGoingService.service as Service;

  return (
    <li className="basis-xs space-y-4 rounded-xl border p-4 shadow-sm">
      <div className="border-b border-dashed pb-2 font-medium">
        Table no. {table.number}
      </div>

      <div className="mt-4 text-center">
        <div className="bg-muted mx-auto w-fit rounded-full px-2 text-lg font-bold tracking-wide capitalize">
          {service.name}
        </div>
        <p className="text-muted-foreground text-sm">Requested</p>
      </div>

      <div>
        <Button
          className="w-full"
          onClick={() => onSelect?.(onGoingService._id)}
        >
          <Check /> Complete
        </Button>
      </div>
    </li>
  );
}

function OngoingServiceCardEmpty() {
  return (
    <div className="border-foreground grid min-h-[30rem] place-content-center rounded-xl border border-dashed text-center">
      <HandPlatter className="stroke-foreground mx-auto" />
      <h3 className="mt-4 font-medium">No Ongoing Services Found</h3>
      <p className="text-muted-foreground text-sm">
        ongoing services will be displayed here as they are created.
      </p>
    </div>
  );
}

export { OngoingServiceCard, OngoingServiceCardItem, OngoingServiceCardEmpty };
