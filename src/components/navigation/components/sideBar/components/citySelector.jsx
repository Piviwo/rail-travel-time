import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import citiesData from "../../../../../data/RailTimeTable.json";
import {
  setSelectedCity,
  setFilteredCities,
} from "../../../../../app/app-actions";
import { getSelectedCity, getFilteredCities } from "../../../../../app/app-selectors";
import "./citiesSelector.css";
import {
  // InputNumber,
  Slider,
} from "antd";

export const SelectCity = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(getSelectedCity);
  const filteredCities = useSelector(getFilteredCities);
  const cityWord_1 = filteredCities && filteredCities.length > 1 ? 'Cities' : 'City';
  const cityWord_2 = filteredCities && filteredCities.length > 1 ? 'are' : 'is';
  const [travelTimeLimit, setTravelTimeLimit] = useState(5);

  const handleCityChange = (e) => {
    dispatch(setSelectedCity(e.target.value));
    dispatch(setFilteredCities([]));
  };

  const handleTimeChange = (value) => {
    setTravelTimeLimit(value);
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
      }
    }
  }, [dispatch, selectedCity, travelTimeLimit]);

  return (
    <div className="row">
      <div className="label">
        <span>from</span>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="selectItem"
        >
          {citiesData?.map((city) => (
            <option key={city.City} value={city.City}>
              {city.City}
            </option>
          ))}
        </select>
      </div>
      <div className="label">
        <span>in</span>
        {/* <InputNumber
          type="number"
          value={travelTimeLimit}
          onChange={handleTimeChange}
          addonAfter={"hours"}
          min={1}
          max={100}
          className="inputNumber"
        /> */}
        <Slider
          min={1}
          max={30}
          value={travelTimeLimit}
          onChange={handleTimeChange}
          tooltip={{
            formatter: (value) => `${value} hours`,
            open: true,
            placement: "bottom",
          }}
          style={{ width: "100%" }}
        />
      </div>
      {selectedCity !== null && (
        <div className="cityInfo">
          <span>{cityWord_1} reachable from {selectedCity} within {travelTimeLimit} hours {cityWord_2}</span>
          <ul className="city-list">
            {filteredCities && filteredCities.map((city, index) => (
              <li key={index} className="city-item">{city.City}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
