import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "userconfig",
  docType: "userconfig",
  userName: "",
  emailId: "",
  accounts: [],
  cards: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserState: (state, action) => {
      return action.payload;
    },
    addAccount: (state, action) => {
      state.accounts = state.accounts.push(action.payload);
    },
    addCard: (state, action) => {
      state.cards = state.cards.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserState, addAccount, addCard } = userSlice.actions;

export default userSlice.reducer;
