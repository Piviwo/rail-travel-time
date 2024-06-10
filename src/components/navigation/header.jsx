import { NavLink } from "react-router-dom";
import { useState } from "react";
import { InfoModal } from "./components/infoModal";
import { InfoCircleOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import "./navigation.css";

export const Header = ({ toggleMenu, isMenuOpen }) => {
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  return (
    <>
      <div className="header">
        <nav className="topNavBar">
          {typeof isMenuOpen !== "undefined" ? (
            <div className="burgerMenu" onClick={toggleMenu}>
              {isMenuOpen ? <CloseOutlined className="closeIcon" /> : "☰"}
            </div>
          ) : (
            <div></div>
          )}
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

Header.propTypes = {
  toggleMenu: PropTypes.func,
  isMenuOpen: PropTypes.bool,
};
