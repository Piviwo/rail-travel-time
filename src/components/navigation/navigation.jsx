import { useState } from "react";
import "./navigation.css";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <SideBar isMenuOpen={isMenuOpen} />
      <Timetable stationName="Frankfurt(Main)Hbf" />
    </>
  );
};
