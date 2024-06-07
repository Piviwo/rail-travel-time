import PropTypes from "prop-types";
import "./sideBar.css";
import { useState } from "react";
import { SideContent } from "./sideContent";

export const SideBar = ({ isMenuOpen }) => {
  const [content, setContent] = useState("averagetimes");
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const handleFromChange = (event) => {
    setSelectedFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setSelectedTo(event.target.value);
  };

  return (
    <div className={`sideNavContainer ${isMenuOpen ? "open" : ""}`}>
      <div className="contentContainer">
        <h2>select your travel route</h2>
        <div className="radioContainer">
          <label>
            <input
              type="radio"
              value="averagetimes"
              name="radioGroup"
              defaultChecked
              onChange={handleChange}
            />{" "}
            average times
          </label>
          <label>
            <input
              type="radio"
              value="timetable"
              name="radioGroup"
              onChange={handleChange}
            />{" "}
            time table
          </label>
        </div>
        <div className="selectContainer">
          <p>from</p>
          <select className="selectItem" onChange={handleFromChange}>
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
          <select className="selectItem" onChange={handleToChange}>
            {/* to do: list */}
            <option>city</option>
            <option>city 1</option>
            <option>city 2</option>
            <option>city 3</option>
          </select>
        </div>
        <SideContent content={content} />
      </div>
    </div>
  );
};

SideBar.propTypes = {
  isMenuOpen: PropTypes.bool,
};
