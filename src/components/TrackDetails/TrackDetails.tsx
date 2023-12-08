import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { spotifyService } from "../../redux/services/spotifyService";
import { useDispatch } from "react-redux";
import { setError, setTrack } from "../../redux/entities";
import { Spinner } from "..";
import { useAppSelector } from "../../redux/hooks";

function TrackDetails() {
  const dispatch = useDispatch();
  const { track } = useAppSelector(({ entities }) => entities);
  const { id } = useParams();
  const { data, isLoading, isError } = spotifyService.useGetTrackQuery(
    id ?? ""
  );

  useEffect(() => {
    data && dispatch(setTrack(data));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(setError(isError));
  }, [dispatch, isError]);

  const getTime = (ms: number): string => {
    const date = new Date(ms);
    return `${date.getMinutes()}:${date.getSeconds()}`;
  };

  return isLoading || !track ? (
    <div className="mx-auto">
      <Spinner />
    </div>
  ) : (
    <div className="md:min-w-[350px] mt-7 sm:mt-14 p-6 bg-white rounded-md flex mx-auto">
      <div className="ml-6 flex flex-col">
        <p className="text-3xl font-bold">{track.name}</p>
        <p className="mt-2 text-xs text-gray-500">Album: {track.album}</p>
        {!!track.artists?.length && (
          <div className="mt-6 text-lg">
            <span className="font-semibold">Artists:</span>
            {track.artists?.map(({ name, id }) => (
              <span className="ml-1" key={id}>
                {name}
              </span>
            ))}
          </div>
        )}
        <div className="mt-8 text-gray-500">
          <span>Duration:</span>
          <span className="ml-1">{getTime(track.duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default TrackDetails;
