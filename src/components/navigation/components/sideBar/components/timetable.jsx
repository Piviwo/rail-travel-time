import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFinalData } from "./utils";
import { setCoordinates } from "../../../../../app/app-actions";
import "./timetable.css";
import "./citiesSelector.css";
import citiesLocations from "../../../../../../data/cities_forTimetable.json";
import SelectSearch from "react-select-search";

export const Timetable = () => {
  const [stationName, setStationName] = useState("Köln Hbf");
  const [timeTable, setTimeTable] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const cityEntries = Object.entries(citiesLocations.name);
  const cityLatitudes = Object.entries(citiesLocations.latitude);
  const cityLongitudes = Object.entries(citiesLocations.longitude);

  const cityOptions = cityEntries.map((city) => ({
    value: city[1],
    name: city[1],
  }));


  const findDestIndexByName = (name) => {
    const entry = cityEntries.find(([index, cityName]) => {
      const trimmedCityName = cityName.trim().replace(/\s+/g, "");
      const trimmedName = name.trim().replace(/\s+/g, "");
      return trimmedCityName === trimmedName;
    });
    return entry ? entry[0] : null; // Return the index if found, otherwise return null
  };

  const findIndexByName = (name) => {
    const entry = cityEntries.find(([index, cityName]) => cityName === name);
    return entry ? entry[0] : null; // Return the index if found, otherwise return null
  };

  const getCoordinates = (index) => {
    const latitudeEntry = cityLatitudes.find(
      ([latIndex]) => latIndex === index
    );
    const longitudeEntry = cityLongitudes.find(
      ([lonIndex]) => lonIndex === index
    );
    if (latitudeEntry && longitudeEntry) {
      return {
        lat: latitudeEntry[1],
        lon: longitudeEntry[1],
      };
    }
    return null; // Return null if coordinates are not found
  };

  const dispatch = useDispatch();

  const fetchStationCoordinates = async () => {
    try {
      const index = findIndexByName(stationName);
      const coordData = index ? getCoordinates(index) : null;
      dispatch(
        setCoordinates([
          {
            name: stationName,
            latitude: coordData.lat,
            longitude: coordData.lon,
          },
        ])
      );
    } catch (err) {
      console.log(`Sorry, we cannot show you ${stationName} on our map, because it is not a DB train station.`);
    }
  };

 
 

  const fetchDestinationCoordinates = async (trainPath, index) => {
    try {
        const id = findIndexByName(stationName);
        const coordData = id ? getCoordinates(id) : null;
        const coordinates = [
            {
                name: stationName,
                latitude: coordData?.lat,
                longitude: coordData?.lon,
            },
        ];
        const lenPath = trainPath.length;
        let i = 0;
        for (const path of trainPath) {
          i=i+1;
            try {
                const indexdest = findDestIndexByName(path);
                try{
                  const coordDatadest = getCoordinates(indexdest);
                  coordinates.push({
                      name: path,
                      latitude: coordDatadest.lat,
                      longitude: coordDatadest.lon,
                  });
                } catch (err) {
                  if(i==lenPath){
                    coordinates[0].name = stationName +" is the last stop in Germany on this trip"
                    console.log(`Sorry, we cannot show you ${path} on our map, because it is not a DB train station.`, index);
                  }
                  // hier etwas machen, wenn es die letzte eintrag von trainPath ist, dann schreibe sowas "Sorry, ${path} could not be found because it is not a DB train stration."
              }
                
            } catch (err) {}
        }

        dispatch(setCoordinates(coordinates));
    } catch (err) {}
};



  const fetchTimeTable = async () => {
    try {
      const data = await getFinalData(stationName);
      setTimeTable(data);
      fetchStationCoordinates();
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const handleStationChange = (value) => {
    setStationName(value);
  };

  const handleRowClick = (entry, index) => {
    fetchDestinationCoordinates(entry.trainPath, index);
    setSelectedRow(index);
  };

  useEffect(() => {
    fetchTimeTable();
  }, [stationName]);

  if (!timeTable) {
    return <p>Loading...</p>;
  }

  const departures = timeTable
    .filter(
      (entry) => entry.kind == "departure" || entry.kind == "intermediate_stop"
    )
    .sort(
      (a, b) =>
        new Date(`1970/01/01 ${a.departure}`) -
        new Date(`1970/01/01 ${b.departure}`)
    );
  const arrivals = timeTable
    .filter((entry) => entry.kind === "arrival")
    .sort(
      (a, b) =>
        new Date(`1970/01/01 ${a.arrivals}`) -
        new Date(`1970/01/01 ${b.arrivals}`)
    );

  return (
    <>
      <div className="selectors">
        <label className="selectContainer">
          <SelectSearch
            options={cityOptions}
            value={stationName}
            onChange={handleStationChange}
            search
            className="select-search"
            placeholder="From city"
          />
        </label>
      </div>
      <div className="departure_Timetable">
        <h2 className="departure_Timetable">Departures at {stationName}</h2>
        {departures ? (
          <table className="departure_Timetable">
            <thead>
              <tr>
                <th className="column_1">Time</th>
                <th className="column_2">No.</th>
                <th className="column_3">Destination</th>
                <th className="statusColumn column4">Status</th>
              </tr>
            </thead>
            <tbody>
              {departures.map((entry, index) => (
                <tr
                  key={index}
                  className={selectedRow === index ? 'selected' : ''}
                  onClick={() => handleRowClick(entry, index)}
                >
                  <td className="column_1">{entry.departure}</td>
                  <td className="column_2">{entry.trainNumber}</td>
                  <td className="column_3">{entry.trainEnd}</td>
                  <td className="statusColumn column4">{entry.trainStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
