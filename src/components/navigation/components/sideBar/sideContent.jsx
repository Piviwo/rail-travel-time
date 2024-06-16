import { useSelector } from "react-redux";
import { getMode } from "../../../../app/app-selectors";
import { SelectCities, SelectCity } from "./components";
import { Timetable } from "../timeTable";

export const SideContent = () => {
  const mode = useSelector(getMode);

  if (mode === "averageBetween") {
    return <SelectCities />;
  } else if (mode === "timeTable") {
    return <Timetable stationName="Frankfurt(Main)Hbf" />;
  } else {
    return <SelectCity />;
  }
};
