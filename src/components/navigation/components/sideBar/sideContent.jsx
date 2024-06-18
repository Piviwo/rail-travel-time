import { useSelector } from "react-redux";
import { getMode } from "../../../../app/app-selectors";
import { SelectCities, SelectCity, Timetable } from "./components";

export const SideContent = ({isMenuOpen}) => {
  const mode = useSelector(getMode);
  if (mode === "averageBetween") {
    return <SelectCities />;
  } else if (mode === "timeTable") {
    return <Timetable />;
  } else {
    return <SelectCity isMenuOpen={isMenuOpen}/>;
  }
};
