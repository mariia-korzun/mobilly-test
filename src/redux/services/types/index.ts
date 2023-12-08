import { SearchType } from "../../search/types";
import { IArtist } from "../../entities/types";
import { IImage } from "../../../common/types";

export type ISearchResponse =
  | ISearchAlbumsResponse
  | ISearchArtistsResponse
  | ISearchTracksResponse;

interface ISearchResponseData<T = any> {
  type: SearchType;
  total: number;
  items: T[];
}

export type ISearchArtistsResponse = ISearchResponseData<IArtistResponseItem>;
export type ISearchAlbumsResponse = ISearchResponseData<IAlbumResponseItem>;
export type ISearchTracksResponse = ISearchResponseData<ITrackResponseItem>;

export type IArtistResponseItem = IArtist;

export type IAlbumResponseItem = {
  id: string;
  name: string;
  artists: IArtistResponseItem[];
  release_date: string;
  total_tracks: number;
  images: IImage[];
};

export type ITrackResponseItem = {
  id: string;
  name: string;
  duration_ms: number;
  album: IAlbumResponseItem;
  artists: IArtistResponseItem[];
};
