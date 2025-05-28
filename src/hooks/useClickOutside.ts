import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(
  callback?: () => void,
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(this: Window, e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (callback) callback();
      }
    }

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [callback]);

  return ref;
};
