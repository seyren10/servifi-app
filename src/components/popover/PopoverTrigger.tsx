import { useEffect, type ReactNode } from "react";
import { useElementSize } from "../../hooks/useElementSize";
import { usePopoverContext, usePopoverDispatchContext } from ".";

type Props = {
  children?: ReactNode;
};

export default function PopoverTrigger({ children }: Props) {
  const { open } = usePopoverContext();
  const { setTriggerRect, setOpen } = usePopoverDispatchContext();
  const [ref, rect] = useElementSize<HTMLButtonElement>();

  useEffect(() => {
    if (!rect || !setTriggerRect || !open) return;

    setTriggerRect(rect);
  }, [open, rect, setTriggerRect]);

  const handleClick = () => {
    if (!rect || !setTriggerRect) return;

    setOpen(!open);
    setTriggerRect(rect);
  };

  return (
    <button ref={ref} onClick={handleClick}>
      {children}
    </button>
  );
}
