import type React from "react";
import { useState } from "react";
import { TabsContext } from ".";

type Props = {
  defaultValue: string;
  children?: React.ReactNode;
};

export default function Tabs({ defaultValue, children }: Props) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}
