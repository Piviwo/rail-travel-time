import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCoordinates } from "../../../../../app/app-actions";
import citiesData from "../../../../../data/RailTimeTable.json";
import "./citiesSelector.css";

export const SelectCities = () => {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
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

  return (
    <div className="selectors">
      <label>
        <p>from</p>
        <select value={city1} onChange={handleCity1Change}>
          <option value="">Select a city</option>
          {citiesData?.map((city) => (
            <option key={city.City} value={city.City}>
              {city.City}
            </option>
          ))}
        </select>
      </label>
      <label>
        <p>to</p>
        <select value={city2} onChange={handleCity2Change}>
          <option value="">Select a city</option>
          {citiesData?.map((city) => (
            <option key={city.City} value={city.City}>
              {city.City}
            </option>
          ))}
        </select>
      </label>

      <button onClick={getAverageTime} className="button">
        Get Time
      </button>
      {averageTime !== null && (
        <div>
          <h2>Average Time: {averageTime} hours</h2>
        </div>
      )}
    </div>
  );
};
