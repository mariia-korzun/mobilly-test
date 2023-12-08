import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { ErrorIndicator } from "../components";
import { useDispatch } from "react-redux";
import { setPage } from "../redux/search";
import { useEffect } from "react";
import back from "../images/svg/back.svg";

interface IProps {
  children: JSX.Element;
}

function ViewDetails({ children }: IProps): JSX.Element {
  const { isError } = useAppSelector(({ entities }) => entities);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(0));
  }, [dispatch]);

  return isError ? (
    <ErrorIndicator />
  ) : (
    <div className="flex flex-col m-5">
      <button
        onClick={() => {
          if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/", { replace: true });
          }
        }}
        className="m-2 sm:m-7"
      >
        <img src={back} alt="Back button" className="w-10" />
      </button>
      {children}
    </div>
  );
}

export default ViewDetails;
