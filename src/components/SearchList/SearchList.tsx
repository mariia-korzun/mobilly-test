import { useAppSelector } from "../../redux/hooks";
import SearchListItem from "../SearchListItem/SearchListItem";
import Spinner from "../Spinner/Spinner";

interface IProps {
  isFetching: boolean;
}

function SearchList({ isFetching }: IProps): JSX.Element {
  const { search } = useAppSelector((state) => state);
  const { items } = search[`${search.type}s`];
  const isSearchEmpty = search.searchValue.length === 0;
  const isItemsEmpty = items.length === 0;

  const renderItems = () => {
    return items.map((item) => {
      return <SearchListItem item={item} key={item.id} />;
    });
  };

  return isSearchEmpty ? (
    <div className="text-xl font-bold mt-12">Enter something...</div>
  ) : isItemsEmpty && !isFetching ? (
    <div className="text-xl font-bold mt-12">No items found</div>
  ) : (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 pt-8 w-full">
        {renderItems()}
      </div>
      {isFetching && <Spinner />}
    </div>
  );
}

export default SearchList;
