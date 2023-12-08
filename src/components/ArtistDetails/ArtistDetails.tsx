import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { spotifyService } from "../../redux/services/spotifyService";
import { useDispatch } from "react-redux";
import { setArtist, setError } from "../../redux/entities";
import { Spinner } from "..";
import { useAppSelector } from "../../redux/hooks";

function ArtistDetails() {
  const dispatch = useDispatch();
  const { artist } = useAppSelector(({ entities }) => entities);
  const { id } = useParams();
  const { data, isLoading, isError } = spotifyService.useGetArtistQuery(
    id ?? ""
  );

  useEffect(() => {
    data && dispatch(setArtist(data));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(setError(isError));
  }, [dispatch, isError]);

  return isLoading || !artist ? (
    <div className="mx-auto">
      <Spinner />
    </div>
  ) : (
    <div className="items-center sm:items-stretch md:min-w-[350px] mt-7 sm:mt-14 p-6 bg-white rounded-md flex flex-col sm:flex-row mx-auto">
      {!!artist.images?.length && (
        <img
          src={artist.images[0].url}
          alt="Artist"
          className="w-60 h-60 object-cover object-top"
        />
      )}
      <div className="ml-6 flex flex-col">
        <p className="text-3xl font-bold mt-4 sm:mt-0">{artist.name}</p>
        {!!artist.genres?.length && (
          <div className="mt-6 text-lg">
            <span className="font-semibold">Genres:</span>
            {artist.genres?.map((genre) => (
              <span className="ml-1" key={genre}>
                {genre}
              </span>
            ))}
          </div>
        )}
        <div className="mt-3 sm:mt-auto text-gray-500">
          <span>Followers:</span>
          <span className="ml-1">{artist.followers?.total}</span>
        </div>
      </div>
    </div>
  );
}

export default ArtistDetails;
