import React from "react";

type Props = React.HtmlHTMLAttributes<HTMLButtonElement> & {
  variant?: "icon";
};

export default function Button({
  variant,
  children,
  className,
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
      {...props}
      className={`bg-primary hover:bg-primary/90 h-9 rounded-full px-4 py-2 text-sm font-medium text-white ${className}`}
    >
      {children}
    </button>
  );
}
