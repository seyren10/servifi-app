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
      className={`bg-foreground relative isolate aspect-${aspect} overflow-hidden rounded-md ${props.className}`}
    >
      <figure ref={ref} className="h-full w-full object-cover">
        {entry?.isIntersecting && src && <img src={src} {...props} />}
        {children}
      </figure>
    </div>
  );
}
