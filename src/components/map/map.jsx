import React, { useRef, useEffect, useMemo } from "react";
import Map, { Marker, Source, Layer, Popup } from "react-map-gl";
import maplibre from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useSelector } from "react-redux";
import {
  getCoordinates,
  getSelectedCity,
  getFilteredCities,
  getMode,
} from "../../app/app-selectors";
import { dataLayer } from "./map-constants";
import "./map.css";
import railsData from "../../../data/railroads.json";
import citiesData from "../../data/RailTimeTable.json";

export const MapContainer = () => {
  const coordinates = useSelector(getCoordinates);
  const selectedCity = useSelector(getSelectedCity);
  const mode = useSelector(getMode);
  const filteredCities = useSelector(getFilteredCities);
  const mapRef = useRef();

  useEffect(() => {
    if (
      coordinates &&
      coordinates[0] &&
      coordinates[1] &&
      mapRef?.current != null
    ) {
      const minLat = Math.min(coordinates[0].latitude, coordinates[1].latitude);
      const maxLat = Math.max(coordinates[0].latitude, coordinates[1].latitude);
      const minLng = Math.min(
        coordinates[0].longitude,
        coordinates[1].longitude
      );
      const maxLng = Math.max(
        coordinates[0].longitude,
        coordinates[1].longitude
      );

      if (minLng && minLat && maxLng && maxLat) {
        mapRef?.current.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          {
            padding: {
              top: 200,
              bottom: 100,
              left: 500,
              right: 100,
            },
            duration: 1000,
          }
        );
      }
    }
  }, [coordinates]);

  useEffect(() => {
    if (filteredCities && mapRef?.current != null) {
      const minMaxLatLon = filteredCities.reduce(
        (acc, city) => {
          return {
            minLatitude: Math.min(acc.minLatitude, city.Latitude),
            maxLatitude: Math.max(acc.maxLatitude, city.Latitude),
            minLongitude: Math.min(acc.minLongitude, city.Longitude),
            maxLongitude: Math.max(acc.maxLongitude, city.Longitude),
          };
        },
        {
          minLatitude: 90,
          maxLatitude: -90,
          minLongitude: 90,
          maxLongitude: -90,
        }
      );

      const bounds = [
        [minMaxLatLon.minLongitude, minMaxLatLon.minLatitude],
        [minMaxLatLon.maxLongitude, minMaxLatLon.maxLatitude],
      ];

      mapRef?.current.fitBounds(bounds, {
        padding: {
          top: 200,
          bottom: 100,
          left: 500,
          right: 100,
        },
        duration: 1000,
      });
    }
  }, [filteredCities]);

  const routesFromCity = useMemo(() => {
    const routesToDraw =
      selectedCity &&
      mode === "averageTo" &&
      filteredCities?.map((city) => {
        const cityData = citiesData?.find((c) => c.City === selectedCity);
        const sourceData = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [cityData.Longitude, cityData.Latitude],
              [city.Longitude, city.Latitude],
            ],
          },
        };

        return (
          <React.Fragment key={city.City}>
            <Marker
              latitude={city.Latitude}
              longitude={city.Longitude}
              color="#87ced6"
            />
            <Popup
              latitude={city.Latitude}
              longitude={city.Longitude}
              closeButton={false}
              closeOnClick={false}
              anchor="bottom-left"
              className="popup-no-background"
            >
              <div data-city={city.City}>{city.City}</div>
            </Popup>

            <Source id={`route-${city.City}`} type="geojson" data={sourceData}>
              <Layer
                id={`route-line-${city.City}`}
                type="line"
                source={`route-${city.City}`}
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "#2a2b40",
                  "line-width": 3,
                  "line-dasharray": [2, 2],
                }}
              />
            </Source>
          </React.Fragment>
        );
      });

    return routesToDraw;
  }, [filteredCities, mode, selectedCity]);

  return (
    <Map
      ref={mapRef}
      mapLib={maplibre}
      initialViewState={{
        latitude: 53,
        longitude: 5,
        zoom: 3.5,
        maxZoom: 12,
        minZoom: 3,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={import.meta.env.VITE_API_KEY}
    >
      <Source type="geojson" data={railsData}>
        <Layer {...dataLayer} />
      </Source>
      {coordinates?.length === 2 && mode == "averageBetween" && (
        <>
          <Marker
            latitude={coordinates[0].latitude}
            longitude={coordinates[0].longitude}
          ></Marker>
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
                "line-color": "#2a2b40",
                "line-width": 3,
                "line-dasharray": [2, 2],
              }}
            />
          </Source>
        </>
      )}

      {routesFromCity}
    </Map>
  );
};
