import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user : {
    _id: "userconfig",
    docType: "userconfig",
    userName: "",
    emailId: "",
    accounts: [],
    cards: [],
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
