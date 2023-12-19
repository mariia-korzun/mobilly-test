import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IState, { IAccessToken } from "./types";

const initialState: IState = {
  clientId: "3e759922ab3f42649af2686278fe276d",
  clientSecret: "91a7ed87bd6c496e89043b5007c4737e",
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
