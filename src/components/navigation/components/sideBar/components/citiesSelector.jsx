import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCoordinates } from "../../../../../app/app-actions";
import citiesData from "../../../../../data/RailTimeTable.json";
import "./citiesSelector.css";
import { Button } from "antd";

export const SelectCities = () => {
  const [city1, setCity1] = useState("Vienna");
  const [city2, setCity2] = useState("Berlin");
  const [averageTime, setAverageTime] = useState(null);

  const dispatch = useDispatch();

  const handleCity1Change = (e) => {
    setCity1(e.target.value);
  };

  const handleCity2Change = (e) => {
    setCity2(e.target.value);
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
        <p>from</p>
        <select
          value={city1}
          onChange={handleCity1Change}
          className="selectItem"
        >
          {citiesData?.map((city) => (
            <option
              key={city.City}
              value={city.City}
              disabled={city.City == city2}
            >
              {city.City}
            </option>
          ))}
        </select>
      </label>
      <label className="selectContainer">
        <p>to</p>
        <select
          value={city2}
          onChange={handleCity2Change}
          className="selectItem"
        >
          {citiesData?.map((city) => (
            <option
              key={city.City}
              value={city.City}
              disabled={city.City == city1}
            >
              {city.City}
            </option>
          ))}
        </select>
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
