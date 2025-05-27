import { LoaderCircle } from "lucide-react";
import React from "react";

type Props = React.HtmlHTMLAttributes<HTMLButtonElement> & {
  variant?: "icon";
  loading?: boolean;
};

export default function Button({
  variant,
  children,
  className,
  loading,
  ...props
}: Props) {
  if (variant === "icon")
    return (
      <button
        {...props}
        className={`border-primary [&>svg]:stroke-primary rounded-full border p-1 [&>svg]:size-4 ${className}`}
      >
        {children}
      </button>
    );

  return (
    <button
      disabled={loading}
      className={`bg-primary hover:bg-primary/90 disabled:bg-primary/50 flex h-9 items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white [&_svg]:size-4 ${className}`}
      {...props}
    >
      {loading && <LoaderCircle className="size-4 animate-spin" />}
      {children}
    </button>
  );
}
