import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/client";

const initialState = {
  monthlyTransactions: [],
  topTransactions: [],
  categoryWiseAmounts: [],
  uncategorizedTransactions: [],
  selectedMonth: "",
  availableMonths: [],
};

export const updateAvailableMonths = createAsyncThunk(
  "home/updateAvailableMonths",
  async (args, { dispatch, getState }) => {
    const session = await getSession();
    const monthsarr = [
      undefined,
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    console.log(
      `home/updateAvailableMonths : URL : ${
        "/api/home/months?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
        })
      }`
    );
    const monthsResponse = await fetch(
      "/api/home/months?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
        }),
      {
        method: "GET",
      }
    );
    if (!monthsResponse.ok) {
      console.log(`An error has occured: ${monthsResponse}`);
      monthsResponse.rows = "NO_USER_RECORD";
    }
    let monthResponse_JSON = await monthsResponse.json();
    console.log(
      `home/updateAvailableMonths : ${JSON.stringify(monthResponse_JSON.rows)}`
    );
    dispatch(loadAvailableMonths(monthResponse_JSON.rows));

    //Setting the selectedMonth variable
    let result = monthResponse_JSON.rows;
    let value = result[result.length - 1];
    value = monthsarr[parseInt(value.key[0])] + " " + value.key[1];
    dispatch(updateSelectedMonth(value));
  }
);

export const updateMonthlyTransactions = createAsyncThunk(
  "home/updateMonthlyTransactions",
  async (date, { dispatch, getState }) => {
    const session = await getSession();
    const monthlyTransactionResponse = await fetch(
      "/api/home/monthlytransaction?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
          month: date.getMonth(),
          year: date.getFullYear(),
        }),
      {
        method: "GET",
      }
    );
    if (!monthlyTransactionResponse.ok) {
      console.log(`An error has occured: ${monthlyTransactionResponse}`);
      monthlyTransactionResponse.rows = "NO_USER_RECORD";
    }
    let monthlyTransactionResponse_JSON =
      await monthlyTransactionResponse.json();
    console.log(
      `home/updateMonthlyTransactions : ${JSON.stringify(
        monthlyTransactionResponse_JSON.rows
      )}`
    );
    dispatch(loadMonthlyTransactions(monthlyTransactionResponse_JSON.rows));
  }
);

export const updateTopTransactions = createAsyncThunk(
  "home/updateTopTransactions",
  async (date, { dispatch, getState }) => {
    const session = await getSession();
    const topTransactionResponse = await fetch(
      "/api/home/toptransactions?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
          month: date.getMonth(),
          year: date.getFullYear(),
        }),
      {
        method: "GET",
      }
    );
    if (!topTransactionResponse.ok) {
      console.log(`An error has occured: ${topTransactionResponse}`);
      topTransactionResponse.rows = "NO_USER_RECORD";
    }
    let topTransactionResponse_JSON = await topTransactionResponse.json();
    console.log(
      `home/updateTopTransactions : ${JSON.stringify(
        topTransactionResponse_JSON.rows
      )}`
    );
    dispatch(loadTopTransactions(topTransactionResponse_JSON.rows));
  }
);

export const updateCategoryWiseAmounts = createAsyncThunk(
  "home/updateCategoryWiseAmounts",
  async (date, { dispatch, getState }) => {
    const session = await getSession();
    const categoryWise = await fetch(
      "/api/home/categoryvalues?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
          month: date.getMonth(),
          year: date.getFullYear(),
        }),
      {
        method: "GET",
      }
    );
    if (!categoryWise.ok) {
      console.log(`An error has occured: ${categoryWise}`);
    }
    let categoryWise_JSON = await categoryWise.json();
    console.log(
      `home/updateCategoryWiseAmounts ${JSON.stringify(categoryWise_JSON)}`
    );
    dispatch(loadCategoryWiseAmounts(categoryWise_JSON));
  }
);

export const updateUncategorizedTransactions = createAsyncThunk(
  "home/updateUncategorizedTransactions",
  async (date, { dispatch, getState }) => {
    const session = await getSession();
    const uncategorizedResponse = await fetch(
      "/api/home/uncategorized?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
          month: date.getMonth(),
          year: date.getFullYear(),
        }),
      {
        method: "GET",
      }
    );
    if (!uncategorizedResponse.ok) {
      console.log(`An error has occured: ${uncategorizedResponse}`);
      uncategorizedResponse.rows = "NO_USER_RECORD";
    }
    let uncategorizedResponse_JSON = await uncategorizedResponse.json();
    console.log(
      `home/updateUncategorizedTransactions : ${JSON.stringify(
        uncategorizedResponse_JSON.rows
      )}`
    );
    dispatch(loadUncategorizedTransactions(uncategorizedResponse_JSON.rows));
  }
);

export const userSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    loadMonthlyTransactions: (state, action) => {
      state.monthlyTransactions = action.payload;
    },
    loadTopTransactions: (state, action) => {
      state.topTransactions = action.payload;
    },
    loadCategoryWiseAmounts: (state, action) => {
      state.categoryWiseAmounts = action.payload;
    },
    loadUncategorizedTransactions: (state, action) => {
      state.uncategorizedTransactions = action.payload;
    },
    loadAvailableMonths: (state, action) => {
      console.log(
        `loadAvailableMonths : ${JSON.stringify(
          action.payload
        )} : state : ${JSON.stringify(state)}`
      );
      state.availableMonths = action.payload;
    },
    updateSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAvailableMonths.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateMonthlyTransactions.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateTopTransactions.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateCategoryWiseAmounts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateUncategorizedTransactions.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  loadMonthlyTransactions,
  loadTopTransactions,
  loadCategoryWiseAmounts,
  loadUncategorizedTransactions,
  loadAvailableMonths,
  updateSelectedMonth,
} = userSlice.actions;

export default userSlice.reducer;
