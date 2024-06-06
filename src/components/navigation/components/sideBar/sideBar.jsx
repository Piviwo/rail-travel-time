import PropTypes from "prop-types";
import "./sideBar.css";

export const SideBar = ({ isMenuOpen }) => {
  return (
    <div className={`sideNavContainer ${isMenuOpen ? "open" : ""}`}>
    <div className="contentContainer">
      <h2>select your travel route</h2>
      <div className="radioContainer">
        <label>
          <input type="radio" value="average-times" name="radioGroup" defaultChecked/> average times
        </label>
        <label>
          <input type="radio" value="timetable" name="radioGroup" /> time table
        </label>
      </div> 
      <div className="selectContainer">
        <p>from</p>
        <select className="selectItem">
          {/* to do: list */}
          <option>city</option>
          <option>city 1</option>
          <option>city 2</option>
          <option>city 3</option>
          {/* to do: list */}
        </select>
      </div>
      <div className="selectContainer">
        <p>to</p>
        <select className="selectItem">
          {/* to do: list */}
          <option>city</option>
          <option>city 1</option>
          <option>city 2</option>
          <option>city 3</option>
        </select>
      </div>
      {/* {two cities: average travel time} */}
      {/*timetable within next hour: city, current time, gives trainnumber, final dest, highlight the cities */}
    </div>
  </div>
  );
};

SideBar.propTypes = {
  isMenuOpen: PropTypes.bool,
};
