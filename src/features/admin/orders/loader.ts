import { getPendingOrders } from "./api";

export default async () => {
  const orders = await getPendingOrders();

  return orders;
};
