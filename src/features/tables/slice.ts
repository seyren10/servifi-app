import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Table, TableState } from "./type";

const initialState: TableState = {
  table: null,
};

export const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTable: function (state, action: PayloadAction<Table>) {
      state.table = action.payload;
    },
    setTableFromLocalStorage: function (state, action: PayloadAction<string>) {
      state.table = JSON.parse(action.payload);
    },
  },
});

export const { setTable, setTableFromLocalStorage } = tableSlice.actions;
export default tableSlice.reducer;
