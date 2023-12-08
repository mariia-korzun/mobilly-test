import { IImage } from "../../../common/types";

export default interface IEntitiesState {
  artist?: IArtist;
  album?: IAlbum;
  track?: ITrack;
  isError: boolean;
}

export interface IArtist {
  id: string;
  name: string;
  genres?: string[];
  images?: IImage[];
  followers?: {
    href: string;
    total: number;
  };
}

export interface IAlbum {
  id: string;
  name: string;
  images: IImage[];
  releaseDate: string;
  artists: IArtist[];
  totalTracks: number;
}

export interface ITrack {
  id: string;
  name: string;
  duration: number;
  album: string;
  artists: IArtist[];
}
