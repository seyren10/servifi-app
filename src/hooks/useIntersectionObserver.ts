import { useEffect, useRef, useState, type RefObject } from "react";

export const useIntersectionObserver = <T extends HTMLElement>(
  freezeOnceVisible: boolean = false,
  options?: IntersectionObserverInit,
) => {
  const ref = useRef<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = freezeOnceVisible && entry?.isIntersecting;

  useEffect(() => {
    const node = ref.current;
    if (!node || frozen) return;

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [options, frozen]);

  return [ref, entry] as [
    RefObject<T | null>,
    IntersectionObserverEntry | undefined,
  ];
};
