import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./features/tables/slice";
import orderReducer from "./features/orders/slice";

export const store = configureStore({
  reducer: {
    tables: tableReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
