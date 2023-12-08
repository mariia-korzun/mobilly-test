import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { spotifyService } from "../../redux/services/spotifyService";
import { setData, setPage } from "../../redux/search";
import { ErrorIndicator, SearchBar, SearchList } from "../../components";
import { MAX_ALLOWED_REQUESTED_ITEMS } from "../../common/constants";

function Home() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state);
  const { searchValue, type, limit, page } = search;
  const { total } = search[`${search.type}s`];
  const isSearchEmpty = searchValue.length === 0;
  const maxPages = total / limit;
  let { data, isFetching, isError } = spotifyService.useGetSearchQuery(
    {
      searchValue,
      type,
      limit,
      offset: page * limit,
    },
    { skip: isSearchEmpty }
  );

  useEffect(() => {
    data && dispatch(setData(data));
  }, [dispatch, data]);

  const onScroll = useCallback(() => {
    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (
      scrolledToBottom &&
      !isFetching &&
      page <= maxPages &&
      (page + 1) * limit <= MAX_ALLOWED_REQUESTED_ITEMS - limit
    ) {
      console.log("Fetching more data...");
      dispatch(setPage(page + 1));
    }
  }, [dispatch, limit, maxPages, page, isFetching]);

  useEffect(() => {
    onScroll();

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isFetching]);

  return isError ? (
    <ErrorIndicator />
  ) : (
    <div className="flex flex-col items-center">
      <SearchBar />
      <SearchList isFetching={isFetching} />
    </div>
  );
}

export default Home;
