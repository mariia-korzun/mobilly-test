import {
  IAlbumResponseItem,
  ITrackResponseItem,
  IArtistResponseItem,
  ISearchResponse,
} from "../../redux/services/types";
import { IAlbum, IArtist, ITrack } from "../../redux/entities/types";
import { SearchType } from "../../redux/search/types";

function transformSearchResponse(
  response: {
    [key: string]: ISearchResponse;
  },
  type: SearchType
): ISearchResponse {
  let { items, total } = response[`${type}s`];
  let transformedItems;

  switch (type) {
    case SearchType.Album:
      transformedItems = items.map((item) =>
        transformAlbumResponse(item as IAlbumResponseItem)
      );
      break;
    case SearchType.Artist:
      transformedItems = items.map((item) =>
        transformArtistResponse(item as IArtistResponseItem)
      );
      break;

    case SearchType.Track:
      transformedItems = items.map((item) =>
        transformTrackResponse(item as ITrackResponseItem)
      );
      break;
  }

  return {
    type,
    total,
    items: transformedItems,
  };
}

export function transformArtistResponse({
  genres,
  id,
  name,
  images,
  followers,
}: IArtistResponseItem): IArtist {
  return { genres, id, name, images, followers };
}

export function transformAlbumResponse({
  release_date,
  id,
  name,
  artists,
  images,
  total_tracks,
}: IAlbumResponseItem): IAlbum {
  return {
    releaseDate: release_date,
    id,
    name,
    artists: artists.map(transformArtistResponse),
    images,
    totalTracks: total_tracks,
  };
}

export function transformTrackResponse({
  duration_ms,
  id,
  name,
  artists,
  album,
}: ITrackResponseItem): ITrack {
  return {
    duration: duration_ms,
    id,
    name,
    artists: artists.map(transformArtistResponse),
    album: album.name,
  };
}

export { transformSearchResponse };
