import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/client";

const initialState = {
  _id: "appConfig",
  docType: "appConfig",
  incomeCategories: [],
  expenseCategories: [],
  goals: [],
};

export const updateAppConfig = createAsyncThunk(
  "appConfig/update",
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

export const loadAppConfig = createAsyncThunk(
  "appConfig/load",
  async (args, { dispatch, getState }) => {
    const session = await getSession();
    console.log(`Home page session values ${JSON.stringify(session)}`);
    const apiConfigs = await fetch(
      "/api/settings/appConfig?" +
        new URLSearchParams({ name: session.user.name.toLowerCase() }),
      { method: "GET" }
    );
    if (!apiConfigs.ok) {
      console.log(`App config API error has occured: ${apiConfigs}`);
    }
    let apiConfigs_JSON = await apiConfigs.json();
    console.log(
      `Loading apiConfig record : ${JSON.stringify(apiConfigs_JSON)}`
    );

    dispatch(loadAppConfigState(apiConfigs_JSON));
  }
);

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    loadAppConfigState: (state, action) => {
      return action.payload;
    },
    updateAppConfigRevision: (state, action) => {
      state._rev = action.payload.rev;
    },
    addIncomeCategory: (state, action) => {
      state.incomeCategories.push(action.payload);
    },
    addExpenseCategory: (state, action) => {
      state.expenseCategories.push(action.payload);
    },
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAppConfig.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(loadAppConfig.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  loadAppConfigState,
  updateAppConfigRevision,
  addIncomeCategory,
  addExpenseCategory,
  addGoal,
} = appConfigSlice.actions;

export default appConfigSlice.reducer;
