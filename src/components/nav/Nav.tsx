import type React from "react";

type Props = {
  children?: React.ReactNode;
};
export default function Nav({ children }: Props) {
  return (
    <nav>
      <ul className="py-4 px-8  text-white flex gap-4 justify-between">
        {children}
      </ul>
    </nav>
  );
}
