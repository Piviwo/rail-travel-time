import { useEffect } from "react";
import PropTypes from "prop-types";
import { getTimeTable, getFinalData } from "./utils";

export const Timetable = ({ stationName }) => {
  //   const [evaNumber, setEvaNumber] = useState(null);

  useEffect(() => {
    const timeTable = getTimeTable(stationName);
    getFinalData(stationName);

    console.log(timeTable);
  }, [stationName]);

  return (
    <div>
      <h2>Timetable for {stationName}</h2>
    </div>
  );
};

Timetable.propTypes = {
  stationName: PropTypes.string.isRequired,
};
