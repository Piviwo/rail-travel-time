import {
  // HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { InfoPage, MapPage } from "./pages";

function App() {
  return (
    // <HashRouter>
    <Routes>
      <Route
        path="/"
        element={
          <div className="appContainer">
            <MapPage />
          </div>
        }
      />
      <Route
        path="/info"
        element={
          <div className="appContainer">
            <InfoPage />
          </div>
        }
      />
    </Routes>
    // </HashRouter>
  );
}

export default App;
