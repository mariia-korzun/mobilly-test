import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setData, setPage, setSearchValue, setType } from "../../redux/search";
import { SearchType } from "../../redux/search/types";
import { spotifyService } from "../../redux/services/spotifyService";
import { useSearchParams } from "react-router-dom";

function SearchBar() {
  const dispatch = useAppDispatch();
  const { searchValue, type } = useAppSelector(({ search }) => search);
  const [inputValue, setInputValue] = useState<string>(searchValue);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(setSearchValue(inputValue));
    dispatch(setPage(0));
    dispatch(setData({ type, total: 0, items: [] }));
    dispatch(spotifyService.util.resetApiState());

    setSearchParams({ type, searchValue: inputValue });
  }, [dispatch, setSearchParams, inputValue, type]);

  useEffect(() => {
    const searchValue = searchParams.get("searchValue");
    const type = searchParams.get("type");

    if (type && Object.values(SearchType).includes(type as SearchType)) {
      dispatch(setType(type as SearchType));
    }

    if (searchValue) {
      setInputValue(searchValue);
    }
  }, [dispatch, searchParams]);

  return (
    <div className="w-1/2 md:w-1/3 flex justify-center text-lg border-[0.5px] border-gray-500 rounded-md mt-20">
      <select
        name="type"
        value={type}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          dispatch(setType(e.target.value as SearchType));
          dispatch(setPage(0));
        }}
        className="h-9 rounded-s-md bg-gray-200 outline-none pl-1"
      >
        <option value={SearchType.Artist}>Artist</option>
        <option value={SearchType.Album}>Album</option>
        <option value={SearchType.Track}>Track</option>
      </select>
      <input
        value={inputValue}
        type="text"
        name="searchValue"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
        className="grow h-9 rounded-e-md px-4 outline-none"
      />
    </div>
  );
}

export default SearchBar;
