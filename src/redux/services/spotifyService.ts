import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { setAccessToken } from "../auth";
import { ISearchParams } from "../search/types";
import { transformSearchResponse } from "../../common/helpers";
import { ISearchResponse, ITrackResponseItem } from "./types";
import {
  transformAlbumResponse,
  transformArtistResponse,
  transformTrackResponse,
} from "../../common/helpers/transformSearchResponse";
import { IAlbum, IArtist, ITrack } from "../entities/types";

const HOST: string = "https://api.spotify.com/v1";
const TOKEN_HOST: string = "https://accounts.spotify.com/api";

interface ITokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const baseQuery = fetchBaseQuery({
  baseUrl: HOST,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;

    if (token) {
      headers.set("Authorization", `${token.tokenType} ${token.accessToken}`);
    }

    return headers;
  },
});

const baseTokenQuery = fetchBaseQuery({
  baseUrl: TOKEN_HOST,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const { auth } = api.getState() as RootState;

  if (result.error && result.error.status === 401) {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", auth.clientId);
    params.append("client_secret", auth.clientSecret);

    const refreshResult = await baseTokenQuery(
      {
        url: "/token",
        method: "POST",
        body: params,
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { access_token: accessToken, token_type: tokenType } =
        refreshResult.data as ITokenResponse;

      api.dispatch(setAccessToken({ accessToken, tokenType }));

      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const spotifyService = createApi({
  reducerPath: "spotifyService",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSearch: builder.query<ISearchResponse, ISearchParams>({
      query: ({ searchValue, type, limit, offset }) => ({
        url: "/search",
        params: {
          q: searchValue,
          type,
          limit,
          offset,
          market: "US",
        },
      }),
      serializeQueryArgs: ({
        endpointName,
        queryArgs: { type, searchValue },
      }) => {
        return endpointName + type + searchValue;
      },
      merge: (currentCache, newItems) => {
        let usedIds = currentCache.items.map((item) => item.id);
        let filteredItems = (newItems.items as ITrackResponseItem[]).filter(
          (item) => !usedIds.includes(item.id)
        );

        currentCache.items = [...currentCache.items, ...filteredItems];
        currentCache.total = newItems.total;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: (
        baseQueryReturnValue: { [key: string]: ISearchResponse },
        meta,
        arg
      ) => {
        return transformSearchResponse(baseQueryReturnValue, arg.type);
      },
    }),
    getArtist: builder.query<IArtist, string>({
      query: (id) => ({
        url: `/artists/${id}`,
      }),
      transformResponse: transformArtistResponse,
    }),
    getAlbum: builder.query<IAlbum, string>({
      query: (id) => ({
        url: `/albums/${id}`,
      }),
      transformResponse: transformAlbumResponse,
    }),
    getTrack: builder.query<ITrack, string>({
      query: (id) => ({
        url: `/tracks/${id}`,
      }),
      transformResponse: transformTrackResponse,
    }),
  }),
});
