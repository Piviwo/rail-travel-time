import { useSelector } from "react-redux";
import { getMode } from "../../../../app/app-selectors";
import { SelectCities, SelectCity, Timetable } from "./components";

export const SideContent = () => {
  const mode = useSelector(getMode);
  return mode == "averageBetween" ? <SelectCities /> : mode == "averageTo" ? <SelectCity /> : <Timetable/>;
};
