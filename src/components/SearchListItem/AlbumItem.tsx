import { IAlbum } from "../../redux/entities/types";

interface IProps {
  item: IAlbum;
}

function AlbumItem({
  item: { name, images, releaseDate },
}: IProps): JSX.Element {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center pb-3">
        {!!images?.length && (
          <img
            src={images[0].url}
            alt="Artist"
            className="w-14 h-14 object-contain"
          />
        )}
        <p className="pl-3">{name}</p>
      </div>
      <p className="mt-auto text-xs text-gray-500">
        Release date: {releaseDate}
      </p>
    </div>
  );
}

export default AlbumItem;
