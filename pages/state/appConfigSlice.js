import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  config : {
    _id: "appConfig",
    docType: "appConfig",
    availableMonths: [],
    selectedMonth: "",
    incomeCategories: [],
    expenseCategories: [],
    goals: [],
  }
};

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    updateConfig: (state, action) => {
      state.config = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateConfig } = appConfigSlice.actions;

export default appConfigSlice.reducer;
