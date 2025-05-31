import { createContext, useContext } from "react";
import type { User } from "./auth/type";

export const AdminContext = createContext<User | undefined>(undefined);

export const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (!context)
    throw new Error("useAdminContext must be used within AdminContextProvider");

  return context;
};
