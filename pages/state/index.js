import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import appConfigSlice from "./appConfig";
import transactionsSlice from "./transactionsSlice";
import categoryWiseAmountsSlice from "./categoryWiseAmountsSlice";
import monthlyTransactionsSlice from "./monthlyTransactionsSlice";
import topTransactionsSlice from "./topTransactionsSlice";
import uncategorizedTransactionsSlice from "./uncategorizedTransactionsSlice";

export const store = configureStore({
  reducer: { 
    user: userSlice,
    appConfig: appConfigSlice ,
    transactions: transactionsSlice,
    categoryWiseAmounts : categoryWiseAmountsSlice,
    monthlyTransactions : monthlyTransactionsSlice,
    topTransaction : topTransactionsSlice,
    uncategorizedTransactions : uncategorizedTransactionsSlice,
  },
});
