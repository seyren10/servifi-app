import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderState, PendingOrder } from "./type";
import type { RootState } from "../../store";

const initialState: OrderState = {
  pendingOrders: [],
  totalBill: 0,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addPendingOrder: (state, action: PayloadAction<PendingOrder>) => {
      const pendingOrder = state.pendingOrders.find(
        (p) => p.product._id === action.payload.product._id,
      );

      if (pendingOrder) pendingOrder.quantity++;
      else state.pendingOrders.push(action.payload);
    },

    removePendingOrder: (state, action: PayloadAction<PendingOrder>) => {
      state.pendingOrders = removeOrder(state, action.payload);
    },
    clearPendingOrders: (state) => {
      state.pendingOrders = [];
    },
    decreaseQty: (state, action: PayloadAction<PendingOrder>) => {
      const pendingOrder = findOrder(state, action.payload);
      if (!pendingOrder) return;

      if (pendingOrder.quantity > 1) {
        pendingOrder.quantity--;
      } else {
        state.pendingOrders = removeOrder(state, action.payload);
      }
    },
    increaseQty: (state, action: PayloadAction<PendingOrder>) => {
      const pendingOrder = findOrder(state, action.payload);

      if (pendingOrder) {
        pendingOrder.quantity++;
      }
    },
    setQty: (state, action: PayloadAction<PendingOrder>) => {
      const pendingOrder = findOrder(state, action.payload);
      if (pendingOrder) {
        pendingOrder.quantity = action.payload.quantity;
      }
    },
    setBill: (state, action: PayloadAction<number>) => {
      state.totalBill = action.payload;
    },
  },
});

export const {
  addPendingOrder,
  decreaseQty,
  removePendingOrder,
  increaseQty,
  setQty,
  clearPendingOrders,
  setBill,
} = orderSlice.actions;

export default orderSlice.reducer;

/* DERIVED STATES */
export const selectHasOrders = (state: RootState) => {
  return !!state.orders.pendingOrders.length;
};
export const selectTotalOrderAmount = (state: RootState) => {
  return state.orders.pendingOrders.reduce<number>(
    (ac, c) => (ac += c.quantity),
    0,
  );
};
export const selectTotalPrice = (state: RootState) => {
  return state.orders.pendingOrders.reduce<number>(
    (ac, c) => (ac += c.product.price * c.quantity),
    0,
  );
};

export const selectTotalBill = (state: RootState) => {
  return state.orders.totalBill;
};

/* Helpers */

function findOrder(state: OrderState, pendingOrder: PendingOrder) {
  return state.pendingOrders.find(
    (po) => po.product._id === pendingOrder.product._id,
  );
}

function removeOrder(state: OrderState, pendingOrder: PendingOrder) {
  return state.pendingOrders.filter(
    (po) => po.product._id !== pendingOrder.product._id,
  );
}
