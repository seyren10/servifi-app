import { createContext, useContext } from "react";

export { default as Tabs } from "./Tabs";
export { default as TabsTrigger } from "./TabsTrigger";
export { default as TabsLink } from "./TabsLink";
export { default as TabsList } from "./TabsList";
export { default as TabsContent } from "./TabsContent";

type TabsContextType = {
  value: string;
  setValue: (val: string) => void;
};

export const TabsContext = createContext<TabsContextType | undefined>(
  undefined,
);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("useTabsContext must be used inside <Tabs>");
  return context;
};
