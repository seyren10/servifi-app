import type { ActionFunctionArgs } from "react-router";
import { completeOrder } from "../../orders/api";

export const completeOrderAction = async ({ params }: ActionFunctionArgs) => {
  const { orderId } = params;

  if (orderId) {
    await completeOrder(orderId);
  }
};
