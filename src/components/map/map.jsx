import Map, { Marker, Source, Layer } from "react-map-gl";
import maplibre from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useSelector } from "react-redux";
import {
  getCoordinates,
  getSelectedCity,
  getFilteredCities,
} from "../../app/app-selectors";
import { useEffect } from "react";
import citiesData from "../../data/RailTimeTable.json";

export const MapContainer = () => {
  const coordinates = useSelector(getCoordinates);
  const selectedCity = useSelector(getSelectedCity);
  const filteredCities = useSelector(getFilteredCities);

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  const getLineColor = (time) => {
    if (time <= 10) return "#00FF00";
    if (time <= 20) return "#FFFF00";
    return "#FF0000";
  };

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
    >
      {coordinates?.length === 2 && (
        <>
          <Marker
            latitude={coordinates[0].latitude}
            longitude={coordinates[0].longitude}
          />
          <Marker
            latitude={coordinates[1].latitude}
            longitude={coordinates[1].longitude}
          />
          <Source
            id="route"
            type="geojson"
            data={{
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: coordinates.map((coord) => [
                  coord.longitude,
                  coord.latitude,
                ]),
              },
            }}
          >
            <Layer
              id="route"
              type="line"
              source="route"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#888",
                "line-width": 6,
              }}
            />
          </Source>
        </>
      )}

      {selectedCity &&
        filteredCities.map((city) => {
          const cityData = citiesData?.find((c) => c.City === selectedCity);
          const travelTime =
            (parseFloat(cityData[city.City]) +
              parseFloat(city[cityData.City])) /
            2;
          return (
            <>
              <Marker
                key={city.City}
                latitude={city.Latitude}
                longitude={city.Longitude}
                color="blue"
              />
              <Source
                id={`route-${city.City}`}
                type="geojson"
                data={{
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: [
                      [cityData.Longitude, cityData.Latitude],
                      [city.Longitude, city.Latitude],
                    ],
                  },
                }}
              >
                <Layer
                  id={`route-line-${city.City}`}
                  type="line"
                  source={`route-${city.City}`}
                  layout={{
                    "line-join": "round",
                    "line-cap": "round",
                  }}
                  paint={{
                    "line-color": getLineColor(travelTime),
                    "line-width": 4,
                  }}
                />
              </Source>
            </>
          );
        })}
    </Map>
  );
};
