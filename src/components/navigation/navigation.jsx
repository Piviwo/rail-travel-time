import React from 'react';
import './navigation.css';

export const Navigation = () => {
  return (
    <div>
      <nav className="navBar">
        <ul className="navList">
          <li className="navItem"><a href="#home" className="navLink">Home</a></li>
          <li className="navItem"><a href="#about" className="navLink">About</a></li>
          <li className="navItem"><a href="#contact" className="navLink">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};