import { useNavigate } from "react-router";
import { DropdownMenuItem } from "../../../../components/dropdown-menu";
import { Pencil } from "lucide-react";

type Props = {
  tableId: string;
};

export default function EditDropdownItem({ tableId }: Props) {
  const navigate = useNavigate();
  return (
    <DropdownMenuItem
      onSelect={(e) => {
        e.preventDefault();
        navigate(`${tableId}/edit`);
      }}
    >
      <Pencil /> <span>Edit</span>
    </DropdownMenuItem>
  );
}
