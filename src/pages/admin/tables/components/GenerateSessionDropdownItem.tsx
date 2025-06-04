import { ScanQrCode } from "lucide-react";
import { useSubmit } from "react-router";
import { DropdownMenuItem } from "../../../../components/dropdown-menu";

type Props = {
  tableId: string;
};

export default function GenerateSessionDropdownItem({ tableId }: Props) {
  const submit = useSubmit();

  const handleSubmit = () => {
    submit(null, {
      action: `${tableId}/generate-session`,
      method: "POST",
    });
  };

  return (
    <DropdownMenuItem
      onSelect={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <ScanQrCode />
      Generate Session
    </DropdownMenuItem>
  );
}
