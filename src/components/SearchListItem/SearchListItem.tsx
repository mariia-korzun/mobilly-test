import { useAppSelector } from "../../redux/hooks";
import { IAlbum, IArtist, ITrack } from "../../redux/entities/types";
import { SearchType } from "../../redux/search/types";
import AlbumItem from "./AlbumItem";
import ArtistItem from "./ArtistItem";
import TrackItem from "./TrackItem";
import { Link } from "react-router-dom";

interface IProps {
  item: IAlbum | IArtist | ITrack;
}

function SearchListItem({ item }: IProps): JSX.Element {
  const { type } = useAppSelector(({ search }) => search);

  const renderItem = () => {
    switch (type) {
      case SearchType.Artist:
        return <ArtistItem item={item as IArtist} />;
      case SearchType.Album:
        return <AlbumItem item={item as IAlbum} />;
      default:
        return <TrackItem item={item as ITrack} />;
    }
  };

  return (
    <Link to={`/${type}/${item.id}`}>
      <div className="bg-white p-4 rounded-md h-full">{renderItem()}</div>
    </Link>
  );
}

export default SearchListItem;
