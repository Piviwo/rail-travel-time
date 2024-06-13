import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getFinalData } from "./utils";
import './timeTable.css';

export const Timetable = ({ stationName }) => {
  //   const [evaNumber, setEvaNumber] = useState(null);
  const [timeTable, setTimeTable] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const data = await getFinalData(stationName);
        setTimeTable(data);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    };
  
    fetchTimeTable();
  }, [stationName]);

  if (!timeTable) {
    return <p>Loading...</p>;
  }
  
  const handleRowClick = async (index, entry) => {
    setSelectedRow(index);
    try {
      const coordData = await fetchCoordinates(stationName);
      setCoordinates({ lat: coordData.lat, lon: coordData.lon });
    } catch (err) {
      console.error('Failed to fetch coordinates', err);
    }
  };
  
  const fetchCoordinates = async (stationName) => {
    const response = await fetch('/../../../../data/cities_for_Timetables.json');
    console.log(response);
    const data = await response.json();
    // hier funktioniert es noch nicht!!
  
    const cityIndex = data.city.findIndex(cityName => cityName === stationName);
    if (cityIndex !== -1) {
      const lat = data.latitude[cityIndex];
      const lon = data.longitude[cityIndex];
      return { lat, lon };
    } else {
      throw new Error('Station not found in data');
    }
  };

  const departures = timeTable.filter(entry => entry.kind == 'departure' || entry.kind == 'intermediate_stop');
  const arrivals = timeTable.filter(entry => entry.kind === 'arrival');
  
  return (
    <div>
      <h2 className="departure_Timetable">Departures at {stationName}</h2>
      {departures ? (
        <table className="departure_Timetable">
          <thead>
            <tr>
              <th>Time</th>
              <th></th>
              <th>Destination</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {departures.map((entry, index) => (
              <tr
              key={index}
              className={selectedRow === index ? 'selected' : ''}
              onClick={() => handleRowClick(index)}>
                <td>{entry.departure}</td>
                <td className="trainNumber">{entry.trainNumber}</td>
                <td>{entry.trainEnd}</td>
                <td>{entry.trainStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

Timetable.propTypes = {
  stationName: PropTypes.string.isRequired,
};
