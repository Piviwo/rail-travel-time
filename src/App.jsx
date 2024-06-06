import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { InfoPage, MapPage } from "./pages";

function App() {
  return (
    <HashRouter>
      <Routes>
        <div className="appContainer">
          <Route path="/" element={<MapPage />} />
          <Route path="/info" element={<InfoPage />} />
        </div>
      </Routes>
    </HashRouter>
  );
}

export default App;
