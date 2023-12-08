import { Route, Routes } from "react-router-dom";
import { Home, Artist, Album, Track } from "../pages";
import { SearchType } from "../redux/search/types";

function AppRoutes(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`${SearchType.Artist}/:id`} element={<Artist />} />
        <Route path={`${SearchType.Album}/:id`} element={<Album />} />
        <Route path={`${SearchType.Track}/:id`} element={<Track />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
