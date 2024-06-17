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
import place1 from "../../assets/place_1.svg";
import place2 from "../../assets/place_2.svg";

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
              right: 200,
            },
            duration: 1000,
          }
        );
      }
    } else if (
      coordinates &&
      coordinates[0] &&
      coordinates?.length === 1 &&
      mapRef?.current != null
    ) {
      if (coordinates[0].longitude && coordinates[0].latitude) {
        mapRef?.current.flyTo({
          center: [coordinates[0].longitude, coordinates[0].latitude],
          zoom: 5.5,
        });
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
            {city.City == selectedCity ? (
              <>
                <Marker latitude={city.Latitude} longitude={city.Longitude}>
                  <img
                    src={place1}
                    alt="Origin Marker"
                    style={{
                      width: "40px",
                      height: "40px",
                      transform: "translate(0%, -25%)",
                    }}
                  />
                </Marker>
                <Popup
                  latitude={city.Latitude}
                  longitude={city.Longitude}
                  closeButton={false}
                  closeOnClick={false}
                  anchor="bottom-left"
                  className="popup-no-background1"
                >
                  <div data-city={city.City}>{city.City}</div>
                </Popup>
              </>
            ) : (
              <>
                <Marker latitude={city.Latitude} longitude={city.Longitude}>
                  <img
                    src={place2}
                    alt="Marker 2"
                    style={{
                      width: "40px",
                      height: "40px",
                      transform: "translate(0%, -25%)",
                    }}
                  />
                </Marker>
                <Popup
                  latitude={city.Latitude}
                  longitude={city.Longitude}
                  closeButton={false}
                  closeOnClick={false}
                  anchor="bottom-left"
                  className="popup-no-background2"
                >
                  <div data-city={city.City}>{city.City}</div>
                </Popup>
              </>
            )}

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
                  "line-color": "#f26444",
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

  const routesBetweenCities = useMemo(() => {
    if (coordinates?.length === 2 && mode === "averageBetween") {
      return (
        <React.Fragment>
          <Marker
            latitude={coordinates[0].latitude}
            longitude={coordinates[0].longitude}
            offsetLeft={-20}
            offsetTop={-40}
          >
            <img
              src={place1}
              alt="Marker 1"
              style={{
                width: "40px",
                height: "40px",
                transform: "translate(0%, -25%)",
              }}
            />
          </Marker>
          <Popup
            latitude={coordinates[0].latitude}
            longitude={coordinates[0].longitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom-left"
            className="popup-no-background1"
          >
            <div data-city={coordinates[0].name}>{coordinates[0].name}</div>
          </Popup>
          <Marker
            latitude={coordinates[1].latitude}
            longitude={coordinates[1].longitude}
            offsetLeft={-20}
            offsetTop={-40}
          >
            <img
              src={place2}
              alt="Marker 2"
              style={{
                width: "40px",
                height: "40px",
                transform: "translate(0%, -25%)",
              }}
            />
          </Marker>
          <Popup
            latitude={coordinates[1].latitude}
            longitude={coordinates[1].longitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom-left"
            className="popup-no-background2"
          >
            <div data-city={coordinates[1].name}>{coordinates[1].name}</div>
          </Popup>
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
                "line-color": "#f26444",
                "line-width": 3,
                "line-dasharray": [2, 2],
              }}
            />
          </Source>
        </React.Fragment>
      );
    }
    return null;
  }, [coordinates, mode]);

  const timeTableMarker = useMemo(() => {
    if (coordinates?.length === 1 && mode === "timeTable") {
      return (
        <React.Fragment key={coordinates[0].name}>
          <Marker
            latitude={coordinates[0].latitude}
            longitude={coordinates[0].longitude}
          >
            <img
              src={place1}
              alt="Marker"
              style={{
                width: "40px",
                height: "40px",
                transform: "translate(0%, -25%)",
              }}
            />
          </Marker>
          <Popup
            latitude={coordinates[0].latitude}
            longitude={coordinates[0].longitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom-left"
            className="popup-no-background1"
          >
            <div data-city={coordinates[0].name}>{coordinates[0].name}</div>
          </Popup>
        </React.Fragment>
      );
    } else if (coordinates?.length === 2 && mode === "timeTable") {
      const sourceData = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [coordinates[0].longitude, coordinates[0].latitude],
            [coordinates[1].longitude, coordinates[1].latitude],
          ],
        },
      };

      return (
        <React.Fragment key={coordinates[0].name}>
          <Marker
            latitude={coordinates[0].latitude}
            longitude={coordinates[0].longitude}
            color="#87ced6"
          >
            <img
              src={place1}
              alt="Origin Marker"
              style={{
                width: "40px",
                height: "40px",
                transform: "translate(0%, -25%)",
              }}
            />
          </Marker>
          <Popup
            latitude={coordinates[0].latitude}
            longitude={coordinates[0].longitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom-left"
            className="popup-no-background1"
          >
            <div data-city={coordinates[0].name}>{coordinates[0].name}</div>
          </Popup>

          <Marker
            latitude={coordinates[1].latitude}
            longitude={coordinates[1].longitude}
            color="#87ced6"
          >
            <img
              src={place2}
              alt="Marker 2"
              style={{
                width: "40px",
                height: "40px",
                transform: "translate(0%, -25%)",
              }}
            />
          </Marker>
          <Popup
            latitude={coordinates[1].latitude}
            longitude={coordinates[1].longitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom-left"
            className="popup-no-background2"
          >
            <div data-city={coordinates[1].name}>{coordinates[1].name}</div>
          </Popup>

          <Source id={`route-timetable`} type="geojson" data={sourceData}>
            <Layer
              id={`route-line-timetable`}
              type="line"
              source={`route-timetable`}
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#f26444",
                "line-width": 3,
                "line-dasharray": [2, 2],
              }}
            />
          </Source>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }, [coordinates, mode]);

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

      {timeTableMarker}
      {routesFromCity}
      {routesBetweenCities}
    </Map>
  );
};
