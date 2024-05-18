import "./App.css";
import { MapContainer } from "./components";
import { Navigation } from "./components/navigation/navigation";

function App() {
  return (
    <div className="appContainer">
      <Navigation />
      <MapContainer />
    </div>
  );
};

export default App;
