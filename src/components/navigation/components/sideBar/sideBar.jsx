import PropTypes from "prop-types";
import "./sideBar.css";

export const SideBar = ({ isMenuOpen }) => {
  return (
    <div className={`sideNavContainer ${isMenuOpen ? "open" : ""}`}>
      <div className="selectionContainer">
        <h2>select your travel route</h2>
        <div>
          <p>mode</p>
          {/* radio button  */}
        </div>
        <div>
          <p>from</p>
          <select className="selectItem">
            <option>city</option>
            {/* to do: liste */}
          </select>
        </div>
        <div>
          <p>to</p>
          <select className="selectItem">
            <option>city</option>
            {/* to do: liste */}
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
