import { useId, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, ...props }: Props) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1 text-sm">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        className="border-foreground w-full rounded-xl border p-2 ring-offset-2 outline-none focus-visible:ring-2"
        id={id}
        {...props}
      />
    </div>
  );
}
