import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uncategorizedTransactions: [{}],
};

export const uncategorizedTransactionsSlice = createSlice({
  name: "uncategorizedTransactions",
  initialState,
  reducers: {
    updateTransaction: (state, action) => {
      state.uncategorizedTransactions = action.payload;
    },
    deleteTransaction: (state, action) => {
      //TODO: Update logic
      state.uncategorizedTransactions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTransaction, deleteTransaction } = uncategorizedTransactionsSlice.actions;

export default uncategorizedTransactionsSlice.reducer;
