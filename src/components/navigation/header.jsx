import { NavLink } from "react-router-dom";
import { useState } from "react";
import { InfoModal } from "./components/infoModal";
import { InfoCircleOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getSideNav } from "../../app/app-selectors";
import { setSideNav } from "../../app/app-actions";

import "./navigation.css";

export const Header = () => {
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const sideNavOpen = useSelector(getSideNav);
  const dispatch = useDispatch();

  const toggleMenu = (event) => {
    dispatch(setSideNav(!sideNavOpen));
  };

  return (
    <>
      <div className="header">
        <nav className="topNavBar">
          <div className="topLeftNav">
              <div className="burgerMenu" onClick={toggleMenu}>
                {sideNavOpen ? <CloseOutlined className="closeIcon" /> : "☰"}
              </div>
            <NavLink to="/" className="topNavLink homeLink">
              Rail Travel Time
            </NavLink>
          </div>
          <ul className="topNavList">
            <li className="topNavItem">
              <NavLink to="/" className="topNavLink">
                Map
              </NavLink>
            </li>
            <li className="topNavItem">
              <NavLink to="/info" className="topNavLink">
                Railways Info
              </NavLink>
            </li>
            <li className="topNavItem">
              <InfoCircleOutlined
                className="topNavLink infoButton"
                onClick={() => setInfoModalOpen(true)}
              />
            </li>
          </ul>
        </nav>
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
