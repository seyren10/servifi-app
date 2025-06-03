import { LoaderCircle } from "lucide-react";
import React, { useContext } from "react";
import { PopoverDispatchContext } from "../popover";
import type { SizeType, VariantType } from "../../types";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: VariantType;
  size?: SizeType;
  onClick?: () => void;
  loading?: boolean;
};

function getSizeClass(size: SizeType) {
  switch (size) {
    case "sm":
      return "px-3 py-1 text-xs h-8";
    case "md":
      return "px-4 h-10 text-sm";
    case "lg":
      return "text-base h-10 px-4";
    case "default":
      return "px-4 h-9 text-sm";
    default:
      break;
  }
}

function getVariantClass(variant: VariantType) {
  switch (variant) {
    case "default":
      return "bg-primary hover:bg-primary/90 text-white";
    case "secondary":
      return "bg-secondary hover:bg-secondary/90 text-white";
  }
}
export default function Button({
  variant = "default",
  size = "default",
  children,
  className,
  loading,
  onClick,
  ...props
}: Props) {
  const popoverDispatch = useContext(PopoverDispatchContext);

  const handleClick = () => {
    if (popoverDispatch) {
      popoverDispatch.setOpen(false);
    }

    if (onClick) onClick();
  };
  if (variant === "icon")
    return (
      <button
        onClick={handleClick}
        {...props}
        className={`border-primary [&>svg]:stroke-primary cursor-pointer rounded-full border p-1 [&>svg]:size-4 ${loading && "[&_svg:not([role=progressbar])]:hidden"} ${className}`}
      >
        {loading && (
          <LoaderCircle className="size-4 animate-spin" role="progressbar" />
        )}
        {children}
      </button>
    );

  return (
    <button
      disabled={loading}
      className={`${getVariantClass(variant)} ${loading && "[&_svg:not([role=progressbar])]:hidden"} disabled:bg-primary/50 flex cursor-pointer items-center justify-center gap-1 rounded-full font-medium [&_svg]:size-4 ${getSizeClass(size)} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <LoaderCircle className="size-4 animate-spin" role="progressbar" />
      )}
      {children}
    </button>
  );
}
