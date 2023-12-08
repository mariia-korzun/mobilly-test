import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { spotifyService } from "../../redux/services/spotifyService";
import { useDispatch } from "react-redux";
import { setAlbum, setError } from "../../redux/entities";
import { Spinner } from "..";
import { useAppSelector } from "../../redux/hooks";

function AlbumDetails() {
  const dispatch = useDispatch();
  const { album } = useAppSelector(({ entities }) => entities);
  const { id } = useParams();
  const { data, isLoading, isError } = spotifyService.useGetAlbumQuery(
    id ?? ""
  );

  useEffect(() => {
    data && dispatch(setAlbum(data));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(setError(isError));
  }, [dispatch, isError]);

  return isLoading || !album ? (
    <div className="mx-auto">
      <Spinner />
    </div>
  ) : (
    <div className="items-center sm:items-stretch md:min-w-[350px] mt-7 sm:mt-14  p-6 bg-white rounded-md flex flex-col sm:flex-row mx-auto">
      {" "}
      {!!album.images?.length && (
        <img
          src={album.images[0].url}
          alt="Artist"
          className="w-60 h-60 object-cover object-top"
        />
      )}
      <div className="ml-6 flex flex-col">
        <p className="text-3xl font-bold mt-4 sm:mt-0">{album.name}</p>
        <p className="mt-2 text-xs text-gray-500">
          Release date: {album.releaseDate}
        </p>
        {!!album.artists?.length && (
          <div className="mt-6 text-lg">
            <span className="font-semibold">Artists:</span>
            {album.artists?.map(({ name, id }) => (
              <span className="ml-1" key={id}>
                {name}
              </span>
            ))}
          </div>
        )}
        <div className="mt-3 sm:mt-auto text-gray-500">
          <span>Tracks:</span>
          <span className="ml-1">{`${album.totalTracks}`}</span>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetails;
