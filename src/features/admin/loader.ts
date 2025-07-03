import { replace } from "react-router";
import { getUser } from "./auth/api";

export default async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return replace("/admin/signin");
  }

  try {
    const user = await getUser();

    return user;
    
  } catch (error) {
    localStorage.removeItem("token");
    return replace("/admin/signin");
  }
};
