import React, { useState } from 'react';
import './navigation.css';

export const Navigation = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='navigation'>
      <nav className="topNavBar">
        <div className="burgerMenu" onClick={toggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </div>
        <ul className="topNavList">
          <li className="topNavItem"><a href="" className="topNavLink">home</a></li>
          <li className="topNavItem"><a href="" className="topNavLink">about</a></li>
          <li className="topNavItem"><a href="" className="topNavLink">contact</a></li>
        </ul>
      </nav>
      <div className={`sideNavContainer ${isMenuOpen ? 'open' : ''}`}>
        <div className="selectionContainer">
          <h2>select your travel route</h2>
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
        </div>
      </div>
    </div>
  );
};