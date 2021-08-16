import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryWiseAmountsSlice: {"":[{}]},
};

export const categoryWiseAmountsSlice = createSlice({
  name: "categoryWiseAmountsSlice",
  initialState,
  reducers: {
    updatecategoryWiseAmountsSlice: (state, action) => {
      state.categoryWiseAmountsSlice = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatecategoryWiseAmountsSlice } = categoryWiseAmountsSlice.actions;

export default categoryWiseAmountsSlice.reducer;
