import type React from "react";

type Props = {
  children?: React.ReactNode;
};
export default function Nav({ children }: Props) {
  return (
    <nav>
      <ul className="flex justify-between gap-4 px-8 py-4">{children}</ul>
    </nav>
  );
}
