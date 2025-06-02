import { http } from "../../lib/axios";
import type { OrderSummary, CreateOrderPayload } from "./type";

export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await http.post("/api/v1/orders", payload);

  return res;
};

export const getOrderSummary = async (tableId: string) => {
  const res = await http.get<OrderSummary>(
    `/api/v1/orders/table/${tableId}/summary`,
  );
  return res.data;
};

export const completeOrder = async (orderId: string) => {
  const res = await http.patch(`/api/v1/orders/${orderId}/complete`);

  return res.data;
};
