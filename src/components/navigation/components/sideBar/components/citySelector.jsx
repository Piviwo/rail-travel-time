import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import citiesData from "../../../../../data/RailTimeTable.json";
import {
  setSelectedCity,
  setFilteredCities,
} from "../../../../../app/app-actions";
import { getSelectedCity } from "../../../../../app/app-selectors";
import "./citiesSelector.css";
import { InputNumber } from "antd";

export const SelectCity = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(getSelectedCity);

  const [travelTimeLimit, setTravelTimeLimit] = useState(5);

  const handleCityChange = (e) => {
    dispatch(setSelectedCity(e.target.value));
    dispatch(setFilteredCities([]));
    console.log(e.target.value);
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
        console.log(filtered);
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
        <InputNumber
          type="number"
          value={travelTimeLimit}
          onChange={handleTimeChange}
          addonAfter={"hours"}
          minValue={1}
          maxValue={100}
          className="inputNumber"
        />
      </div>
    </div>
  );
};
