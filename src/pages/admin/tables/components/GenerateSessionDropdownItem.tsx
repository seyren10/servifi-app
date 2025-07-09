import { ScanQrCode } from "lucide-react";
import { useSubmit } from "react-router";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../../../../components/dropdown-menu";
import { useContext } from "react";
import { AdminTableContext } from "../AdminTable";

type Props = {
  tableId: string;
};

export default function GenerateSessionDropdownItem({ tableId }: Props) {
  const submit = useSubmit();
  const { promos } = useContext(AdminTableContext);

  const hasPromos = !!promos && promos.length > 0;

  const handleSubmit = (promoId: string) => {
    submit(promoId, {
      action: `${tableId}/promo/${promoId}/generate-session`,
      method: "POST",
    });
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <ScanQrCode className="stroke-muted-foreground mr-2 size-4" /> Generate
        Session
      </DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {hasPromos &&
            promos.map((promo) => (
              <DropdownMenuItem onClick={handleSubmit.bind(null, promo._id)} key={promo._id}>
                {promo.title}
              </DropdownMenuItem>
            ))}

          {!hasPromos && (
            <DropdownMenuItem>No promos available</DropdownMenuItem>
          )}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
