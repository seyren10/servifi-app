import { replace, type ActionFunctionArgs } from "react-router";
import { signin } from "./api";
import type { AxiosError } from "axios";
import type { SigninResponse } from "./type";

export default async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email?.trim() || !password?.trim())
    return {
      error: "Email and password are required.",
    };

  const res = await signin({
    email,
    password,
  }).catch((err) => {
    const axiosError = err as AxiosError<{ message: string; type: string }>;
    return {
      error: axiosError.response?.data.message,
    };
  });

  const resData = res as SigninResponse;
  if (resData.token) {
    localStorage.setItem("token", resData.token);
    return replace("/admin");
  }
  return res;
};
