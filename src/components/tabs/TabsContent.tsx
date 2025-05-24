import { useTabsContext } from ".";

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
};

export default function TabsContent({ value, children }: TabsContentProps) {
  const { value: active } = useTabsContext();

  if (value !== active) return null;

  return <div className="p-4">{children}</div>;
}
