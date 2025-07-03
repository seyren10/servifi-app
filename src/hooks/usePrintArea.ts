import { useEffect, useRef } from "react";

export const usePrintArea = <T extends Element>(callback?: () => void) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;

    document.body.classList.add("invisible");
    node.classList.add(
      "visible",
      "absolute",
      "left-1/2",
      "-translate-x-1/2",
      "top-0",
    );

    if (callback) window.addEventListener("afterprint", callback);

    const timeout = setTimeout(() => {
      window.print();
    }, 0);

    return () => {
      clearTimeout(timeout);
      document.body.classList.remove("invisible");
      node.classList.remove(
        "visible",
        "absolute",
        "left-1/2",
        "-translate-x-1/2",
        "top-0",
      );

      if (callback) window.removeEventListener("afterprint", callback);
    };
  }, [callback]);

  return ref;
};
