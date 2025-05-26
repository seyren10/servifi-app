import { http } from "../../lib/axios";
import type { CreateOrderPayload } from "./type";

export const createOrder = async (payload: CreateOrderPayload) => {
  try {
    const res = await http.post("/api/v1/orders", payload);

    return res;
  } catch (error) {
    console.log(error);
  }
};
