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
          <li className="topNavItem"><a href="" className="topNavLink">Home</a></li>
          <li className="topNavItem"><a href="" className="topNavLink">About</a></li>
          <li className="topNavItem"><a href="" className="topNavLink">Contact</a></li>
        </ul>
      </nav>
      <div className={`sideNavContainer ${isMenuOpen ? 'open' : ''}`}>
      </div>
    </div>
  );
};