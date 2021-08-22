import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import appConfigSlice from "./appConfigSlice";
import homeSlice from "./homeSlice";
import transactionSlice from "./transactionSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    appConfig: appConfigSlice,
    home: homeSlice,
    transaction: transactionSlice,
  },
});
