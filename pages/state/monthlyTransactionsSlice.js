import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  monthlyTransactions: {"":[{}]},
};

export const monthlyTransactionsSlice = createSlice({
  name: "monthlyTransactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.monthlyTransactions.push(action.payload);
    },
    updateTransaction: (state, action) => {
      //TODO: Update Logic
      state.monthlyTransactions = action.payload;
    },
    deleteTransaction: (state, action) => {
      //TODO: Update Logic
      state.monthlyTransactions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTransaction, updateTransaction, deleteTransaction } = monthlyTransactionsSlice.actions;

export default monthlyTransactionsSlice.reducer;
