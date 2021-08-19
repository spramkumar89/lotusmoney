import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "appConfig",
  docType: "appConfig",
  availableMonths: [],
  selectedMonth: "",
  incomeCategories: [],
  expenseCategories: [],
  goals: [],
};

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    updateAppConfig: (state, action) => {
      return action.payload;
    },
    addIncomeCategory: (state, action) => {
      state.incomeCategories = state.incomeCategories.push(action.payload);
    },
    addExpenseCategory: (state, action) => {
      state.expenseCategories = state.expenseCategories.push(action.payload);
    },
    addGoal: (state, action) => {
      state.goals = state.goals.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateAppConfig,
  addIncomeCategory,
  addExpenseCategory,
  addGoal,
} = appConfigSlice.actions;

export default appConfigSlice.reducer;
