import React, { useEffect, useRef } from "react";
import { usePopoverContext, usePopoverDispatchContext } from ".";
import { createPortal } from "react-dom";
import { useClickOutside } from "../../hooks/useClickOutside";

type Props = {
  children?: React.ReactNode;
  className?: string;
  gutter?: number;
};

export default function PopoverContent({
  children,
  className,
  gutter = 4,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { open, triggerRect } = usePopoverContext();
  const { setOpen } = usePopoverDispatchContext();
  const clickRef = useClickOutside(() => setOpen(false));

  useEffect(() => {
    if (open) {
      clickRef.current = ref.current;

      document.body.classList.add("pointer-events-none");

      if (ref.current && triggerRect) {
        
        const rect = ref.current?.getBoundingClientRect();
        const contentHeight = triggerRect.top - rect.height - gutter;
        const contentLeft = triggerRect.right - rect.width - gutter;

        ref.current.style.top = `${contentHeight}px`;
        ref.current.style.left = `${contentLeft}px`;
      }
    } else {
      document.body.classList.remove("pointer-events-none");
      clickRef.current = null;
    }
  }, [clickRef, gutter, open, triggerRect]);

  if (!open || !triggerRect) {
    return null;
  }

  return createPortal(
    <div
      ref={ref}
      className={`pointer-events-auto absolute top-0 left-0 max-w-[90%] ${className}`}
    >
      {children}
    </div>,
    document.body,
  );
}
