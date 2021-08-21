import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/client";

const initialState = {
  _id: "userconfig",
  docType: "userconfig",
  userName: "",
  emailId: "",
  accounts: [],
  cards: [],
};

export const updateUser = createAsyncThunk(
  "user/update",
  async (args, { dispatch, getState }) => {
    const session = await getSession();
    const userRecord = getState().user;
    console.log(
      `createAsyncThunk : updateUser : ${JSON.stringify(userRecord)} : name : ${
        session.user.name
      }`
    );
    const userRecordResponse = await fetch(
      "/api/settings/updateUserConfig?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
        }),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userRecord,
        }),
      }
    );
    if (!userRecordResponse.ok) {
      console.log(
        `Error occured during User record update : ${JSON.stringify(
          userRecordResponse
        )}`
      );
    }
    const userRecordResponse_JSON = await userRecordResponse.json();
    dispatch(updateUserStateRevision(userRecordResponse_JSON));
  }
);

export const loadUser = createAsyncThunk(
  "user/load",
  async (args, { dispatch, getState }) => {
    const session = await getSession();
    console.log(`Home page session values ${JSON.stringify(session)}`);
    const userConfigs = await fetch(
      "/api/settings/user?" +
        new URLSearchParams({ name: session.user.name.toLowerCase() }),
      { method: "GET" }
    );
    if (!userConfigs.ok) {
      console.log(`User config API error has occured: ${userConfigs}`);
    }
    let userConfigs_JSON = await userConfigs.json();
    console.log(`Loading user record : ${JSON.stringify(userConfigs_JSON)}`);

    dispatch(loadUserState(userConfigs_JSON));
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserState: (state, action) => {
      return action.payload;
    },
    updateUserStateRevision: (state, action) => {
      state._rev = action.payload.rev;
    },
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
    },
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { loadUserState, updateUserStateRevision, addAccount, addCard } =
  userSlice.actions;

export default userSlice.reducer;
