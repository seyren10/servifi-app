import { http } from "../../../lib/axios";
import type { Order } from "./type";

export const getPendingOrders = async () => {
  const res = await http.get<Order>("/api/v1/orders", {
    params: {
      populate: "products.product",
    },
  });

  return res.data;
};
