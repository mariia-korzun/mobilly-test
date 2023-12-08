import { Provider } from "react-redux";
import store from "./redux/store";
import Routes from "./layout/Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
