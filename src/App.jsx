import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { InfoPage, MapPage } from "./pages";

function App() {
  return (
    <div className="appContainer">
      <HashRouter>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
