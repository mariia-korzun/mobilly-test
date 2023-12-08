import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IState, { IAlbum, IArtist, ITrack } from "./types";

const initialState: IState = {
  isError: false,
};

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    setArtist(state: IState, { payload }: PayloadAction<IArtist>): IState {
      return { ...state, artist: payload };
    },
    setAlbum(state: IState, { payload }: PayloadAction<IAlbum>): IState {
      return { ...state, album: payload };
    },
    setTrack(state: IState, { payload }: PayloadAction<ITrack>): IState {
      return { ...state, track: payload };
    },
    setError(state: IState, { payload }: PayloadAction<boolean>): IState {
      return { ...state, isError: payload };
    },
  },
});

export const { setArtist, setAlbum, setTrack, setError } =
  entitiesSlice.actions;

export default entitiesSlice.reducer;
