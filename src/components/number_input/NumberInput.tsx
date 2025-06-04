import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../button";

type Props = {
  value: number;
  setValue: (value: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
};
export default function NumberInput({
  value,
  onDecrease,
  onIncrease,
  setValue,
}: Props) {
  function handleIncrease() {
    if (onIncrease) onIncrease();
  }

  function handleDecrease() {
    if (onDecrease) onDecrease();
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        size="icon"
        onClick={handleDecrease}
        aria-label="Decrease quantity"
      >
        {value > 1 ? <Minus /> : <Trash />}
      </Button>
      <input
        type="number"
        aria-label="Quantity"
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        className="appearance-['text-field'] no-spinner max-w-10 pl-1 text-center"
      />
      <Button
        size="icon"
        onClick={handleIncrease}
        aria-label="Increase quantity"
      >
        <Plus />
      </Button>
    </div>
  );
}
