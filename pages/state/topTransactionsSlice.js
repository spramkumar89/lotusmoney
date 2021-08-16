import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topTransactions: [{}],
};

export const topTransactionsSlice = createSlice({
  name: "topTransactions",
  initialState,
  reducers: {
    updateTransaction: (state, action) => {
      state.topTransactions += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTransaction } = topTransactionsSlice.actions;

export default topTransactionsSlice.reducer;
