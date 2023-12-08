import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IState, { SearchType } from "./types";
import { ISearchResponse } from "../services/types";

const initialState: IState = {
  searchValue: "",
  type: SearchType.Artist,
  limit: 50,
  page: 0,
  albums: { total: 0, items: [] },
  artists: { total: 0, items: [] },
  tracks: { total: 0, items: [] },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setData(
      state: IState,
      { payload: { type, total, items } }: PayloadAction<ISearchResponse>
    ): IState {
      const field = `${type}s`;
      return { ...state, [field]: { total, items } };
    },
    setSearchValue(state: IState, { payload }: PayloadAction<string>): IState {
      return { ...state, searchValue: payload };
    },
    setPage(state: IState, { payload }: PayloadAction<number>): IState {
      return { ...state, page: payload };
    },
    setType(state: IState, { payload }: PayloadAction<SearchType>): IState {
      return { ...state, type: payload };
    },
  },
});

export const { setData, setSearchValue, setPage, setType } =
  searchSlice.actions;

export default searchSlice.reducer;
