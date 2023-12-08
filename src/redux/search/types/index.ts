import { IAlbum, IArtist, ITrack } from "../../entities/types";

export default interface ISearchState extends ISearchParams {
  artists: ISearchField<IArtist>;
  albums: ISearchField<IAlbum>;
  tracks: ISearchField<ITrack>;
  page: number;
}

interface ISearchField<T = any> {
  total: number;
  items: T[];
}

export enum SearchType {
  Artist = "artist",
  Album = "album",
  Track = "track",
}

export interface ISearchParams {
  searchValue: string;
  type: SearchType;
  limit: number;
  offset?: number;
}
