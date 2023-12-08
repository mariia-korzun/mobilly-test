import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import searchSlice from "./search";
import entitiesSlice from "./entities";
import { spotifyService } from "./services/spotifyService";

const store = configureStore({
  reducer: {
    auth: authSlice,
    search: searchSlice,
    entities: entitiesSlice,
    [spotifyService.reducerPath]: spotifyService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([spotifyService.middleware]),
});

store.subscribe(() => console.log(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export default store;
