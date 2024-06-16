import PropTypes from "prop-types";
import "./sideBar.css";
import { Timetable } from "../timeTable";

import { SideContent } from "./sideContent";
import { Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMode } from "../../../../app/app-selectors";
import { setMode } from "../../../../app/app-actions";

export const SideBar = ({ isMenuOpen }) => {
  const mode = useSelector(getMode);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.value) {
      dispatch(setMode(event.target.value));
    }
  };

  return (
    <div className={`sideNavContainer ${isMenuOpen ? "open" : ""}`}>
      <div className="contentContainer">
        <h2>Select your travel route</h2>
        <div className="radioContainer">
          <Radio.Group onChange={handleChange} defaultValue={mode}>
            <Radio.Button value="averageBetween">Between two</Radio.Button>
            <Radio.Button value="averageTo">From one</Radio.Button>
            <Radio.Button value="timeTable">Timetable</Radio.Button>
          </Radio.Group>
        </div>
        <SideContent />
      </div>
      <Timetable stationName="Frankfurt(Main)Hbf" />
    </div>
  );
};

SideBar.propTypes = {
  isMenuOpen: PropTypes.bool,
};
