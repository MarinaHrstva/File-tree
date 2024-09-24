import { configureStore } from "@reduxjs/toolkit";
import credentials from "./credentialsSlice";
import fileTree from "./fileTreeSlice";

const store = configureStore({
  reducer: {
    credentials: credentials,
    fileTree: fileTree,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
