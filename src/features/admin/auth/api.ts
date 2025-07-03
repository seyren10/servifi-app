import { http } from "../../../lib/axios";
import type { LoginCredentials, SigninResponse, User } from "./type";

export const signin = async (payload: LoginCredentials) => {
  const res = await http.post<SigninResponse>("/api/v1/auth/signin", payload);
  return res.data;
};

export const getUser = async () => {
  const res = await http.get<User>("/api/v1/auth/me");

  return res.data;
};
