import { type ImgHTMLAttributes, type PropsWithChildren } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type Props = PropsWithChildren &
  ImgHTMLAttributes<HTMLImageElement> & {
    src?: string;
    aspect?: "square" | "video";
  };

export default function Image({
  children,
  aspect = "square",
  src,
  ...props
}: Props) {
  const [ref, entry] = useIntersectionObserver(true);

  return (
    <div
      className={`bg-foreground relative isolate aspect-${aspect} overflow-hidden rounded-md`}
    >
      <figure ref={ref}>
        {entry?.isIntersecting && src && <img src={src} {...props} />}
        {children}
      </figure>
    </div>
  );
}
