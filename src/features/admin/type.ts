import type { User } from "./auth/type";

export type AdminStateContext = {
  user: User | null;
};
