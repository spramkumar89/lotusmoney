import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/client";

const initialState = {
  transactions: [],
  addTransaction: true,
  importTransaction: false,
  filterTransaction: false,
};

export const updateAppConfig = createAsyncThunk(
  "transaction/update",
  async (args, { dispatch, getState }) => {
    const session = await getSession();
    const appConfigRecord = getState().appConfig;

    console.log(
      `createAsyncThunk : updateAppConfig : ${JSON.stringify(
        appConfigRecord
      )} : name : ${session.user.name}`
    );
    const appConfigRecordResponse = await fetch(
      "/api/settings/updateAppConfig?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
        }),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appConfigRecord,
        }),
      }
    );
    if (!appConfigRecordResponse.ok) {
      console.log(
        `Error occured during App Config record update : ${JSON.stringify(
          appConfigRecordResponse
        )}`
      );
    }
    const appConfigRecordResponse_JSON = await appConfigRecordResponse.json();
    dispatch(updateAppConfigRevision(appConfigRecordResponse_JSON));
  }
);
export const appConfigSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    updateAddButton: (state, action) => {
      state.addTransaction = !state.addTransaction;
      state.importTransaction = state.filterTransaction = false;
    },
    updateImportButton: (state, action) => {
      state.importTransaction = !state.importTransaction;
      state.addTransaction = state.filterTransaction = false;
    },
    updateFilterButton: (state, action) => {
      state.filterTransaction = !state.filterTransaction;
      state.addTransaction = state.importTransaction = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAppConfig.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateAddButton, updateImportButton, updateFilterButton } =
  appConfigSlice.actions;

export default appConfigSlice.reducer;
