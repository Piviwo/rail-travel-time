import { useState } from "react";
import { InfoModal } from "./components";
import { InfoCircleOutlined } from "@ant-design/icons";

import "./navigation.css";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  return (
    <>
      <div className="navigation">
        <nav className="topNavBar">
          <div className="burgerMenu" onClick={toggleMenu}>
            {isMenuOpen ? "✖" : "☰"}
          </div>
          <ul className="topNavList">
            {/* <li className="topNavItem">
              <a href="" className="topNavLink">
                home
              </a>
            </li> */}
            <li className="topNavItem">
              <InfoCircleOutlined
                className="topNavLink infoButton"
                onClick={() => setInfoModalOpen(true)}
              />
            </li>
          </ul>
        </nav>
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
      </div>
      {isInfoModalOpen && (
        <InfoModal
          isOpened={isInfoModalOpen}
          onCancel={() => setInfoModalOpen(false)}
        />
      )}
    </>
  );
};
