import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./features/tables/slice";
import orderReducer from "./features/orders/slice";
import userReducer from "./features/admin/slice";

export const store = configureStore({
  reducer: {
    tables: tableReducer,
    orders: orderReducer,
    users: userReducer,
  },
});

export const storeHasUser = () => {
  return !!store.getState().users.user;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
