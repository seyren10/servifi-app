import { useLayoutEffect, useRef, useState, type RefObject } from "react";

type ElementSizeOptions = {
  updateOnResize?: boolean;
};
export const useElementSize = <T extends HTMLElement>(
  options: ElementSizeOptions = {
    updateOnResize: true,
  },
): [RefObject<T | null>, DOMRect | undefined] => {
  const ref = useRef<T | null>(null);

  const [rect, setRect] = useState<DOMRect>();

  const updateSize = () => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  };

  useLayoutEffect(() => {
    updateSize();

    if (options.updateOnResize) window.addEventListener("resize", updateSize); //cleanup observer

    return () => {
      if (options.updateOnResize)
        window.removeEventListener("resize", updateSize);
    };
  }, []);

  return [ref, rect];
};
