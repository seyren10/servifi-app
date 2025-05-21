import type React from "react";

type Props = {
  children?: React.ReactNode;
};
export default function Nav({ children }: Props) {
  return (
    <nav className="fixed bottom-2 inset-x-0 mx-2 py-4 px-8 bg-primary rounded-full text-white flex gap-4 justify-between">
      {children}
    </nav>
  );
}
