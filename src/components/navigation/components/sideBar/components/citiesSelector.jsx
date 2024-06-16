import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { setCoordinates } from "../../../../../app/app-actions";
import citiesData from "../../../../../data/RailTimeTable.json";
import 'react-select-search/style.css'
import "./citiesSelector.css";
import { Button } from "antd";
import SelectSearch from 'react-select-search';

export const SelectCities = () => {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [averageTime, setAverageTime] = useState(null);
  const dispatch = useDispatch();

  const citiesOptions1 = citiesData.map(city => ({
    name: city.City,
    value: city.City,
    disabled: city.City === city2
  }));

  const citiesOptions2 = citiesData.map(city => ({
    name: city.City,
    value: city.City,
    disabled: city.City === city1
  }));

  const handleCity1Change = (selectedValue) => {
    setCity1(selectedValue);
  };

  const handleCity2Change = (selectedValue) => {
    setCity2(selectedValue);
  };

  const getAverageTime = () => {
    if (city1 && city2) {
      const city1Data = citiesData?.find((city) => city.City === city1);
      const city2Data = citiesData?.find((city) => city.City === city2);

      if (city1Data) {
        const time = parseFloat(city1Data[city2]);
        setAverageTime(time);
      }

      dispatch(
        setCoordinates([
          {
            name: city1,
            latitude: city1Data.Latitude,
            longitude: city1Data.Longitude,
          },
          {
            name: city2,
            latitude: city2Data.Latitude,
            longitude: city2Data.Longitude,
          },
        ])
      );
    }
  };

  function getColorBasedOnTime(averageTime) {
    if (averageTime < 5) {
      return '#C0D99A';
    } else if (averageTime >= 5 && averageTime <= 10) {
      return '#FFDF48';
    } else {
      return '#F26444';
    }
  }

  return (
    <div className="selectors">
      <label className="selectContainer">
        <SelectSearch
          options={citiesOptions1}
          value={city1}
          onChange={handleCity1Change}
          search
          name="city1"
          placeholder="From city"
        />
      </label>
      <label className="selectContainer">
        <SelectSearch
          options={citiesOptions2}
          value={city2}
          onChange={handleCity2Change}
          search
          name="city2"
          placeholder="To city"
        />
      </label>

      <Button
        onClick={getAverageTime}
        className="button"
        disabled={!city1 || !city2}
      >
        Get Time
      </Button>
      {averageTime !== null && (
        <div className="timeInfo">
          <span>Average Time:</span>
          <div className="time " style={{ backgroundColor: getColorBasedOnTime(averageTime) }}>
            <span>{averageTime}</span> hours
          </div>
        </div>
      )}
    </div>
  );
};
