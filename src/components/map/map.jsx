import "./map.css";
import Map from "react-map-gl";
import maplibre from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const MapContainer = () => {
  return (
      <Map
        mapLib={maplibre}
        initialViewState={{
          latitude: 55,
          longitude: 20,
          zoom: 3.5,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={import.meta.env.VITE_API_KEY}
      ></Map>
  );
};
