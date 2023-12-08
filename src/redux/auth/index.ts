import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IState, { IAccessToken } from "./types";

const initialState: IState = {
  clientId: "33f18473c9864e51adb9623b94d829aa",
  clientSecret: "ac004494f47347b7a42471080a29b36f",
};

const tokenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(
      state: IState,
      { payload }: PayloadAction<IAccessToken>
    ): IState {
      return { ...state, token: payload };
    },
  },
});

export const { setAccessToken } = tokenSlice.actions;

export default tokenSlice.reducer;
