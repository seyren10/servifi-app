import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderState, PendingOrder } from "./type";
import type { RootState } from "../../store";

const initialState: OrderState = {
  pendingOrders: [],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addPendingOrder: (state, payload: PayloadAction<PendingOrder>) => {
      state.pendingOrders.push(payload.payload);
    },
  },
});

export const { addPendingOrder } = orderSlice.actions;

export default orderSlice.reducer;

/* DERIVED STATES */
export const selectHasOrders = (state: RootState) => {
  return !!state.orders.pendingOrders.length;
};
