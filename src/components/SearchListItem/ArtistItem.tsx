import { IArtist } from "../../redux/entities/types";

interface IProps {
  item: IArtist;
}

function ArtistItem({ item: { name, id, images } }: IProps): JSX.Element {
  return (
    <div className="flex items-center h-full">
      {!!images?.length && (
        <img
          src={images[0].url}
          alt="Artist"
          className="w-9 h-9 object-contain"
        />
      )}
      <p className="pl-3">{name}</p>
    </div>
  );
}

export default ArtistItem;
