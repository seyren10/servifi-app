import { LoaderCircle } from "lucide-react";
import React, { useContext } from "react";
import { PopoverDispatchContext } from "../popover";

type Props = React.HtmlHTMLAttributes<HTMLButtonElement> & {
  variant?: "icon" | "none" | "default";
  onClick?: () => void;
  loading?: boolean;
};

export default function Button({
  variant = "default",
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
        className={`border-primary [&>svg]:stroke-primary cursor-pointer rounded-full border p-1 [&>svg]:size-4 ${className}`}
      >
        {children}
      </button>
    );

  return (
    <button
      disabled={loading}
      className={`${variant === "default" && "bg-primary hover:bg-primary/90 text-white"} disabled:bg-primary/50 flex h-9 cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm font-medium [&_svg]:size-4 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {loading && <LoaderCircle className="size-4 animate-spin" />}
      {children}
    </button>
  );
}
