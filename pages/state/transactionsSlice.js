import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [
    {
      doc_type: "transaction",
      date: "",
      account: [],
      card:[],
      description: "",
      amount: "",
      category: [],
      goal:[],
    },
  ],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action) => {
      //TODO: Update logic
      state.transactions = action.payload;
    },
    deleteTransaction: (state, action) => {
      //TODO: Update logic
      state.transactions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTransaction,updateTransaction,deleteTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
