import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CredentialsStateType } from "./types";

export const initialState: CredentialsStateType = {
  secretKey: "",
  accessKeyId: "",
  bucketName: "",
  region: "",
  isLoggedIn: false,
};

const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<Omit<CredentialsStateType, "isLoggedIn" | "region">>
    ) => {
      state.accessKeyId = action.payload.accessKeyId;
      state.secretKey = action.payload.secretKey;
      state.bucketName = action.payload.bucketName;
      state.region = "eu-west-1";
      state.isLoggedIn = true;
    },
    resetCredentials: (state) => {
      state.secretKey = "";
      state.accessKeyId = "";
      state.bucketName = "";
      state.isLoggedIn = false;
      state.region = "";
    },
  },
});

export const { setCredentials, resetCredentials } = credentialsSlice.actions;
export default credentialsSlice.reducer;
