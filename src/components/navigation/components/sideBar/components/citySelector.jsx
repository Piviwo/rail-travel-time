import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import citiesData from "../../../../../data/RailTimeTable.json";
import {
  setSelectedCity,
  setFilteredCities,
} from "../../../../../app/app-actions";
import { getSelectedCity } from "../../../../../app/app-selectors";
import "./citiesSelector.css";

export const SelectCity = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(getSelectedCity);

  const [travelTimeLimit, setTravelTimeLimit] = useState("");

  const handleCityChange = (e) => {
    dispatch(setSelectedCity(e.target.value));
    dispatch(setFilteredCities([]));
    console.log(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTravelTimeLimit(e.target.value);
  };

  useEffect(() => {
    if (selectedCity && travelTimeLimit) {
      const cityData = citiesData?.find((city) => city.City === selectedCity);
      if (cityData) {
        const filtered = citiesData?.filter((city) => {
          const travelTime =
            (parseFloat(cityData[city.City]) +
              parseFloat(city[cityData.City])) /
            2;
          return travelTime <= travelTimeLimit;
        });
        dispatch(setFilteredCities(filtered));
        console.log(filtered);
      }
    }
  }, [dispatch, selectedCity, travelTimeLimit]);

  return (
    <div className="selectors">
      <label>
        Select City:
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">Select a city</option>
          {citiesData?.map((city) => (
            <option key={city.City} value={city.City}>
              {city.City}
            </option>
          ))}
        </select>
      </label>

      <label>
        Travel Time Limit (hours):
        <input
          type="number"
          value={travelTimeLimit}
          onChange={handleTimeChange}
        />
      </label>
    </div>
  );
};
