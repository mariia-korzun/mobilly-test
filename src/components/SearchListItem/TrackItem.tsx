import { ITrack } from "../../redux/entities/types";

interface IProps {
  item: ITrack;
}

function TrackItem({ item: { name, artists } }: IProps): JSX.Element {
  return (
    <div className="h-full flex items-center">
      <div>
        <span className="pr-3 font-bold">{artists[0].name}</span> -
        <span className="pl-3">{name}</span>
      </div>
    </div>
  );
}

export default TrackItem;
