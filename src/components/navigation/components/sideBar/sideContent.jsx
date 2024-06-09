import { useSelector } from "react-redux";
import { getMode } from "../../../../app/app-selectors";
import { SelectCities, SelectCity } from "./components";

export const SideContent = () => {
  const mode = useSelector(getMode);
  return mode == "averageBetween" ? <SelectCities /> : <SelectCity />;
};
