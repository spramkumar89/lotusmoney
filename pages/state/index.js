import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import appConfigSlice from "./appConfigSlice";
import homeSlice from "./homeSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    appConfig: appConfigSlice,
    home: homeSlice,
  },
});
